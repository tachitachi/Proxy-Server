'use strict';

define(function(require){

	var bufutil = require('../bufutil');

	var RECV = {
		0x0064: {
			name: 'unknown_packet_0064', 
			length: 55, 
			log: 2,
			data: [
				{name: 'data', size: 53, type: 'byte', log: 1},
			],
		},
		0x0065: {
			name: 'unknown_packet_0065', 
			length: 17, 
			log: 2,
			data: [
				{name: 'data', size: 15, type: 'byte', log: 1},
			],
		},
		0x0066: {
			name: 'unknown_packet_0066', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x0067: {
			name: 'unknown_packet_0067', 
			length: 37, 
			log: 2,
			data: [
				{name: 'data', size: 35, type: 'byte', log: 1},
			],
		},
		0x0068: {
			name: 'unknown_packet_0068', 
			length: 46, 
			log: 2,
			data: [
				{name: 'data', size: 44, type: 'byte', log: 1},
			],
		},
		0x0069: {
			name: 'unknown_packet_0069', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x006a: {
			name: 'unknown_packet_006a', 
			length: 23, 
			log: 2,
			data: [
				{name: 'data', size: 21, type: 'byte', log: 1},
			],
		},
		0x006b: {
			name: 'unknown_packet_006b', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x006c: {
			name: 'unknown_packet_006c', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x006d: {
			name: 'unknown_packet_006d', 
			length: 118, 
			log: 2,
			data: [
				{name: 'data', size: 116, type: 'byte', log: 1},
			],
		},
		0x006e: {
			name: 'unknown_packet_006e', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x006f: {
			name: 'unknown_packet_006f', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0070: {
			name: 'unknown_packet_0070', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x0071: {
			name: 'received_character_ID_and_Map', 
			length: 28, 
			log: 2,
			data: [
				{name: 'charId', size: 4, type: 'int', log: 1},
				{name: 'mapName', size: 16, type: 'string', log: 1},
				{name: 'IP', size: 4, type: 'byte', log: 1},
				{name: 'port', size: 4, type: 'int', log: 1},
			],
		},
		0x0072: {
			name: 'unknown_packet_0072', 
			length: 19, 
			log: 2,
			data: [
				{name: 'data', size: 17, type: 'byte', log: 1},
			],
		},
		0x0073: {
			name: 'unknown_packet_0073', 
			length: 11, 
			log: 2,
			data: [
				{name: 'data', size: 9, type: 'byte', log: 1},
			],
		},
		0x0074: {
			name: 'unknown_packet_0074', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x0075: {
			name: 'unknown_packet_0075', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0076: {
			name: 'unknown_packet_0076', 
			length: 9, 
			log: 2,
			data: [
				{name: 'data', size: 7, type: 'byte', log: 1},
			],
		},
		0x0077: {
			name: 'unknown_packet_0077', 
			length: 5, 
			log: 2,
			data: [
				{name: 'data', size: 3, type: 'byte', log: 1},
			],
		},
		0x0078: {
			name: 'unknown_packet_0078', 
			length: 55, 
			log: 2,
			data: [
				{name: 'data', size: 53, type: 'byte', log: 1},
			],
		},
		0x0079: {
			name: 'unknown_packet_0079', 
			length: 53, 
			log: 2,
			data: [
				{name: 'data', size: 51, type: 'byte', log: 1},
			],
		},
		0x007a: {
			name: 'unknown_packet_007a', 
			length: 58, 
			log: 2,
			data: [
				{name: 'data', size: 56, type: 'byte', log: 1},
			],
		},
		0x007b: {
			name: 'unknown_packet_007b', 
			length: 60, 
			log: 2,
			data: [
				{name: 'data', size: 58, type: 'byte', log: 1},
			],
		},
		0x007c: {
			name: 'unknown_packet_007c', 
			length: 44, 
			log: 2,
			data: [
				{name: 'data', size: 42, type: 'byte', log: 1},
			],
		},
		0x007d: {
			name: 'unknown_packet_007d', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x007e: {
			name: 'unknown_packet_007e', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x007f: {
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
		0x0081: {
			name: 'unknown_packet_0081', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x0082: {
			name: 'unknown_packet_0082', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0083: {
			name: 'unknown_packet_0083', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0084: {
			name: 'unknown_packet_0084', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0085: {
			name: 'unknown_packet_0085', 
			length: 5, 
			log: 2,
			data: [
				{name: 'data', size: 3, type: 'byte', log: 1},
			],
		},
		0x0086: {
			name: 'unknown_packet_0086', 
			length: 16, 
			log: 2,
			data: [
				{name: 'data', size: 14, type: 'byte', log: 1},
			],
		},
		0x0087: {
			name: 'character_moves', 
			length: 12, 
			log: 1,
			data: [
				{name: 'move_start_time', size: 4, type: 'int', log: 1},
				{name: 'coords', size: 6, type: 'coordpair', log: 2},
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
		0x0089: {
			name: 'unknown_packet_0089', 
			length: 7, 
			log: 2,
			data: [
				{name: 'data', size: 5, type: 'byte', log: 1},
			],
		},
		0x008a: {
			name: 'actor_action_008a', 
			length: 29, 
			log: 2,
			data: [
				{name: 'sourceId', size: 4, type: 'int', log: 1},
				{name: 'targetId', size: 4, type: 'int', log: 1},
				{name: 'tick', size: 4, type: 'int', log: 1},
				{name: 'src_speed', size: 4, type: 'int', log: 1},
				{name: 'dst_speed', size: 4, type: 'int', log: 1},
				{name: 'damage', size: 2, type: 'int', log: 1},
				{name: 'div', size: 2, type: 'int', log: 1},
				{name: 'type', size: 1, type: 'int', log: 1},
				{name: 'dual_wield_damage', size: 2, type: 'int', log: 1},
			],
		},
		0x008b: {
			name: 'unknown_packet_008b', 
			length: 23, 
			log: 2,
			data: [
				{name: 'data', size: 21, type: 'byte', log: 1},
			],
		},
		0x008c: {
			name: 'unknown_packet_008c', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x008d: {
			name: 'public_chat', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'ID', size: 4, type: 'int', log: 2},
				{name: 'message', size: -1, type: 'string', log: 2},
			],
		},
		0x008e: {
			name: 'self_chat', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'message', size: -1, type: 'string', log: 1},
			],
		},
		0x0090: {
			name: 'unknown_packet_0090', 
			length: 7, 
			log: 2,
			data: [
				{name: 'data', size: 5, type: 'byte', log: 1},
			],
		},
		0x0091: {
			name: 'map_change', 
			length: 22, 
			log: 2,
			data: [
				{name: 'map', size: 16, type: 'string', log: 2},
				{name: 'x', size: 2, type: 'int', log: 2},
				{name: 'y', size: 2, type: 'int', log: 2},
			],
		},
		0x0092: {
			name: 'map_changed', 
			length: 28, 
			log: 2,
			data: [
				{name: 'map', size: 16, type: 'string', log: 2},
				{name: 'x', size: 2, type: 'int', log: 2},
				{name: 'y', size: 2, type: 'int', log: 2},
				{name: 'IP', size: 4, type: 'byte', log: 2},
				{name: 'port', size: 2, type: 'int', log: 2},
			],
		},
		0x0093: {
			name: 'unknown_packet_0093', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0094: {
			name: 'unknown_packet_0094', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
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
		0x0096: {
			name: 'unknown_packet_0096', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0097: {
			name: 'private_message', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'privMsgUser', size: 24, type: 'string', log: 2},
				{name: 'message', size: -1, type: 'string', log: 2},
			],
		},
		0x0098: {
			name: 'private_message_sent', 
			length: 3, 
			log: 2,
			data: [
				{name: 'type', size: 1, type: 'int', log: 1},
			],
		},
		0x0099: {
			name: 'unknown_packet_0099', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x009a: {
			name: 'system_chat', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'message', size: -1, type: 'string', log: 1},
			],
		},
		0x009b: {
			name: 'unknown_packet_009b', 
			length: 5, 
			log: 2,
			data: [
				{name: 'data', size: 3, type: 'byte', log: 1},
			],
		},
		0x009c: {
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
		0x009f: {
			name: 'unknown_packet_009f', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x00a0: {
			name: 'unknown_packet_00a0', 
			length: 23, 
			log: 2,
			data: [
				{name: 'data', size: 21, type: 'byte', log: 1},
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
		0x00a2: {
			name: 'unknown_packet_00a2', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x00a3: {
			name: 'unknown_packet_00a3', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x00a4: {
			name: 'unknown_packet_00a4', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x00a5: {
			name: 'unknown_packet_00a5', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x00a6: {
			name: 'unknown_packet_00a6', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x00a7: {
			name: 'unknown_packet_00a7', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x00a8: {
			name: 'unknown_packet_00a8', 
			length: 7, 
			log: 2,
			data: [
				{name: 'data', size: 5, type: 'byte', log: 1},
			],
		},
		0x00a9: {
			name: 'unknown_packet_00a9', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x00aa: {
			name: 'unknown_packet_00aa', 
			length: 9, 
			log: 2,
			data: [
				{name: 'data', size: 7, type: 'byte', log: 1},
			],
		},
		0x00ab: {
			name: 'unknown_packet_00ab', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x00ac: {
			name: 'unknown_packet_00ac', 
			length: 7, 
			log: 2,
			data: [
				{name: 'data', size: 5, type: 'byte', log: 1},
			],
		},
		0x00ae: {
			name: 'unknown_packet_00ae', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x00af: {
			name: 'inventory_item_removed', 
			length: 6, 
			log: 2,
			data: [
				{name: 'index', size: 2, type: 'int', log: 2},
				{name: 'amount', size: 2, type: 'int', log: 2},
			],
		},
		0x00b0: {
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
		0x00b2: {
			name: 'unknown_packet_00b2', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x00b3: {
			name: 'switch_character', 
			length: 3, 
			log: 2,
			data: [
				{name: 'result', size: 1, type: 'int', log: 2},
			],
		},
		0x00b4: {
			name: 'npc_talk', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'ID', size: 4, type: 'int', log: 2},
				{name: 'message', size: -1, type: 'string', log: 2},
			],
		},
		0x00b5: {
			name: 'npc_talk_continue', 
			length: 6, 
			log: 2,
			data: [
				{name: 'ID', size: 4, type: 'int', log: 2},
			],
		},
		0x00b6: {
			name: 'npc_talk_close', 
			length: 6, 
			log: 2,
			data: [
				{name: 'ID', size: 4, type: 'int', log: 2},
			],
		},
		0x00b7: {
			name: 'npc_talk_responses', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 2},
			],
		},
		0x00b8: {
			name: 'unknown_packet_00b8', 
			length: 7, 
			log: 2,
			data: [
				{name: 'data', size: 5, type: 'byte', log: 1},
			],
		},
		0x00b9: {
			name: 'unknown_packet_00b9', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x00ba: {
			name: 'unknown_packet_00ba', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x00bb: {
			name: 'unknown_packet_00bb', 
			length: 5, 
			log: 2,
			data: [
				{name: 'data', size: 3, type: 'byte', log: 1},
			],
		},
		0x00bc: {
			name: 'unknown_packet_00bc', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x00bd: {
			name: 'stat_info4', 
			length: 44, 
			log: 2,
			data: [
				{name: 'points_free', size: 2, type: 'int', log: 1},
				{name: 'str', size: 1, type: 'int', log: 1},
				{name: 'points_str', size: 1, type: 'int', log: 1},
				{name: 'agi', size: 1, type: 'int', log: 1},
				{name: 'points_agi', size: 1, type: 'int', log: 1},
				{name: 'vit', size: 1, type: 'int', log: 1},
				{name: 'points_vit', size: 1, type: 'int', log: 1},
				{name: 'int', size: 1, type: 'int', log: 1},
				{name: 'points_int', size: 1, type: 'int', log: 1},
				{name: 'dex', size: 1, type: 'int', log: 1},
				{name: 'points_dex', size: 1, type: 'int', log: 1},
				{name: 'luk', size: 1, type: 'int', log: 1},
				{name: 'points_luk', size: 1, type: 'int', log: 1},
				{name: 'attack', size: 2, type: 'int', log: 1},
				{name: 'attack_bonus', size: 2, type: 'int', log: 1},
				{name: 'attack_magic_min', size: 2, type: 'int', log: 1},
				{name: 'attack_magic_max', size: 2, type: 'int', log: 1},
				{name: 'def', size: 2, type: 'int', log: 1},
				{name: 'def_bonus', size: 2, type: 'int', log: 1},
				{name: 'def_magic', size: 2, type: 'int', log: 1},
				{name: 'def_magic_bonus', size: 2, type: 'int', log: 1},
				{name: 'hit', size: 2, type: 'int', log: 1},
				{name: 'flee', size: 2, type: 'int', log: 1},
				{name: 'flee_bonus', size: 2, type: 'int', log: 1},
				{name: 'critical', size: 2, type: 'int', log: 1},
				{name: 'stance', size: 2, type: 'int', log: 1},
				{name: 'manner', size: 2, type: 'int', log: 1},
			],
		},
		0x00be: {
			name: 'unknown_packet_00be', 
			length: 5, 
			log: 2,
			data: [
				{name: 'data', size: 3, type: 'byte', log: 1},
			],
		},
		0x00bf: {
			name: 'unknown_packet_00bf', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
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
		0x00c1: {
			name: 'unknown_packet_00c1', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x00c2: {
			name: 'unknown_packet_00c2', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x00c3: {
			name: 'unknown_packet_00c3', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x00c4: {
			name: 'unknown_packet_00c4', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x00c5: {
			name: 'unknown_packet_00c5', 
			length: 7, 
			log: 2,
			data: [
				{name: 'data', size: 5, type: 'byte', log: 1},
			],
		},
		0x00c6: {
			name: 'unknown_packet_00c6', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x00c7: {
			name: 'unknown_packet_00c7', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x00c8: {
			name: 'unknown_packet_00c8', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x00c9: {
			name: 'unknown_packet_00c9', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x00ca: {
			name: 'unknown_packet_00ca', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x00cb: {
			name: 'unknown_packet_00cb', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x00cc: {
			name: 'unknown_packet_00cc', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x00cd: {
			name: 'unknown_packet_00cd', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x00ce: {
			name: 'unknown_packet_00ce', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x00cf: {
			name: 'unknown_packet_00cf', 
			length: 27, 
			log: 2,
			data: [
				{name: 'data', size: 25, type: 'byte', log: 1},
			],
		},
		0x00d0: {
			name: 'unknown_packet_00d0', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x00d1: {
			name: 'unknown_packet_00d1', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x00d2: {
			name: 'unknown_packet_00d2', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x00d3: {
			name: 'unknown_packet_00d3', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x00d4: {
			name: 'unknown_packet_00d4', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x00d5: {
			name: 'unknown_packet_00d5', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x00d6: {
			name: 'unknown_packet_00d6', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x00d7: {
			name: 'chat_info', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'ID', size: 4, type: 'int', log: 2},
				{name: 'chatId', size: 4, type: 'int', log: 2},
				{name: 'limit', size: 2, type: 'int', log: 2},
				{name: 'num_users', size: 2, type: 'int', log: 2},
				{name: 'public', size: 1, type: 'int', log: 2},
				{name: 'title', size: -1, type: 'string', log: 2},
			],
		},
		0x00d8: {
			name: 'chat_room_destroy', 
			length: 6, 
			log: 2,
			data: [
				{name: 'chatId', size: 4, type: 'int', log: 1},
			],
		},
		0x00d9: {
			name: 'unknown_packet_00d9', 
			length: 14, 
			log: 2,
			data: [
				{name: 'data', size: 12, type: 'byte', log: 1},
			],
		},
		0x00da: {
			name: 'unknown_packet_00da', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x00db: {
			name: 'unknown_packet_00db', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x00dc: {
			name: 'unknown_packet_00dc', 
			length: 28, 
			log: 2,
			data: [
				{name: 'data', size: 26, type: 'byte', log: 1},
			],
		},
		0x00dd: {
			name: 'unknown_packet_00dd', 
			length: 29, 
			log: 2,
			data: [
				{name: 'data', size: 27, type: 'byte', log: 1},
			],
		},
		0x00de: {
			name: 'unknown_packet_00de', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x00df: {
			name: 'unknown_packet_00df', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x00e0: {
			name: 'unknown_packet_00e0', 
			length: 30, 
			log: 2,
			data: [
				{name: 'data', size: 28, type: 'byte', log: 1},
			],
		},
		0x00e1: {
			name: 'unknown_packet_00e1', 
			length: 30, 
			log: 2,
			data: [
				{name: 'data', size: 28, type: 'byte', log: 1},
			],
		},
		0x00e2: {
			name: 'unknown_packet_00e2', 
			length: 26, 
			log: 2,
			data: [
				{name: 'data', size: 24, type: 'byte', log: 1},
			],
		},
		0x00e3: {
			name: 'unknown_packet_00e3', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x00e4: {
			name: 'unknown_packet_00e4', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x00e5: {
			name: 'unknown_packet_00e5', 
			length: 26, 
			log: 2,
			data: [
				{name: 'data', size: 24, type: 'byte', log: 1},
			],
		},
		0x00e6: {
			name: 'unknown_packet_00e6', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x00e7: {
			name: 'unknown_packet_00e7', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x00e8: {
			name: 'unknown_packet_00e8', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x00e9: {
			name: 'unknown_packet_00e9', 
			length: 19, 
			log: 2,
			data: [
				{name: 'data', size: 17, type: 'byte', log: 1},
			],
		},
		0x00ea: {
			name: 'unknown_packet_00ea', 
			length: 5, 
			log: 2,
			data: [
				{name: 'data', size: 3, type: 'byte', log: 1},
			],
		},
		0x00eb: {
			name: 'unknown_packet_00eb', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x00ec: {
			name: 'unknown_packet_00ec', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x00ed: {
			name: 'unknown_packet_00ed', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x00ee: {
			name: 'unknown_packet_00ee', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x00ef: {
			name: 'unknown_packet_00ef', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x00f0: {
			name: 'unknown_packet_00f0', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x00f1: {
			name: 'unknown_packet_00f1', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x00f2: {
			name: 'storage_opened', 
			length: 6, 
			log: 2,
			data: [
				{name: 'items', size: 2, type: 'int', log: 2},
				{name: 'items_max', size: 2, type: 'int', log: 2},
			],
		},
		0x00f3: {
			name: 'unknown_packet_00f3', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x00f4: {
			name: 'unknown_packet_00f4', 
			length: 21, 
			log: 2,
			data: [
				{name: 'data', size: 19, type: 'byte', log: 1},
			],
		},
		0x00f5: {
			name: 'unknown_packet_00f5', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x00f6: {
			name: 'storage_item_removed', 
			length: 8, 
			log: 2,
			data: [
				{name: 'index', size: 2, type: 'int', log: 2},
				{name: 'amount', size: 4, type: 'int', log: 2},
			],
		},
		0x00f7: {
			name: 'unknown_packet_00f7', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x00f8: {
			name: 'storage_closed', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x00f9: {
			name: 'unknown_packet_00f9', 
			length: 26, 
			log: 2,
			data: [
				{name: 'data', size: 24, type: 'byte', log: 1},
			],
		},
		0x00fa: {
			name: 'unknown_packet_00fa', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x00fb: {
			name: 'party_users_info', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 2},
			],
		},
		0x00fc: {
			name: 'unknown_packet_00fc', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x00fd: {
			name: 'unknown_packet_00fd', 
			length: 27, 
			log: 2,
			data: [
				{name: 'data', size: 25, type: 'byte', log: 1},
			],
		},
		0x00fe: {
			name: 'unknown_packet_00fe', 
			length: 30, 
			log: 2,
			data: [
				{name: 'data', size: 28, type: 'byte', log: 1},
			],
		},
		0x00ff: {
			name: 'unknown_packet_00ff', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x0100: {
			name: 'unknown_packet_0100', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0101: {
			name: 'party_exp', 
			length: 6, 
			log: 2,
			data: [
				{name: 'type', size: 2, type: 'int', log: 2},
				{name: 'data', size: 2, type: 'byte', log: 2},
			],
		},
		0x0102: {
			name: 'unknown_packet_0102', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0103: {
			name: 'unknown_packet_0103', 
			length: 30, 
			log: 2,
			data: [
				{name: 'data', size: 28, type: 'byte', log: 1},
			],
		},
		0x0104: {
			name: 'unknown_packet_0104', 
			length: 79, 
			log: 2,
			data: [
				{name: 'data', size: 77, type: 'byte', log: 1},
			],
		},
		0x0105: {
			name: 'unknown_packet_0105', 
			length: 31, 
			log: 2,
			data: [
				{name: 'data', size: 29, type: 'byte', log: 1},
			],
		},
		0x0106: {
			name: 'unknown_packet_0106', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x0107: {
			name: 'party_coords', 
			length: 10, 
			log: 2,
			data: [
				{name: 'ID', size: 4, type: 'int', log: 1},
				{name: 'x', size: 2, type: 'int', log: 1},
				{name: 'y', size: 2, type: 'int', log: 1},
			],
		},
		0x0108: {
			name: 'unknown_packet_0108', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0109: {
			name: 'unknown_packet_0109', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x010a: {
			name: 'unknown_packet_010a', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x010b: {
			name: 'unknown_packet_010b', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x010c: {
			name: 'MVP', 
			length: 6, 
			log: 2,
			data: [
				{name: 'ID', size: 4, type: 'int', log: 1},
			],
		},
		0x010d: {
			name: 'unknown_packet_010d', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x010e: {
			name: 'unknown_packet_010e', 
			length: 11, 
			log: 2,
			data: [
				{name: 'data', size: 9, type: 'byte', log: 1},
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
		0x0111: {
			name: 'unknown_packet_0111', 
			length: 39, 
			log: 2,
			data: [
				{name: 'data', size: 37, type: 'byte', log: 1},
			],
		},
		0x0112: {
			name: 'unknown_packet_0112', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x0113: {
			name: 'unknown_packet_0113', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x0114: {
			name: 'unknown_packet_0114', 
			length: 31, 
			log: 2,
			data: [
				{name: 'data', size: 29, type: 'byte', log: 1},
			],
		},
		0x0115: {
			name: 'unknown_packet_0115', 
			length: 35, 
			log: 2,
			data: [
				{name: 'data', size: 33, type: 'byte', log: 1},
			],
		},
		0x0116: {
			name: 'unknown_packet_0116', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x0117: {
			name: 'skill_use_location', 
			length: 18, 
			log: 2,
			data: [
				{name: 'skillId', size: 2, type: 'int', log: 2},
				{name: 'sourceId', size: 4, type: 'int', log: 2},
				{name: 'lv', size: 2, type: 'int', log: 2},
				{name: 'x', size: 2, type: 'int', log: 2},
				{name: 'y', size: 2, type: 'int', log: 2},
				{name: 'tick', size: 4, type: 'int', log: 1},
			],
		},
		0x0118: {
			name: 'unknown_packet_0118', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0119: {
			name: 'unknown_packet_0119', 
			length: 13, 
			log: 2,
			data: [
				{name: 'data', size: 11, type: 'byte', log: 1},
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
		0x011b: {
			name: 'unknown_packet_011b', 
			length: 20, 
			log: 2,
			data: [
				{name: 'data', size: 18, type: 'byte', log: 1},
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
		0x011d: {
			name: 'unknown_packet_011d', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x011e: {
			name: 'unknown_packet_011e', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x011f: {
			name: 'unknown_packet_011f', 
			length: 16, 
			log: 2,
			data: [
				{name: 'data', size: 14, type: 'byte', log: 1},
			],
		},
		0x0120: {
			name: 'area_spell_disappears', 
			length: 6, 
			log: 2,
			data: [
				{name: 'ID', size: 4, type: 'int', log: 2},
			],
		},
		0x0121: {
			name: 'cart_info', 
			length: 14, 
			log: 2,
			data: [
				{name: 'items', size: 2, type: 'int', log: 2},
				{name: 'items_max', size: 2, type: 'int', log: 2},
				{name: 'weight', size: 4, type: 'int', log: 2},
				{name: 'weight_max', size: 4, type: 'int', log: 2},
			],
		},
		0x0122: {
			name: 'unknown_packet_0122', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0123: {
			name: 'unknown_packet_0123', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0124: {
			name: 'unknown_packet_0124', 
			length: 21, 
			log: 2,
			data: [
				{name: 'data', size: 19, type: 'byte', log: 1},
			],
		},
		0x0125: {
			name: 'cart_item_removed', 
			length: 8, 
			log: 2,
			data: [
				{name: 'index', size: 2, type: 'int', log: 2},
				{name: 'amount', size: 4, type: 'int', log: 2},
			],
		},
		0x0126: {
			name: 'unknown_packet_0126', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x0127: {
			name: 'unknown_packet_0127', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x0128: {
			name: 'unknown_packet_0128', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x0129: {
			name: 'unknown_packet_0129', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x012a: {
			name: 'unknown_packet_012a', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x012b: {
			name: 'unknown_packet_012b', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x012c: {
			name: 'unknown_packet_012c', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x012d: {
			name: 'unknown_packet_012d', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x012e: {
			name: 'unknown_packet_012e', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x012f: {
			name: 'unknown_packet_012f', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0130: {
			name: 'unknown_packet_0130', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
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
		0x0132: {
			name: 'vender_lost', 
			length: 6, 
			log: 2,
			data: [
				{name: 'ID', size: 4, type: 'int', log: 2},
			],
		},
		0x0133: {
			name: 'unknown_packet_0133', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0134: {
			name: 'unknown_packet_0134', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0135: {
			name: 'unknown_packet_0135', 
			length: 7, 
			log: 2,
			data: [
				{name: 'data', size: 5, type: 'byte', log: 1},
			],
		},
		0x0136: {
			name: 'unknown_packet_0136', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0137: {
			name: 'unknown_packet_0137', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0138: {
			name: 'unknown_packet_0138', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
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
		0x013a: {
			name: 'attack_range', 
			length: 4, 
			log: 2,
			data: [
				{name: 'type', size: 2, type: 'int', log: 1},
			],
		},
		0x013b: {
			name: 'unknown_packet_013b', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x013c: {
			name: 'arrow_equipped', 
			length: 4, 
			log: 2,
			data: [
				{name: 'index', size: 2, type: 'int', log: 2},
			],
		},
		0x013d: {
			name: 'unknown_packet_013d', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x013e: {
			name: 'skill_cast_013e', 
			length: 24, 
			log: 2,
			data: [
				{name: 'sourceId', size: 4, type: 'int', log: 2},
				{name: 'targetId', size: 4, type: 'int', log: 2},
				{name: 'x', size: 2, type: 'int', log: 2},
				{name: 'y', size: 2, type: 'int', log: 2},
				{name: 'skillId', size: 2, type: 'int', log: 2},
				{name: 'unknown', size: 2, type: 'byte', log: 2},
				{name: 'type', size: 2, type: 'int', log: 2},
				{name: 'wait', size: 4, type: 'int', log: 2},
			],
		},
		0x013f: {
			name: 'unknown_packet_013f', 
			length: 26, 
			log: 2,
			data: [
				{name: 'data', size: 24, type: 'byte', log: 1},
			],
		},
		0x0140: {
			name: 'unknown_packet_0140', 
			length: 22, 
			log: 2,
			data: [
				{name: 'data', size: 20, type: 'byte', log: 1},
			],
		},
		0x0141: {
			name: 'stat_info3', 
			length: 14, 
			log: 0,
			data: [
				{name: 'type', size: 4, type: 'int', log: 2},
				{name: 'val', size: 4, type: 'int', log: 2},
				{name: 'val2', size: 4, type: 'long', log: 2},
			],
		},
		0x0142: {
			name: 'unknown_packet_0142', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0143: {
			name: 'unknown_packet_0143', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x0144: {
			name: 'unknown_packet_0144', 
			length: 23, 
			log: 2,
			data: [
				{name: 'data', size: 21, type: 'byte', log: 1},
			],
		},
		0x0145: {
			name: 'unknown_packet_0145', 
			length: 19, 
			log: 2,
			data: [
				{name: 'data', size: 17, type: 'byte', log: 1},
			],
		},
		0x0146: {
			name: 'unknown_packet_0146', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0147: {
			name: 'auto_skill', 
			length: 39, 
			log: 2,
			data: [
				{name: 'skillId', size: 2, type: 'int', log: 1},
				{name: 'inf', size: 2, type: 'int', log: 1},
				{name: 'unused1', size: 2, type: 'int', log: 1},
				{name: 'lv', size: 2, type: 'int', log: 1},
				{name: 'sp', size: 2, type: 'int', log: 1},
				{name: 'range', size: 2, type: 'int', log: 1},
				{name: 'name', size: 24, type: 'string', log: 1},
				{name: 'unused2', size: 1, type: 'int', log: 1},
			],
		},
		0x0148: {
			name: 'unknown_packet_0148', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x0149: {
			name: 'unknown_packet_0149', 
			length: 9, 
			log: 2,
			data: [
				{name: 'data', size: 7, type: 'byte', log: 1},
			],
		},
		0x014a: {
			name: 'unknown_packet_014a', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x014b: {
			name: 'unknown_packet_014b', 
			length: 27, 
			log: 2,
			data: [
				{name: 'data', size: 25, type: 'byte', log: 1},
			],
		},
		0x014c: {
			name: 'guild_allies_enemies_list', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'guildInfo', size: -1, type: 'array', log: 2, struct: {
						size: 32,
						data: [
							{name: 'type', size: 4, type: 'int', log: 1},
							{name: 'guildId', size: 4, type: 'int', log: 2},
							{name: 'name', size: 24, type: 'string', log: 1},
						]
					}
				}, //(index itemId type amount wear_state card1 card2 card3 card4 expiration flags)(v v C v a4 v4 V C)
			],
		},
		0x014d: {
			name: 'unknown_packet_014d', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x014e: {
			name: 'unknown_packet_014e', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x014f: {
			name: 'unknown_packet_014f', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0150: {
			name: 'unknown_packet_0150', 
			length: 110, 
			log: 2,
			data: [
				{name: 'data', size: 108, type: 'byte', log: 1},
			],
		},
		0x0151: {
			name: 'unknown_packet_0151', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
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
		0x0153: {
			name: 'unknown_packet_0153', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0154: {
			name: 'unknown_packet_0154', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0155: {
			name: 'unknown_packet_0155', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0156: {
			name: 'unknown_packet_0156', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0157: {
			name: 'unknown_packet_0157', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0159: {
			name: 'unknown_packet_0159', 
			length: 54, 
			log: 2,
			data: [
				{name: 'data', size: 52, type: 'byte', log: 1},
			],
		},
		0x015a: {
			name: 'unknown_packet_015a', 
			length: 66, 
			log: 2,
			data: [
				{name: 'data', size: 64, type: 'byte', log: 1},
			],
		},
		0x015b: {
			name: 'unknown_packet_015b', 
			length: 54, 
			log: 2,
			data: [
				{name: 'data', size: 52, type: 'byte', log: 1},
			],
		},
		0x015c: {
			name: 'guild_expulsion', 
			length: 90, 
			log: 2,
			data: [
				{name: 'name', size: 24, type: 'string', log: 2},
				{name: 'message', size: 40, type: 'string', log: 2},
				{name: 'account', size: 24, type: 'string', log: 2},
			],
		},
		0x015d: {
			name: 'unknown_packet_015d', 
			length: 42, 
			log: 2,
			data: [
				{name: 'data', size: 40, type: 'byte', log: 1},
			],
		},
		0x015e: {
			name: 'unknown_packet_015e', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x015f: {
			name: 'unknown_packet_015f', 
			length: 42, 
			log: 2,
			data: [
				{name: 'data', size: 40, type: 'byte', log: 1},
			],
		},
		0x0160: {
			name: 'unknown_packet_0160', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0161: {
			name: 'unknown_packet_0161', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0162: {
			name: 'unknown_packet_0162', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0163: {
			name: 'guild_explusion_list', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'kickInfo', size: -1, type: 'array', log: 2, struct: {
						size: 88,
						data: [
							{name: 'name', size: 24, type: 'string', log: 2},
							{name: 'account', size: 24, type: 'string', log: 2},
							{name: 'message', size: 40, type: 'string', log: 2},
						]
					}
				}, //(index itemId type amount wear_state card1 card2 card3 card4 expiration flags)(v v C v a4 v4 V C)
			],
		},
		0x0164: {
			name: 'unknown_packet_0164', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0165: {
			name: 'unknown_packet_0165', 
			length: 30, 
			log: 2,
			data: [
				{name: 'data', size: 28, type: 'byte', log: 1},
			],
		},
		0x0166: {
			name: 'unknown_packet_0166', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0167: {
			name: 'unknown_packet_0167', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x0168: {
			name: 'unknown_packet_0168', 
			length: 14, 
			log: 2,
			data: [
				{name: 'data', size: 12, type: 'byte', log: 1},
			],
		},
		0x0169: {
			name: 'unknown_packet_0169', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x016a: {
			name: 'unknown_packet_016a', 
			length: 30, 
			log: 2,
			data: [
				{name: 'data', size: 28, type: 'byte', log: 1},
			],
		},
		0x016b: {
			name: 'unknown_packet_016b', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x016c: {
			name: 'guild_name', 
			length: 43, 
			log: 2,
			data: [
				{name: 'guildId', size: 4, type: 'int', log: 2},
				{name: 'emblemId', size: 4, type: 'int', log: 1},
				{name: 'mode', size: 4, type: 'int', log: 1},
				{name: 'unknown', size: 5, type: 'byte', log: 1},
				{name: 'guildName', size: 24, type: 'string', log: 2},
			],
		},
		0x016d: {
			name: 'unknown_packet_016d', 
			length: 14, 
			log: 2,
			data: [
				{name: 'data', size: 12, type: 'byte', log: 1},
			],
		},
		0x016e: {
			name: 'unknown_packet_016e', 
			length: 186, 
			log: 2,
			data: [
				{name: 'data', size: 184, type: 'byte', log: 1},
			],
		},
		0x016f: {
			name: 'guild_notice', 
			length: 182, 
			log: 2,
			data: [
				{name: 'message', size: 180, type: 'string', log: 2},
			],
		},
		0x0170: {
			name: 'unknown_packet_0170', 
			length: 14, 
			log: 2,
			data: [
				{name: 'data', size: 12, type: 'byte', log: 1},
			],
		},
		0x0171: {
			name: 'unknown_packet_0171', 
			length: 30, 
			log: 2,
			data: [
				{name: 'data', size: 28, type: 'byte', log: 1},
			],
		},
		0x0172: {
			name: 'unknown_packet_0172', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x0173: {
			name: 'unknown_packet_0173', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x0174: {
			name: 'unknown_packet_0174', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0175: {
			name: 'unknown_packet_0175', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0176: {
			name: 'unknown_packet_0176', 
			length: 106, 
			log: 2,
			data: [
				{name: 'data', size: 104, type: 'byte', log: 1},
			],
		},
		0x0177: {
			name: 'unknown_packet_0177', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0178: {
			name: 'unknown_packet_0178', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x0179: {
			name: 'unknown_packet_0179', 
			length: 5, 
			log: 2,
			data: [
				{name: 'data', size: 3, type: 'byte', log: 1},
			],
		},
		0x017a: {
			name: 'unknown_packet_017a', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x017b: {
			name: 'unknown_packet_017b', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x017c: {
			name: 'unknown_packet_017c', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x017d: {
			name: 'unknown_packet_017d', 
			length: 7, 
			log: 2,
			data: [
				{name: 'data', size: 5, type: 'byte', log: 1},
			],
		},
		0x017e: {
			name: 'unknown_packet_017e', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x017f: {
			name: 'guild_chat', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'message', size: -1, type: 'string', log: 1},
			],
		},
		0x0180: {
			name: 'unknown_packet_0180', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0181: {
			name: 'unknown_packet_0181', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x0182: {
			name: 'unknown_packet_0182', 
			length: 106, 
			log: 2,
			data: [
				{name: 'data', size: 104, type: 'byte', log: 1},
			],
		},
		0x0183: {
			name: 'unknown_packet_0183', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x0184: {
			name: 'guild_unally', 
			length: 10, 
			log: 2,
			data: [
				{name: 'guildId', size: 4, type: 'int', log: 1},
				{name: 'type', size: 4, type: 'int', log: 1},
			],
		},
		0x0185: {
			name: 'guild_alliance_set', 
			length: 34, 
			log: 2,
			data: [
				{name: 'type', size: 4, type: 'int', log: 1},
				{name: 'guildId', size: 4, type: 'int', log: 1},
				{name: 'name', size: 24, type: 'string', log: 1},
			],
		},
		0x0187: {
			name: 'unknown_packet_0187', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0188: {
			name: 'unknown_packet_0188', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x0189: {
			name: 'unknown_packet_0189', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x018a: {
			name: 'unknown_packet_018a', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x018b: {
			name: 'unknown_packet_018b', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x018c: {
			name: 'unknown_packet_018c', 
			length: 29, 
			log: 2,
			data: [
				{name: 'data', size: 27, type: 'byte', log: 1},
			],
		},
		0x018d: {
			name: 'unknown_packet_018d', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x018e: {
			name: 'unknown_packet_018e', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x018f: {
			name: 'unknown_packet_018f', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0190: {
			name: 'unknown_packet_0190', 
			length: 90, 
			log: 2,
			data: [
				{name: 'data', size: 88, type: 'byte', log: 1},
			],
		},
		0x0191: {
			name: 'unknown_packet_0191', 
			length: 86, 
			log: 2,
			data: [
				{name: 'data', size: 84, type: 'byte', log: 1},
			],
		},
		0x0192: {
			name: 'unknown_packet_0192', 
			length: 24, 
			log: 2,
			data: [
				{name: 'data', size: 22, type: 'byte', log: 1},
			],
		},
		0x0193: {
			name: 'unknown_packet_0193', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
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
			length: 102, 
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
			name: 'actor_status_active_0196', 
			length: 9, 
			log: 1,
			data: [
				{name: 'type', size: 2, type: 'int', log: 2},
				{name: 'ID', size: 4, type: 'int', log: 2},
				{name: 'flag', size: 1, type: 'int', log: 2},
			],
		},
		0x0197: {
			name: 'unknown_packet_0197', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x0198: {
			name: 'unknown_packet_0198', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x0199: {
			name: 'unknown_packet_0199', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x019a: {
			name: 'unknown_packet_019a', 
			length: 14, 
			log: 2,
			data: [
				{name: 'data', size: 12, type: 'byte', log: 1},
			],
		},
		0x019b: {
			name: 'unknown_packet_019b', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x019c: {
			name: 'unknown_packet_019c', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x019d: {
			name: 'unknown_packet_019d', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x019e: {
			name: 'unknown_packet_019e', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x019f: {
			name: 'unknown_packet_019f', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x01a0: {
			name: 'unknown_packet_01a0', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x01a1: {
			name: 'unknown_packet_01a1', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x01a2: {
			name: 'unknown_packet_01a2', 
			length: 37, 
			log: 2,
			data: [
				{name: 'data', size: 35, type: 'byte', log: 1},
			],
		},
		0x01a3: {
			name: 'unknown_packet_01a3', 
			length: 5, 
			log: 2,
			data: [
				{name: 'data', size: 3, type: 'byte', log: 1},
			],
		},
		0x01a4: {
			name: 'pet_data', 
			length: 11, 
			log: 2,
			data: [
				{name: 'type', size: 1, type: 'int', log: 1},
				{name: 'ID', size: 4, type: 'int', log: 1},
				{name: 'data', size: 4, type: 'int', log: 1},
			],
		},
		0x01a5: {
			name: 'unknown_packet_01a5', 
			length: 26, 
			log: 2,
			data: [
				{name: 'data', size: 24, type: 'byte', log: 1},
			],
		},
		0x01a6: {
			name: 'unknown_packet_01a6', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x01a7: {
			name: 'unknown_packet_01a7', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x01a8: {
			name: 'unknown_packet_01a8', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x01a9: {
			name: 'unknown_packet_01a9', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x01aa: {
			name: 'pet_emotion', 
			length: 10, 
			log: 2,
			data: [
				{name: 'ID', size: 4, type: 'string', log: 2},
				{name: 'type', size: 4, type: 'string', log: 2},
			],
		},
		0x01ab: {
			name: 'stat_info_01ab', 
			length: 12, 
			log: 2,
			data: [
				{name: 'ID', size: 4, type: 'int', log: 2},
				{name: 'type', size: 2, type: 'int', log: 2},
				{name: 'val', size: 4, type: 'int', log: 2},
			],
		},
		0x01ac: {
			name: 'unknown_packet_01ac', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x01ad: {
			name: 'unknown_packet_01ad', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x01ae: {
			name: 'unknown_packet_01ae', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x01af: {
			name: 'unknown_packet_01af', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x01b0: {
			name: 'unknown_packet_01b0', 
			length: 11, 
			log: 2,
			data: [
				{name: 'data', size: 9, type: 'byte', log: 1},
			],
		},
		0x01b1: {
			name: 'unknown_packet_01b1', 
			length: 7, 
			log: 2,
			data: [
				{name: 'data', size: 5, type: 'byte', log: 1},
			],
		},
		0x01b2: {
			name: 'unknown_packet_01b2', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x01b3: {
			name: 'npc_image', 
			length: 67, 
			log: 2,
			data: [
				{name: 'npc_image', size: 64, type: 'string', log: 2},
				{name: 'type', size: 1, type: 'int', log: 2},
			],
		},
		0x01b4: {
			name: 'unknown_packet_01b4', 
			length: 12, 
			log: 2,
			data: [
				{name: 'data', size: 10, type: 'byte', log: 1},
			],
		},
		0x01b5: {
			name: 'unknown_packet_01b5', 
			length: 18, 
			log: 2,
			data: [
				{name: 'data', size: 16, type: 'byte', log: 1},
			],
		},
		0x01b6: {
			name: 'unknown_packet_01b6', 
			length: 114, 
			log: 2,
			data: [
				{name: 'data', size: 112, type: 'byte', log: 1},
			],
		},
		0x01b7: {
			name: 'unknown_packet_01b7', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x01b8: {
			name: 'unknown_packet_01b8', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x01b9: {
			name: 'unknown_packet_01b9', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x01ba: {
			name: 'unknown_packet_01ba', 
			length: 26, 
			log: 2,
			data: [
				{name: 'data', size: 24, type: 'byte', log: 1},
			],
		},
		0x01bb: {
			name: 'unknown_packet_01bb', 
			length: 26, 
			log: 2,
			data: [
				{name: 'data', size: 24, type: 'byte', log: 1},
			],
		},
		0x01bc: {
			name: 'unknown_packet_01bc', 
			length: 26, 
			log: 2,
			data: [
				{name: 'data', size: 24, type: 'byte', log: 1},
			],
		},
		0x01bd: {
			name: 'unknown_packet_01bd', 
			length: 26, 
			log: 2,
			data: [
				{name: 'data', size: 24, type: 'byte', log: 1},
			],
		},
		0x01be: {
			name: 'unknown_packet_01be', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x01bf: {
			name: 'unknown_packet_01bf', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x01c0: {
			name: 'unknown_packet_01c0', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x01c1: {
			name: 'unknown_packet_01c1', 
			length: 14, 
			log: 2,
			data: [
				{name: 'data', size: 12, type: 'byte', log: 1},
			],
		},
		0x01c2: {
			name: 'unknown_packet_01c2', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x01c3: {
			name: 'unknown_packet_01c3', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x01c4: {
			name: 'storage_item_added', 
			length: 22, 
			log: 2,
			data: [
				{name: 'index', size: 2, type: 'int', log: 1},
				{name: 'amount', size: 4, type: 'int', log: 2},
				{name: 'itemId', size: 2, type: 'int', log: 2},
				{name: 'type', size: 1, type: 'int', log: 1},
				{name: 'identified', size: 1, type: 'int', log: 1},
				{name: 'broken', size: 1, type: 'int', log: 1},
				{name: 'upgrade', size: 1, type: 'int', log: 2},
				{name: 'cards', size: 8, type: 'byte', log: 2},
			],
		},
		0x01c5: {
			name: 'cart_item_added', 
			length: 22, 
			log: 2,
			data: [
				{name: 'index', size: 2, type: 'int', log: 2},
				{name: 'amount', size: 4, type: 'int', log: 2},
				{name: 'itemId', size: 2, type: 'int', log: 2},
				{name: 'type', size: 1, type: 'int', log: 0},
				{name: 'identified', size: 1, type: 'int', log: 0},
				{name: 'broken', size: 1, type: 'int', log: 0},
				{name: 'upgrade', size: 1, type: 'int', log: 2},
				{name: 'cards', size: 8, type: 'byte', log: 2},
			],
		},
		0x01c6: {
			name: 'unknown_packet_01c6', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x01c7: {
			name: 'unknown_packet_01c7', 
			length: 2, 
			log: 2,
			data: [
	  
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
		0x01c9: {
			name: 'unknown_packet_01c9', 
			length: 97, 
			log: 2,
			data: [
				{name: 'data', size: 95, type: 'byte', log: 1},
			],
		},
		0x01ca: {
			name: 'unknown_packet_01ca', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x01cb: {
			name: 'unknown_packet_01cb', 
			length: 9, 
			log: 2,
			data: [
				{name: 'data', size: 7, type: 'byte', log: 1},
			],
		},
		0x01cc: {
			name: 'unknown_packet_01cc', 
			length: 9, 
			log: 2,
			data: [
				{name: 'data', size: 7, type: 'byte', log: 1},
			],
		},
		0x01cd: {
			name: 'unknown_packet_01cd', 
			length: 30, 
			log: 2,
			data: [
				{name: 'data', size: 28, type: 'byte', log: 1},
			],
		},
		0x01ce: {
			name: 'unknown_packet_01ce', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x01cf: {
			name: 'skill_devotion_effect', 
			length: 28, 
			log: 2,
			data: [
				{name: 'ID', size: 4, type: 'int', log: 1},
				{name: 'targetId1', size: 4, type: 'int', log: 1},
				{name: 'targetId2', size: 4, type: 'int', log: 1},
				{name: 'targetId3', size: 4, type: 'int', log: 1},
				{name: 'targetId4', size: 4, type: 'int', log: 1},
				{name: 'targetId5', size: 4, type: 'int', log: 1},
				{name: 'range', size: 2, type: 'int', log: 1},
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
		0x01d1: {
			name: 'unknown_packet_01d1', 
			length: 14, 
			log: 2,
			data: [
				{name: 'data', size: 12, type: 'byte', log: 1},
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
		0x01d3: {
			name: 'unknown_packet_01d3', 
			length: 35, 
			log: 2,
			data: [
				{name: 'data', size: 33, type: 'byte', log: 1},
			],
		},
		0x01d4: {
			name: 'unknown_packet_01d4', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x01d5: {
			name: 'unknown_packet_01d5', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x01d6: {
			name: 'unknown_packet_01d6', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
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
		0x01d8: {
			name: 'unknown_packet_01d8', 
			length: 54, 
			log: 2,
			data: [
				{name: 'data', size: 52, type: 'byte', log: 1},
			],
		},
		0x01d9: {
			name: 'unknown_packet_01d9', 
			length: 53, 
			log: 2,
			data: [
				{name: 'data', size: 51, type: 'byte', log: 1},
			],
		},
		0x01da: {
			name: 'unknown_packet_01da', 
			length: 60, 
			log: 2,
			data: [
				{name: 'data', size: 58, type: 'byte', log: 1},
			],
		},
		0x01db: {
			name: 'unknown_packet_01db', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x01dc: {
			name: 'unknown_packet_01dc', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x01dd: {
			name: 'unknown_packet_01dd', 
			length: 47, 
			log: 2,
			data: [
				{name: 'data', size: 45, type: 'byte', log: 1},
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
		0x01df: {
			name: 'unknown_packet_01df', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x01e0: {
			name: 'unknown_packet_01e0', 
			length: 30, 
			log: 2,
			data: [
				{name: 'data', size: 28, type: 'byte', log: 1},
			],
		},
		0x01e1: {
			name: 'revolving_entity', 
			length: 8, 
			log: 2,
			data: [
				{name: 'ID', size: 4, type: 'int', log: 1},
				{name: 'entity', size: 2, type: 'int', log: 1},
			],
		},
		0x01e2: {
			name: 'unknown_packet_01e2', 
			length: 34, 
			log: 2,
			data: [
				{name: 'data', size: 32, type: 'byte', log: 1},
			],
		},
		0x01e3: {
			name: 'unknown_packet_01e3', 
			length: 14, 
			log: 2,
			data: [
				{name: 'data', size: 12, type: 'byte', log: 1},
			],
		},
		0x01e4: {
			name: 'unknown_packet_01e4', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x01e5: {
			name: 'unknown_packet_01e5', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x01e6: {
			name: 'unknown_packet_01e6', 
			length: 26, 
			log: 2,
			data: [
				{name: 'data', size: 24, type: 'byte', log: 1},
			],
		},
		0x01e7: {
			name: 'unknown_packet_01e7', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x01e8: {
			name: 'unknown_packet_01e8', 
			length: 28, 
			log: 2,
			data: [
				{name: 'data', size: 26, type: 'byte', log: 1},
			],
		},
		0x01e9: {
			name: 'party_join', 
			length: 81, 
			log: 2,
			data: [
				{name: 'ID', size: 4, type: 'int', log: 2},
				{name: 'role', size: 4, type: 'int', log: 1},
				{name: 'x', size: 2, type: 'int', log: 1},
				{name: 'y', size: 2, type: 'int', log: 1},
				{name: 'type', size: 1, type: 'int', log: 1},
				{name: 'name', size: 24, type: 'string', log: 2},
				{name: 'user', size: 24, type: 'string', log: 2},
				{name: 'map', size: 16, type: 'string', log: 2},
				{name: 'lv', size: 2, type: 'int', log: 1},
				{name: 'item_pickup', size: 1, type: 'int', log: 1},
				{name: 'item_share', size: 1, type: 'int', log: 1},
			],
		},
		0x01ea: {
			name: 'unknown_packet_01ea', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x01eb: {
			name: 'guild_coords', 
			length: 10, 
			log: 2,
			data: [
				{name: 'ID', size: 4, type: 'int', log: 1},
				{name: 'x', size: 2, type: 'int', log: 1},
				{name: 'y', size: 2, type: 'int', log: 1},
			],
		},
		0x01ec: {
			name: 'unknown_packet_01ec', 
			length: 26, 
			log: 2,
			data: [
				{name: 'data', size: 24, type: 'byte', log: 1},
			],
		},
		0x01ed: {
			name: 'unknown_packet_01ed', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x01ee: {
			name: 'unknown_packet_01ee', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x01ef: {
			name: 'unknown_packet_01ef', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x01f0: {
			name: 'unknown_packet_01f0', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x01f1: {
			name: 'unknown_packet_01f1', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x01f2: {
			name: 'guild_member_login', 
			length: 20, 
			log: 2,
			data: [
				{name: 'ID', size: 4, type: 'int', log: 1},
				{name: 'charId', size: 4, type: 'int', log: 1},
				{name: 'online', size: 4, type: 'int', log: 1},
				{name: 'sex', size: 2, type: 'int', log: 1},
				{name: 'hair', size: 2, type: 'int', log: 1},
				{name: 'hair_color', size: 2, type: 'int', log: 1},
			],
		},
		0x01f3: {
			name: 'special_effect', 
			length: 10, 
			log: 2,
			data: [
				{name: 'ID', size: 4, type: 'int', log: 1},
				{name: 'type', size: 4, type: 'int', log: 1},
			],
		},
		0x01f4: {
			name: 'unknown_packet_01f4', 
			length: 32, 
			log: 2,
			data: [
				{name: 'data', size: 30, type: 'byte', log: 1},
			],
		},
		0x01f5: {
			name: 'unknown_packet_01f5', 
			length: 9, 
			log: 2,
			data: [
				{name: 'data', size: 7, type: 'byte', log: 1},
			],
		},
		0x01f6: {
			name: 'unknown_packet_01f6', 
			length: 34, 
			log: 2,
			data: [
				{name: 'data', size: 32, type: 'byte', log: 1},
			],
		},
		0x01f7: {
			name: 'unknown_packet_01f7', 
			length: 14, 
			log: 2,
			data: [
				{name: 'data', size: 12, type: 'byte', log: 1},
			],
		},
		0x01f8: {
			name: 'unknown_packet_01f8', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x01f9: {
			name: 'unknown_packet_01f9', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x01fa: {
			name: 'unknown_packet_01fa', 
			length: 48, 
			log: 2,
			data: [
				{name: 'data', size: 46, type: 'byte', log: 1},
			],
		},
		0x01fb: {
			name: 'unknown_packet_01fb', 
			length: 56, 
			log: 2,
			data: [
				{name: 'data', size: 54, type: 'byte', log: 1},
			],
		},
		0x01fc: {
			name: 'unknown_packet_01fc', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x01fd: {
			name: 'unknown_packet_01fd', 
			length: 15, 
			log: 2,
			data: [
				{name: 'data', size: 13, type: 'byte', log: 1},
			],
		},
		0x01fe: {
			name: 'unknown_packet_01fe', 
			length: 5, 
			log: 2,
			data: [
				{name: 'data', size: 3, type: 'byte', log: 1},
			],
		},
		0x01ff: {
			name: 'being_slide', 
			length: 10, 
			log: 2,
			data: [
				{name: 'ID', size: 4, type: 'int', log: 1},
				{name: 'x', size: 2, type: 'int', log: 1},
				{name: 'y', size: 2, type: 'int', log: 1},
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x0200: {
			name: 'unknown_packet_0200', 
			length: 26, 
			log: 2,
			data: [
				{name: 'data', size: 24, type: 'byte', log: 1},
			],
		},
		0x0201: {
			name: 'friend_list', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 2},
			],
		},
		0x0202: {
			name: 'unknown_packet_0202', 
			length: 26, 
			log: 2,
			data: [
				{name: 'data', size: 24, type: 'byte', log: 1},
			],
		},
		0x0203: {
			name: 'unknown_packet_0203', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x0204: {
			name: 'unknown_packet_0204', 
			length: 18, 
			log: 2,
			data: [
				{name: 'data', size: 16, type: 'byte', log: 1},
			],
		},
		0x0205: {
			name: 'unknown_packet_0205', 
			length: 26, 
			log: 2,
			data: [
				{name: 'data', size: 24, type: 'byte', log: 1},
			],
		},
		0x0206: {
			name: 'unknown_packet_0206', 
			length: 11, 
			log: 2,
			data: [
				{name: 'data', size: 9, type: 'byte', log: 1},
			],
		},
		0x0207: {
			name: 'unknown_packet_0207', 
			length: 34, 
			log: 2,
			data: [
				{name: 'data', size: 32, type: 'byte', log: 1},
			],
		},
		0x0208: {
			name: 'unknown_packet_0208', 
			length: 14, 
			log: 2,
			data: [
				{name: 'data', size: 12, type: 'byte', log: 1},
			],
		},
		0x0209: {
			name: 'unknown_packet_0209', 
			length: 36, 
			log: 2,
			data: [
				{name: 'data', size: 34, type: 'byte', log: 1},
			],
		},
		0x020a: {
			name: 'unknown_packet_020a', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x020d: {
			name: 'unknown_packet_020d', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x020e: {
			name: 'unknown_packet_020e', 
			length: 32, 
			log: 2,
			data: [
				{name: 'data', size: 30, type: 'byte', log: 1},
			],
		},
		0x0212: {
			name: 'unknown_packet_0212', 
			length: 26, 
			log: 2,
			data: [
				{name: 'data', size: 24, type: 'byte', log: 1},
			],
		},
		0x0213: {
			name: 'unknown_packet_0213', 
			length: 26, 
			log: 2,
			data: [
				{name: 'data', size: 24, type: 'byte', log: 1},
			],
		},
		0x0214: {
			name: 'unknown_packet_0214', 
			length: 42, 
			log: 2,
			data: [
				{name: 'data', size: 40, type: 'byte', log: 1},
			],
		},
		0x0215: {
			name: 'unknown_packet_0215', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0216: {
			name: 'unknown_packet_0216', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0217: {
			name: 'unknown_packet_0217', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0218: {
			name: 'unknown_packet_0218', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0219: {
			name: 'unknown_packet_0219', 
			length: 282, 
			log: 2,
			data: [
				{name: 'data', size: 280, type: 'byte', log: 1},
			],
		},
		0x021a: {
			name: 'unknown_packet_021a', 
			length: 282, 
			log: 2,
			data: [
				{name: 'data', size: 280, type: 'byte', log: 1},
			],
		},
		0x021b: {
			name: 'unknown_packet_021b', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x021c: {
			name: 'unknown_packet_021c', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x021d: {
			name: 'unknown_packet_021d', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x021e: {
			name: 'unknown_packet_021e', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x021f: {
			name: 'unknown_packet_021f', 
			length: 66, 
			log: 2,
			data: [
				{name: 'data', size: 64, type: 'byte', log: 1},
			],
		},
		0x0220: {
			name: 'unknown_packet_0220', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x0221: {
			name: 'unknown_packet_0221', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0222: {
			name: 'unknown_packet_0222', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0223: {
			name: 'unknown_packet_0223', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x0224: {
			name: 'unknown_packet_0224', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x0225: {
			name: 'unknown_packet_0225', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0226: {
			name: 'unknown_packet_0226', 
			length: 282, 
			log: 2,
			data: [
				{name: 'data', size: 280, type: 'byte', log: 1},
			],
		},
		0x0227: {
			name: 'unknown_packet_0227', 
			length: 18, 
			log: 2,
			data: [
				{name: 'data', size: 16, type: 'byte', log: 1},
			],
		},
		0x0228: {
			name: 'unknown_packet_0228', 
			length: 18, 
			log: 2,
			data: [
				{name: 'data', size: 16, type: 'byte', log: 1},
			],
		},
		0x0229: {
			name: 'character_status', 
			length: 15, 
			log: 0,
			data: [
				{name: 'ID', size: 4, type: 'int', log: 2},
				{name: 'opt1', size: 2, type: 'int', log: 2},
				{name: 'opt2', size: 2, type: 'int', log: 2},
				{name: 'option', size: 4, type: 'byte', log: 2},
				{name: 'stance', size: 1, type: 'int', log: 2},
			],
		},
		0x022a: {
			name: 'unknown_packet_022a', 
			length: 58, 
			log: 2,
			data: [
				{name: 'data', size: 56, type: 'byte', log: 1},
			],
		},
		0x022b: {
			name: 'unknown_packet_022b', 
			length: 57, 
			log: 2,
			data: [
				{name: 'data', size: 55, type: 'byte', log: 1},
			],
		},
		0x022c: {
			name: 'unknown_packet_022c', 
			length: 65, 
			log: 2,
			data: [
				{name: 'data', size: 63, type: 'byte', log: 1},
			],
		},
		0x022d: {
			name: 'unknown_packet_022d', 
			length: 5, 
			log: 2,
			data: [
				{name: 'data', size: 3, type: 'byte', log: 1},
			],
		},
		0x022e: {
			name: 'unknown_packet_022e', 
			length: 71, 
			log: 2,
			data: [
				{name: 'data', size: 69, type: 'byte', log: 1},
			],
		},
		0x022f: {
			name: 'unknown_packet_022f', 
			length: 5, 
			log: 2,
			data: [
				{name: 'data', size: 3, type: 'byte', log: 1},
			],
		},
		0x0230: {
			name: 'homunculus_data', 
			length: 12, 
			log: 2,
			data: [
				{name: 'unused', size: 1, type: 'int', log: 1},
				{name: 'state', size: 1, type: 'int', log: 1},
				{name: 'ID', size: 4, type: 'int', log: 1},
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0231: {
			name: 'unknown_packet_0231', 
			length: 26, 
			log: 2,
			data: [
				{name: 'data', size: 24, type: 'byte', log: 1},
			],
		},
		0x0232: {
			name: 'unknown_packet_0232', 
			length: 9, 
			log: 2,
			data: [
				{name: 'data', size: 7, type: 'byte', log: 1},
			],
		},
		0x0233: {
			name: 'unknown_packet_0233', 
			length: 11, 
			log: 2,
			data: [
				{name: 'data', size: 9, type: 'byte', log: 1},
			],
		},
		0x0234: {
			name: 'unknown_packet_0234', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0235: {
			name: 'unknown_packet_0235', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0236: {
			name: 'unknown_packet_0236', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x0237: {
			name: 'unknown_packet_0237', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0238: {
			name: 'unknown_packet_0238', 
			length: 282, 
			log: 2,
			data: [
				{name: 'data', size: 280, type: 'byte', log: 1},
			],
		},
		0x0239: {
			name: 'unknown_packet_0239', 
			length: 11, 
			log: 2,
			data: [
				{name: 'data', size: 9, type: 'byte', log: 1},
			],
		},
		0x023a: {
			name: 'unknown_packet_023a', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x023b: {
			name: 'unknown_packet_023b', 
			length: 36, 
			log: 2,
			data: [
				{name: 'data', size: 34, type: 'byte', log: 1},
			],
		},
		0x023c: {
			name: 'unknown_packet_023c', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x023d: {
			name: 'unknown_packet_023d', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x023e: {
			name: 'unknown_packet_023e', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x023f: {
			name: 'unknown_packet_023f', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0240: {
			name: 'unknown_packet_0240', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0241: {
			name: 'unknown_packet_0241', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0242: {
			name: 'unknown_packet_0242', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0243: {
			name: 'unknown_packet_0243', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0244: {
			name: 'unknown_packet_0244', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0245: {
			name: 'unknown_packet_0245', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x0246: {
			name: 'unknown_packet_0246', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x0247: {
			name: 'unknown_packet_0247', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x0248: {
			name: 'unknown_packet_0248', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0249: {
			name: 'unknown_packet_0249', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x024a: {
			name: 'unknown_packet_024a', 
			length: 70, 
			log: 2,
			data: [
				{name: 'data', size: 68, type: 'byte', log: 1},
			],
		},
		0x024b: {
			name: 'unknown_packet_024b', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x024c: {
			name: 'unknown_packet_024c', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x024d: {
			name: 'unknown_packet_024d', 
			length: 12, 
			log: 2,
			data: [
				{name: 'data', size: 10, type: 'byte', log: 1},
			],
		},
		0x024e: {
			name: 'unknown_packet_024e', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x024f: {
			name: 'unknown_packet_024f', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x0250: {
			name: 'unknown_packet_0250', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x0251: {
			name: 'unknown_packet_0251', 
			length: 34, 
			log: 2,
			data: [
				{name: 'data', size: 32, type: 'byte', log: 1},
			],
		},
		0x0252: {
			name: 'unknown_packet_0252', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0253: {
			name: 'unknown_packet_0253', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x0254: {
			name: 'unknown_packet_0254', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x0255: {
			name: 'unknown_packet_0255', 
			length: 5, 
			log: 2,
			data: [
				{name: 'data', size: 3, type: 'byte', log: 1},
			],
		},
		0x0256: {
			name: 'unknown_packet_0256', 
			length: 5, 
			log: 2,
			data: [
				{name: 'data', size: 3, type: 'byte', log: 1},
			],
		},
		0x0257: {
			name: 'unknown_packet_0257', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x0258: {
			name: 'unknown_packet_0258', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0259: {
			name: 'unknown_packet_0259', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x025a: {
			name: 'unknown_packet_025a', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x025b: {
			name: 'unknown_packet_025b', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x025c: {
			name: 'unknown_packet_025c', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x025d: {
			name: 'unknown_packet_025d', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x025e: {
			name: 'unknown_packet_025e', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x025f: {
			name: 'unknown_packet_025f', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0260: {
			name: 'unknown_packet_0260', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0261: {
			name: 'unknown_packet_0261', 
			length: 11, 
			log: 2,
			data: [
				{name: 'data', size: 9, type: 'byte', log: 1},
			],
		},
		0x0262: {
			name: 'unknown_packet_0262', 
			length: 11, 
			log: 2,
			data: [
				{name: 'data', size: 9, type: 'byte', log: 1},
			],
		},
		0x0263: {
			name: 'unknown_packet_0263', 
			length: 11, 
			log: 2,
			data: [
				{name: 'data', size: 9, type: 'byte', log: 1},
			],
		},
		0x0264: {
			name: 'unknown_packet_0264', 
			length: 20, 
			log: 2,
			data: [
				{name: 'data', size: 18, type: 'byte', log: 1},
			],
		},
		0x0265: {
			name: 'unknown_packet_0265', 
			length: 20, 
			log: 2,
			data: [
				{name: 'data', size: 18, type: 'byte', log: 1},
			],
		},
		0x0266: {
			name: 'unknown_packet_0266', 
			length: 30, 
			log: 2,
			data: [
				{name: 'data', size: 28, type: 'byte', log: 1},
			],
		},
		0x0267: {
			name: 'unknown_packet_0267', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x0268: {
			name: 'unknown_packet_0268', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x0269: {
			name: 'unknown_packet_0269', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x026a: {
			name: 'unknown_packet_026a', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x026b: {
			name: 'unknown_packet_026b', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x026c: {
			name: 'unknown_packet_026c', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x026d: {
			name: 'unknown_packet_026d', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x026f: {
			name: 'unknown_packet_026f', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0270: {
			name: 'unknown_packet_0270', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0271: {
			name: 'unknown_packet_0271', 
			length: 40, 
			log: 2,
			data: [
				{name: 'data', size: 38, type: 'byte', log: 1},
			],
		},
		0x0272: {
			name: 'unknown_packet_0272', 
			length: 44, 
			log: 2,
			data: [
				{name: 'data', size: 42, type: 'byte', log: 1},
			],
		},
		0x0273: {
			name: 'unknown_packet_0273', 
			length: 30, 
			log: 2,
			data: [
				{name: 'data', size: 28, type: 'byte', log: 1},
			],
		},
		0x0274: {
			name: 'unknown_packet_0274', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x0275: {
			name: 'unknown_packet_0275', 
			length: 37, 
			log: 2,
			data: [
				{name: 'data', size: 35, type: 'byte', log: 1},
			],
		},
		0x0276: {
			name: 'unknown_packet_0276', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0277: {
			name: 'unknown_packet_0277', 
			length: 84, 
			log: 2,
			data: [
				{name: 'data', size: 82, type: 'byte', log: 1},
			],
		},
		0x0278: {
			name: 'unknown_packet_0278', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0279: {
			name: 'unknown_packet_0279', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x027a: {
			name: 'unknown_packet_027a', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x027b: {
			name: 'unknown_packet_027b', 
			length: 14, 
			log: 2,
			data: [
				{name: 'data', size: 12, type: 'byte', log: 1},
			],
		},
		0x027c: {
			name: 'unknown_packet_027c', 
			length: 60, 
			log: 2,
			data: [
				{name: 'data', size: 58, type: 'byte', log: 1},
			],
		},
		0x027d: {
			name: 'unknown_packet_027d', 
			length: 62, 
			log: 2,
			data: [
				{name: 'data', size: 60, type: 'byte', log: 1},
			],
		},
		0x027e: {
			name: 'unknown_packet_027e', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x027f: {
			name: 'unknown_packet_027f', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x0280: {
			name: 'unknown_packet_0280', 
			length: 12, 
			log: 2,
			data: [
				{name: 'data', size: 10, type: 'byte', log: 1},
			],
		},
		0x0281: {
			name: 'unknown_packet_0281', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x0282: {
			name: 'unknown_packet_0282', 
			length: 284, 
			log: 2,
			data: [
				{name: 'data', size: 282, type: 'byte', log: 1},
			],
		},
		0x0283: {
			name: 'account_id', 
			length: 6, 
			log: 2,
			data: [
				{name: 'ID', size: 4, type: 'int', log: 2},
			],
		},
		0x0284: {
			name: 'unknown_packet_0284', 
			length: 14, 
			log: 2,
			data: [
				{name: 'data', size: 12, type: 'byte', log: 1},
			],
		},
		0x0285: {
			name: 'unknown_packet_0285', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0286: {
			name: 'unknown_packet_0286', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x0287: {
			name: 'unknown_packet_0287', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0288: {
			name: 'unknown_packet_0288', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0289: {
			name: 'unknown_packet_0289', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x028a: {
			name: 'unknown_packet_028a', 
			length: 18, 
			log: 2,
			data: [
				{name: 'data', size: 16, type: 'byte', log: 1},
			],
		},
		0x028b: {
			name: 'unknown_packet_028b', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x028c: {
			name: 'unknown_packet_028c', 
			length: 46, 
			log: 2,
			data: [
				{name: 'data', size: 44, type: 'byte', log: 1},
			],
		},
		0x028d: {
			name: 'unknown_packet_028d', 
			length: 34, 
			log: 2,
			data: [
				{name: 'data', size: 32, type: 'byte', log: 1},
			],
		},
		0x028e: {
			name: 'unknown_packet_028e', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x028f: {
			name: 'unknown_packet_028f', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0290: {
			name: 'unknown_packet_0290', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x0291: {
			name: 'unknown_packet_0291', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x0292: {
			name: 'unknown_packet_0292', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0293: {
			name: 'unknown_packet_0293', 
			length: 70, 
			log: 2,
			data: [
				{name: 'data', size: 68, type: 'byte', log: 1},
			],
		},
		0x0294: {
			name: 'unknown_packet_0294', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x0295: {
			name: 'unknown_packet_0295', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0296: {
			name: 'unknown_packet_0296', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0297: {
			name: 'unknown_packet_0297', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0298: {
			name: 'unknown_packet_0298', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x0299: {
			name: 'unknown_packet_0299', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x029a: {
			name: 'unknown_packet_029a', 
			length: 27, 
			log: 2,
			data: [
				{name: 'data', size: 25, type: 'byte', log: 1},
			],
		},
		0x029b: {
			name: 'unknown_packet_029b', 
			length: 80, 
			log: 2,
			data: [
				{name: 'data', size: 78, type: 'byte', log: 1},
			],
		},
		0x029c: {
			name: 'unknown_packet_029c', 
			length: 66, 
			log: 2,
			data: [
				{name: 'data', size: 64, type: 'byte', log: 1},
			],
		},
		0x029d: {
			name: 'unknown_packet_029d', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x029e: {
			name: 'unknown_packet_029e', 
			length: 11, 
			log: 2,
			data: [
				{name: 'data', size: 9, type: 'byte', log: 1},
			],
		},
		0x029f: {
			name: 'unknown_packet_029f', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x02a2: {
			name: 'unknown_packet_02a2', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x02a5: {
			name: 'unknown_packet_02a5', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x02aa: {
			name: 'unknown_packet_02aa', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x02ab: {
			name: 'unknown_packet_02ab', 
			length: 36, 
			log: 2,
			data: [
				{name: 'data', size: 34, type: 'byte', log: 1},
			],
		},
		0x02ac: {
			name: 'unknown_packet_02ac', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x02ad: {
			name: 'unknown_packet_02ad', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x02b0: {
			name: 'unknown_packet_02b0', 
			length: 85, 
			log: 2,
			data: [
				{name: 'data', size: 83, type: 'byte', log: 1},
			],
		},
		0x02b1: {
			name: 'unknown_packet_02b1', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x02b2: {
			name: 'unknown_packet_02b2', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x02b3: {
			name: 'unknown_packet_02b3', 
			length: 107, 
			log: 2,
			data: [
				{name: 'data', size: 105, type: 'byte', log: 1},
			],
		},
		0x02b4: {
			name: 'unknown_packet_02b4', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x02b5: {
			name: 'unknown_packet_02b5', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x02b6: {
			name: 'unknown_packet_02b6', 
			length: 7, 
			log: 2,
			data: [
				{name: 'data', size: 5, type: 'byte', log: 1},
			],
		},
		0x02b7: {
			name: 'unknown_packet_02b7', 
			length: 7, 
			log: 2,
			data: [
				{name: 'data', size: 5, type: 'byte', log: 1},
			],
		},
		0x02b8: {
			name: 'unknown_packet_02b8', 
			length: 22, 
			log: 2,
			data: [
				{name: 'data', size: 20, type: 'byte', log: 1},
			],
		},
		0x02b9: {
			name: 'unknown_packet_02b9', 
			length: 191, 
			log: 2,
			data: [
				{name: 'data', size: 189, type: 'byte', log: 1},
			],
		},
		0x02ba: {
			name: 'unknown_packet_02ba', 
			length: 11, 
			log: 2,
			data: [
				{name: 'data', size: 9, type: 'byte', log: 1},
			],
		},
		0x02bb: {
			name: 'item_damaged', 
			length: 8, 
			log: 2,
			data: [
				{name: 'pos', size: 2, type: 'int', log: 1},
				{name: 'ID', size: 4, type: 'int', log: 1},
			],
		},
		0x02bc: {
			name: 'unknown_packet_02bc', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x02c1: {
			name: 'unknown_packet_02c1', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x02c2: {
			name: 'unknown_packet_02c2', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x02c4: {
			name: 'unknown_packet_02c4', 
			length: 26, 
			log: 2,
			data: [
				{name: 'data', size: 24, type: 'byte', log: 1},
			],
		},
		0x02c5: {
			name: 'unknown_packet_02c5', 
			length: 30, 
			log: 2,
			data: [
				{name: 'data', size: 28, type: 'byte', log: 1},
			],
		},
		0x02c6: {
			name: 'unknown_packet_02c6', 
			length: 30, 
			log: 2,
			data: [
				{name: 'data', size: 28, type: 'byte', log: 1},
			],
		},
		0x02c7: {
			name: 'unknown_packet_02c7', 
			length: 7, 
			log: 2,
			data: [
				{name: 'data', size: 5, type: 'byte', log: 1},
			],
		},
		0x02c8: {
			name: 'unknown_packet_02c8', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x02c9: {
			name: 'party_allow_invite', 
			length: 3, 
			log: 2,
			data: [
				{name: 'type', size: 1, type: 'int', log: 1},
			],
		},
		0x02ca: {
			name: 'unknown_packet_02ca', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x02cb: {
			name: 'unknown_packet_02cb', 
			length: 65, 
			log: 2,
			data: [
				{name: 'data', size: 63, type: 'byte', log: 1},
			],
		},
		0x02cc: {
			name: 'unknown_packet_02cc', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x02cd: {
			name: 'unknown_packet_02cd', 
			length: 71, 
			log: 2,
			data: [
				{name: 'data', size: 69, type: 'byte', log: 1},
			],
		},
		0x02ce: {
			name: 'unknown_packet_02ce', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x02cf: {
			name: 'unknown_packet_02cf', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x02d0: {
			name: 'unknown_packet_02d0', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x02d1: {
			name: 'unknown_packet_02d1', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x02d2: {
			name: 'unknown_packet_02d2', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x02d3: {
			name: 'unknown_packet_02d3', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x02d4: {
			name: 'unknown_packet_02d4', 
			length: 29, 
			log: 2,
			data: [
				{name: 'data', size: 27, type: 'byte', log: 1},
			],
		},
		0x02d5: {
			name: 'unknown_packet_02d5', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x02d6: {
			name: 'unknown_packet_02d6', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x02d7: {
			name: 'unknown_packet_02d7', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x02d8: {
			name: 'unknown_packet_02d8', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x02d9: {
			name: 'unknown_packet_02d9', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x02da: {
			name: 'show_eq_msg_self', 
			length: 3, 
			log: 2,
			data: [
				{name: 'type', size: 1, type: 'int', log: 1},
			],
		},
		0x02db: {
			name: 'unknown_packet_02db', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x02dc: {
			name: 'unknown_packet_02dc', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x02dd: {
			name: 'unknown_packet_02dd', 
			length: 32, 
			log: 2,
			data: [
				{name: 'data', size: 30, type: 'byte', log: 1},
			],
		},
		0x02de: {
			name: 'unknown_packet_02de', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x02df: {
			name: 'unknown_packet_02df', 
			length: 36, 
			log: 2,
			data: [
				{name: 'data', size: 34, type: 'byte', log: 1},
			],
		},
		0x02e0: {
			name: 'unknown_packet_02e0', 
			length: 34, 
			log: 2,
			data: [
				{name: 'data', size: 32, type: 'byte', log: 1},
			],
		},
		0x02e1: {
			name: 'actor_action_02e1', 
			length: 33, 
			log: 2,
			data: [
				{name: 'sourceId', size: 4, type: 'int', log: 2},
				{name: 'targetId', size: 4, type: 'int', log: 2},
				{name: 'tick', size: 4, type: 'int', log: 1},
				{name: 'source_speed', size: 4, type: 'int', log: 2},
				{name: 'dst_speed', size: 4, type: 'int', log: 2},
				{name: 'damage', size: 4, type: 'int', log: 2},
				{name: 'div', size: 2, type: 'int', log: 1},
				{name: 'type', size: 1, type: 'int', log: 1},
				{name: 'dual_wield_damage', size: 4, type: 'int', log: 1},
			],
		},
		0x02e2: {
			name: 'unknown_packet_02e2', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x02e3: {
			name: 'unknown_packet_02e3', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x02e4: {
			name: 'unknown_packet_02e4', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x02e5: {
			name: 'unknown_packet_02e5', 
			length: 5, 
			log: 2,
			data: [
				{name: 'data', size: 3, type: 'byte', log: 1},
			],
		},
		0x02e6: {
			name: 'unknown_packet_02e6', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x02e7: {
			name: 'unknown_packet_02e7', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x02e8: {
			name: 'unknown_packet_02e8', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x02e9: {
			name: 'unknown_packet_02e9', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x02ea: {
			name: 'unknown_packet_02ea', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x02eb: {
			name: 'map_loaded', 
			length: 13, 
			log: 2,
			data: [
				{name: 'sync', size: 4, type: 'int', log: 1},
				{name: 'coords', size: 3, type: 'coords', log: 1},
				{name: 'unknown', size: 4, type: 'byte', log: 1},
			],
		},
		0x02ec: {
			name: 'unknown_packet_02ec', 
			length: 67, 
			log: 2,
			data: [
				{name: 'data', size: 65, type: 'byte', log: 1},
			],
		},
		0x02ed: {
			name: 'unknown_packet_02ed', 
			length: 59, 
			log: 2,
			data: [
				{name: 'data', size: 57, type: 'byte', log: 1},
			],
		},
		0x02ee: {
			name: 'unknown_packet_02ee', 
			length: 60, 
			log: 2,
			data: [
				{name: 'data', size: 58, type: 'byte', log: 1},
			],
		},
		0x02ef: {
			name: 'unknown_packet_02ef', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x02f0: {
			name: 'unknown_packet_02f0', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x02f1: {
			name: 'unknown_packet_02f1', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x02f2: {
			name: 'unknown_packet_02f2', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x02f3: {
			name: 'unknown_packet_02f3', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x02f4: {
			name: 'unknown_packet_02f4', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x02f5: {
			name: 'unknown_packet_02f5', 
			length: 7, 
			log: 2,
			data: [
				{name: 'data', size: 5, type: 'byte', log: 1},
			],
		},
		0x02f6: {
			name: 'unknown_packet_02f6', 
			length: 7, 
			log: 2,
			data: [
				{name: 'data', size: 5, type: 'byte', log: 1},
			],
		},
		0x035c: {
			name: 'unknown_packet_035c', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x035d: {
			name: 'unknown_packet_035d', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x035e: {
			name: 'unknown_packet_035e', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x035f: {
			name: 'unknown_packet_035f', 
			length: 5, 
			log: 2,
			data: [
				{name: 'data', size: 3, type: 'byte', log: 1},
			],
		},
		0x0360: {
			name: 'unknown_packet_0360', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0361: {
			name: 'unknown_packet_0361', 
			length: 5, 
			log: 2,
			data: [
				{name: 'data', size: 3, type: 'byte', log: 1},
			],
		},
		0x0362: {
			name: 'unknown_packet_0362', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0363: {
			name: 'unknown_packet_0363', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0364: {
			name: 'unknown_packet_0364', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x0365: {
			name: 'unknown_packet_0365', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x0366: {
			name: 'unknown_packet_0366', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x0367: {
			name: 'unknown_packet_0367', 
			length: 90, 
			log: 2,
			data: [
				{name: 'data', size: 88, type: 'byte', log: 1},
			],
		},
		0x0368: {
			name: 'unknown_packet_0368', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0369: {
			name: 'unknown_packet_0369', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x03dd: {
			name: 'unknown_packet_03dd', 
			length: 18, 
			log: 2,
			data: [
				{name: 'data', size: 16, type: 'byte', log: 1},
			],
		},
		0x03de: {
			name: 'unknown_packet_03de', 
			length: 18, 
			log: 2,
			data: [
				{name: 'data', size: 16, type: 'byte', log: 1},
			],
		},
		0x0436: {
			name: 'unknown_packet_0436', 
			length: 19, 
			log: 2,
			data: [
				{name: 'data', size: 17, type: 'byte', log: 1},
			],
		},
		0x0437: {
			name: 'unknown_packet_0437', 
			length: 7, 
			log: 2,
			data: [
				{name: 'data', size: 5, type: 'byte', log: 1},
			],
		},
		0x0438: {
			name: 'unknown_packet_0438', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x0439: {
			name: 'unknown_packet_0439', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
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
		0x043e: {
			name: 'unknown_packet_043e', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x043f: {
			name: 'actor_status_active_043f', 
			length: 25, 
			log: 2,
			data: [
				{name: 'type', size: 2, type: 'int', log: 2},
				{name: 'ID', size: 4, type: 'int', log: 2},
				{name: 'flag', size: 1, type: 'int', log: 2},
				{name: 'tick', size: 4, type: 'int', log: 2},
				{name: 'unknown1', size: 4, type: 'int', log: 1},
				{name: 'unknown2', size: 4, type: 'int', log: 1},
				{name: 'unknown3', size: 4, type: 'int', log: 1},
			],
		},
		0x0440: {
			name: 'unknown_packet_0440', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x0441: {
			name: 'unknown_packet_0441', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x0442: {
			name: 'unknown_packet_0442', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0443: {
			name: 'unknown_packet_0443', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x0444: {
			name: 'unknown_packet_0444', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0445: {
			name: 'unknown_packet_0445', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0446: {
			name: 'minimap_indicator', 
			length: 14, 
			log: 0,
			data: [
				{name: 'npcId', size: 4, type: 'int', log: 2},
				{name: 'x', size: 2, type: 'int', log: 2},
				{name: 'y', size: 2, type: 'int', log: 2},
				{name: 'effect', size: 2, type: 'int', log: 2},
				{name: 'qtype', size: 2, type: 'int', log: 2},
			],
		},
		0x0447: {
			name: 'unknown_packet_0447', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0448: {
			name: 'unknown_packet_0448', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x044a: {
			name: 'unknown_packet_044a', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x044b: {
			name: 'unknown_packet_044b', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x07d7: {
			name: 'unknown_packet_07d7', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x07d8: {
			name: 'unknown_packet_07d8', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x07d9: {
			name: 'hotkeys', 
			length: 268, 
			log: 2,
			data: [
				{name: 'data', size: 266, type: 'byte', log: 1},
			],
		},
		0x07da: {
			name: 'unknown_packet_07da', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x07db: {
			name: 'unknown_packet_07db', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x07dc: {
			name: 'unknown_packet_07dc', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x07dd: {
			name: 'unknown_packet_07dd', 
			length: 54, 
			log: 2,
			data: [
				{name: 'data', size: 52, type: 'byte', log: 1},
			],
		},
		0x07de: {
			name: 'unknown_packet_07de', 
			length: 30, 
			log: 2,
			data: [
				{name: 'data', size: 28, type: 'byte', log: 1},
			],
		},
		0x07df: {
			name: 'unknown_packet_07df', 
			length: 54, 
			log: 2,
			data: [
				{name: 'data', size: 52, type: 'byte', log: 1},
			],
		},
		0x07e0: {
			name: 'unknown_packet_07e0', 
			length: 58, 
			log: 2,
			data: [
				{name: 'data', size: 56, type: 'byte', log: 1},
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
		0x07e2: {
			name: 'unknown_packet_07e2', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x07e3: {
			name: 'unknown_packet_07e3', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x07e4: {
			name: 'unknown_packet_07e4', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x07e5: {
			name: 'unknown_packet_07e5', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x07e6: {
			name: 'unknown_packet_07e6', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x07e7: {
			name: 'unknown_packet_07e7', 
			length: 32, 
			log: 2,
			data: [
				{name: 'data', size: 30, type: 'byte', log: 1},
			],
		},
		0x07e8: {
			name: 'unknown_packet_07e8', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x07e9: {
			name: 'unknown_packet_07e9', 
			length: 5, 
			log: 2,
			data: [
				{name: 'data', size: 3, type: 'byte', log: 1},
			],
		},
		0x07ea: {
			name: 'unknown_packet_07ea', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x07eb: {
			name: 'unknown_packet_07eb', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x07ec: {
			name: 'unknown_packet_07ec', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x07ed: {
			name: 'unknown_packet_07ed', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x07ee: {
			name: 'unknown_packet_07ee', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x07ef: {
			name: 'unknown_packet_07ef', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x07f0: {
			name: 'unknown_packet_07f0', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x07f1: {
			name: 'unknown_packet_07f1', 
			length: 18, 
			log: 2,
			data: [
				{name: 'data', size: 16, type: 'byte', log: 1},
			],
		},
		0x07f2: {
			name: 'unknown_packet_07f2', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x07f3: {
			name: 'unknown_packet_07f3', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x07f4: {
			name: 'unknown_packet_07f4', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x07f5: {
			name: 'unknown_packet_07f5', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x07f6: {
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
		0x07f7: {
			name: 'unknown_packet_07f7', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x07f8: {
			name: 'unknown_packet_07f8', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x07f9: {
			name: 'unknown_packet_07f9', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x07fa: {
			name: 'inventory_item_removed', 
			length: 8, 
			log: 2,
			data: [
				{name: 'reason', size: 2, type: 'int', log: 2},
				{name: 'index', size: 2, type: 'int', log: 2},
				{name: 'amount', size: 2, type: 'int', log: 2},
			],
		},
		0x07fb: {
			name: 'skill_cast_07fb', 
			length: 25, 
			log: 2,
			data: [
				{name: 'sourceId', size: 4, type: 'int', log: 2},
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
		0x07fc: {
			name: 'unknown_packet_07fc', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x07fd: {
			name: 'unknown_packet_07fd', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x07fe: {
			name: 'unknown_packet_07fe', 
			length: 26, 
			log: 2,
			data: [
				{name: 'data', size: 24, type: 'byte', log: 1},
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
		0x0801: {
			name: 'unknown_packet_0801', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0802: {
			name: 'unknown_packet_0802', 
			length: 18, 
			log: 2,
			data: [
				{name: 'data', size: 16, type: 'byte', log: 1},
			],
		},
		0x0803: {
			name: 'unknown_packet_0803', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x0804: {
			name: 'unknown_packet_0804', 
			length: 14, 
			log: 2,
			data: [
				{name: 'data', size: 12, type: 'byte', log: 1},
			],
		},
		0x0805: {
			name: 'unknown_packet_0805', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0806: {
			name: 'unknown_packet_0806', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0807: {
			name: 'unknown_packet_0807', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x0808: {
			name: 'unknown_packet_0808', 
			length: 14, 
			log: 2,
			data: [
				{name: 'data', size: 12, type: 'byte', log: 1},
			],
		},
		0x0809: {
			name: 'unknown_packet_0809', 
			length: 50, 
			log: 2,
			data: [
				{name: 'data', size: 48, type: 'byte', log: 1},
			],
		},
		0x080a: {
			name: 'unknown_packet_080a', 
			length: 18, 
			log: 2,
			data: [
				{name: 'data', size: 16, type: 'byte', log: 1},
			],
		},
		0x080b: {
			name: 'unknown_packet_080b', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x080c: {
			name: 'unknown_packet_080c', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x080d: {
			name: 'unknown_packet_080d', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x080e: {
			name: 'actor_hp', 
			length: 14, 
			log: 2,
			data: [
				{name: 'ID', size: 4, type: 'int', log: 1},
				{name: 'hp', size: 4, type: 'int', log: 1},
				{name: 'maxHp', size: 4, type: 'int', log: 1},
			],
		},
		0x080f: {
			name: 'deal_add_other', 
			length: 20, 
			log: 2,
			data: [
				{name: 'itemId', size: 2, type: 'int', log: 2},
				{name: 'type', size: 1, type: 'int', log: 1},
				{name: 'amount', size: 4, type: 'int', log: 2},
				{name: 'identified', size: 1, type: 'int', log: 1},
				{name: 'broken', size: 1, type: 'int', log: 1},
				{name: 'upgrade', size: 1, type: 'int', log: 2},
				{name: 'cards', size: 8, type: 'byte', log: 2},
			],
		},
		0x0810: {
			name: 'unknown_packet_0810', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x0811: {
			name: 'unknown_packet_0811', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0812: {
			name: 'unknown_packet_0812', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x0813: {
			name: 'unknown_packet_0813', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0814: {
			name: 'buying_store_found', 
			length: 86, 
			log: 1,
			data: [
				//{name: 'len', size: 2, type: 'int', log: 2},
				//{name: 'ID', size: 4, type: 'int', log: 2},
				//{name: 'data', size: -1, type: 'byte', log: 2},
				{name: 'data', size: 84, type: 'byte', log: 2},
			],
		},
		0x0815: {
			name: 'unknown_packet_0815', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0816: {
			name: 'unknown_packet_0816', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0817: {
			name: 'unknown_packet_0817', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0818: {
			name: 'unknown_packet_0818', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0819: {
			name: 'unknown_packet_0819', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x081a: {
			name: 'unknown_packet_081a', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x081b: {
			name: 'unknown_packet_081b', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x081c: {
			name: 'unknown_packet_081c', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x081d: {
			name: 'unknown_packet_081d', 
			length: 22, 
			log: 2,
			data: [
				{name: 'data', size: 20, type: 'byte', log: 1},
			],
		},
		0x081e: {
			name: 'unknown_packet_081e', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x081f: {
			name: 'unknown_packet_081f', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0820: {
			name: 'unknown_packet_0820', 
			length: 11, 
			log: 2,
			data: [
				{name: 'data', size: 9, type: 'byte', log: 1},
			],
		},
		0x0821: {
			name: 'unknown_packet_0821', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0822: {
			name: 'unknown_packet_0822', 
			length: 9, 
			log: 2,
			data: [
				{name: 'data', size: 7, type: 'byte', log: 1},
			],
		},
		0x0823: {
			name: 'unknown_packet_0823', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0824: {
			name: 'unknown_packet_0824', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0825: {
			name: 'unknown_packet_0825', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0826: {
			name: 'unknown_packet_0826', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x0827: {
			name: 'unknown_packet_0827', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0828: {
			name: 'unknown_packet_0828', 
			length: 14, 
			log: 2,
			data: [
				{name: 'data', size: 12, type: 'byte', log: 1},
			],
		},
		0x0829: {
			name: 'unknown_packet_0829', 
			length: 12, 
			log: 2,
			data: [
				{name: 'data', size: 10, type: 'byte', log: 1},
			],
		},
		0x082a: {
			name: 'unknown_packet_082a', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x082b: {
			name: 'unknown_packet_082b', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x082c: {
			name: 'unknown_packet_082c', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x082d: {
			name: 'unknown_packet_082d', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0835: {
			name: 'unknown_packet_0835', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0836: {
			name: 'unknown_packet_0836', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0837: {
			name: 'unknown_packet_0837', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x0838: {
			name: 'unknown_packet_0838', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0839: {
			name: 'unknown_packet_0839', 
			length: 66, 
			log: 2,
			data: [
				{name: 'data', size: 64, type: 'byte', log: 1},
			],
		},
		0x083a: {
			name: 'unknown_packet_083a', 
			length: 5, 
			log: 2,
			data: [
				{name: 'data', size: 3, type: 'byte', log: 1},
			],
		},
		0x083b: {
			name: 'unknown_packet_083b', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x083c: {
			name: 'unknown_packet_083c', 
			length: 12, 
			log: 2,
			data: [
				{name: 'data', size: 10, type: 'byte', log: 1},
			],
		},
		0x083d: {
			name: 'unknown_packet_083d', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x083e: {
			name: 'unknown_packet_083e', 
			length: 26, 
			log: 2,
			data: [
				{name: 'data', size: 24, type: 'byte', log: 1},
			],
		},
		0x0840: {
			name: 'unknown_packet_0840', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0841: {
			name: 'unknown_packet_0841', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x0842: {
			name: 'unknown_packet_0842', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0843: {
			name: 'unknown_packet_0843', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0844: {
			name: 'unknown_packet_0844', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0845: {
			name: 'cash_shop_open_result', 
			length: 6, 
			log: 2,
			data: [
				{name: 'cash_points', size: 2, type: 'int', log: 2},
				{name: 'kafra_points', size: 2, type: 'int', log: 2},
			],
		},
		0x0846: {
			name: 'unknown_packet_0846', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x0847: {
			name: 'unknown_packet_0847', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0848: {
			name: 'unknown_packet_0848', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0849: {
			name: 'unknown_packet_0849', 
			length: 12, 
			log: 2,
			data: [
				{name: 'data', size: 10, type: 'byte', log: 1},
			],
		},
		0x084a: {
			name: 'unknown_packet_084a', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x084b: {
			name: 'unknown_packet_084b', 
			length: 19, 
			log: 2,
			data: [
				{name: 'data', size: 17, type: 'byte', log: 1},
			],
		},
		0x084c: {
			name: 'unknown_packet_084c', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x084d: {
			name: 'unknown_packet_084d', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x084e: {
			name: 'unknown_packet_084e', 
			length: 5, 
			log: 2,
			data: [
				{name: 'data', size: 3, type: 'byte', log: 1},
			],
		},
		0x084f: {
			name: 'unknown_packet_084f', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0850: {
			name: 'unknown_packet_0850', 
			length: 7, 
			log: 2,
			data: [
				{name: 'data', size: 5, type: 'byte', log: 1},
			],
		},
		0x0851: {
			name: 'unknown_packet_0851', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0852: {
			name: 'unknown_packet_0852', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0853: {
			name: 'unknown_packet_0853', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0854: {
			name: 'unknown_packet_0854', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0855: {
			name: 'unknown_packet_0855', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0856: {
			name: 'unknown_packet_0856', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0857: {
			name: 'unknown_packet_0857', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0858: {
			name: 'unknown_packet_0858', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0859: {
			name: 'unknown_packet_0859', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x085a: {
			name: 'unknown_packet_085a', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x085b: {
			name: 'unknown_packet_085b', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x085c: {
			name: 'unknown_packet_085c', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x085d: {
			name: 'unknown_packet_085d', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x085e: {
			name: 'unknown_packet_085e', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x085f: {
			name: 'unknown_packet_085f', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0860: {
			name: 'unknown_packet_0860', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0861: {
			name: 'unknown_packet_0861', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0862: {
			name: 'unknown_packet_0862', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0863: {
			name: 'unknown_packet_0863', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0864: {
			name: 'unknown_packet_0864', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0865: {
			name: 'unknown_packet_0865', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0866: {
			name: 'unknown_packet_0866', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0867: {
			name: 'unknown_packet_0867', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0868: {
			name: 'unknown_packet_0868', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0869: {
			name: 'unknown_packet_0869', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x086a: {
			name: 'unknown_packet_086a', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x086b: {
			name: 'unknown_packet_086b', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x086c: {
			name: 'unknown_packet_086c', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x086d: {
			name: 'unknown_packet_086d', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x086e: {
			name: 'unknown_packet_086e', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x086f: {
			name: 'unknown_packet_086f', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0870: {
			name: 'unknown_packet_0870', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0871: {
			name: 'unknown_packet_0871', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0872: {
			name: 'unknown_packet_0872', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0873: {
			name: 'unknown_packet_0873', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0874: {
			name: 'unknown_packet_0874', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0875: {
			name: 'unknown_packet_0875', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0876: {
			name: 'unknown_packet_0876', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0877: {
			name: 'unknown_packet_0877', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0878: {
			name: 'unknown_packet_0878', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0879: {
			name: 'unknown_packet_0879', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x087a: {
			name: 'unknown_packet_087a', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x087b: {
			name: 'unknown_packet_087b', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x087c: {
			name: 'unknown_packet_087c', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x087d: {
			name: 'unknown_packet_087d', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x087e: {
			name: 'unknown_packet_087e', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x087f: {
			name: 'unknown_packet_087f', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0880: {
			name: 'unknown_packet_0880', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0881: {
			name: 'unknown_packet_0881', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0882: {
			name: 'unknown_packet_0882', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0883: {
			name: 'unknown_packet_0883', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0884: {
			name: 'unknown_packet_0884', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0885: {
			name: 'unknown_packet_0885', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0886: {
			name: 'unknown_packet_0886', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0887: {
			name: 'unknown_packet_0887', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0888: {
			name: 'unknown_packet_0888', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0889: {
			name: 'unknown_packet_0889', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x088a: {
			name: 'unknown_packet_088a', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x088b: {
			name: 'unknown_packet_088b', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x088c: {
			name: 'unknown_packet_088c', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x088d: {
			name: 'unknown_packet_088d', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x088e: {
			name: 'unknown_packet_088e', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x088f: {
			name: 'unknown_packet_088f', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0890: {
			name: 'unknown_packet_0890', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0891: {
			name: 'unknown_packet_0891', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0892: {
			name: 'unknown_packet_0892', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0893: {
			name: 'unknown_packet_0893', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0894: {
			name: 'unknown_packet_0894', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0895: {
			name: 'unknown_packet_0895', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0896: {
			name: 'unknown_packet_0896', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0897: {
			name: 'unknown_packet_0897', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0898: {
			name: 'unknown_packet_0898', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0899: {
			name: 'unknown_packet_0899', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x089a: {
			name: 'unknown_packet_089a', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x089b: {
			name: 'unknown_packet_089b', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x089c: {
			name: 'unknown_packet_089c', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x089d: {
			name: 'unknown_packet_089d', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x089e: {
			name: 'unknown_packet_089e', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x089f: {
			name: 'unknown_packet_089f', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x08a0: {
			name: 'unknown_packet_08a0', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x08a1: {
			name: 'unknown_packet_08a1', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x08a2: {
			name: 'unknown_packet_08a2', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x08a3: {
			name: 'unknown_packet_08a3', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x08a4: {
			name: 'unknown_packet_08a4', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x08a5: {
			name: 'unknown_packet_08a5', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x08a6: {
			name: 'unknown_packet_08a6', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x08a7: {
			name: 'unknown_packet_08a7', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x08a8: {
			name: 'unknown_packet_08a8', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x08a9: {
			name: 'unknown_packet_08a9', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x08aa: {
			name: 'unknown_packet_08aa', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x08ab: {
			name: 'unknown_packet_08ab', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x08ac: {
			name: 'unknown_packet_08ac', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x08ad: {
			name: 'unknown_packet_08ad', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x08af: {
			name: 'unknown_packet_08af', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x08b0: {
			name: 'unknown_packet_08b0', 
			length: 17, 
			log: 2,
			data: [
				{name: 'data', size: 15, type: 'byte', log: 1},
			],
		},
		0x08b1: {
			name: 'unknown_packet_08b1', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x08b2: {
			name: 'unknown_packet_08b2', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x08b3: {
			name: 'script_message', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'ID', size: 4, type: 'int', log: 2},
				{name: 'message', size: -1, type: 'string', log: 1},
			],
		},
		0x08b4: {
			name: 'unknown_packet_08b4', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x08b5: {
			name: 'unknown_packet_08b5', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x08b6: {
			name: 'unknown_packet_08b6', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x08b8: {
			name: 'unknown_packet_08b8', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x08b9: {
			name: 'unknown_packet_08b9', 
			length: 12, 
			log: 2,
			data: [
				{name: 'data', size: 10, type: 'byte', log: 1},
			],
		},
		0x08ba: {
			name: 'unknown_packet_08ba', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x08bb: {
			name: 'unknown_packet_08bb', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x08bc: {
			name: 'unknown_packet_08bc', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x08bd: {
			name: 'unknown_packet_08bd', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x08be: {
			name: 'unknown_packet_08be', 
			length: 14, 
			log: 2,
			data: [
				{name: 'data', size: 12, type: 'byte', log: 1},
			],
		},
		0x08bf: {
			name: 'unknown_packet_08bf', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x08c0: {
			name: 'unknown_packet_08c0', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x08c1: {
			name: 'unknown_packet_08c1', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x08c2: {
			name: 'unknown_packet_08c2', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x08c3: {
			name: 'unknown_packet_08c3', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x08c4: {
			name: 'unknown_packet_08c4', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x08c5: {
			name: 'unknown_packet_08c5', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x08c6: {
			name: 'unknown_packet_08c6', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x08c7: {
			name: 'unknown_packet_08c7', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x08c8: {
			name: 'actor_action_08c8', 
			length: 34, 
			log: 2,
			data: [
				{name: 'sourceId', size: 4, type: 'int', log: 2},
				{name: 'targetId', size: 4, type: 'int', log: 2},
				{name: 'tick', size: 4, type: 'int', log: 1},
				{name: 'source_speed', size: 4, type: 'int', log: 2},
				{name: 'dst_speed', size: 4, type: 'int', log: 2},
				{name: 'damage', size: 4, type: 'int', log: 2},
				{name: 'spDamaged', size: 1, type: 'int', log: 0},
				{name: 'div', size: 2, type: 'int', log: 1},
				{name: 'type', size: 1, type: 'int', log: 1},
				{name: 'dual_wield_damage', size: 4, type: 'int', log: 1},
			],
		},
		0x08c9: {
			name: 'unknown_packet_08c9', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x08ca: {
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
		0x08cb: {
			name: 'unknown_packet_08cb', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x08cc: {
			name: 'unknown_packet_08cc', 
			length: 109, 
			log: 2,
			data: [
				{name: 'data', size: 107, type: 'byte', log: 1},
			],
		},
		0x08cd: {
			name: 'unknown_packet_08cd', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x08ce: {
			name: 'unknown_packet_08ce', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x08cf: {
			name: 'unknown_packet_08cf', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x08d0: {
			name: 'unknown_packet_08d0', 
			length: 9, 
			log: 2,
			data: [
				{name: 'data', size: 7, type: 'byte', log: 1},
			],
		},
		0x08d1: {
			name: 'unknown_packet_08d1', 
			length: 7, 
			log: 2,
			data: [
				{name: 'data', size: 5, type: 'byte', log: 1},
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
		0x08d3: {
			name: 'unknown_packet_08d3', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x08d4: {
			name: 'unknown_packet_08d4', 
			length: 8, 
			log: 2,
			data: [
				{name: 'data', size: 6, type: 'byte', log: 1},
			],
		},
		0x08d5: {
			name: 'unknown_packet_08d5', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x08d6: {
			name: 'unknown_packet_08d6', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x08d7: {
			name: 'unknown_packet_08d7', 
			length: 28, 
			log: 2,
			data: [
				{name: 'data', size: 26, type: 'byte', log: 1},
			],
		},
		0x08d8: {
			name: 'unknown_packet_08d8', 
			length: 27, 
			log: 2,
			data: [
				{name: 'data', size: 25, type: 'byte', log: 1},
			],
		},
		0x08d9: {
			name: 'unknown_packet_08d9', 
			length: 30, 
			log: 2,
			data: [
				{name: 'data', size: 28, type: 'byte', log: 1},
			],
		},
		0x08da: {
			name: 'unknown_packet_08da', 
			length: 26, 
			log: 2,
			data: [
				{name: 'data', size: 24, type: 'byte', log: 1},
			],
		},
		0x08db: {
			name: 'unknown_packet_08db', 
			length: 27, 
			log: 2,
			data: [
				{name: 'data', size: 25, type: 'byte', log: 1},
			],
		},
		0x08dc: {
			name: 'unknown_packet_08dc', 
			length: 26, 
			log: 2,
			data: [
				{name: 'data', size: 24, type: 'byte', log: 1},
			],
		},
		0x08dd: {
			name: 'unknown_packet_08dd', 
			length: 27, 
			log: 2,
			data: [
				{name: 'data', size: 25, type: 'byte', log: 1},
			],
		},
		0x08de: {
			name: 'unknown_packet_08de', 
			length: 27, 
			log: 2,
			data: [
				{name: 'data', size: 25, type: 'byte', log: 1},
			],
		},
		0x08df: {
			name: 'unknown_packet_08df', 
			length: 50, 
			log: 2,
			data: [
				{name: 'data', size: 48, type: 'byte', log: 1},
			],
		},
		0x08e0: {
			name: 'unknown_packet_08e0', 
			length: 51, 
			log: 2,
			data: [
				{name: 'data', size: 49, type: 'byte', log: 1},
			],
		},
		0x08e1: {
			name: 'unknown_packet_08e1', 
			length: 51, 
			log: 2,
			data: [
				{name: 'data', size: 49, type: 'byte', log: 1},
			],
		},
		0x08e2: {
			name: 'unknown_packet_08e2', 
			length: 25, 
			log: 2,
			data: [
				{name: 'data', size: 23, type: 'byte', log: 1},
			],
		},
		0x08e3: {
			name: 'unknown_packet_08e3', 
			length: 118, 
			log: 2,
			data: [
				{name: 'data', size: 116, type: 'byte', log: 1},
			],
		},
		0x08e4: {
			name: 'unknown_packet_08e4', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x08e5: {
			name: 'unknown_packet_08e5', 
			length: 41, 
			log: 2,
			data: [
				{name: 'data', size: 39, type: 'byte', log: 1},
			],
		},
		0x08e6: {
			name: 'unknown_packet_08e6', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x08e7: {
			name: 'unknown_packet_08e7', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x08e8: {
			name: 'unknown_packet_08e8', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x08e9: {
			name: 'unknown_packet_08e9', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x08ea: {
			name: 'unknown_packet_08ea', 
			length: 4, 
			log: 2,
			data: [
				{name: 'data', size: 2, type: 'byte', log: 1},
			],
		},
		0x08eb: {
			name: 'unknown_packet_08eb', 
			length: 39, 
			log: 2,
			data: [
				{name: 'data', size: 37, type: 'byte', log: 1},
			],
		},
		0x08ec: {
			name: 'unknown_packet_08ec', 
			length: 73, 
			log: 2,
			data: [
				{name: 'data', size: 71, type: 'byte', log: 1},
			],
		},
		0x08ed: {
			name: 'unknown_packet_08ed', 
			length: 43, 
			log: 2,
			data: [
				{name: 'data', size: 41, type: 'byte', log: 1},
			],
		},
		0x08ee: {
			name: 'unknown_packet_08ee', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x08ef: {
			name: 'unknown_packet_08ef', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x08f0: {
			name: 'unknown_packet_08f0', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x08f1: {
			name: 'unknown_packet_08f1', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x08f2: {
			name: 'unknown_packet_08f2', 
			length: 36, 
			log: 2,
			data: [
				{name: 'data', size: 34, type: 'byte', log: 1},
			],
		},
		0x08f3: {
			name: 'unknown_packet_08f3', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x08f4: {
			name: 'unknown_packet_08f4', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x08f5: {
			name: 'unknown_packet_08f5', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x08f6: {
			name: 'unknown_packet_08f6', 
			length: 22, 
			log: 2,
			data: [
				{name: 'data', size: 20, type: 'byte', log: 1},
			],
		},
		0x08f7: {
			name: 'unknown_packet_08f7', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x08f8: {
			name: 'unknown_packet_08f8', 
			length: 7, 
			log: 2,
			data: [
				{name: 'data', size: 5, type: 'byte', log: 1},
			],
		},
		0x08f9: {
			name: 'unknown_packet_08f9', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x08fa: {
			name: 'unknown_packet_08fa', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x08fb: {
			name: 'unknown_packet_08fb', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x08fc: {
			name: 'unknown_packet_08fc', 
			length: 30, 
			log: 2,
			data: [
				{name: 'data', size: 28, type: 'byte', log: 1},
			],
		},
		0x08fd: {
			name: 'unknown_packet_08fd', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x08fe: {
			name: 'unknown_packet_08fe', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x08ff: {
			name: 'actor_status_active_08ff', 
			length: 24, 
			log: 2,
			data: [
				{name: 'ID', size: 4, type: 'int', log: 2},
				{name: 'type', size: 2, type: 'int', log: 2},
				{name: 'tick', size: 4, type: 'int', log: 1},
				{name: 'unknown1', size: 4, type: 'int', log: 1},
				{name: 'unknown2', size: 4, type: 'int', log: 1},
				{name: 'unknown3', size: 4, type: 'int', log: 1},
			],
		},
		0x0900: {
			name: 'unknown_packet_0900', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0901: {
			name: 'unknown_packet_0901', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0902: {
			name: 'unknown_packet_0902', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0903: {
			name: 'unknown_packet_0903', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0904: {
			name: 'unknown_packet_0904', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0905: {
			name: 'unknown_packet_0905', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0906: {
			name: 'unknown_packet_0906', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0907: {
			name: 'unknown_packet_0907', 
			length: 5, 
			log: 2,
			data: [
				{name: 'data', size: 3, type: 'byte', log: 1},
			],
		},
		0x0908: {
			name: 'unknown_packet_0908', 
			length: 5, 
			log: 2,
			data: [
				{name: 'data', size: 3, type: 'byte', log: 1},
			],
		},
		0x0909: {
			name: 'unknown_packet_0909', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x090a: {
			name: 'unknown_packet_090a', 
			length: 26, 
			log: 2,
			data: [
				{name: 'data', size: 24, type: 'byte', log: 1},
			],
		},
		0x090b: {
			name: 'unknown_packet_090b', 
			length: 30, 
			log: 2,
			data: [
				{name: 'data', size: 28, type: 'byte', log: 1},
			],
		},
		0x090c: {
			name: 'unknown_packet_090c', 
			length: 30, 
			log: 2,
			data: [
				{name: 'data', size: 28, type: 'byte', log: 1},
			],
		},
		0x090d: {
			name: 'unknown_packet_090d', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x090e: {
			name: 'unknown_packet_090e', 
			length: 2, 
			log: 2,
			data: [
	  
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
				{name: 'coords', size: 3, type: 'coords', log: 1},
				{name: 'xSize', size: 1, type: 'int', log: 0},
				{name: 'ySize', size: 1, type: 'int', log: 0},
				{name: 'lv', size: 2, type: 'int', log: 2},
				{name: 'font', size: 2, type: 'int', log: 0},
				{name: 'opt4', size: 9, type: 'byte', log: 0},
				{name: 'name', size: -1, type: 'string', log: 2},
			],
		},
		0x0910: {
			name: 'unknown_packet_0910', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x0911: {
			name: 'unknown_packet_0911', 
			length: 30, 
			log: 2,
			data: [
				{name: 'data', size: 28, type: 'byte', log: 1},
			],
		},
		0x0912: {
			name: 'unknown_packet_0912', 
			length: 10, 
			log: 2,
			data: [
				{name: 'data', size: 8, type: 'byte', log: 1},
			],
		},
		0x0913: {
			name: 'unknown_packet_0913', 
			length: 30, 
			log: 2,
			data: [
				{name: 'data', size: 28, type: 'byte', log: 1},
			],
		},
		0x0914: {
			name: 'actor_moved_0914', 
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
				{name: 'opt3', size: 4, type: 'int', log: 1},
				{name: 'stance', size: 1, type: 'int', log: 0},
				{name: 'sex', size: 1, type: 'int', log: 0},
				{name: 'coords', size: 6, type: 'coordpair', log: 1},
				{name: 'xSize', size: 1, type: 'int', log: 0},
				{name: 'ySize', size: 1, type: 'int', log: 0},
				{name: 'lv', size: 2, type: 'int', log: 2},
				{name: 'font', size: 2, type: 'int', log: 0},
				{name: 'opt4', size: 9, type: 'byte', log: 1},
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
				{name: 'coords', size: 3, type: 'coords', log: 1},
				{name: 'xSize', size: 1, type: 'int', log: 0},
				{name: 'ySize', size: 1, type: 'int', log: 0},
				{name: 'act', size: 1, type: 'int', log: 2},
				{name: 'lv', size: 2, type: 'int', log: 2},
				{name: 'font', size: 2, type: 'int', log: 0},
				{name: 'opt4', size: 9, type: 'byte', log: 0},
				{name: 'name', size: -1, type: 'string', log: 2},
			],
		},
		0x0916: {
			name: 'unknown_packet_0916', 
			length: 26, 
			log: 2,
			data: [
				{name: 'data', size: 24, type: 'byte', log: 1},
			],
		},
		0x0917: {
			name: 'unknown_packet_0917', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0918: {
			name: 'unknown_packet_0918', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0919: {
			name: 'unknown_packet_0919', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x091a: {
			name: 'unknown_packet_091a', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x091b: {
			name: 'unknown_packet_091b', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x091c: {
			name: 'unknown_packet_091c', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x091d: {
			name: 'unknown_packet_091d', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x091e: {
			name: 'unknown_packet_091e', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x091f: {
			name: 'unknown_packet_091f', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0920: {
			name: 'unknown_packet_0920', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0921: {
			name: 'unknown_packet_0921', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0922: {
			name: 'unknown_packet_0922', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0923: {
			name: 'unknown_packet_0923', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0924: {
			name: 'unknown_packet_0924', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0925: {
			name: 'unknown_packet_0925', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0926: {
			name: 'unknown_packet_0926', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0927: {
			name: 'unknown_packet_0927', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0928: {
			name: 'unknown_packet_0928', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0929: {
			name: 'unknown_packet_0929', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x092a: {
			name: 'unknown_packet_092a', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x092b: {
			name: 'unknown_packet_092b', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x092c: {
			name: 'unknown_packet_092c', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x092d: {
			name: 'unknown_packet_092d', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x092e: {
			name: 'unknown_packet_092e', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x092f: {
			name: 'unknown_packet_092f', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0930: {
			name: 'unknown_packet_0930', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0931: {
			name: 'unknown_packet_0931', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0932: {
			name: 'unknown_packet_0932', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0933: {
			name: 'unknown_packet_0933', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0934: {
			name: 'unknown_packet_0934', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0935: {
			name: 'unknown_packet_0935', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0936: {
			name: 'unknown_packet_0936', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0937: {
			name: 'unknown_packet_0937', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0938: {
			name: 'unknown_packet_0938', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0939: {
			name: 'unknown_packet_0939', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x093a: {
			name: 'unknown_packet_093a', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x093b: {
			name: 'unknown_packet_093b', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x093c: {
			name: 'unknown_packet_093c', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x093d: {
			name: 'unknown_packet_093d', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x093e: {
			name: 'unknown_packet_093e', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x093f: {
			name: 'unknown_packet_093f', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0940: {
			name: 'unknown_packet_0940', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0941: {
			name: 'unknown_packet_0941', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0942: {
			name: 'unknown_packet_0942', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0943: {
			name: 'unknown_packet_0943', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0944: {
			name: 'unknown_packet_0944', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0945: {
			name: 'unknown_packet_0945', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0946: {
			name: 'unknown_packet_0946', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0947: {
			name: 'unknown_packet_0947', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0948: {
			name: 'unknown_packet_0948', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0949: {
			name: 'unknown_packet_0949', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x094a: {
			name: 'unknown_packet_094a', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x094b: {
			name: 'unknown_packet_094b', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x094c: {
			name: 'unknown_packet_094c', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x094d: {
			name: 'unknown_packet_094d', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x094e: {
			name: 'unknown_packet_094e', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x094f: {
			name: 'unknown_packet_094f', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0950: {
			name: 'unknown_packet_0950', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0951: {
			name: 'unknown_packet_0951', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0952: {
			name: 'unknown_packet_0952', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0953: {
			name: 'unknown_packet_0953', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0954: {
			name: 'unknown_packet_0954', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0955: {
			name: 'unknown_packet_0955', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0956: {
			name: 'unknown_packet_0956', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0957: {
			name: 'unknown_packet_0957', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0958: {
			name: 'unknown_packet_0958', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0959: {
			name: 'unknown_packet_0959', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x095a: {
			name: 'unknown_packet_095a', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x095b: {
			name: 'unknown_packet_095b', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x095c: {
			name: 'unknown_packet_095c', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x095d: {
			name: 'unknown_packet_095d', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x095e: {
			name: 'unknown_packet_095e', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x095f: {
			name: 'unknown_packet_095f', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0960: {
			name: 'unknown_packet_0960', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0961: {
			name: 'unknown_packet_0961', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0962: {
			name: 'unknown_packet_0962', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0963: {
			name: 'unknown_packet_0963', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0964: {
			name: 'unknown_packet_0964', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0965: {
			name: 'unknown_packet_0965', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0966: {
			name: 'unknown_packet_0966', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0967: {
			name: 'unknown_packet_0967', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0968: {
			name: 'unknown_packet_0968', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0969: {
			name: 'unknown_packet_0969', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x096a: {
			name: 'unknown_packet_096a', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x096b: {
			name: 'unknown_packet_096b', 
			length: 3, 
			log: 2,
			data: [
				{name: 'data', size: 1, type: 'byte', log: 1},
			],
		},
		0x096c: {
			name: 'unknown_packet_096c', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x096d: {
			name: 'unknown_packet_096d', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x096e: {
			name: 'unknown_packet_096e', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x096f: {
			name: 'unknown_packet_096f', 
			length: 7, 
			log: 2,
			data: [
				{name: 'data', size: 5, type: 'byte', log: 1},
			],
		},
		0x0970: {
			name: 'unknown_packet_0970', 
			length: 31, 
			log: 2,
			data: [
				{name: 'data', size: 29, type: 'byte', log: 1},
			],
		},
		0x0971: {
			name: 'unknown_packet_0971', 
			length: 6, 
			log: 2,
			data: [
				{name: 'data', size: 4, type: 'byte', log: 1},
			],
		},
		0x0972: {
			name: 'unknown_packet_0972', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0973: {
			name: 'unknown_packet_0973', 
			length: 7, 
			log: 2,
			data: [
				{name: 'data', size: 5, type: 'byte', log: 1},
			],
		},
		0x0974: {
			name: 'unknown_packet_0974', 
			length: 2, 
			log: 2,
			data: [
	  
			],
		},
		0x0975: {
			name: 'unknown_packet_0975', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0976: {
			name: 'unknown_packet_0976', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0977: {
			name: 'monster_hp', 
			length: 14, 
			log: 2,
			data: [
				{name: 'ID', size: 4, type: 'int', log: 1},
				{name: 'hp', size: 4, type: 'int', log: 1},
				{name: 'maxHp', size: 4, type: 'int', log: 1},
			],
		},
		0x097a: {
			name: 'quest_all_list2', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'count', size: 2, type: 'int', log: 2},
				{name: 'unknown', size: 2, type: 'int', log: 2},
				{name: 'message', size: -1, type: 'string', log: 1},
			],
		},
		0x097b: {
			name: 'rates_info2', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'exp', size: 2, type: 'int', log: 2},
				{name: 'death', size: 2, type: 'int', log: 2},
				{name: 'drop', size: 2, type: 'int', log: 2},
				{name: 'detail', size: -1, type: 'string', log: 2},
			],
		},
		0x0983: {
			name: 'actor_status_active_0983', 
			length: 29, 
			log: 2,
			data: [
				{name: 'type', size: 2, type: 'int', log: 2},
				{name: 'ID', size: 4, type: 'int', log: 2},
				{name: 'flag', size: 1, type: 'int', log: 2},
				{name: 'total', size: 4, type: 'int', log: 2},
				{name: 'tick', size: 4, type: 'int', log: 2},
				{name: 'unknown1', size: 4, type: 'int', log: 1},
				{name: 'unknown2', size: 4, type: 'int', log: 1},
				{name: 'unknown3', size: 4, type: 'int', log: 1},
			],
		},
		0x0984: {
			name: 'unknown_packet_0984', 
			length: 28, 
			log: 2,
			data: [
				{name: 'data', size: 26, type: 'byte', log: 1},
			],
		},
		0x0990: {
			name: 'inventory_item_added', 
			length: 31, 
			log: 2,
			data: [
				{name: 'index', size: 2, type: 'int', log: 2},
				{name: 'amount', size: 2, type: 'int', log: 2},
				{name: 'itemId', size: 2, type: 'int', log: 2},
				{name: 'identified', size: 1, type: 'int', log: 2},
				{name: 'broken', size: 1, type: 'int', log: 2},
				{name: 'upgrade', size: 1, type: 'int', log: 2},
				{name: 'cards', size: 8, type: 'byte', log: 2},
				{name: 'type_equip', size: 4, type: 'int', log: 2},
				{name: 'type', size: 1, type: 'int', log: 2},
				{name: 'fail', size: 1, type: 'int', log: 2},
				{name: 'expire', size: 4, type: 'int', log: 2},
				{name: 'unknown', size: 2, type: 'int', log: 2},
			],
		},
		0x0991: {
			name: 'inventory_items_stackable', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'itemInfo', size: -1, type: 'array', log: 2, struct: {
						size: 24,
						data: [
							{name: 'index', size: 2, type: 'int', log: 1},
							{name: 'itemId', size: 2, type: 'int', log: 2},
							{name: 'type', size: 1, type: 'int', log: 1},
							{name: 'amount', size: 2, type: 'int', log: 2},
							{name: 'wear_state', size: 4, type: 'byte', log: 0},
							{name: 'card1', size: 2, type: 'int', log: 0},
							{name: 'card2', size: 2, type: 'int', log: 0},
							{name: 'card3', size: 2, type: 'int', log: 0},
							{name: 'card4', size: 2, type: 'int', log: 0},
							{name: 'expiration', size: 4, type: 'int', log: 0},
							{name: 'flags', size: 1, type: 'int', log: 0},
						]
					}
				}, //(index itemId type amount wear_state card1 card2 card3 card4 expiration flags)(v v C v a4 v4 V C)
			],
		},
		0x0992: {
			name: 'inventory_items_nonstackable', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'itemInfo', size: -1, type: 'byte', log: 1},
			],
		},
		0x0993: {
			name: 'cart_items_stackable', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'itemInfo', size: -1, type: 'array', log: 2, struct: {
						size: 24,
						data: [
							{name: 'index', size: 2, type: 'int', log: 1},
							{name: 'itemId', size: 2, type: 'int', log: 2},
							{name: 'type', size: 1, type: 'int', log: 1},
							{name: 'amount', size: 2, type: 'int', log: 2},
							{name: 'wear_state', size: 4, type: 'byte', log: 0},
							{name: 'card1', size: 2, type: 'int', log: 0},
							{name: 'card2', size: 2, type: 'int', log: 0},
							{name: 'card3', size: 2, type: 'int', log: 0},
							{name: 'card4', size: 2, type: 'int', log: 0},
							{name: 'expiration', size: 4, type: 'int', log: 0},
							{name: 'flags', size: 1, type: 'int', log: 0},
						]
					}
				},
			],
		},
		0x0994: {
			name: 'cart_items_nonstackable', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'itemInfo', size: -1, type: 'byte', log: 2},
			],
		},
		0x0995: {
			name: 'storage_items_stackable', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'name', size: 24, type: 'string', log: 2},
				{name: 'itemInfo', size: -1, type: 'array', log: 2, struct: {
						size: 24,
						data: [
							{name: 'index', size: 2, type: 'int', log: 1},
							{name: 'itemId', size: 2, type: 'int', log: 2},
							{name: 'type', size: 1, type: 'int', log: 1},
							{name: 'amount', size: 2, type: 'int', log: 2},
							{name: 'wear_state', size: 4, type: 'byte', log: 0},
							{name: 'card1', size: 2, type: 'int', log: 0},
							{name: 'card2', size: 2, type: 'int', log: 0},
							{name: 'card3', size: 2, type: 'int', log: 0},
							{name: 'card4', size: 2, type: 'int', log: 0},
							{name: 'expiration', size: 4, type: 'int', log: 0},
							{name: 'flags', size: 1, type: 'int', log: 0},
						]
					}
				}, //(index itemId type amount wear_state card1 card2 card3 card4 expiration flags)(v v C v a4 v4 V C)
			],
		},
		0x0996: {
			name: 'storage_items_nonstackable', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'itemInfo', size: -1, type: 'byte', log: 2},
			],
		},
		0x0997: {
			name: 'character_equip', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'name', size: 24, type: 'string', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 2},
			],
		},
		0x0999: {
			name: 'equip_item', 
			length: 11, 
			log: 2,
			data: [
				{name: 'index', size: 2, type: 'int', log: 2},
				{name: 'type', size: 4, type: 'int', log: 2},
				{name: 'viewId', size: 2, type: 'int', log: 2},
				{name: 'success', size: 1, type: 'int', log: 2},
			],
		},
		0x099a: {
			name: 'unequip_item', 
			length: 9, 
			log: 2,
			data: [
				{name: 'index', size: 2, type: 'int', log: 2},
				{name: 'type', size: 4, type: 'int', log: 2},
				{name: 'success', size: 1, type: 'int', log: 2},
			],
		},
		0x099b: {
			name: 'unequip_item', 
			length: 8, 
			log: 2,
			data: [
				{name: 'type', size: 4, type: 'int', log: 2},
				{name: 'info_table', size: 4, type: 'int', log: 2},
			],
		},
		0x09ca: {
			name: 'skill_entry', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'unitId', size: 4, type: 'int', log: 2},
				{name: 'sourceId', size: 4, type: 'int', log: 2},
				{name: 'x', size: 2, type: 'int', log: 2},
				{name: 'y', size: 2, type: 'int', log: 2},
				{name: 'job', size: 4, type: 'int', log: 2},
				{name: 'radius', size: 1, type: 'int', log: 2},
				{name: 'visible', size: 1, type: 'int', log: 2},
				{name: 'level', size: 1, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x099d: {
			name: 'received_characters', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x09db: {
			name: 'actor_moved_09db', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 1},
				{name: 'object_type', size: 1, type: 'int', log: 1},
				{name: 'ID', size: 4, type: 'int', log: 2},
				{name: 'unknown1', size: 4, type: 'byte', log: 1},
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
				{name: 'opt3', size: 4, type: 'int', log: 1},
				{name: 'stance', size: 1, type: 'int', log: 0},
				{name: 'sex', size: 1, type: 'int', log: 0},
				{name: 'coords', size: 6, type: 'coordpair', log: 1},
				{name: 'xSize', size: 1, type: 'int', log: 0},
				{name: 'ySize', size: 1, type: 'int', log: 0},
				{name: 'lv', size: 2, type: 'int', log: 2},
				{name: 'font', size: 2, type: 'int', log: 0},
				{name: 'opt4', size: 9, type: 'byte', log: 1},
				{name: 'name', size: -1, type: 'string', log: 2},
			],
		},
		0x09dc: {
			name: 'actor_connected_09dc', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 1},
				{name: 'object_type', size: 1, type: 'int', log: 1},
				{name: 'ID', size: 4, type: 'int', log: 2},
				{name: 'charId', size: 4, type: 'int', log: 2},
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
				{name: 'coords', size: 3, type: 'coords', log: 1},
				{name: 'xSize', size: 1, type: 'int', log: 0},
				{name: 'ySize', size: 1, type: 'int', log: 0},
				{name: 'lv', size: 2, type: 'int', log: 2},
				{name: 'font', size: 2, type: 'int', log: 0},
				{name: 'opt4', size: 9, type: 'byte', log: 0},
				{name: 'name', size: -1, type: 'string', log: 2},
			],
		},
		0x09dd: {
			name: 'actor_exists_09dd', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'object_type', size: 1, type: 'int', log: 1},
				{name: 'ID', size: 4, type: 'int', log: 2},
				{name: 'unknown1', size: 4, type: 'int', log: 2},
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
				{name: 'coords', size: 3, type: 'coords', log: 1},
				{name: 'xSize', size: 1, type: 'int', log: 0},
				{name: 'ySize', size: 1, type: 'int', log: 0},
				{name: 'act', size: 1, type: 'int', log: 2},
				{name: 'lv', size: 2, type: 'int', log: 2},
				{name: 'font', size: 2, type: 'int', log: 0},
				{name: 'opt4', size: 9, type: 'byte', log: 0},
				{name: 'name', size: -1, type: 'string', log: 2},
			],
		},
		0x09de: {
			name: 'private_message', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'ID', size: 4, type: 'int', log: 2},
				{name: 'name', size: 25, type: 'string', log: 2},
				{name: 'msg', size: -1, type: 'string', log: 1},
			],
		},
		0x09f8: {
			name: 'unknown_packet_09f8', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'data', size: -1, type: 'byte', log: 1},
			],
		},
		0x0a0a: {
			name: 'storage_item_added2', 
			length: 47, 
			log: 2,
			data: [
				{name: 'index', size: 2, type: 'int', log: 1},
				{name: 'amount', size: 4, type: 'int', log: 2},
				{name: 'itemId', size: 2, type: 'int', log: 2},
				{name: 'type', size: 1, type: 'int', log: 1},
				{name: 'identified', size: 1, type: 'int', log: 1},
				{name: 'broken', size: 1, type: 'int', log: 1},
				{name: 'upgrade', size: 1, type: 'int', log: 2},
				{name: 'cards', size: 8, type: 'byte', log: 2},
				{name: 'data', size: 25, type: 'int', log: 2},
			],
		},
		0x0a0b: {
			name: 'cart_item_added2', 
			length: 47, 
			log: 2,
			data: [
				{name: 'index', size: 2, type: 'int', log: 2},
				{name: 'amount', size: 4, type: 'int', log: 2},
				{name: 'itemId', size: 2, type: 'int', log: 2},
				{name: 'type', size: 1, type: 'int', log: 2},
				{name: 'identified', size: 1, type: 'int', log: 2},
				{name: 'broken', size: 1, type: 'int', log: 2},
				{name: 'upgrade', size: 1, type: 'int', log: 2},
				{name: 'cards', size: 8, type: 'byte', log: 2},
				{name: 'data', size: 25, type: 'int', log: 2},
			],
		},
		0x0a0c: {
			name: 'inventory_item_added2', 
			length: 56, 
			log: 2,
			data: [
				{name: 'index', size: 2, type: 'int', log: 2},
				{name: 'amount', size: 2, type: 'int', log: 2},
				{name: 'itemId', size: 2, type: 'int', log: 2},
				{name: 'identified', size: 1, type: 'int', log: 2},
				{name: 'broken', size: 1, type: 'int', log: 2},
				{name: 'upgrade', size: 1, type: 'int', log: 2},
				{name: 'cards', size: 8, type: 'byte', log: 2},
				{name: 'type_equip', size: 4, type: 'int', log: 2},
				{name: 'type', size: 1, type: 'int', log: 2},
				{name: 'fail', size: 1, type: 'int', log: 2},
				{name: 'expire', size: 4, type: 'int', log: 2},
				{name: 'unknown', size: 2, type: 'int', log: 2},
				{name: 'data', size: 25, type: 'int', log: 2},
			],
		},
		0x0a0d: {
			name: 'inventory_items_nonstackable2', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'itemInfo', size: -1, type: 'array', log: 2, struct: {
						size: 57,
						data: [
							{name: 'index', size: 2, type: 'int', log: 1},
							{name: 'itemId', size: 2, type: 'int', log: 2},
							{name: 'type', size: 1, type: 'int', log: 1},
							{name: 'location', size: 4, type: 'int', log: 1}, // bit flags for position
							{name: 'wear_state', size: 4, type: 'int', log: 1},
							{name: 'upgrade', size: 1, type: 'int', log: 1},
							{name: 'card1', size: 2, type: 'int', log: 1},
							{name: 'card2', size: 2, type: 'int', log: 1},
							{name: 'card3', size: 2, type: 'int', log: 1},
							{name: 'card4', size: 2, type: 'int', log: 1},
							{name: 'expiration', size: 4, type: 'int', log: 0},
							{name: 'equip_type', size: 2, type: 'int', log: 1},
							{name: 'sprite_number', size: 2, type: 'int', log: 1},
							{name: 'rnd_index', size: 2, type: 'int', log: 1},
							{name: 'rnd_value', size: 2, type: 'int', log: 1},
							{name: 'rnd_param', size: 1, type: 'int', log: 1},
							{name: 'flags', size: 1, type: 'int', log: 1},
							{name: 'unknown', size: 22, type: 'int', log: 1},
						]
					}
				}, //(index itemId type amount wear_state card1 card2 card3 card4 expiration flags)(v v C v a4 v4 V C)
			],
		},
		0x0a0f: {
			name: 'cart_items_nonstackable2', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'itemInfo', size: -1, type: 'array', log: 2, struct: {
						size: 57,
						data: [
							{name: 'index', size: 2, type: 'int', log: 1},
							{name: 'itemId', size: 2, type: 'int', log: 2},
							{name: 'type', size: 1, type: 'int', log: 1},
							{name: 'location', size: 4, type: 'int', log: 1},
							{name: 'wear_state', size: 4, type: 'int', log: 1},
							{name: 'upgrade', size: 1, type: 'int', log: 1},
							{name: 'card1', size: 2, type: 'int', log: 1},
							{name: 'card2', size: 2, type: 'int', log: 1},
							{name: 'card3', size: 2, type: 'int', log: 1},
							{name: 'card4', size: 2, type: 'int', log: 1},
							{name: 'expiration', size: 4, type: 'int', log: 0},
							{name: 'equip_type', size: 2, type: 'int', log: 1},
							{name: 'sprite_number', size: 2, type: 'int', log: 1},
							{name: 'rnd_index', size: 2, type: 'int', log: 1},
							{name: 'rnd_value', size: 2, type: 'int', log: 1},
							{name: 'rnd_param', size: 1, type: 'int', log: 1},
							{name: 'flags', size: 1, type: 'int', log: 1},
							{name: 'unknown', size: 22, type: 'int', log: 1},
						]
					}
				}, //(index itemId type amount wear_state card1 card2 card3 card4 expiration flags)(v v C v a4 v4 V C)
			],
		},
		0x0a10: {
			name: 'storage_items_nonstackable2', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'name', size: 24, type: 'string', log: 2},
				{name: 'itemInfo', size: -1, type: 'array', log: 2, struct: {
						size: 57,
						data: [
							{name: 'index', size: 2, type: 'int', log: 1},
							{name: 'itemId', size: 2, type: 'int', log: 2},
							{name: 'type', size: 1, type: 'int', log: 1},
							{name: 'location', size: 4, type: 'int', log: 1}, // bit flags for position
							{name: 'wear_state', size: 4, type: 'int', log: 1},
							{name: 'upgrade', size: 1, type: 'int', log: 1},
							{name: 'card1', size: 2, type: 'int', log: 1},
							{name: 'card2', size: 2, type: 'int', log: 1},
							{name: 'card3', size: 2, type: 'int', log: 1},
							{name: 'card4', size: 2, type: 'int', log: 1},
							{name: 'expiration', size: 4, type: 'int', log: 0},
							{name: 'equip_type', size: 2, type: 'int', log: 1},
							{name: 'sprite_number', size: 2, type: 'int', log: 1},
							{name: 'rnd_index', size: 2, type: 'int', log: 1},
							{name: 'rnd_value', size: 2, type: 'int', log: 1},
							{name: 'rnd_param', size: 1, type: 'int', log: 1},
							{name: 'flags', size: 1, type: 'int', log: 1},
							{name: 'unknown', size: 22, type: 'int', log: 1},
						]
					}
				}, //(index itemId type amount wear_state card1 card2 card3 card4 expiration flags)(v v C v a4 v4 V C)
			],
		},
		0x0a3b: {
			name: 'misc_effect', 
			length: -1, 
			log: 2,
			data: [
				{name: 'len', size: 2, type: 'int', log: 2},
				{name: 'ID', size: 4, type: 'int', log: 2},
				{name: 'flag', size: 1, type: 'int', log: 2},
				{name: 'effect', size: -1, type: 'byte', log: 2},
			],
		},
	};

	for(var i in RECV){
		var packetDef = RECV[i];
		packetDef.datamap = {};
		var startIndex = 2;
		for(var i = 0; i < packetDef.data.length; i++){
			var data = packetDef.data[i];
			var endIndex = data.size > 0 ? startIndex + data.size : -1;
			packetDef.datamap[data.name] = {index: i, start: startIndex, end: endIndex, type: data.type, log: data.log};
			startIndex = endIndex;
		}
	}


	function CreateRecvPacketBuffer(header, data){
		if(RECV.hasOwnProperty(header)){
			var packetDef = RECV[header];
			for(var i = 0; i < packetDef.length; i++){
				var buf = new Buffer(packetDef.length);
				buf[0] = header & 0xff;
				buf[1] = (header >> 8) & 0xff;
				for(var i = 2; i < packetDef.length; i++){
					buf[i] = 0;
				}
				return bufutil._CreatePacket(buf, packetDef, data);
			}
		}
		else{
			return null;
		}
	}

	return {
		'RECV': RECV,
		'CreateRecvPacketBuffer': CreateRecvPacketBuffer,
	}

});