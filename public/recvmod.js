var RES_MODIFY = 0;
var RES_DROP = 1;
var RES_CLIENT = 2;
var RES_SERVER = 3;

var RECVMOD = {
	// on packet recv:
	// respond with 1 or more of:
	//		1. modify			(cheat: bool, type: modify, data: obj)
	//		2. drop				(cheat: bool, type: drop)
	//		3. send to client 	(cheat: bool, type: client, delay: int, send: header, inField: str, outField: str, useMine: bool, data: obj)
	//		4. send to server 	(cheat: bool, type: server, send: header, data: obj)
	
//	0x00b0: {
//		response: [
//			{cheat: true, type: RES_SERVER, send: },
//		],
//	},

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
				{cheat: true, type: RES_MODIFY, data: {identified: 1}},
			],
		},
	],
	
//	0x00b5: [ // npc_talk_continue
//		{
//			filter: {}, // Identify unidentified items that drop
//			useAccount: {field: null, useMine: false}, 
//			response: [
//				{cheat: true, type: RES_SERVER, send: 0x00b9, delay: 0, inField: 'ID', outField:'ID', useMine: false, data: {}}, 
//			],
//		},
//	],
	
//	0x00b6: [ // npc_talk_close
//		{
//			filter: {}, // Identify unidentified items that drop
//			useAccount: {field: null, useMine: false}, 
//			response: [
//				{cheat: true, type: RES_SERVER, send: 0x0146, delay: 0, inField: 'ID', outField:'ID', useMine: false, data: {}}, 
//			],
//		},
//	],

	0x0117: [
		{
			filter: {skillId: function(x){ 
				var dropSkills = new Set([5004, 2008, 405]);
				return dropSkills.has(x);
			}}, // cast Water Dragon Breath, Dragon Breath, Fiberlock
			useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
			response: [
				{cheat: true, type: RES_DROP},
			],
		},
		{
			filter: {skillId: function(x){ 
				var dropSkills = new Set([83, 85, 89]);
				return dropSkills.has(x);
			}}, // cast Meteor Storm, LoV, Storm Gust
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
				var dropSkills = new Set([28, 51, 214, 249, 1005, 2477]);
				return dropSkills.has(x);
			}}, // cast Guard
			useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
			response: [
				{cheat: true, type: RES_DROP},
			],
		},
		{
			filter: {skillId: function(x){ 
				var dropSkills = new Set([33, 75, 356, 2041, 2042, 2045, 2047, 2048]);
				return dropSkills.has(x);
			}}, // cast Guard
			useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
			response: [
				{cheat: false, type: RES_DROP},
			],
		},
	],
	
