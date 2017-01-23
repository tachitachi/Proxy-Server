var LOGMESSAGE = {
	0x0001: {
		name: 'recv packet', 
		length: -1, 
		log: 2,
		data: [
			{name: 'len', size: 2, type: 'int', log: 1},
			{name: 'ID', size: 2, type: 'int', log: 1},
			{name: 'data', size: -1, type: 'byte', log: 1},
		],
	},
	0x0002: {
		name: 'send packet', 
		length: -1, 
		log: 2,
		data: [
			{name: 'len', size: 2, type: 'int', log: 1},
			{name: 'ID', size: 2, type: 'int', log: 1},
			{name: 'data', size: -1, type: 'byte', log: 1},
		],
	},
}

function CreateLogPacketBuffer(header, data){
	if(LOGMESSAGE.hasOwnProperty(header)){
		var packetDef = LOGMESSAGE[header];
		for(var i = 0; i < packetDef.length; i++){
			var buf = new Buffer(packetDef.length);
			buf[0] = header & 0xff;
			buf[1] = (header >> 8) & 0xff;
			for(var i = 2; i < packetDef.length; i++){
				buf[i] = 0;
			}
			return _CreatePacket(buf, packetDef, data);
		}
	}
	else{
		return null;
	}
}