var SEND = {
	0x0089: {
		name: 'actor_action', 
		length: 7, 
		log: 2,
		data: [
			{name: 'ID', size: 4, type: 'int', log: 2},
			{name: 'type', size: 1, type: 'int', log: 2},
		],
	},
	0x008c: {
		name: 'public_chat', 
		length: -1, 
		log: 2,
		data: [
			{name: 'len', size: 2, type: 'int', log: 2},
			{name: 'message', size: -1, type: 'string', log: 2},
		],
	},
	0x00a7: {
		name: 'send_item_use', 
		length: 8, 
		log: 2,
		data: [
			{name: 'index', size: 2, type: 'int', log: 2},
			{name: 'targetId', size: 4, type: 'int', log: 2},
		],
	},
	0x00b9: {
		name: 'npc_talk_continue', 
		length: 6, 
		log: 2,
		data: [
			{name: 'ID', size: 4, type: 'int', log: 2},
		],
	},
	0x00bf: {
		name: 'send_emoticon', 
		length: 3, 
		log: 2,
		data: [
			{name: 'emoteId', size: 1, type: 'int', log: 2},
		],
	},
	0x0113: {
		name: 'skill_use', 
		length: 10, 
		log: 2,
		data: [
			{name: 'lv', size: 2, type: 'int', log: 2},
			{name: 'skillId', size: 2, type: 'int', log: 2},
			{name: 'targetId', size: 4, type: 'int', log: 2},
		],
	},
	0x0146: {
		name: 'npc_talk_close', 
		length: 6, 
		log: 2,
		data: [
			{name: 'ID', size: 4, type: 'int', log: 2},
		],
	},
	0x0149: {
		name: 'GM_mute', 
		length: 9, 
		log: 2,
		data: [
			{name: 'ID', size: 4, type: 'int', log: 2},
			{name: 'type', size: 1, type: 'int', log: 2},
			{name: 'time', size: 2, type: 'int', log: 2},
		],
	},
	0x01b2: {
		name: 'shop_open', 
		length: -1, 
		log: 2,
		data: [
			{name: 'length', size: 2, type: 'int', log: 2},
			{name: 'name', size: 83, type: 'int', log: 2},
			{name: 'itemInfo', size: -1, type: 'array', log: 2, struct: {
					size: 8,
					data: [
						{name: 'index', size: 2, type: 'int', log: 2},
						{name: 'amount', size: 2, type: 'int', log: 2},
						{name: 'price', size: 4, type: 'int', log: 2},
					]
				}
			},
		],
	},
	0x035f: {
		name: 'character_move', 
		length: 5, 
		log: 2,
		data: [
			{name: 'coords', size: 3, type: 'coords', log: 2},
		],
	},
	0x0361: {
		name: 'actor_look_at', 
		length: 5, 
		log: 2,
		data: [
			{name: 'head', size: 2, type: 'int', log: 2},
			{name: 'body', size: 1, type: 'int', log: 2},
		],
	},
	0x0364: {
		name: 'storage_item_add', 
		length: 8, 
		log: 2,
		data: [
			{name: 'index', size: 2, type: 'int', log: 2},
			{name: 'amount', size: 4, type: 'int', log: 2},
		],
	},
	0x0365: {
		name: 'storage_item_remove', 
		length: 8, 
		log: 2,
		data: [
			{name: 'index', size: 2, type: 'int', log: 2},
			{name: 'amount', size: 4, type: 'int', log: 2},
		],
	},
	0x0366: {
		name: 'skill_use_location', 
		length: 10, 
		log: 2,
		data: [
			{name: 'lv', size: 2, type: 'int', log: 2},
			{name: 'skillId', size: 2, type: 'int', log: 2},
			{name: 'x', size: 2, type: 'int', log: 2},
			{name: 'y', size: 2, type: 'int', log: 2},
		],
	},
};

for(var i in SEND){
	var packetDef = SEND[i];
	packetDef.datamap = {};
	var startIndex = 2;
	for(var i = 0; i < packetDef.data.length; i++){
		var data = packetDef.data[i];
		var endIndex = data.size > 0 ? startIndex + data.size : -1;
		packetDef.datamap[data.name] = {index: i, start: startIndex, end: endIndex, type: data.type, log: data.log};
		startIndex = endIndex;
	}
}

function CreateSendPacketList(header, data){
	var list = [];
	if(SEND.hasOwnProperty(header)){
		var packetDef = SEND[header];
		list.push(header & 0xff);
		list.push((header >> 8) & 0xff);
		for(var i = 2; i < packetDef.length; i++){
			list.push(0);
		}
		return _CreatePacket(list, packetDef, data);
	}
	else{
		return null;
	}
}

function CreateSendPacketBuffer(header, data){
	if(SEND.hasOwnProperty(header)){
		var packetDef = SEND[header];
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
