// Global for collecting all packets
//PACKET_BUFFER = new PacketBuffer();

var kMaxPacketSize = 0x7fff;

function PacketBuffer(definition, mode){
	this.definition = definition;
	if(!mode){
		// use list
		this.mode = 0;
		this.buffer = [];
	}
	else{
		// use Buffer
		this.mode = 1;
		this.buffer = null;
	}
}

PacketBuffer.prototype.GetNextPacket = function(){
	var length = this.GetLength();
	
	if(this.buffer === null || !this.buffer.length){
		//console.log('not enough length. Expecting {0} but got {1}'.format(length, this.buffer.length));
		return null;
	}
	
	if(!length || length > kMaxPacketSize){
		length = this.buffer.length;
	}
	else if(length > this.buffer.length){
		//console.log('not enough length. Expecting {0} but got {1}'.format(length, this.buffer.length));
		return null;
	}

	var bytes = this.buffer.slice(0, length);
	this.buffer = this.buffer.slice(length);
	return new Packet(this.definition, bytes);
}

PacketBuffer.prototype.Add = function(bytes){
	if(!this.mode){
		this.buffer.push.apply(this.buffer, bytes);
	}
	else{
		//console.log(bytes);
		if(this.buffer === null){
			this.buffer = bytes;
		}
		else{
			this.buffer = Buffer.concat([this.buffer, bytes]);
		}
	}
}

PacketBuffer.prototype.GetLength = function(){
	var headerId = GetHeaderId(this.buffer);
	var length = 0;
	if(this.definition.hasOwnProperty(headerId)){
		var packetDef = this.definition[headerId];
		length = packetDef.length;
		//console.log(packetDef.name);
		if(length < 0 && packetDef.data.length > 0 && packetDef.data[0].name == 'len'){
			length = HexStringToInt(this.buffer.slice(2, 4));
		}
		else if(length < 0){
			length = this.buffer.length;
		}
	}
	
	return length;
}

function IntToCoordBuffer(x, y){
	var tempx = x << 6;
	var tempy = y << 4;
	
	var buf = new Buffer(3);
	buf[0] = (tempx & 0xff00) >> 8;
	buf[1] = (tempx & 0xc0) | ((tempy & 0x3f00) >> 8);
	buf[2] = tempy & 0xf0;
	
	return buf;
}


function IntToCoordPair(x1, y1, x2, y2){
	var tempx1 = x1 << 6;
	var tempy1 = y1 << 4;
	
	var tempx2 = x2 << 2;
	var tempy2 = y2 << 0;
	
	var buf = new Buffer(6);
	//var buf = [0, 0, 0, 0, 0, 0];
	buf[0] = (tempx1 & 0xff00) >> 8;
	buf[1] = (tempx1 & 0xc0) | ((tempy1 & 0x3f00) >> 8);
	buf[2] = (tempy1 & 0xff) | ((tempx2 & 0x0f00) >> 8)
	buf[3] = (tempx2 & 0xff) | ((tempy2 & 0x0300) >> 8)
	buf[4] = (tempx2 & 0xff);
	//buf[5] = ((x1 << 4) | (y1 & 0x0f)) & 0xff;
	
	return buf;
}

function GetCoords(bytes){
	// get 2 ints out of 3 bytes
	var x = ((bytes[1] & 0xc0) | ((bytes[0] & 0xff) << 8)) >> 6;
	var y = ((bytes[2] & 0xf0) | ((bytes[1] & 0x3f) << 8)) >> 4;
	return {x: x, y: y};
}

function GetCoordPair(bytes){
	// get 4 ints out of 6 bytes
	var x1 = ((bytes[1] & 0xc0) | ((bytes[0] & 0xff) << 8)) >> 6;
	var y1 = ((bytes[2] & 0xff) | ((bytes[1] & 0x3f) << 8)) >> 4;
	
	var x2 = ((bytes[3] & 0xff) | ((bytes[2] & 0x0f) << 8)) >> 2;
	var y2 = ((bytes[4] & 0xff) | ((bytes[3] & 0x03) << 8)) >> 0;
	
	return {x1: x1, y1: y1, x2: x2, y2: y2};
}

