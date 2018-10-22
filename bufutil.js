'use strict'; 
function bufCompare(a, b){
	if(a.length != b.length){
		//console.log('diff sizes');
		return false;
	}
		
	for(var i = 0; i < a.length; i++){
		if(a[i] != b[i]){
			//console.log('diff chars', a[i], b[i]);
			return false;
		}
	}
	
	return true;
}

function bufStartsWith(a, b){
	// a starts with b
	if(a.length < b.length){
		return false;
	}
	
	for(var i = 0; i < b.length; i++){
		if(a[i] != b[i]){
			return false;
		}
	}
	return true;
}

function bufContains(a, b, start){
	if (start === undefined){
		start = 0;
	}
	
	// a starts with b
	if(a.length < b.length){
		//console.log('too short');
		return -1;
	}
	
	for(var i = start; i < a.length - b.length + 1; i++){
		for(var j = 0; j < b.length; j++){
			if(a[i + j] != b[j]){
				//console.log('diff', printHex(a[i]), printHex(b[j]));
				break;
			}
			
			//console.log('same', printHex(a[i + j]), printHex(b[j]));
			if(j == b.length - 1){	
				//console.log(i, j);
				return i;
			}
		}
	}
	
	return -1;
}

function padDigits(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

function printHex(a){
	return padDigits(a.toString(16), 2);
}

function bufToList(a){
	var s = [];
	for(var i = 0; i < a.length; i++){
		s.push(a[i]);
	}
	
	return s;
}

function bufPrint(a){
	var s = ''
	for(var i = 0; i < a.length; i++)
		s += printHex(a[i]) + ' ';
	
	return s;
}


function bufRemove(buf, start, count){
	var size = start + count > buf.length ? start : buf.length - count;
	for(var i = start; i < buf.length; i++)
	{
		//console.log(i);
		buf[i] = buf[i + count];
	}
	
	return buf.slice(0, size);
}

function Print(b){
	console.log(bufPrint(b));
}

function StringToBuffer(msg){
	var m = msg.split(' ');
	var buf = new Buffer(m.length);
	for(var i = 0; i < m.length; i++){
		buf[i] = parseInt(m[i], 16);
	}
	
	return buf;
}

function IntToBuffer(value, size){
	var buf = new Buffer(size);
	var v = value;
	for(var i = 0; i < size; i++){
		v = v >> (i * 8);
		var byteVal = v & 0xff;
		buf[i] = byteVal;
		console.log(v);
	}
	return buf;
}


function _CreatePacket(buf, definition, data){
	for(var name in data){
		var nameInfo = definition.datamap.hasOwnProperty(name) ? definition.datamap[name] : null;
		if(nameInfo){
			var start = nameInfo.start;
			var end = nameInfo.end;
			var type = nameInfo.type;
			var value = data[name];
			switch(type){
			case 'int':
			case 'long':
				// only fixed length packet creation supported right now
				for(var i = 0; i < end - start; i++){
					buf[start + i] = (value >> (8 * i)) & 0xff;
				}
				break;
			case 'coords':
				// 3 bytes
				// assuming getting Coords "object"
				buf[start + 0] = value[0];
				buf[start + 1] = value[1];
				buf[start + 2] = value[2];
				break;
			case 'byte':
				// Go for fixed length, or until end of buffer
				for(var i = 0; i < end - start || (start + i) < buf.length; i++){
					buf[start + i] = value[i];
				}
				break;
			default:
				// non ints not supported yet
				break;
			}
		}
	}
	return buf;
}

module.exports = {
	'bufCompare': bufCompare,
	'bufStartsWith': bufStartsWith,
	'bufContains': bufContains,
	'padDigits': padDigits,
	'printHex': printHex,
	'bufToList': bufToList,
	'bufPrint': bufPrint,
	'bufRemove': bufRemove,
	'Print': Print,
	'StringToBuffer': StringToBuffer,
	'IntToBuffer': IntToBuffer,
	'_CreatePacket': _CreatePacket,
}