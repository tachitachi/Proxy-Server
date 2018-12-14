var util = require('util');
var net = require('net');
var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');


require("amd-loader");
var recv = require('./common/recv');
var send = require('./common/send');
var bufutil = require('./bufutil');
var parse = require('./common/parse');
var recvmod = require('./common/recvmod');
var sendmod = require('./common/sendmod');
var refill = require('./common/refill');
var monstermod = require('./common/monstermod');
var rareitem = require('./common/rareitem');
var config = require('./config');
var itemutil = require('./itemutil');
var constants = require('./constants');
var logmessage = require('./LogMessage');

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


var PACKET_LOG_BUFFER = new parse.PacketBuffer(logmessage.LOGMESSAGE, 1);
var RECV_BUFFER = new parse.PacketBuffer(recv.RECV, 1);
var SEND_BUFFER = new parse.PacketBuffer(send.SEND, 1);
var LOG_BUFFER = new parse.PacketBuffer(logmessage.LOGMESSAGE, 1);

if(inlogfile !== null){
	fs.readFile(inlogfile, function (err, data) {
		if (err){
			throw err;
		}
		
		var logText = '';
		
		console.log(data.length);
		var packets = parse.ParsePackets(PACKET_LOG_BUFFER, data);
		var outStream = fs.createWriteStream(outlogfile);
		for(var i = 0; i < packets.length; i++){
			var packet = packets[i];
			
			var packetBlob = packet.data[logmessage.LOGMESSAGE[packet.header].datamap.data.index].value;
			var time = packet.data[logmessage.LOGMESSAGE[packet.header].datamap.time.index].value;
			var frac = packet.data[logmessage.LOGMESSAGE[packet.header].datamap.frac.index].value;
			var timestamp = time * 1000 + frac;
			
			switch(packet.header){
			case 0x0003:
			
				var recvPackets = parse.ParsePackets(RECV_BUFFER, packetBlob)
				for(var packetIdx = 0; packetIdx < recvPackets.length; packetIdx++){
					recvPackets[packetIdx].SetTime(timestamp);
					var packetText = '[recv] ' + recvPackets[packetIdx].toString() + '\n';
					logText += packetText;
				}
			
				break;
			case 0x0004:
			
				
				var sendPackets = parse.ParsePackets(SEND_BUFFER, packetBlob)
				for(var packetIdx = 0; packetIdx < sendPackets.length; packetIdx++){
					sendPackets[packetIdx].SetTime(timestamp);
					var packetText = '[send] ' + sendPackets[packetIdx].toString() + '\n';
					logText += packetText;
				}
			
				break;
			case 0x0006:
			
				var debugPackets = parse.ParsePackets(LOG_BUFFER, packetBlob)
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
                outStream.write(logText);
                logText = '';
            }
		}
		
		outStream.write(logText);
		
	});
	
	
	
}