function Packet(definition, bytes){
	// assume this packet is the correct length already

	this.definition = definition;
	this.length = bytes.length;
	this.name = 'unknown packet';
	this.data = [];
	this.bytes = bytes;
	this.log = 3;
	
	var time = GetTime();
	this.timestamp = time.timestamp;
	this.timestring = time.string;
	
	this.header = GetHeaderId(bytes);
	
	if(this.definition.hasOwnProperty(this.header)){
		var definition = this.definition[this.header];
		this.name = definition.name;
		this.log = definition.log;
		
		var endPacket = false;
		var byteStart = 2;
		for(var i = 0; i < definition.data.length && !endPacket; i++){
			// TODO: special case go to end?
			var byteEnd;
			if(definition.data[i].size > 0){
				byteEnd = byteStart + definition.data[i].size;
			}
			else{
				byteEnd = this.length;
				endPacket = true;
			}
			var value = undefined;
			
			switch(definition.data[i].type){
			case 'int':
			case 'long':
				value = HexStringToInt(this.bytes.slice(byteStart, byteEnd));
				break;
			case 'string':
				value = HexStringToAscii(this.bytes.slice(byteStart, byteEnd));
				break;
			case 'coords':
				value = GetCoords(this.bytes.slice(byteStart, byteEnd));
				break;
			case 'coordpair':
				value = GetCoordPair(this.bytes.slice(byteStart, byteEnd));
				break;
			case 'array':
				var struct = definition.data[i].struct;
				var arrayBytes = this.bytes.slice(byteStart, byteEnd);
				if(struct !== undefined){
					value = [];
					// loop over entire data, decoding.size at a time
					var arrayStart = 0;
					var arrayEnd = struct.size;
					var structBytes = arrayBytes.slice(arrayStart, arrayEnd);
					while(structBytes.length > 0){
						var sValue = undefined;
						var sIdx = 0;
						var singleItem = [];
						for(var j = 0; j < struct.data.length; j++){
							//console.log(struct.data[j]);
							var sEnd = sIdx + struct.data[j].size;
							// TODO: generify this
							switch(struct.data[j].type){
							case 'int':
							case 'long':
								sValue = HexStringToInt(structBytes.slice(sIdx, sEnd));
								break;
							case 'coords':
								sValue = GetCoords(structBytes.slice(sIdx, sEnd));
								break;
							case 'coordpair':
								sValue = GetCoordPair(structBytes.slice(sIdx, sEnd));
								break;
							case 'string':
								sValue = HexStringToAscii(structBytes.slice(sIdx, sEnd));
								break;
							case 'array':
							case 'byte':
							default:
								sValue = structBytes.slice(sIdx, sEnd);
								break;
							}
							singleItem.push({name: struct.data[j].name, value: sValue, type: struct.data[j].type, log: struct.data[j].log});
							sIdx += struct.data[j].size;
						}
						value.push(singleItem);
						arrayStart = arrayEnd;
						arrayEnd = arrayStart + struct.size;
						structBytes = arrayBytes.slice(arrayStart, arrayEnd);
					}
					//console.log(value);
				}
				else{
					value = this.bytes.slice(byteStart, byteEnd);
				}
				break;
			case 'byte':
			default:
				value = this.bytes.slice(byteStart, byteEnd);
				break;
			
			}
			
			this.data.push({name: definition.data[i].name, value: value, type: definition.data[i].type, log: definition.data[i].log});
			
			byteStart = byteEnd;
		}
	}
	else{
		var packetHeaderString = IntToHexString(this.header, 2);
		this.data.push({name: 'header', value: packetHeaderString, type: 'int', log: 2});
		this.data.push({name: 'data', value: this.bytes, type: 'byte', log: 1});
	}
	
	//console.log(this.name, this.length);
}


Packet.prototype.modify = function(fieldName, value){
	if(this.definition.hasOwnProperty(this.header)){
		var recvData = this.definition[this.header];
		if(recvData.datamap.hasOwnProperty(fieldName)){
			var data = recvData.datamap[fieldName];
			var size = data.end > 0 ? data.end - data.start : this.length - this.end;
			
			console.log(data, size);
		}
	}
}

