'use strict';

define(function(require){

	var RES_MODIFY = 0;
	var RES_DROP = 1;
	var RES_CLIENT = 2;
	var RES_SERVER = 3;
	var RES_SPEECH = 4;

	var homunIds = new Set([6001, 6009, 6002, 6010, 6003, 6011, 6004, 6012, 6005, 6013, 6006, 6014, 6007, 6015, 6008, 6016, 6017, 6018, 6019, 6020, 6021, 6048, 6049, 6050, 6051, 6052, 2114, 2116, 2117, 2118, 2119, 2120, 2121, 2122, 2123, 2124, 2125]);

	var RECVMOD = {
		// on packet recv:
		// respond with 1 or more of:
		//		1. modify			(cheat: bool, type: modify, data: obj)
		//		2. drop				(cheat: bool, type: drop)
		//		3. send to client 	(cheat: bool, type: client, delay: int, send: header, inField: str, myField: str, useMine: bool, data: obj)
		//		4. send to server 	(cheat: bool, type: server, send: header, data: obj)
		
	//	0x00b0: [
	//		{
	//			filter: {type: 53}, // Identify unidentified items that exist
	//			useAccount: {field: null, useMine: false}, 
	//			response: [
	//				{cheat: true, type: RES_MODIFY, data: {val: 50}},
	//			],
	//		},
	//	],

	//	0x0092: [
	//		{
	//			filter: {map: 'prontera.gat'}, // Identify unidentified items that exist
	//			useAccount: {field: null, useMine: false}, 
	//			response: [
	//				{cheat: true, type: RES_MODIFY, data: {map: 'payon.gat'}},
	//			],
	//		},
	//	],
		
		0x009d: [
			{
				filter: {identified: 0}, // Identify unidentified items that exist
				useAccount: {field: null, useMine: false}, 
				response: [
					{cheat: true, type: RES_MODIFY, data: {identified: 1}},
				],
			},
		],
		
		
		0x009e: [
			{
				filter: {identified: 0}, // Identify unidentified items that drop
				useAccount: {field: null, useMine: false}, 
				response: [
					{cheat: true, type: RES_MODIFY, data: {
						identified: 1, 
						//x: function(accountInfo){ return accountInfo.x; }, 
						//y: function(accountInfo){ return accountInfo.y; }, 
					}},
				],
			},
		],
		
	//	0x00b5: [ // npc_talk_continue
	//		{
	//			filter: {}, // Identify unidentified items that drop
	//			useAccount: {field: null, useMine: false}, 
	//			response: [
	//				{cheat: true, type: RES_SERVER, send: 0x00b9, delay: 0, inField: 'ID', myField:'ID', useMine: false, data: {}}, 
	//			],
	//		},
	//	],
		
	//	0x00b6: [ // npc_talk_close
	//		{
	//			filter: {}, // Identify unidentified items that drop
	//			useAccount: {field: null, useMine: false}, 
	//			response: [
	//				{cheat: true, type: RES_SERVER, send: 0x0146, delay: 0, inField: 'ID', myField:'ID', useMine: false, data: {}}, 
	//			],
	//		},
	//	],

		0x0117: [
			{
				filter: {skillId: function(x){ 
					var dropSkills = new Set([5004, 2008]);
					return dropSkills.has(x);
				}}, // cast Water Dragon Breath, Dragon Breath, Fiberlock
				useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
				response: [
					{cheat: true, type: RES_DROP},
				],
			},
			{
				filter: {skillId: function(x){ 
					var dropSkills = new Set([83, 85, 89, 286]);
					return dropSkills.has(x);
				}}, // cast Meteor Storm, LoV, Storm Gust, Deluge
				useAccount: {field: null, useMine: true}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_DROP},
				],
			},
	//		{
	//			filter: {skillId: 25}, // cast Pneuma
	//			useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
	//			response: [
	//				{cheat: true, type: RES_MODIFY, data: {skillId: 156}},
	//			],
	//		},
		],
		
		0x011a: [
			{
				filter: {skillId: function(x){ 
					var dropSkills = new Set([28, 51, 214, 364, 1005, 2477]);
					return dropSkills.has(x);
				}}, // cast Guard
				useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
				response: [
					{cheat: true, type: RES_DROP},
				],
			},
			{
				filter: {skillId: function(x){ 
					var dropSkills = new Set([33, 75, 356, 2041, 2042, 2045, 2047, 2048, 5041]);
					return dropSkills.has(x);
				}}, // cast Guard
				useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_DROP},
				],
			},
			{
				filter: { skillId: 5029 }, // cast SV Root
				useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
				response: [
					//{cheat: false, type: RES_DROP},
					{cheat: false, type: RES_CLIENT, send: 0x01de, delay: 0, inField: 'targetId', outField: 'targetId', myField:'sourceId', useMine: true, data: {skillId: 5029, src_speed: 100, dst_speed: 1, damage: -100, level: 1, option: 0, type: 8}},
	                //[Skill: Unknown Skill 5033] [sourceId: 3802723] [targetId: 56093] [tick: 289136454] [src_speed: 270] [dst_speed: 1] [damage: 0] [level: 5] [option: 5] [type: 8]
				],
			},
			{
				filter: { skillId: 5032 }, // cast Scar of Tarou
				useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
				response: [
					//{cheat: false, type: RES_DROP},
					{cheat: false, type: RES_CLIENT, send: 0x01de, delay: 0, inField: 'targetId', outField: 'targetId', myField:'sourceId', useMine: true, data: {skillId: 5032, src_speed: 100, dst_speed: 1, damage: -100, level: 1, option: 0, type: 8}},
	                //[Skill: Unknown Skill 5033] [sourceId: 3802723] [targetId: 56093] [tick: 289136454] [src_speed: 270] [dst_speed: 1] [damage: 0] [level: 5] [option: 5] [type: 8]
				],
			},
	//		{
	//			filter: { skillId: 5035 }, // cast Arclouze Dash
	//			useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
	//			response: [
	//				//{cheat: false, type: RES_DROP},
	//				{cheat: false, type: RES_CLIENT, send: 0x01de, delay: 0, inField: 'targetId', outField: 'targetId', myField:'sourceId', useMine: true, data: {skillId: 5035, src_speed: 100, dst_speed: 1, damage: -100, level: 1, option: 0, type: 8}},
	//                //[Skill: Unknown Skill 5033] [sourceId: 3802723] [targetId: 56093] [tick: 289136454] [src_speed: 270] [dst_speed: 1] [damage: 0] [level: 5] [option: 5] [type: 8]
	//			],
	//		},
	//		{
	//			filter: { skillId: 405 }, // cast Fiber Lock
	//			useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
	//			response: [
	//				{cheat: true, type: RES_DROP},
	//				{cheat: true, type: RES_CLIENT, send: 0x01de, delay: 0, inField: 'targetId', outField: 'targetId', myField:'sourceId', useMine: true, data: {skillId: 405, src_speed: 100, dst_speed: 1, damage: 1, level: 1, option: 0, type: 8}},
	//                //[Skill: Unknown Skill 5033] [sourceId: 3802723] [targetId: 56093] [tick: 289136454] [src_speed: 270] [dst_speed: 1] [damage: 0] [level: 5] [option: 5] [type: 8]
	//			],
	//		},
		],
		0x0196: [
			{
				filter: {type: 417, flag: 0}, // when CC ends on me
				useAccount: {field: 'ID', useMine: true}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_SPEECH, delay: 0, data: {msg: 'freedom'}},
				],
			},
			{
				filter: {type: 394, flag: 0}, // when my shadow form ends
				useAccount: {field: 'ID', useMine: true}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_SPEECH, delay: 0, data: {msg: 'revealed'}},
				],
			},
			{
				filter: {type: 893, flag: 0}, // when my stoop ends
				useAccount: {field: 'ID', useMine: true}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_SPEECH, delay: 0, data: {msg: 'vulnerable'}},
				],
			},
			{
				filter: {type: 613, flag: 0}, // when my stoop ends
				useAccount: {field: 'ID', useMine: true}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_SPEECH, delay: 3000, data: {msg: 'mount'}},
				],
			},
		],
	    
	    0x01a4: [
	        {
				filter: {type: 2, data: function(x) { return x < 60; } }, // when pet hunger is below 60
				useAccount: {field: null, useMine: false}, 
				response: [
					{cheat: false, type: RES_SPEECH, delay: 0, data: {msg: 'hungry'}},
	                //{cheat: true, type: RES_SERVER, send: 0x01a1, delay: 0, data: {option: 1}}, // feed pet
				],
			},
	    ],
		
	//	0x01c8: [
	//		{
	//			filter: {itemId: 12622}, // use Halter Lead 30 days
	//			useAccount: {field: 'ID', useMine: true},
	//			response: [
	//				{cheat: false, type: RES_SPEECH, delay: 3000, data: {msg: 'mount'}},
	//			],
	//		},
	//	],

		0x01de: [
			{
				filter: {skillId: 421}, // cast flying kick
				useAccount: {field: null, useMine: true}, // make sure this field is my own account
				response: [
					{cheat: true, type: RES_MODIFY, data: {skillId: 93, option: 0}}, // replace with Sense, and make it 1 hit
					//{cheat: true, type: RES_SERVER, send: 0x0113, delay: 300, inField: 'targetId', myField:'targetId', useMine: false, data: {skillId: 2294, lv: 3}}, 
					//{cheat: true, type: RES_SERVER, send: 0x0113, delay: 300, inField: 'targetId', myField:'targetId', useMine: false, data: {skillId: 2297, lv: 3}}, 
				],
			},
			{
				filter: {skillId: 86}, // cast waterball
				useAccount: {field: null, useMine: false}, // make sure this field is my own account
				response: [
					{cheat: true, type: RES_MODIFY, data: {option: 0, type: 5, src_speed: 100}}, // replace with Sense, and make it 1 hit
					//{cheat: false, type: RES_SPEECH, delay: 0, data: {msg: 'waterball'}},
					//{cheat: true, type: RES_SERVER, send: 0x0113, delay: 300, inField: 'targetId', myField:'targetId', useMine: false, data: {skillId: 2294, lv: 3}}, 
					//{cheat: true, type: RES_SERVER, send: 0x0113, delay: 300, inField: 'targetId', myField:'targetId', useMine: false, data: {skillId: 2297, lv: 3}}, 
				],
			},
			{
				filter: {
					skillId: function(x){ 
						// make skills a single hit
						// crimson rock
						var dropSkills = new Set([2211]);
						return dropSkills.has(x);
					},
				},				// drop cart cannon
				useAccount: {field: null, useMine: true}, // make sure this field is my own account
				response: [
					{cheat: true, type: RES_MODIFY, data: {option: 0}}, // make it 1 hit
				],
			},
	//		{
	//			filter: { skillId: 5033},	// drop picky peck
	//			useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
	//			response: [
	//				{cheat: true, type: RES_MODIFY, data: {option: 0, src_speed: 100}}, //  make it 1 hit
	//			],
	//		},
			{
				filter: { skillId: 5033, src_speed: function(x) { return x > 100; } },	// drop picky peck
				useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
				response: [
					{cheat: true, type: RES_MODIFY, data: {option: 0, src_speed: 100}}, //  make it 1 hit
				],
			},
	//		{
	//			filter: { skillId: 5029 },	// SV Root
	//			useAccount: {field: 'sourceId', useMine: false}, // make sure this field is my own account
	//			response: [
	//				{cheat: false, type: RES_SPEECH, delay: 0, data: {msg: 'replace'}},
	//				{cheat: false, type: RES_MODIFY, data: {skillId: 5033, option: 1, src_speed: 100}}, //  make it 1 hit
	//			],
	//		},
			{
				filter: {skillId: 5033, src_speed: function(x) { return x > 100; } },	// drop picky peck
				useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_MODIFY, data: {src_speed: 100}}, //  make it 1 hit
				],
			},
			{
				filter: {src_speed: function(x) { return x > 100; } },	// speed up anything
				useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_MODIFY, data: {src_speed: 100}}, //  make it 1 hit
				],
			},
			{
				filter: {dst_speed: function(x) { return x > 100; } }, // when someone uses a skill on me
				useAccount: {field: 'targetId', useMine: true}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_MODIFY, data: {dst_speed: 100}}, //  speed this up
				],
			},
			{
				filter: {skillId: 2008, sourceId: function(x, info) { return info.accountId !== x}, targetId: function(x, info) { return info.accountId !== x} }, // cast dragon breath
				useAccount: {field: null, useMine: false}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_MODIFY, data: {skillId: 93}}, // replace with Sense
					{cheat: false, type: RES_CLIENT, send: 0x011a, delay: 0, inField: 'sourceId', outField: ['sourceId', 'targetId'], myField: null, useMine: false, data: {skillId: 2008, lv: 10}}, 
				],
			},
			{
				filter: {skillId: 5004, sourceId: function(x, info) { return info.accountId !== x}, targetId: function(x, info) { return info.accountId !== x} }, // cast water dragon breath
				useAccount: {field: null, useMine: false}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_MODIFY, data: {skillId: 93}}, // replace with Sense
					{cheat: false, type: RES_CLIENT, send: 0x011a, delay: 0, inField: 'sourceId', outField: ['sourceId', 'targetId'], myField: null, useMine: false, data: {skillId: 5004, lv: 10}}, 
				],
			},
	//		{
	//			filter: {skillId: 5004}, // cast water dragon breath
	//			useAccount: {field: null, useMine: false}, // make sure this field is my own account
	//			response: [
	//				{cheat: true, type: RES_MODIFY, data: {skillId: 15}}, // replace with Frost Diver
	//			],
	//		},
	//		{
	//			filter: {skillId: 2008}, // cast fire dragon breath
	//			useAccount: {field: null, useMine: false}, // make sure this field is my own account
	//			response: [
	//				{cheat: true, type: RES_MODIFY, data: {skillId: 534}}, // replace with Frost Diver
	//			],
	//		},
	//		{
	//			filter: {skillId: 2332, cheat: true, type: 6}, // cast Rampage Blast
	//			useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
	//			response: [
	//				{cheat: true, type: RES_DROP},
	//			],
	//		},
	//		{
	//			filter: {skillId: 2332, cheat: true, type: 5}, // cast Rampage Blast
	//			useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
	//			response: [
	//				{cheat: true, type: RES_MODIFY, data: {skillId: 413}}, replace with Tornado Kick for Blue Crit
	//			],
	//		},
		],

	//	0x0229: [
	//		{
	//			filter: {option: 64, opt1: 0, opt2: 0}, // cast Full Divest
	//			useAccount: {field: 'ID', useMine: false}, // make sure this field is my own account
	//			response: [
	//				{cheat: true, type: RES_MODIFY, data: {option: 0}}, // replace with Divest Shield
	//			],
	//		},
	//	],
		0x02bb: [
			{
				filter: { }, // cast Full Divest
				useAccount: {field: 'ID', useMine: true}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_SPEECH, delay: 0, data: {msg: 'item damaged'}},
				],
			},
		],
		0x02e1: [
			{
				filter: { dst_speed: function(x){ return x > 100; } }, 
				useAccount: {field: 'targetId', useMine: true}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_MODIFY, data: {dst_speed: 100}}, //  speed this up
				],
			},
		],
		0x043d: [
			{
				filter: {skillId: 2304}, // Feint bomb
				useAccount: {field: null, useMine: false}, 
				response: [
					{cheat: true, type: RES_CLIENT, send: 0x01d0, delay: 0, inField: null, myField:'sourceId', useMine: true, data: {entity: 5}}, // show spirit spheres on cooldown start
					{cheat: true, type: RES_CLIENT, send: 0x01d0, delay: 1000, inField: null, myField:'sourceId', useMine: true, data: {entity: 4}}, 
					{cheat: true, type: RES_CLIENT, send: 0x01d0, delay: 2000, inField: null, myField:'sourceId', useMine: true, data: {entity: 3}}, 
					{cheat: true, type: RES_CLIENT, send: 0x01d0, delay: 3000, inField: null, myField:'sourceId', useMine: true, data: {entity: 2}}, 
					{cheat: true, type: RES_CLIENT, send: 0x01d0, delay: 4000, inField: null, myField:'sourceId', useMine: true, data: {entity: 1}}, 
					{cheat: true, type: RES_CLIENT, send: 0x01d0, delay: 5000, inField: null, myField:'sourceId', useMine: true, data: {entity: 0}}, // remove spirit spheres on cooldown end
					//{cheat: true, type: RES_CLIENT, send: 0x010c, delay: 5000, inField: null, myField:'ID', useMine: true, data: {}}, // play MVP effect
					{cheat: true, type: RES_CLIENT, send: 0x011a, delay: 5000, inField: null, myField:['sourceId','targetId'], useMine: true, data: {skillId: 2263, amount: 1, success: 1}}, // play Cooldown Effect
					{cheat: false, type: RES_SPEECH, delay: 0, data: {msg: 'in viz'}}, 
					{cheat: false, type: RES_SPEECH, delay: 1500, data: {msg: 'revealed'}}, 
					{cheat: false, type: RES_SPEECH, delay: 5000, data: {msg: 'Feint bomb'}}, 
				],
			},
			{
				filter: {skillId: 2303}, // Blood Lust
				useAccount: {field: null, useMine: false}, 
				response: [
					{cheat: false, type: RES_SPEECH, delay: 180000, data: {msg: 'Blood Lust'}}, 
				],
			},
			{
				filter: {skillId: 2211}, // Crimson Rock
				useAccount: {field: null, useMine: false}, 
				response: [
					{cheat: false, type: RES_SPEECH, delay: 5000, data: {msg: 'Crimson'}}, 
				],
			},
			{
				filter: {skillId: 5036}, // Lunatic Carrot Beat
				useAccount: {field: null, useMine: false}, 
				response: [
					{cheat: false, type: RES_SPEECH, delay: 6000, data: {msg: 'Carrot'}}, 
				],
			},
			{
				filter: {skillId: 5046}, // Spirit of Savage
				useAccount: {field: null, useMine: false}, 
				response: [
					{cheat: false, type: RES_SPEECH, delay: 22000, data: {msg: 'Savage'}}, 
				],
			},
			{
				filter: {skillId: 5022}, // Stoop
				useAccount: {field: null, useMine: false}, 
				response: [
					{cheat: false, type: RES_SPEECH, delay: 15000, data: {msg: 'Stoop'}}, 
					{cheat: true, type: RES_CLIENT, send: 0x01d0, delay: 0, inField: null, myField:'sourceId', useMine: true, data: {entity: 5}}, // show spirit spheres on cooldown start
					{cheat: true, type: RES_CLIENT, send: 0x01d0, delay: 3000, inField: null, myField:'sourceId', useMine: true, data: {entity: 4}}, 
					{cheat: true, type: RES_CLIENT, send: 0x01d0, delay: 6000, inField: null, myField:'sourceId', useMine: true, data: {entity: 3}}, 
					{cheat: true, type: RES_CLIENT, send: 0x01d0, delay: 9000, inField: null, myField:'sourceId', useMine: true, data: {entity: 2}}, 
					{cheat: true, type: RES_CLIENT, send: 0x01d0, delay: 12000, inField: null, myField:'sourceId', useMine: true, data: {entity: 1}}, 
					{cheat: true, type: RES_CLIENT, send: 0x01d0, delay: 15000, inField: null, myField:'sourceId', useMine: true, data: {entity: 0}}, // remove spirit spheres on cooldown end
	                {cheat: true, type: RES_CLIENT, send: 0x011a, delay: 15000, inField: null, myField:['sourceId','targetId'], useMine: true, data: {skillId: 2263, amount: 1, success: 1}}, // play Cooldown Effect
					
				],
			},
			{
				filter: {skillId: 5023}, // Lope
				useAccount: {field: null, useMine: false}, 
				response: [
					{cheat: false, type: RES_SPEECH, delay: 5000, data: {msg: 'Leap'}}, 
				],
			},
			{
				filter: {skillId: 5045}, // Power of Lock
				useAccount: {field: null, useMine: false}, 
				response: [
					{cheat: false, type: RES_SPEECH, delay: 100000, data: {msg: 'Freeze'}}, 
				],
			},
			{
				filter: {skillId: 5047}, // Hiss
				useAccount: {field: null, useMine: false}, 
				response: [
					{cheat: false, type: RES_SPEECH, delay: 60000, data: {msg: 'Hiss'}}, 
				],
			},
			{
				filter: {skillId: 5032}, // Scar of Tarou
				useAccount: {field: null, useMine: false}, 
				response: [
					{cheat: false, type: RES_SPEECH, delay: 12000, data: {msg: 'Scar'}}, 
				],
			},
	//		{
	//			filter: {skillId: 2447}, // Diamond Dust
	//			useAccount: {field: null, useMine: false}, 
	//			response: [
	//				{cheat: true, type: RES_CLIENT, send: 0x01d0, delay: 0, inField: null, myField:'sourceId', useMine: true, data: {entity: 5}}, 
	//				{cheat: true, type: RES_CLIENT, send: 0x01d0, delay: 1000, inField: null, myField:'sourceId', useMine: true, data: {entity: 4}}, 
	//				{cheat: true, type: RES_CLIENT, send: 0x01d0, delay: 2000, inField: null, myField:'sourceId', useMine: true, data: {entity: 3}}, 
	//				{cheat: true, type: RES_CLIENT, send: 0x01d0, delay: 3000, inField: null, myField:'sourceId', useMine: true, data: {entity: 2}}, 
	//				{cheat: true, type: RES_CLIENT, send: 0x01d0, delay: 4000, inField: null, myField:'sourceId', useMine: true, data: {entity: 1}}, 
	//				{cheat: true, type: RES_CLIENT, send: 0x01d0, delay: 5000, inField: null, myField:'sourceId', useMine: true, data: {entity: 0}}, // remove spirit spheres on cooldown end
	//				{cheat: true, type: RES_CLIENT, send: 0x010c, delay: 5000, inField: null, myField:'ID', useMine: true, data: {}}, // play MVP effect
	//			],
	//		},
		],
		
		0x043f: [
			{
				filter: {type: 34, flag: 1}, // Hallucination effect? 
				useAccount: {field: 'ID', useMine: true}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_MODIFY, data: {flag: 0}}, // don't display the hallucination effect
				],
			},
			{
				filter: {type: 621}, // Hallucination effect? Transformation scroll?
				useAccount: {field: null, useMine: true}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_MODIFY, data: {unknown1: 0}}, // don't display the hallucination effect
				],
			},
			{
				filter: {type: 417, flag: 1}, // When I'm cursed circled
				useAccount: {field: 'ID', useMine: true}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_SPEECH, delay: 0, data: {msg: 'see seed'}}, // 
				],
			},
			{
				filter: {type: 394, flag: 1}, // When I shadow form
				useAccount: {field: 'ID', useMine: true}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_SPEECH, delay: 0, data: {msg: 'shadow form'}}, // 
				],
			},
			{
				filter: {type: 893, flag: 1}, // When I stoop
				useAccount: {field: 'ID', useMine: true}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_SPEECH, delay: 0, data: {msg: 'tank'}}, // 
				],
			},
			{
				filter: {type: 613, flag: 1}, // When I mount
				useAccount: {field: 'ID', useMine: true}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_SPEECH, delay: 3000, data: {msg: 'mount'}}, // 
				],
			},
		],
		
		0x0983: [
			{
				filter: {type: 34, flag: 1}, // Hallucination effect? 
				useAccount: {field: 'ID', useMine: true}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_MODIFY, data: {flag: 0}}, // don't display the hallucination effect
				],
			},
			{
				filter: {type: 621}, // Hallucination effect? Transformation scroll?
				useAccount: {field: null, useMine: true}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_MODIFY, data: {unknown1: 0}}, // don't display the hallucination effect
				],
			},
			{
				filter: {type: 417, flag: 1}, // When I'm cursed circled
				useAccount: {field: 'ID', useMine: true}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_SPEECH, delay: 0, data: {msg: 'see seed'}}, // 
				],
			},
			{
				filter: {type: 394, flag: 1}, // When I shadow form
				useAccount: {field: 'ID', useMine: true}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_SPEECH, delay: 0, data: {msg: 'shadow form'}}, // 
				],
			},
			{
				filter: {type: 893, flag: 1}, // When I stoop
				useAccount: {field: 'ID', useMine: true}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_SPEECH, delay: 0, data: {msg: 'tank'}}, // 
				],
			},
			{
				filter: {type: 613, flag: 1}, // When I mount
				useAccount: {field: 'ID', useMine: true}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_SPEECH, delay: 3000, data: {msg: 'mount'}}, // 
				],
			},
		],

		0x07fb: [
	//		{
	//			filter: {
	//				skillId: function(x){ 
	//					var dropSkills = new Set([28, 214, 249, 356, 476, 1005]);
	//					return dropSkills.has(x);
	//				},
	//				wait: function(x){ return x < 1;}
	//			}, // ..., close confine, fiberlock
	//				
	//			useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
	//			response: [
	//				{cheat: true, type: RES_MODIFY, data: {wait: 1}}, // Add a cast time
	//			],
	//		},
	//		{
	//			filter: {
	//				skillId: function(x){ 
	//					var dropSkills = new Set([2298, 2293, 2294, 2297]); // Add a cast time to enemy chasers
	//					return dropSkills.has(x);
	//				},
	//				wait: function(x){ return x < 1;}
	//			},
	//				
	//			useAccount: {field: 'sourceId', useMine: false}, // enemey actors
	//			response: [
	//				{cheat: true, type: RES_MODIFY, data: {wait: 1}}, // Add a cast time
	//			],
	//		},
	//		{
	//			filter: {skillId: 2298}, // cast Divest Accessory
	//			useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
	//			response: [
	//				{cheat: true, type: RES_MODIFY, data: {skillId: 218}}, // replace with Divest Helm
	//			],
	//		},
	//		{
	//			filter: {skillId: 2293}, // cast Masquerade Gloomy
	//			useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
	//			response: [
	//				{cheat: true, type: RES_MODIFY, data: {skillId: 217}}, // replace with Divest Armor
	//			],
	//		},
	//		{
	//			filter: {skillId: 2294}, // cast Masquerade Ignorance
	//			useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
	//			response: [
	//				{cheat: true, type: RES_MODIFY, data: {skillId: 215}}, // replace with Divest Weapon
	//			],
	//		},
	//		{
	//			filter: {skillId: 2297}, // cast Masquerade Weakness
	//			useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
	//			response: [
	//				{cheat: true, type: RES_MODIFY, data: {skillId: 216}}, // replace with Divest Shield
	//			],
	//		},
			{
				filter: {skillId: 51}, // cast Hide
				useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
				response: [
					{cheat: true, type: RES_CLIENT, send: 0x043f, delay: 0, inField: null, myField:'ID', useMine: true, data: {type: 184, tick: 10000, flag: 1, unknown1: 1, unknown2: 0, unknown3: 0}}, // add maya purple
				],
			},
			{
				filter: {skillId: 475}, // cast Preserve
				useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
				response: [
					{cheat: true, type: RES_CLIENT, send: 0x0983, delay: 0, inField: null, myField:'ID', useMine: true, data: {type: 207,  flag: 1}}, // add mirror image effect
				],
			},
	//		{
	//			filter: {skillId: 150}, // cast Backslide
	//			useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
	//			response: [
	//				{cheat: false, type: RES_SPEECH, delay: 0, data: {msg: 'backslide'}},
	//			],
	//		},
			{
				filter: {skillId: 2206}, // cast Recognize Spell
				useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
				response: [
					//{cheat: true, type: RES_CLIENT, send: 0x01d0, delay: 0, inField: null, myField:'sourceId', useMine: true, data: {entity: 5}}, 
					{cheat: true, type: RES_CLIENT, send: 0x043f, delay: 0, inField: null, myField:'ID', useMine: true, data: {type: 184, tick: 10000, flag: 1, unknown1: 1, unknown2: 0, unknown3: 0}}, // add maya purple
				],
			},
			{
				filter: {skillId: 2209}, // cast Stasis
				useAccount: {field: 'sourceId', useMine: false}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_SPEECH, delay: 0, data: {msg: 'Stasis'}},
				],
			},
			{
				filter: {skillId: 8}, // cast Endure
				useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_SPEECH, delay: 10000, data: {msg: 'Endure'}},
				],
			},
			{
				filter: {skillId: 2267}, // cast Suicidal Destruction
				useAccount: {field: 'sourceId', useMine: false}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_SPEECH, delay: 0, data: {msg: 's d'}},
				],
			},
			{
				filter: {skillId: 2343}, // cast Gates of Hell
				useAccount: {field: 'targetId', useMine: true}, // targetting me
				response: [
					{cheat: false, type: RES_SPEECH, delay: 0, data: {msg: 'gates'}},
				],
			},
		],

		// Uncomment this for Exceed Break
		//0x08c8: [
		//	{
		//		filter: {}, // any  normal attack by me
		//		useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
		//		response: [
		//			{cheat: true, type: RES_MODIFY, data: {source_speed: 1}}, // speed it up
		//		],
		//	},
		//],
		
	//	0x08c8: [
	//		{
	//			filter: {type: 2}, // Hallucination effect? Transformation scroll?
	//			useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
	//			response: [
	//				{cheat: true, type: RES_SERVER, send: 0x0089, delay: 0, inField: null, myField:'sourceId', useMine: true, data: {ID: 0, type: 3}}, 
	//			],
	//		},
	//	],
		
		0x8c8: [
			{
				filter: { dst_speed: function(x){ return x > 100; } }, 
				useAccount: {field: 'targetId', useMine: true}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_MODIFY, data: {dst_speed: 100}}, //  speed this up
				],
			},
		],
	    
		0x08ff: [
			{
				filter: {type: 621}, // Hallucination effect? Transformation scroll?
				useAccount: {field: null, useMine: false}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_MODIFY, data: {unknown1: 0}}, // don't display the hallucination effect
				],
			},
		],
		
		0x090f: [
			{
				filter: {lv: function(x){ return x == 99 || x == 150 || x == 160 || x == 175;}}, // Remove 175 Aura
				useAccount: {field: null, useMine: false}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_MODIFY, data: {lv: 1}},
				],
			},
			{
				filter: {ID: function(x){ return x <= 99999;}, type: function(x) { 
	                return homunIds.has(x);
	            } }, // Remove Homunculus
				useAccount: {field: null, useMine: false}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_DROP},
					//{cheat: false, type: RES_SPEECH, delay: 0, data: {msg: 'hide'}},
				],
			},
		],
		
		0x0914: [
			{
				filter: {lv: function(x){ return x == 99 || x == 150 || x == 160 || x == 175;}}, // Remove 175 Aura
				useAccount: {field: null, useMine: false}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_MODIFY, data: {lv: 1}},
				],
			},
			{
				filter: {ID: function(x){ return x <= 99999;}, type: function(x) { 
	                return homunIds.has(x);
	            } }, // Remove Homunculus
				useAccount: {field: null, useMine: false}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_DROP},
					//{cheat: false, type: RES_SPEECH, delay: 0, data: {msg: 'hide'}},
				],
			},
		],
	//	0x0914: [
	//		{
	//			filter: {ID: function(x){ return x < 100000;}, cheat: true, type: 1007}, // change fabre to randgris
	//			useAccount: {field: null, useMine: false}, // make sure this field is my own account
	//			response: [
	//				{cheat: true, type: RES_MODIFY, data: {cheat: true, type: 1751}},
	//			],
	//		},
	//	],
		0x0915: [
			{
				filter: {lv: function(x){ return x == 99 || x == 150 || x == 160 || x == 175;}}, // Remove 175 Aura
				useAccount: {field: null, useMine: false}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_MODIFY, data: {lv: 1}},
				],
			},
			{
				filter: {ID: function(x){ return x <= 99999;}, type: function(x) { 
	                return homunIds.has(x);
	            } }, // Remove Homunculus
				useAccount: {field: null, useMine: false}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_DROP},
					//{cheat: false, type: RES_SPEECH, delay: 0, data: {msg: 'hide'}},
				],
			},
	//		{
	//			filter: {ID: function(x){ return x < 100000;}, cheat: true, type: 1007}, // change fabre to randgris
	//			useAccount: {field: null, useMine: false}, // make sure this field is my own account
	//			response: [
	//				{cheat: true, type: RES_MODIFY, data: {cheat: true, type: 1751}},
	//			],
	//		},
		],
		
		0x09db: [
			{
				filter: {lv: function(x){ return x == 99 || x == 150 || x == 160 || x == 175;}}, // Remove 175 Aura
				useAccount: {field: null, useMine: false}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_MODIFY, data: {lv: 1}},
				],
			},
			{
				filter: {ID: function(x){ return x <= 99999;}, type: function(x) { 
	                return homunIds.has(x);
	            } }, // Remove Homunculus
				useAccount: {field: null, useMine: false}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_DROP},
					//{cheat: false, type: RES_SPEECH, delay: 0, data: {msg: 'hide'}},
				],
			},
			//{
			//	filter: {opt3: 0}, 
			//	useAccount: {field: null, useMine: false}, 
			//	response: [
			//		{cheat: true, type: RES_MODIFY, data: {opt3: 512}},
			//	],
			//},
		],
		0x09dc: [
			{
				filter: {lv: function(x){ return x == 99 || x == 150 || x == 160 || x == 175;}}, // Remove 175 Aura
				useAccount: {field: null, useMine: false}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_MODIFY, data: {lv: 1}},
				],
			},
			{
				filter: {ID: function(x){ return x <= 99999;}, type: function(x) { 
	                return homunIds.has(x);
	            } }, // Remove Homunculus
				useAccount: {field: null, useMine: false}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_DROP},
					//{cheat: false, type: RES_SPEECH, delay: 0, data: {msg: 'hide'}},
				],
			},
		],
		
		0x09dd: [
			{
				filter: {lv: function(x){ return x == 99 || x == 150 || x == 160 || x == 175;}}, // Remove 175 Aura
				useAccount: {field: null, useMine: false}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_MODIFY, data: {lv: 1}},
				],
			},
			{
				filter: {ID: function(x){ return x <= 99999;}, type: function(x) { 
	                return homunIds.has(x);
	            } }, // Remove Homunculus
				useAccount: {field: null, useMine: false}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_DROP},
					//{cheat: false, type: RES_SPEECH, delay: 0, data: {msg: 'hide'}},
				],
			},
		],
		
		0x09ca: [
			{
				filter: {job: function(x){ 
					var dropSkills = new Set([134, 203]);
					return dropSkills.has(x);
				}}, // cast Storm Gust, LoV, Meteor Storm, Earth Strain
				useAccount: {field: null, useMine: false}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_MODIFY, data: {job: 185}}, // don't display the hallucination effect
				],
			},
			{
				filter: {job: 133}, // Pneuma
				useAccount: {field: null, useMine: false}, // make sure this field is my own account
				response: [
					{cheat: false, type: RES_MODIFY, data: {job: 200}}, // change to chinese character
				],
			},
		],
	};	

	return {
		'RES_MODIFY': RES_MODIFY,
		'RES_DROP': RES_DROP,
		'RES_CLIENT': RES_CLIENT,
		'RES_SERVER': RES_SERVER,
		'RES_SPEECH': RES_SPEECH,
		'RECVMOD': RECVMOD,
	};

});