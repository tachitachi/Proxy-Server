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

var recv = require('./common/recv');
var send = require('./common/send');
var bufutil = require('./bufutil');

eval(fs.readFileSync('public/parse.js').toString());
//eval(fs.readFileSync('public/recv.js').toString());
//eval(fs.readFileSync('public/send.js').toString());
eval(fs.readFileSync('public/skills.js').toString());
eval(fs.readFileSync('public/items.js').toString());

eval(fs.readFileSync('public/recvmod.js').toString());
eval(fs.readFileSync('public/refill.js').toString());
eval(fs.readFileSync('public/monstermod.js').toString());
eval(fs.readFileSync('public/rareitem.js').toString());

eval(fs.readFileSync('player.js').toString());
//eval(fs.readFileSync('bufutil.js').toString());
eval(fs.readFileSync('constants.js').toString());

eval(fs.readFileSync('LogMessage.js').toString());

process.on("uncaughtException", function(e) {
    console.log(e.stack);
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
var LOG_BUFFER = {};


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



function HandleLog(packet){
	var packetBuffer = null;
	var packetDef = null;
	var webMessage = null;
	var logHeader = null;
	
	// Get recv/send, and ID
	var ID = packet.data[LOGMESSAGE[packet.header].datamap.ID.index].value;
	
	switch(packet.header){
	case 0x0001:
		packetBuffer = RECV_BUFFER;
		packetDef = RECV;
		webMessage = 'log recv';
		logHeader = 0x0003;
		break;
	case 0x0002:
		packetBuffer = SEND_BUFFER;
		packetDef = SEND;
		webMessage = 'log send';
		logHeader = 0x0004;
		break;
	case 0x0005:
		packetBuffer = LOG_BUFFER;
		packetDef = LOGMESSAGE;
		webMessage = 'log debug';
		logHeader = 0x0006;
		break;
	default:
		// Unknown packet header
		console.log('Unknown packet header', packet.header);
		return;
	}
	
	if (packetBuffer === null){
		// error
		return;
	}
	
	if(!packetBuffer.hasOwnProperty(ID)){
		packetBuffer[ID] = new PacketBuffer(packetDef, 1);
	}
	//console.log(packet.toString());
	var packetData = packet.data[LOGMESSAGE[packet.header].datamap.data.index].value;
    //console.log(packet.toString());
	
	var parsedPackets = ParsePackets(packetBuffer[ID], packetData);
	//console.log(parsedPackets);
	for (p in parsedPackets){
		
		// write binary to one file, and text to another
		// separate each session's log somehow
		
		var curTime = (new Date()).getTime();
		var timestamp = Math.floor(curTime / 1000);
		var fracTime = curTime % 1000;
		
		var loggedPacketLength = parsedPackets[p].length + 10;
		var logPacket = CreateLogPacketBuffer(logHeader, {len: loggedPacketLength, time: timestamp, frac: fracTime, data: parsedPackets[p].bytes}, loggedPacketLength);
		
		// Write log to disk
		fs.appendFile(path.join('logs', ID + '_' + sessionTime + '.log'), logPacket, 'binary', function(err) {
			if(err) {
				console.log(err);
			}
				//console.log(logPacket);
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
	//console.log('Received: ' + bufutil.bufPrint(data));
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
			//console.log(bufutil.bufPrint(PACKET_LOG_BUFFER.buffer));
			//PACKET_LOG_BUFFER.buffer = null;
		}
	}
});

client.on('close', function() {
	console.log('Connection closed');
});