function DataToString(data, loglevel){
	var out = [];
	for(var i = 0; i < data.length; i++){
		var dataName = data[i].name;
		var dataValue = data[i].value;
		var dataType = data[i].type;
		var dataLog = data[i].log;
		//console.log(dataName, dataValue, dataType, dataLog);
		
		if(dataLog >= loglevel){
			if(dataType == 'array'){
				var dataPoints = [];
				for(var j = 0; j < dataValue.length; j++){
					var s = DataToString(dataValue[j], loglevel);
					//console.log(s);
					dataPoints.push('[{0}]'.format(s));
				}
				var arrString = '[{0}]'.format(dataPoints.join(', '));
				out.push('[{0}: {1}]'.format(dataName, arrString));
			}
			else if(dataType == 'coords'){
				out.push('[{0}: {x: {1}, y: {2}}]'.format(dataName, dataValue.x, dataValue.y));
			}
			else if(dataType == 'coordpair'){
				out.push('[{0}: {x1: {1}, y1: {2}, x2: {3}, y2: {4}}]'.format(dataName, dataValue.x1, dataValue.y1, dataValue.x2, dataValue.y2));
			}
			else if(dataName == 'itemId'){
				var itemName = DbTable_Items.hasOwnProperty(dataValue) ? '{0} ({1})'.format(DbTable_Items[dataValue], dataValue) : 'Unknown Item {0}'.format(dataValue);
				out.push('[{0}: {1}]'.format('Item', itemName));
			}
			else if(dataName == 'skillId'){
				var skillName = DbTable_Skills.hasOwnProperty(dataValue) ? '{0} ({1})'.format(DbTable_Skills[dataValue], dataValue) : 'Unknown Skill {0}'.format(dataValue);
				out.push('[{0}: {1}]'.format('Skill', skillName));
			}
			else{
				out.push('[{0}: {1}]'.format(dataName, dataValue));
			}
		}
	}
	
	return out.join(' ');
}

Packet.prototype.toString = function(loglevel){
	if(loglevel === undefined){
		loglevel = 0;
	}

	var out = '[{0}] [{1}] [{2}]'.format(this.timestring, this.timestamp, this.name);
//	for(var i = 0; i < this.data.length; i++){
//		var dataName = this.data[i].name;
//		var dataValue = this.data[i].value;
//		var dataType = this.data[i].type;
//		var dataLog = this.data[i].log;
//		
//		if(dataType == 'array'){
//			console.log(dataType, this.data[i].value);
//			var dataPoints = []
//			for(var j = 0; j < this.data[i].value; j++){
//				var printObj = [];
//				//for(var k = 0; k < this.data[i].value.length; k++)
//				//{
//					//printObj.push(''.format(this.data[i].value[k].name, this.data[i].value[k].value);
//					console.log(this.data[i].value[j]);
//				//}
//				
//			}
//		}
//		
//		if(dataLog >= loglevel){
//			if(dataName == 'itemId'){
//				var itemName = DbTable_Items.hasOwnProperty(dataValue) ? '{0} ({1})'.format(DbTable_Items[dataValue], dataValue) : 'Unknown Item {0}'.format(dataValue);
//				out = '{0} [{1}: {2}]'.format(out, 'Item', itemName);
//			}
//			else if(dataName == 'skillId'){
//				var itemName = DbTable_Skills.hasOwnProperty(dataValue) ? '{0} ({1})'.format(DbTable_Skills[dataValue], dataValue) : 'Unknown Skill {0}'.format(dataValue);
//				out = '{0} [{1}: {2}]'.format(out, 'Skill', itemName);
//			}
//			else{
//				out = '{0} [{1}: {2} ({3})]'.format(out, dataName, dataValue, dataType);
//			}
//		}
//	}
	//out = '{0} [{1}]'.format(out, this.bytes);
	var dataString = DataToString(this.data, loglevel);
	out = '{0} {1}'.format(out, dataString);
	return out;
}

