var util = require('util');
var net = require('net');
var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

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

var inlogfile = null;
var outlogfile = null;

// print process.argv
process.argv.forEach(function (val, index, array) {
	// 2 should be the file name
	//console.log(index + ': ' + val);
	
	if(index == 2){
		// read in file
		inlogfile = path.join('logs', val);
		outlogfile = path.join('logs', 'text', val);
		fs.unlink(outlogfile, function(err){
			if (err) console.log(err);
			else console.log('deleted', outlogfile);
		});
		mkdirp(path.dirname(outlogfile), function (err) {
			if (err) console.error(err)
			else console.log('dir created')
		});
	}
});


var PACKET_LOG_BUFFER = new PacketBuffer(LOGMESSAGE, 1);
var RECV_BUFFER = new PacketBuffer(RECV, 1);
var SEND_BUFFER = new PacketBuffer(SEND, 1);
var LOG_BUFFER = new PacketBuffer(LOGMESSAGE, 1);

if(inlogfile !== null){
	fs.readFile(inlogfile, function (err, data) {
		if (err){
			throw err;
		}
		
		var logText = '';
		
		console.log(data.length);
		var packets = ParsePackets(PACKET_LOG_BUFFER, data);
		for(var i = 0; i < packets.length; i++){
			var packet = packets[i];
			
			var packetBlob = packet.data[LOGMESSAGE[packet.header].datamap.data.index].value;
			var time = packet.data[LOGMESSAGE[packet.header].datamap.time.index].value;
			var frac = packet.data[LOGMESSAGE[packet.header].datamap.frac.index].value;
			var timestamp = time * 1000 + frac;
			
			switch(packet.header){
			case 0x0003:
			
				var recvPackets = ParsePackets(RECV_BUFFER, packetBlob)
				for(var packetIdx = 0; packetIdx < recvPackets.length; packetIdx++){
					recvPackets[packetIdx].SetTime(timestamp);
					var packetText = '[recv] ' + recvPackets[packetIdx].toString() + '\n';
					logText += packetText;
				}
			
				break;
			case 0x0004:
			
				
				var sendPackets = ParsePackets(SEND_BUFFER, packetBlob)
				for(var packetIdx = 0; packetIdx < sendPackets.length; packetIdx++){
					sendPackets[packetIdx].SetTime(timestamp);
					var packetText = '[send] ' + sendPackets[packetIdx].toString() + '\n';
					logText += packetText;
				}
			
				break;
			case 0x0006:
			
				var debugPackets = ParsePackets(LOG_BUFFER, packetBlob)
				for(var packetIdx = 0; packetIdx < debugPackets.length; packetIdx++){
					debugPackets[packetIdx].SetTime(timestamp);
					var packetText = '[debug] ' + debugPackets[packetIdx].toString() + '\n';
					logText += packetText;
				}
			
				break;
			default:
                console.log('unknown packet header {0}'.format(packet.header));
				break;
			}
            
            
            if(logText.length > 1000000){
                fs.appendFileSync(outlogfile, logText, 'utf-8');
                logText = '';
            }
		}
		
			
		fs.appendFile(outlogfile, logText, 'utf-8', function(err) {
			if(err) {
				console.log(err);
			}
				//console.log(logPacket);
		});
		
	});
	
	
	
}