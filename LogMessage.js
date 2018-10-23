'use strict';

var bufutil = require('./bufutil');

var LOGMESSAGE = {
	0x0001: {
		name: 'recv packet', 
		length: -1, 
		log: 2,
		data: [
			{name: 'len', size: 2, type: 'int', log: 1},
			{name: 'ID', size: 4, type: 'int', log: 1},
			{name: 'data', size: -1, type: 'byte', log: 1},
		],
	},
	0x0002: {
		name: 'send packet', 
		length: -1, 
		log: 2,
		data: [
			{name: 'len', size: 2, type: 'int', log: 1},
			{name: 'ID', size: 4, type: 'int', log: 1},
			{name: 'data', size: -1, type: 'byte', log: 1},
		],
	},
	0x0003: {
		name: 'log recv packet', 
		length: -1, 
		log: 2,
		data: [
			{name: 'len', size: 2, type: 'int', log: 1},
			{name: 'time', size: 4, type: 'int', log: 1},
			{name: 'frac', size: 2, type: 'int', log: 1},
			{name: 'data', size: -1, type: 'byte', log: 1},
		],
	},
	0x0004: {
		name: 'log send packet', 
		length: -1, 
		log: 2,
		data: [
			{name: 'len', size: 2, type: 'int', log: 1},
			{name: 'time', size: 4, type: 'int', log: 1},
			{name: 'frac', size: 2, type: 'int', log: 1},
			{name: 'data', size: -1, type: 'byte', log: 1},
		],
	},
	0x0005: {
		name: 'send debug', 
		length: -1, 
		log: 2,
		data: [
			{name: 'len', size: 2, type: 'int', log: 1},
			{name: 'ID', size: 4, type: 'int', log: 1},
			{name: 'data', size: -1, type: 'byte', log: 1},
		],
	},
	0x0006: {
		name: 'log debug packet', 
		length: -1, 
		log: 2,
		data: [
			{name: 'len', size: 2, type: 'int', log: 1},
			{name: 'time', size: 4, type: 'int', log: 1},
			{name: 'frac', size: 2, type: 'int', log: 1},
			{name: 'data', size: -1, type: 'byte', log: 1},
		],
	},
	0x0007: {
		name: 'log packet', 
		length: -1, 
		log: 2,
		data: [
			{name: 'len', size: 2, type: 'int', log: 1},
			{name: 'message', size: -1, type: 'byte', log: 1},
		],
	},
}

for(var i in LOGMESSAGE){
	var packetDef = LOGMESSAGE[i];
	packetDef.datamap = {};
	var startIndex = 2;
	for(var i = 0; i < packetDef.data.length; i++){
		var data = packetDef.data[i];
		var endIndex = data.size > 0 ? startIndex + data.size : -1;
		packetDef.datamap[data.name] = {index: i, start: startIndex, end: endIndex, type: data.type, log: data.log};
		startIndex = endIndex;
	}
}

function CreateLogPacketBuffer(header, data, len){
	if(LOGMESSAGE.hasOwnProperty(header)){
		var packetDef = LOGMESSAGE[header];
		var length = packetDef.length;
		if(packetDef.length < 2 && len !== undefined && len > 1){
			length = len;
		}
		for(var i = 0; i < length; i++){
			var buf = new Buffer(length);
			buf[0] = header & 0xff;
			buf[1] = (header >> 8) & 0xff;
			for(var i = 2; i < length; i++){
				buf[i] = 0;
			}
			return bufutil._CreatePacket(buf, packetDef, data);
		}
	}
	else{
		return null;
	}
}

module.exports = {
	'LOGMESSAGE': LOGMESSAGE,
	'CreateLogPacketBuffer': CreateLogPacketBuffer,
}