Packet.prototype.toHTML = function(loglevel){
	if(loglevel === undefined){
		loglevel = 0;
	}

	var out = '[{0}] [{1}] [{2}]'.format(this.timestring, this.timestamp, this.name);
	for(var i = 0; i < this.data.length; i++){
		var dataName = this.data[i].name;
		var dataValue = this.data[i].value;
		var dataLog = this.data[i].log;
		if(dataLog >= loglevel){
			if(dataName == 'itemId'){
				out = '{0} [{1}: {2}]'.format(out, dataName, dataValue);
			}
			else{
				out = '{0} [{1}: {2}]'.format(out, dataName, dataValue);
			}
		}
	}
	//out = '{0} [{1}]'.format(out, this.bytes);
	return out;
}

function ParseRecv(bytes){
	//var bytes = msg.trim().split(' ');
	PACKET_BUFFER.Add(bytes);
	var out = [];
	
	var packet = PACKET_BUFFER.GetNextPacket();
	while(packet !== null){
		//console.log(packet.toString());
		out.push(packet);
		packet = PACKET_BUFFER.GetNextPacket();
	}
	
//	var out = [];
//	do{
//		var packet = new Packet(bytes);
//		if(packet.log > 0){
//			out.push(packet);
//		}
//		bytes.splice(0, packet.length);
//	}while(packet.remaining > 0);

//	for(var i in out){
//		var s = '[{0}] [{1}] {2}'.format(time.string, time.timestamp, out[i]);
//		console.log(s);
//	}
	
	return out;
}

function GetTime(){
	var curtime = new Date();
	var month = padDigits(curtime.getMonth() + 1, 2); //zero index
	var day = padDigits(curtime.getDate(), 2);
	var year = curtime.getYear() + 1900;
	var hours = padDigits(curtime.getHours(), 2);
	var minutes = padDigits(curtime.getMinutes(), 2);
	var seconds = padDigits(curtime.getSeconds(), 2);
	var milliseconds = padDigits(curtime.getMilliseconds(), 3);
	
	var s = '{0}/{1}/{2} {3}:{4}:{5}.{6}'.format(year, month, day, hours, minutes, seconds, milliseconds);
	var timestamp = curtime.getTime();
	return {'string': s, 'timestamp': timestamp};
}

function GetHeaderId(bytes){
	if(bytes.length < 2)
		return 0;
	
	return HexStringToInt(bytes.slice(0, 2));
}

function padDigits(number, digits) {
	return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

function printHex(a)
{
	return padDigits(a.toString(16), 2);
}

function HexStringToAscii(msg) {
    var str = [];
    for (var i = 0; i < msg.length; i++){
		if(msg[i] == 0){
			// if null character, end string
			break;
		}
        str.push(String.fromCharCode(msg[i]));
	}
    return str.join('');
}

function AsciiToHex(str) {
    var msg = [];
    for (var i = 0; i < str.length; i++){
        msg.push(printHex(str.charCodeAt(i)));
	}
	if(msg[msg.length - 1] != '00'){
		msg.push(printHex(0));
	}
    return msg;
}

//function HexStringToAscii(msg) {
//    var str = [];
//    for (var i = 0; i < msg.length; i++){
//		if(msg[i] == '00'){
//			// if null character, end string
//			break;
//		}
//        str.push(String.fromCharCode(parseInt(msg[i], 16)));
//	}
//    return str.join('');
//}

function HexStringToInt(msg){
	var value = 0;
	for(var i = 0; i < msg.length; i++){
		value += msg[i] << i * 8;
	}
	
	return value;
}

//function HexStringToInt(msg){
//	var value = 0;
//	for(var i = 0; i < msg.length; i++){
//		var cur = parseInt(msg[i], 16);
//		value += cur << i * 8;
//	}
//	
//	return value;
//}

function IntToHexString(num, byteCount){
	var input = parseInt(num);
	var bytes = [];
	
	for(var i = 0; i < byteCount; i++){
		bytes.push(printHex((input >> (8 * i)) & 0xff));
	}
	
	return bytes.join(' ');
}

function DecimalToHex(msg){
	var bytes = [];
	
	for(var i in msg){
		bytes.push(printHex(msg[i]));
	}
	
	return bytes.join(' ');
}

if (!String.prototype.format) {
	String.prototype.format = function() {
		var args = arguments;
		return this.replace(/{(\d+)}/g, function(match, number) { 
			return typeof args[number] != 'undefined'
			? args[number]
			: match
			;
		});
	};
}