var RECV = {
	
	0x007F: {
		name: 'received_sync', 
		length: 6, 
		log: 0,
		data: [
			{name: 'time', size: 4, type: 'int', log: 2},
		],
	},
	
	0x0080: {
		name: 'actor_died_or_disappeared', 
		length: 7, 
		log: 2,
		data: [
			{name: 'ID', size: 4, type: 'int', log: 2},
			{name: 'type', size: 1, type: 'int', log: 2},
		],
	},
	
	0x0087: {
		name: 'character_moves', 
		length: 12, 
		log: 1,
		data: [
			{name: 'move_start_time', size: 4, type: 'int', log: 1},
			{name: 'coords', size: 6, type: 'byte', log: 2},
		],
	},
	
	0x0088: {
		name: 'actor_movement_interrupted', 
		length: 10, 
		log: 2,
		data: [
			{name: 'ID', size: 4, type: 'int', log: 2},
			{name: 'x', size: 2, type: 'int', log: 2},
			{name: 'y', size: 2, type: 'int', log: 2},
		],
	},
	
	0x0095: {
		name: 'actor_info', 
		length: 30, 
		log: 2,
		data: [
			{name: 'ID', size: 4, type: 'int', log: 2},
			{name: 'name', size: 24, type: 'string', log: 2},
		],
	},
	
	0x009C: {
		name: 'actor_look_at', 
		length: 9, 
		log: 1,
		data: [
			{name: 'ID', size: 4, type: 'int', log: 2},
			{name: 'head', size: 2, type: 'int', log: 1},
			{name: 'body', size: 1, type: 'int', log: 1},
		],
	},
	
	0x009d: {
		name: 'item_exists', 
		length: 17, 
		log: 2,
		data: [
			{name: 'ID', size: 4, type: 'int', log: 2},
			{name: 'itemId', size: 2, type: 'int', log: 2},
			{name: 'identified', size: 1, type: 'int', log: 1},
			{name: 'x', size: 2, type: 'int', log: 2},
			{name: 'y', size: 2, type: 'int', log: 2},
			{name: 'amount', size: 2, type: 'int', log: 2},
			{name: 'subx', size: 1, type: 'int', log: 1},
			{name: 'suby', size: 1, type: 'int', log: 1},
		],
	},
	
	0x009e: {
		name: 'item_appeared', 
		length: 17, 
		log: 2,
		data: [
			{name: 'ID', size: 4, type: 'int', log: 2},
			{name: 'itemId', size: 2, type: 'int', log: 2},
			{name: 'identified', size: 1, type: 'int', log: 1},
			{name: 'x', size: 2, type: 'int', log: 2},
			{name: 'y', size: 2, type: 'int', log: 2},
			{name: 'subx', size: 1, type: 'int', log: 1},
			{name: 'suby', size: 1, type: 'int', log: 1},
			{name: 'amount', size: 2, type: 'int', log: 2},
		],
	},
	
	0x00a1: {
		name: 'item_disappeared', 
		length: 6, 
		log: 1,
		data: [
			{name: 'ID', size: 4, type: 'int', log: 2},
		],
	},
	
	0x00B0: {
		name: 'stat_info', 
		length: 8, 
		log: 1,
		data: [
			{name: 'type', size: 2, type: 'int', log: 2},
			{name: 'val', size: 4, type: 'int', log: 2},
		],
	},
	
	0x00b1: {
		name: 'stat_info2', 
		length: 8, 
		log: 1,
		data: [
			{name: 'type', size: 2, type: 'int', log: 2},
			{name: 'val', size: 4, type: 'int', log: 2},
		],
	},
	
	0x00c0: {
		name: 'emoticon', 
		length: 7, 
		log: 1,
		data: [
			{name: 'ID', size: 4, type: 'int', log: 2},
			{name: 'type', size: 1, type: 'int', log: 2},
		],
	},
	
	0x00d7: {
		name: 'chat_info', 
		length: -1, 
		log: 2,
		data: [
			{name: 'ownerId', size: 4, type: 'int', log: 2},
			{name: 'ID', size: 4, type: 'int', log: 2},
			{name: 'limit', size: 4, type: 'int', log: 2},
			{name: 'num_users', size: 2, type: 'int', log: 2},
			{name: 'public', size: 1, type: 'int', log: 2},
			{name: 'title', size: -1, type: 'string', log: 2},
		],
	},
	
	0x010f: {
		name: 'skills_list', 
		length: -1, 
		log: 2,
		data: [
			{name: 'len', size: 2, type: 'int', log: 2},
			{name: 'data', size: -1, type: 'byte', log: 1},
		],
	},
	
	0x0110: {
		name: 'skill_use_failed', 
		length: 10, 
		log: 2,
		data: [
			{name: 'skillId', size: 2, type: 'int', log: 2},
			{name: 'btype', size: 2, type: 'int', log: 1},
			{name: 'unknown', size: 2, type: 'int', log: 1},
			{name: 'fail', size: 1, type: 'int', log: 1},
			{name: 'type', size: 1, type: 'int', log: 1},
		],
	},
	
	0x011a: {
		name: 'skill_used_no_damage', 
		length: 15, 
		log: 2,
		data: [
			{name: 'skillId', size: 2, type: 'int', log: 2},
			{name: 'amount', size: 2, type: 'int', log: 2},
			{name: 'targetId', size: 4, type: 'int', log: 2},
			{name: 'sourceId', size: 4, type: 'int', log: 2},
			{name: 'success', size: 1, type: 'int', log: 2},
		],
	},
	
	0x011c: {
		name: 'warp_portal_list', 
		length: 68, 
		log: 2,
		data: [
			{name: 'type', size: 2, type: 'int', log: 2},
			{name: 'memo1', size: 16, type: 'string', log: 2},
			{name: 'memo2', size: 16, type: 'string', log: 2},
			{name: 'memo3', size: 16, type: 'string', log: 2},
			{name: 'memo4', size: 16, type: 'string', log: 2},
		],
	},
	
	0x0131: {
		name: 'vender_found', 
		length: 86, 
		log: 1,
		data: [
			{name: 'ID', size: 4, type: 'int', log: 2},
			{name: 'title', size: 80, type: 'string', log: 2},
		],
	},
	
	0x0139: {
		name: 'monster_ranged_attack', 
		length: 16, 
		log: 2,
		data: [
			{name: 'ID', size: 4, type: 'int', log: 2},
			{name: 'sourceX', size: 2, type: 'int', log: 2},
			{name: 'sourceY', size: 2, type: 'int', log: 2},
			{name: 'targetX', size: 2, type: 'int', log: 2},
			{name: 'targetY', size: 2, type: 'int', log: 2},
			{name: 'range', size: 2, type: 'int', log: 2},
		],
	},
	
	0x0141: {
		name: 'stat_info2', 
		length: 14, 
		log: 0,
		data: [
			{name: 'type', size: 4, type: 'int', log: 2},
			{name: 'val', size: 4, type: 'int', log: 2},
			{name: 'val2', size: 4, type: 'long', log: 2},
		],
	},
	
	0x0152: {
		name: 'guild_emblem', 
		length: -1, 
		log: 0,
		data: [
			{name: 'len', size: 2, type: 'int', log: 2},
			{name: 'guildId', size: 4, type: 'int', log: 2},
			{name: 'emblemId', size: 4, type: 'int', log: 2},
			{name: 'emblem', size: -1, type: 'byte', log: 1},
		],
	},
	
	0x0194: {
		name: 'character_name', 
		length: 30, 
		log: 2,
		data: [
			{name: 'ID', size: 4, type: 'int', log: 2},
			{name: 'name', size: 24, type: 'string', log: 2},
		],
	},
	
	0x0195: {
		name: 'actor_info2', 
		length: 100, 
		log: 2,
		data: [
			{name: 'ID', size: 4, type: 'int', log: 2},
			{name: 'name', size: 24, type: 'string', log: 2},
			{name: 'partyName', size: 24, type: 'string', log: 2},
			{name: 'guildName', size: 24, type: 'string', log: 2},
			{name: 'guildTitle', size: 24, type: 'string', log: 2},
		],
	},
	
	0x0196: {
		name: 'actor_status_active', 
		length: 9, 
		log: 1,
		data: [
			{name: 'type', size: 2, type: 'int', log: 2},
			{name: 'ID', size: 4, type: 'int', log: 2},
			{name: 'flag', size: 1, type: 'int', log: 2},
		],
	},
	
	0x01c8: {
		name: 'item_used', 
		length: 13, 
		log: 2,
		data: [
			{name: 'index', size: 2, type: 'int', log: 1},
			{name: 'itemId', size: 2, type: 'int', log: 2},
			{name: 'ID', size: 4, type: 'int', log: 2},
			{name: 'remaining', size: 2, type: 'int', log: 2},
			{name: 'success', size: 1, type: 'int', log: 1},
		],
	},
	
	0x01d0: {
		name: 'revolving_entity', 
		length: 8, 
		log: 0,
		data: [
			{name: 'sourceId', size: 4, type: 'int', log: 2},
			{name: 'entity', size: 2, type: 'int', log: 2},
		],
	},
	
	0x01d2: {
		name: 'combo_delay', 
		length: 10, 
		log: 2,
		data: [
			{name: 'ID', size: 4, type: 'int', log: 2},
			{name: 'delay', size: 4, type: 'int', log: 2},
		],
	},
	
	0x01d7: {
		name: 'player_equipment', 
		length: 11, 
		log: 0,
		data: [
			{name: 'sourceId', size: 4, type: 'int', log: 2},
			{name: 'type', size: 1, type: 'int', log: 2},
			{name: 'ID1', size: 2, type: 'int', log: 2},
			{name: 'ID2', size: 2, type: 'int', log: 2},
		],
	},
	
	0x01de: {
		name: 'skill_use', 
		length: 33, 
		log: 2,
		data: [
			{name: 'skillId', size: 2, type: 'int', log: 2},
			{name: 'sourceId', size: 4, type: 'int', log: 2},
			{name: 'targetId', size: 4, type: 'int', log: 2},
			{name: 'tick', size: 4, type: 'int', log: 0},
			{name: 'src_speed', size: 4, type: 'int', log: 0},
			{name: 'dst_speed', size: 4, type: 'int', log: 0},
			{name: 'damage', size: 4, type: 'int', log: 1},
			{name: 'level', size: 2, type: 'int', log: 2},
			{name: 'option', size: 2, type: 'int', log: 0},
			{name: 'type', size: 1, type: 'int', log: 1},
		],
	},
	
	0x0229: {
		name: 'character_status', 
		length: 19, 
		log: 0,
		data: [
			{name: 'ID', size: 2, type: 'int', log: 2},
			{name: 'opt1', size: 2, type: 'byte', log: 2},
			{name: 'opt2', size: 2, type: 'byte', log: 2},
			{name: 'option', size: 4, type: 'byte', log: 2},
			{name: 'stance', size: 1, type: 'int', log: 2},
		],
	},
	
	0x043d: {
		name: 'skill_post_delay', 
		length: 8, 
		log: 1,
		data: [
			{name: 'skillId', size: 2, type: 'int', log: 2},
			{name: 'time', size: 4, type: 'int', log: 2},
		],
	},
	
	0x043f: {
		name: 'actor_status_active', 
		length: 25, 
		log: 2,
		data: [
			{name: 'type', size: 2, type: 'int', log: 2},
			{name: 'ID', size: 4, type: 'int', log: 2},
			{name: 'flag', size: 1, type: 'int', log: 2},
			{name: 'tick', size: 4, type: 'int', log: 2},
			{name: 'unknown1', size: 4, type: 'byte', log: 1},
			{name: 'unknown2', size: 4, type: 'byte', log: 1},
			{name: 'unknown3', size: 4, type: 'byte', log: 1},
		],
	},
	
	0x07e1: {
		name: 'skill_update', 
		length: 15, 
		log: 2,
		data: [
			{name: 'skillId', size: 2, type: 'int', log: 2},
			{name: 'type', size: 4, type: 'int', log: 2},
			{name: 'lv', size: 2, type: 'int', log: 2},
			{name: 'sp', size: 2, type: 'int', log: 2},
			{name: 'range', size: 2, type: 'int', log: 2},
			{name: 'up', size: 1, type: 'int', log: 2},
		],
	},
	
	0x07F6: {
		name: 'exp', 
		length: 14, 
		log: 2,
		data: [
			{name: 'ID', size: 4, type: 'int', log: 2},
			{name: 'val', size: 4, type: 'int', log: 2},
			{name: 'type', size: 2, type: 'int', log: 2},
			{name: 'flag', size: 2, type: 'int', log: 2},
		],
	},
	
	0x07FB: {
		name: 'skill_cast', 
		length: 25, 
		log: 2,
		data: [
			{name: 'souceId', size: 4, type: 'int', log: 2},
			{name: 'targetId', size: 4, type: 'int', log: 2},
			{name: 'x', size: 2, type: 'int', log: 2},
			{name: 'y', size: 2, type: 'int', log: 2},
			{name: 'skillId', size: 2, type: 'int', log: 2},
			{name: 'unknown', size: 2, type: 'byte', log: 2},
			{name: 'type', size: 2, type: 'int', log: 2},
			{name: 'wait', size: 4, type: 'int', log: 2},
			{name: 'dispose', size: 1, type: 'int', log: 2},
		],
	},
	
	0x0800: {
		name: 'vender_items_list', 
		length: -1, 
		log: 1,
		data: [
			{name: 'len', size: 2, type: 'int', log: 2},
			{name: 'vendorId', size: 4, type: 'int', log: 2},
			{name: 'vendorCid', size: 4, type: 'int', log: 2},
			{name: 'data', size: -1, type: 'byte', log: 2},
		],
	},
	
	0x0814: {
		name: 'buying_store_found', 
		length: -1, 
		log: 1,
		data: [
			{name: 'ID', size: 4, type: 'int', log: 2},
			{name: 'title', size: -1, type: 'string', log: 2},
		],
	},
	
	0x08C8: {
		name: 'actor_action', 
		length: 35, 
		log: 2,
		data: [
			{name: 'souceId', size: 4, type: 'int', log: 2},
			{name: 'targetId', size: 4, type: 'int', log: 2},
			{name: 'tick', size: 4, type: 'int', log: 1},
			{name: 'source_speed', size: 4, type: 'int', log: 2},
			{name: 'dst_speed', size: 4, type: 'int', log: 2},
			{name: 'damage', size: 4, type: 'byte', log: 2},
			{name: 'div', size: 4, type: 'byte', log: 1},
			{name: 'type', size: 1, type: 'int', log: 1},
			{name: 'dual_wield_damage', size: 4, type: 'int', log: 1},
		],
	},
	
	0x08CA: {
		name: 'cash_shop_list', 
		length: -1, 
		log: 1,
		data: [
			{name: 'len', size: 2, type: 'int', log: 2},
			{name: 'amount', size: 2, type: 'int', log: 2},
			{name: 'tabcode', size: 2, type: 'int', log: 2},
			{name: 'itemInfo', size: -1, type: 'byte', log: 0},
		],
	},
	
	0x08d2: {
		name: 'high_jump', 
		length: 10, 
		log: 2,
		data: [
			{name: 'ID', size: 4, type: 'int', log: 2},
			{name: 'x', size: 2, type: 'int', log: 2},
			{name: 'y', size: 2, type: 'int', log: 2},
		],
	},
	
	0x090f: {
		name: 'actor_connected', 
		length: -1, 
		log: 2,
		data: [
			{name: 'len', size: 2, type: 'int', log: 1},
			{name: 'object_type', size: 1, type: 'int', log: 1},
			{name: 'ID', size: 4, type: 'int', log: 2},
			{name: 'walk_speed', size: 2, type: 'int', log: 1},
			{name: 'opt1', size: 2, type: 'int', log: 0},
			{name: 'opt2', size: 2, type: 'int', log: 0},
			{name: 'option', size: 4, type: 'int', log: 0},
			{name: 'type', size: 2, type: 'int', log: 0},
			{name: 'hair_style', size: 2, type: 'int', log: 0},
			{name: 'weapon', size: 2, type: 'int', log: 0},
			{name: 'shield', size: 2, type: 'int', log: 0},
			{name: 'lowhead', size: 2, type: 'int', log: 0},
			{name: 'tophead', size: 2, type: 'int', log: 0},
			{name: 'midhead', size: 2, type: 'int', log: 0},
			{name: 'hair_color', size: 2, type: 'int', log: 0},
			{name: 'clothes_color', size: 2, type: 'int', log: 0},
			{name: 'head_dir', size: 2, type: 'int', log: 0},
			{name: 'costume', size: 2, type: 'int', log: 0},
			{name: 'guildId', size: 4, type: 'int', log: 1},
			{name: 'emblemId', size: 2, type: 'int', log: 0},
			{name: 'manner', size: 2, type: 'int', log: 0},
			{name: 'opt3', size: 4, type: 'int', log: 0},
			{name: 'stance', size: 1, type: 'int', log: 0},
			{name: 'sex', size: 1, type: 'int', log: 0},
			{name: 'coords', size: 3, type: 'byte', log: 1},
			{name: 'xSize', size: 1, type: 'int', log: 0},
			{name: 'ySize', size: 1, type: 'int', log: 0},
			{name: 'lv', size: 2, type: 'int', log: 2},
			{name: 'font', size: 2, type: 'int', log: 0},
			{name: 'opt4', size: 9, type: 'byte', log: 0},
			{name: 'name', size: -1, type: 'string', log: 2},
		],
	},
	
	0x0914: {
		name: 'actor_moved', 
		length: -1, 
		log: 2,
		data: [
			{name: 'len', size: 2, type: 'int', log: 1},
			{name: 'object_type', size: 1, type: 'int', log: 1},
			{name: 'ID', size: 4, type: 'int', log: 2},
			{name: 'walk_speed', size: 2, type: 'int', log: 1},
			{name: 'opt1', size: 2, type: 'int', log: 0},
			{name: 'opt2', size: 2, type: 'int', log: 0},
			{name: 'option', size: 4, type: 'int', log: 0},
			{name: 'type', size: 2, type: 'int', log: 0},
			{name: 'hair_style', size: 2, type: 'int', log: 0},
			{name: 'weapon', size: 2, type: 'int', log: 0},
			{name: 'shield', size: 2, type: 'int', log: 0},
			{name: 'lowhead', size: 2, type: 'int', log: 0},
			{name: 'tick', size: 4, type: 'int', log: 1},
			{name: 'tophead', size: 2, type: 'int', log: 0},
			{name: 'midhead', size: 2, type: 'int', log: 0},
			{name: 'hair_color', size: 2, type: 'int', log: 0},
			{name: 'clothes_color', size: 2, type: 'int', log: 0},
			{name: 'head_dir', size: 2, type: 'int', log: 0},
			{name: 'costume', size: 2, type: 'int', log: 0},
			{name: 'guildId', size: 4, type: 'int', log: 1},
			{name: 'emblemId', size: 2, type: 'int', log: 0},
			{name: 'manner', size: 2, type: 'int', log: 0},
			{name: 'opt3', size: 4, type: 'int', log: 0},
			{name: 'stance', size: 1, type: 'int', log: 0},
			{name: 'sex', size: 1, type: 'int', log: 0},
			{name: 'coords', size: 6, type: 'byte', log: 1},
			{name: 'xSize', size: 1, type: 'int', log: 0},
			{name: 'ySize', size: 1, type: 'int', log: 0},
			{name: 'lv', size: 2, type: 'int', log: 2},
			{name: 'font', size: 2, type: 'int', log: 0},
			{name: 'opt4', size: 9, type: 'byte', log: 0},
			{name: 'name', size: -1, type: 'string', log: 2},
		],
	},
	
	0x0915: {
		name: 'actor_exists', 
		length: -1, 
		log: 2,
		data: [
			{name: 'len', size: 2, type: 'int', log: 2},
			{name: 'object_type', size: 1, type: 'int', log: 1},
			{name: 'ID', size: 4, type: 'int', log: 2},
			{name: 'walk_speed', size: 2, type: 'int', log: 1},
			{name: 'opt1', size: 2, type: 'int', log: 0},
			{name: 'opt2', size: 2, type: 'int', log: 0},
			{name: 'option', size: 4, type: 'int', log: 0},
			{name: 'type', size: 2, type: 'int', log: 0},
			{name: 'hair_style', size: 2, type: 'int', log: 0},
			{name: 'weapon', size: 2, type: 'int', log: 0},
			{name: 'shield', size: 2, type: 'int', log: 0},
			{name: 'lowhead', size: 2, type: 'int', log: 0},
			{name: 'tophead', size: 2, type: 'int', log: 0},
			{name: 'midhead', size: 2, type: 'int', log: 0},
			{name: 'hair_color', size: 2, type: 'int', log: 0},
			{name: 'clothes_color', size: 2, type: 'int', log: 0},
			{name: 'head_dir', size: 2, type: 'int', log: 0},
			{name: 'costume', size: 2, type: 'int', log: 0},
			{name: 'guildId', size: 4, type: 'int', log: 1},
			{name: 'emblemId', size: 2, type: 'int', log: 0},
			{name: 'manner', size: 2, type: 'int', log: 0},
			{name: 'opt3', size: 4, type: 'int', log: 0},
			{name: 'stance', size: 1, type: 'int', log: 0},
			{name: 'sex', size: 1, type: 'int', log: 0},
			{name: 'coords', size: 3, type: 'byte', log: 1},
			{name: 'xSize', size: 1, type: 'int', log: 0},
			{name: 'ySize', size: 1, type: 'int', log: 0},
			{name: 'act', size: 1, type: 'int', log: 2},
			{name: 'lv', size: 2, type: 'int', log: 2},
			{name: 'font', size: 2, type: 'int', log: 0},
			{name: 'opt4', size: 9, type: 'byte', log: 0},
			{name: 'name', size: -1, type: 'string', log: 2},
		],
	},

};