//	0x01c8: [
//		{
//			filter: {itemId: function(x){ 
//				var hpItems = new Set([547, 11503, 12192]);
//				return hpItems.has(x);
//			}}, // cast Guard
//			useAccount: {field: null, useMine: false},
//			response: [
//				{cheat: true, type: RES_MODIFY, data: {itemId: 519}},
//				{cheat: true, type: RES_CLIENT, send: 0x00c0, delay: 0, inField: 'ID', outField:'ID', useMine: false, data: {type: 27}}, 
//			],
//		},
//	],

	0x01de: [
		{
			filter: {skillId: 421}, // cast flying kick
			useAccount: {field: null, useMine: true}, // make sure this field is my own account
			response: [
				{cheat: true, type: RES_MODIFY, data: {skillId: 93, option: 0}}, // replace with Sense, and make it 1 hit
				//{cheat: true, type: RES_SERVER, send: 0x0113, delay: 300, inField: 'targetId', outField:'targetId', useMine: false, data: {skillId: 2294, lv: 3}}, 
				//{cheat: true, type: RES_SERVER, send: 0x0113, delay: 300, inField: 'targetId', outField:'targetId', useMine: false, data: {skillId: 2297, lv: 3}}, 
			],
		},
		{
			filter: {skillId: 2477}, // cast Cart Cannon
			useAccount: {field: null, useMine: true}, // make sure this field is my own account
			response: [
				{cheat: true, type: RES_MODIFY, data: {skillId: 93, option: 0}}, // replace with Sense, and make it 1 hit
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

	0x0229: [
		{
			filter: {option: 64, opt1: 0, opt2: 0}, // cast Full Divest
			useAccount: {field: 'ID', useMine: false}, // make sure this field is my own account
			response: [
				{cheat: true, type: RES_MODIFY, data: {option: 0}}, // replace with Divest Shield
			],
		},
	],
	0x043d: [
		{
			filter: {skillId: 2304}, // Feint bomb
			useAccount: {field: null, useMine: false}, 
			response: [
				{cheat: true, type: RES_CLIENT, send: 0x01d0, delay: 0, inField: null, outField:'sourceId', useMine: true, data: {entity: 5}}, // show spirit spheres on cooldown start
				{cheat: true, type: RES_CLIENT, send: 0x01d0, delay: 1000, inField: null, outField:'sourceId', useMine: true, data: {entity: 4}}, 
				{cheat: true, type: RES_CLIENT, send: 0x01d0, delay: 2000, inField: null, outField:'sourceId', useMine: true, data: {entity: 3}}, 
				{cheat: true, type: RES_CLIENT, send: 0x01d0, delay: 3000, inField: null, outField:'sourceId', useMine: true, data: {entity: 2}}, 
				{cheat: true, type: RES_CLIENT, send: 0x01d0, delay: 4000, inField: null, outField:'sourceId', useMine: true, data: {entity: 1}}, 
				{cheat: true, type: RES_CLIENT, send: 0x01d0, delay: 5000, inField: null, outField:'sourceId', useMine: true, data: {entity: 0}}, // remove spirit spheres on cooldown end
				//{cheat: true, type: RES_CLIENT, send: 0x010c, delay: 5000, inField: null, outField:'ID', useMine: true, data: {}}, // play MVP effect
				{cheat: true, type: RES_CLIENT, send: 0x011a, delay: 5000, inField: null, outField:['sourceId','targetId'], useMine: true, data: {skillId: 2263, amount: 1, success: 1}}, // play Cooldown Effect
			],
		},
//		{
//			filter: {skillId: 2447}, // Diamond Dust
//			useAccount: {field: null, useMine: false}, 
//			response: [
//				{cheat: true, type: RES_CLIENT, send: 0x01d0, delay: 0, inField: null, outField:'sourceId', useMine: true, data: {entity: 5}}, 
//				{cheat: true, type: RES_CLIENT, send: 0x01d0, delay: 1000, inField: null, outField:'sourceId', useMine: true, data: {entity: 4}}, 
//				{cheat: true, type: RES_CLIENT, send: 0x01d0, delay: 2000, inField: null, outField:'sourceId', useMine: true, data: {entity: 3}}, 
//				{cheat: true, type: RES_CLIENT, send: 0x01d0, delay: 3000, inField: null, outField:'sourceId', useMine: true, data: {entity: 2}}, 
//				{cheat: true, type: RES_CLIENT, send: 0x01d0, delay: 4000, inField: null, outField:'sourceId', useMine: true, data: {entity: 1}}, 
//				{cheat: true, type: RES_CLIENT, send: 0x01d0, delay: 5000, inField: null, outField:'sourceId', useMine: true, data: {entity: 0}}, // remove spirit spheres on cooldown end
//				{cheat: true, type: RES_CLIENT, send: 0x010c, delay: 5000, inField: null, outField:'ID', useMine: true, data: {}}, // play MVP effect
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
	],

	0x07fb: [
		{
			filter: {
				skillId: function(x){ 
					var dropSkills = new Set([28, 46, 214, 249, 356, 476, 1005, 405]);
					return dropSkills.has(x);
				},
				wait: function(x){ return x < 1;}
			}, // ..., close confine, fiberlock
				
			useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
			response: [
				{cheat: true, type: RES_MODIFY, data: {wait: 1}}, // Add a cast time
			],
		},
		{
			filter: {
				skillId: function(x){ 
					var dropSkills = new Set([2298, 2293, 2294, 2297]); // Add a cast time to enemy chasers
					return dropSkills.has(x);
				},
				wait: function(x){ return x < 1;}
			},
				
			useAccount: {field: 'sourceId', useMine: false}, // enemey actors
			response: [
				{cheat: true, type: RES_MODIFY, data: {wait: 1}}, // Add a cast time
			],
		},
		{
			filter: {skillId: 2298}, // cast Divest Accessory
			useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
			response: [
				{cheat: true, type: RES_MODIFY, data: {skillId: 218}}, // replace with Divest Helm
			],
		},
		{
			filter: {skillId: 2293}, // cast Masquerade Gloomy
			useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
			response: [
				{cheat: true, type: RES_MODIFY, data: {skillId: 217}}, // replace with Divest Armor
			],
		},
		{
			filter: {skillId: 2294}, // cast Masquerade Ignorance
			useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
			response: [
				{cheat: true, type: RES_MODIFY, data: {skillId: 215}}, // replace with Divest Weapon
			],
		},
		{
			filter: {skillId: 2297}, // cast Masquerade Weakness
			useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
			response: [
				{cheat: true, type: RES_MODIFY, data: {skillId: 216}}, // replace with Divest Shield
			],
		},
		{
			filter: {skillId: 51}, // cast Hide
			useAccount: {field: 'sourceId', useMine: true}, // make sure this field is my own account
			response: [
				//{cheat: true, type: RES_CLIENT, send: 0x01d0, delay: 0, inField: null, outField:'sourceId', useMine: true, data: {entity: 5}}, 
				{cheat: true, type: RES_CLIENT, send: 0x043f, delay: 0, inField: null, outField:'ID', useMine: true, data: {type: 184, tick: 10000, flag: 1, unknown1: 1, unknown2: 0, unknown3: 0}}, // add maya purple
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
//				{cheat: true, type: RES_SERVER, send: 0x0089, delay: 0, inField: null, outField:'sourceId', useMine: true, data: {ID: 0, type: 3}}, 
//			],
//		},
//	],
	
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
	],
	
	0x0914: [
		{
			filter: {lv: function(x){ return x == 99 || x == 150 || x == 160 || x == 175;}}, // Remove 175 Aura
			useAccount: {field: null, useMine: false}, // make sure this field is my own account
			response: [
				{cheat: false, type: RES_MODIFY, data: {lv: 1}},
			],
		},
		//{
		//	filter: {opt3: 0}, 
		//	useAccount: {field: null, useMine: false}, 
		//	response: [
		//		{cheat: true, type: RES_MODIFY, data: {opt3: 4095}},
		//	],
		//},
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
//		{
//			filter: {ID: function(x){ return x < 100000;}, cheat: true, type: 1007}, // change fabre to randgris
//			useAccount: {field: null, useMine: false}, // make sure this field is my own account
//			response: [
//				{cheat: true, type: RES_MODIFY, data: {cheat: true, type: 1751}},
//			],
//		},
	],
	
	0x09dc: [
		{
			filter: {lv: function(x){ return x == 99 || x == 150 || x == 160 || x == 175;}}, // Remove 175 Aura
			useAccount: {field: null, useMine: false}, // make sure this field is my own account
			response: [
				{cheat: false, type: RES_MODIFY, data: {lv: 1}},
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