var util = require('util');
var net = require('net');
var _ = require('underscore');
var fs = require('fs');
var path = require('path');

var mkdirp = require('mkdirp');

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

eval(fs.readFileSync('public/parse.js').toString());
eval(fs.readFileSync('public/recv.js').toString());
eval(fs.readFileSync('public/send.js').toString());
eval(fs.readFileSync('public/skills.js').toString());
eval(fs.readFileSync('public/items.js').toString());

eval(fs.readFileSync('public/recvmod.js').toString());
eval(fs.readFileSync('public/refill.js').toString());
eval(fs.readFileSync('public/monstermod.js').toString());
eval(fs.readFileSync('public/rareitem.js').toString());

eval(fs.readFileSync('player.js').toString());
eval(fs.readFileSync('bufutil.js').toString());
eval(fs.readFileSync('constants.js').toString());

eval(fs.readFileSync('LogMessage.js').toString());

process.on("uncaughtException", function(e) {
    console.log(e);
});


app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname+'/log.html'));
});

function SendToWeb(name, msg){
	io.emit(name, msg);
}

http.listen(3001, function(){
  console.log('listening on *:3000');
});

var kMaxNumPackets = 1000;
var PACKET_LOG_BUFFER = new PacketBuffer(LOGMESSAGE, 1);

var RECV_BUFFER = {};
var SEND_BUFFER = {};


// TODO: Move some of these to constants?
var sessionTime = GetTime().timestamp;
var recvLogPath = path.join('logs', 'recv');
var sendLogPath = path.join('logs', 'send');

mkdirp(recvLogPath, function (err) {
    if (err) console.error(err)
    else console.log('dir created')
});

mkdirp(sendLogPath, function (err) {
    if (err) console.error(err)
    else console.log('dir created')
});

function ParsePackets(buffer, bytes){
	//var bytes = msg.trim().split(' ');
	buffer.Add(bytes);
	var out = [];
	
	var packet = buffer.GetNextPacket();
	while(packet !== null){
		//console.log(packet.toString());
		out.push(packet);
		packet = buffer.GetNextPacket();
	}
	
	return out;
} 

function HandleLog(packet){
	var packetBuffer = null;
	var packetDef = null;
	var outPath = null;
	var webMessage = null;
	
	// Get recv/send, and ID
	var ID = packet.data[LOGMESSAGE[packet.header].datamap.ID.index].value;
	
	switch(packet.header){
	case 0x0001:
		packetBuffer = RECV_BUFFER;
		packetDef = RECV;
		outPath = path.join('logs', 'recv');
		webMessage = 'log recv';
		break;
	case 0x0002:
		packetBuffer = SEND_BUFFER;
		packetDef = SEND;
		outPath = path.join('logs', 'send');
		webMessage = 'log send';
		break;
	default:
		// Unknown packet header
		Console.log('Unknown packet header', packet.header);
		return;
	}
	
	if (packetBuffer === null){
		// error
		return;
	}
	
	if(!packetBuffer.hasOwnProperty(ID)){
		packetBuffer[ID] = new PacketBuffer(packetDef, 1);
	}
	
	var packetData = packet.data[LOGMESSAGE[packet.header].datamap.data.index].value;
	
	var parsedPackets = ParsePackets(packetBuffer[ID], packetData);
	//console.log(parsedPackets);
	for (p in parsedPackets){
		
		// write binary to one file, and text to another
		// separate each session's log somehow
		
		var curTime = (new Date()).getTime();
		var timestamp = Math.floor(curTime / 1000);
		var fracTime = curTime % 1000;
		
		var loggedPacketLength = parsedPackets[p].length + 2;
		var logPacket = CreateLogPacketBuffer(0x0003, {len: loggedPacketLength, time: timestamp, frac: fracTime, data: parsedPackets[p].bytes}, loggedPacketLength);
		
		// Write log to disk
		fs.appendFile(path.join(outPath, ID + '_' + sessionTime + '.log'), logPacket, 'binary', function(err) {
			if(err) {
				console.log(err);
			}
		}); 
		
		
		// make log human readable
		SendToWeb(webMessage, {message: parsedPackets[p].toHTML()});
	}
}

var client = new net.Socket();
client.connect(5555, '127.0.0.1', function() {
	console.log('Connected');
	client.write(LOG_CONNECTION_PASSWORD);
});

client.on('data', function(data) {
	//console.log('Received: ' + bufPrint(data));
	PACKET_LOG_BUFFER.Add(data);
	var packetList = [];
	var packet = PACKET_LOG_BUFFER.GetNextPacket();
	var packetNum = 0;
	while(packet !== null){
		
		//console.log(packet);
		
		HandleLog(packet);
		
		packet = PACKET_LOG_BUFFER.GetNextPacket();
		packetNum++;
		if(packetNum > kMaxNumPackets){
			// remove whatever packets are in the buffer
			//console.log('Too many packets, might have been infinite looping');
			//console.log(bufPrint(PACKET_LOG_BUFFER.buffer));
			//PACKET_LOG_BUFFER.buffer = null;
		}
	}
});

client.on('close', function() {
	console.log('Connection closed');
});

