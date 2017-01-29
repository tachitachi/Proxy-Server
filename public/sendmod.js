var RES_MODIFY = 0;
var RES_DROP = 1;
var RES_CLIENT = 2;
var RES_SERVER = 3;

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