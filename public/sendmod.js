var RES_MODIFY = 0;
var RES_DROP = 1;
var RES_CLIENT = 2;
var RES_SERVER = 3;
var RES_SPEECH = 4;

var SENDMOD = {
	// on packet recv:
	// respond with 1 or more of:
	//		1. modify			(type: modify, data: obj)
	//		2. drop				(type: drop)
	//		3. send to client 	(type: client, delay: int, send: header, inField: str, outField: str, useMine: bool, data: obj)
	//		4. send to server 	(type: server, send: header, data: obj)
	
//	0x00b0: {
//		response: [
//			{type: RES_SERVER, send: },
//		],
//	},

//	0x0113: [
//		{
//			filter: {skillId: 5033}, // Double Picky Peck
//			useAccount: {field: null, useMine: null}, // make sure this field is my own account
//			response: [
//				{cheat: true, type: RES_SERVER, send: 0x0113, delay: 450, inField: 'targetId', outField: 'targetId', useMine: null, data: {skillId: 5033, lv: 5}},
//				{cheat: true, type: RES_SERVER, send: 0x0113, delay: 650, inField: 'targetId', outField: 'targetId', useMine: null, data: {skillId: 5033, lv: 5}}, 
//				{cheat: true, type: RES_SERVER, send: 0x0113, delay: 850, inField: 'targetId', outField: 'targetId', useMine: null, data: {skillId: 5033, lv: 5}}, 
//				
//			],
//		}
//	],

//	0x0366: [
//		{
//			filter: {skillId: 47}, // Arrow shower -> Land Mine
//			useAccount: {field: null, useMine: null}, // make sure this field is my own account
//			response: [
//				{cheat: true, type: RES_MODIFY, data: {skillId: 117}}, // don't display the hallucination effect
//			],
//		}
//	]

	
	
};