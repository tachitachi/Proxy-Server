var util = require('util');
var net = require('net');
var _ = require('underscore');
var fs = require('fs');

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

// load client-server shared files
eval(fs.readFileSync('public/parse.js').toString());
eval(fs.readFileSync('public/recv.js').toString());
eval(fs.readFileSync('public/send.js').toString());
eval(fs.readFileSync('public/skills.js').toString());
eval(fs.readFileSync('public/items.js').toString());

eval(fs.readFileSync('public/recvmod.js').toString());
eval(fs.readFileSync('public/sendmod.js').toString());
eval(fs.readFileSync('public/refill.js').toString());
eval(fs.readFileSync('public/monstermod.js').toString());
eval(fs.readFileSync('public/rareitem.js').toString());
eval(fs.readFileSync('public/sounds.js').toString());

//eval(fs.readFileSync('player.js').toString());
eval(fs.readFileSync('bufutil.js').toString());


// TODO: Need better name than itemutil
eval(fs.readFileSync('itemutil.js').toString());
eval(fs.readFileSync('constants.js').toString());

eval(fs.readFileSync('LogMessage.js').toString());


app.use(express.static(__dirname + '/public'));

process.on("uncaughtException", function(e) {
    console.log(e.stack);
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname+'/index.html'));
});
 
var kMaxNumPackets = 1000;
var count = 0;
var bRecvLoggingEnabled = false;
var bSendLoggingEnabled = false;
var bNodelayEnabled = true;
var bPneumaGridEnabled = true;
var gAccountId = 0;

var clientConnections = {};
var serverConnections = {};
var webConnections = {};

var connectionByAccount = {};

var LogServer = null;

var connectedAccounts = {};
var inspirationTargets = {};

function SendToWeb(name, msg){
	io.emit(name, msg);
}

function PlaySfx(filename){
	io.emit('sound', {name: filename});
}

function PlayVoice(msg){
	io.emit('voice', {msg: msg});
}

function ChangeMap(mapdata){
	io.emit('ChangeMap', mapdata);
}

function ChangeLocation(coords){
	io.emit('ChangeLocation', coords);
}

io.on('connection', function(socket){

	console.log('user connected');
	socket.id = count;
	webConnections[socket.id] = socket;
	
	io.emit('chat message', 'User number ' + socket.id + ' has connected');
	count++;
	
	io.emit('current state', {
		recvLoggingEnabled: bRecvLoggingEnabled,
		sendLoggingEnabled: bSendLoggingEnabled,
		nodelayEnabled: bNodelayEnabled,
		pneumaGridEnabled: bPneumaGridEnabled
	});

	socket.on('disconnect', function(){
		//io.emit('chat message', 'User number ' + socket.id + ' disconnected from chat session');
		console.log('user disconnected');
		delete webConnections[socket.id];
	});
	
	socket.on('enableRecvLogging', function(msg){
		if(msg){
			console.log('Recv Logging enabled');
			bRecvLoggingEnabled = true;
		}
		else {
			console.log('Recv Logging disabled');
			bRecvLoggingEnabled = false;
		}
	});
	
	socket.on('enableSendLogging', function(msg){
		if(msg){
			console.log('Send Logging enabled');
			bSendLoggingEnabled = true;
		}
		else {
			console.log('Send Logging disabled');
			bSendLoggingEnabled = false;
		}
	});
	
	socket.on('enableNodelay', function(msg){
		if(msg){
			console.log('Nodelay enabled');
			bNodelayEnabled = true;
		}
		else {
			console.log('Nodelay disabled');
			bNodelayEnabled = false;
		}
	});
	
	socket.on('enablePneumaGrid', function(msg){
		if(msg){
			console.log('Pneuma Grid enabled');
			bPneumaGridEnabled = true;
		}
		else {
			console.log('Pneuma Grid disabled');
			bPneumaGridEnabled = false;
		}
	});
	
	socket.on('setAccount', function(msg){
		var account = msg.account;
		console.log('Setting account to {0}'.format(account));
		gAccountId = account;
	});
	
	socket.on('send to client', function(msg){
		for(var i in clientConnections){
			//console.log(bufPrint(StringToBuffer(msg)));
			clientConnections[i].write(StringToBuffer(msg));
		}
	});
	
	socket.on('send to server', function(msg){
		for(var i in serverConnections){
			//console.log(bufPrint(StringToBuffer(msg)));
			serverConnections[i].write(StringToBuffer(msg));
		}
	});
	
	socket.on('GetAccountInfo', function(data){
		var accountId = data.accountId;
		
		if(!connectedAccounts.hasOwnProperty(accountId)){
			return;
		}
		
		var accountInfo = connectedAccounts[accountId];
		
		socket.emit('GetAccountInfo', {accountInfo: accountInfo, inspirationInfo: inspirationTargets});
		
	});
	
	socket.on('SetWalkPlan', function(data){
		
		var accountId = data.accountId;
		var plan = data.plan;
		//console.log(accountId, plan); 
		
		if(!connectedAccounts.hasOwnProperty(accountId)){
			return;
		}
		
		var accountInfo = connectedAccounts[accountId];
		
		accountInfo.readyToNav = false;
		accountInfo.navInterrupted = false;
		
		// assume walk speed of 150 for now
		var walkStep = _.bind(function(arr, attempt){
			if(arr.length == 0){
				//console.log('no more path');
				return;
			}
			if(attempt >= 3){
				console.log('too many failed attempts to walk');
				return;
			}
			if(this.navInterrupted){
				console.log('navigation interrupted');
				return;
			}
			
			var nextAttempt;
			var next;
			
			if(!this.readyToNav){
				// failed to move, retry
				nextAttempt = attempt + 1;
			}
			else{
				// successfully moved, pop the next move and continue
				nextAttempt = 0;
				arr.splice(0, 1);
				
				if(arr.length == 0){
					// we're done
					console.log('done');
					return;
				}
			}
			
			this.readyToNav = false;
			
			var next = arr[0];
			var coords = next.node;
			var distance = next.distance;
			//console.log('walking to', coords, distance, distance * this.walkspeed + 100);
			var movePacket = CreateSendPacketBuffer(0x035f, {coords: IntToCoordBuffer(coords[0], coords[1])});
			//console.log(bufPrint(movePacket));
			
			if(connectionByAccount.hasOwnProperty(this.accountId)){
				var server = connectionByAccount[this.accountId].server;
				
				server.write(movePacket);
			}
			else{
				// failure to find connection
				return;
			}
			
			setTimeout(walkStep, distance * this.walkspeed + 100, arr, nextAttempt);
		}, accountInfo);
		
		walkStep(plan, 0);
		
	});
	
	socket.on('modify mod', function(data){
		// data: {
		//		header: X
		//		pos: Y
		//		field: Z
		//		value: W
		// }
		//RECVMOD[data.header].response[data.pos].data[data.field] = data.value;
		RECVMOD[data.header][data.pos].response[0].data[data.field] = data.value;
	});
	
	socket.on('refill', function(data){
		// data = {
		//	accountId: ID,
		// 	items: [
		// 		{
		// 			ID: X,
		// 			amount: Y
		// 		}
		// 	]
		// }
		
		console.log(data);
		
		var accountId = data.accountId;
		if(!connectedAccounts.hasOwnProperty(accountId)){
			console.log('no connected account');
			return;
		}
		if(!connectionByAccount.hasOwnProperty(accountId)){
			console.log('no server connection');
			return;
		}
		
		var accountInfo = connectedAccounts[accountId];
		var serviceSocket = connectionByAccount[accountId].server;
		
		
		
		var refillData = data.items;
		
		var storagePackets = storageRefill(refillData, accountInfo);
		console.log(storagePackets);
		
		if(storagePackets.length > 0){
			var SendPackets = function(arr, accountInfo, serviceSocket){
				if (!accountInfo.isStorageOpen){
					return;
				}
				if(arr.length > 0){
					var packet = arr.pop();
					serviceSocket.write(packet);
					//console.log(bufPrint(packet));
					setTimeout(SendPackets, 500, arr, accountInfo, serviceSocket);
				}
			}
			setTimeout(SendPackets, 500, storagePackets, accountInfo, serviceSocket);
		}
		
		
		
	});
	
  
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});

var proxyPort = 4500;
var serviceHost = '128.241.92.114';
var servicePort = 4500;

var tcpConnectionStart = new Buffer([0x04, 0x01, 0x11, 0x94, 0x80, 0xf1, 0x5c, 0x72, 0x00]);

//								   [header    ][ accountId           ][type][jobId                 ]  
//var jobChangePacket = new Buffer([0xd7, 0x01, 0xf4, 0x3f, 0x1c, 0x00, 0x00, 0xef, 0x0f, 0x00, 0x00]);



function HandleSend(packet, accountInfo, proxySocket, serviceSocket){
	
	switch(packet.header){
	case 0x0149:
		// Block all mute packets
		console.log('bypassing mute');
		return false;
	case 0x00bf:
		// emote
		var emoteId = packet.data[SEND[packet.header].datamap.emoteId.index].value;
		console.log('emoteId', emoteId);
		
		if(emoteId === 36){
			// use force Stand instead, useful when sitting while hidden
			//var castZenPacket = CreateSendPacketBuffer(0x0113, {lv: 1, skillId: 401, targetId: accountInfo.accountId});
			var forceStandPacket = CreateSendPacketBuffer(0x0089, {ID: 0, type: 3});
			var resetEmotePacket = CreateRecvPacketBuffer(0x00c0, {ID: accountInfo.accountId, type: 255});
			serviceSocket.write(forceStandPacket);
			proxySocket.write(resetEmotePacket);
			return false;
		}
		
		
		
		break;
	case 0x0113:
		// skill use
		accountInfo.navInterrupted = true;
		break;
	case 0x035f:
		// we manually clicked to move, so interrupt navigation if its going
		accountInfo.navInterrupted = true;
		break;
	case 0x0366:
		
		// skill use location
		accountInfo.navInterrupted = true;
	
		var skillId = packet.data[SEND[packet.header].datamap.skillId.index].value;
		var lv = packet.data[SEND[packet.header].datamap.lv.index].value;
		var x = packet.data[SEND[packet.header].datamap.x.index].value;
		var y = packet.data[SEND[packet.header].datamap.y.index].value;
		//console.log(skillId);
		
		if(skillId == 2300 && lv == 2){ // Dimension Door level 2
		
			
			var angle = Math.atan2(x - accountInfo.x, y - accountInfo.y) * 180 / Math.PI;
			
			var direction = 7 - (Math.floor((angle + 22.5) / 45) + 3);
			//var directionValues = [7, 6, 5, 4, 3, 2, 1, 0];
			
			//console.log(x, y, accountInfo.x, accountInfo.y, angle, direction);	

			
			var lookat = CreateSendPacketBuffer(0x0361, {head: 0, body: direction});
			
		
			var backslide = CreateSendPacketBuffer(0x0113, {lv: 1, skillId: 150, targetId: accountInfo.accountId});
			
			serviceSocket.write(lookat);
			serviceSocket.write(backslide);
			
		
			return false;
		}
		if(skillId == 2483 && lv == 9){ // crazy vines 9
		
			var actorMovementInterruptedPacket = CreateRecvPacketBuffer(0x08d2, {ID: accountInfo.accountId, x: x, y: y});
			// 0x0087 character moves
			proxySocket.write(actorMovementInterruptedPacket);
			
			return false;
		}
		
		break;
	default:
		break;
	}
	
	
	
	if(SENDMOD.hasOwnProperty(packet.header) && SEND.hasOwnProperty(packet.header)){
		var modDefinitionList = SENDMOD[packet.header];
		var packetDefinition = SEND[packet.header];
		//console.log(modDefinitionList);
		
		// check each filter
		
		for(var filterIndex = 0; filterIndex < modDefinitionList.length; filterIndex++){
			var modDefinition = modDefinitionList[filterIndex];
			// see if it matches the filter
			
			if(modDefinition.useAccount.field !== null){
				var dataInfo = packetDefinition.datamap[modDefinition.useAccount.field];
				var value = HexStringToInt(packet.bytes.slice(dataInfo.start, dataInfo.end));
				if((value != accountInfo.accountId && modDefinition.useAccount.useMine) ||
					(value == accountInfo.accountId && !modDefinition.useAccount.useMine)){
					continue;
				}
			}
			var noMatch = false;
			
			for(var key in modDefinition.filter){
				// get start/end and read in
				var dataInfo = packetDefinition.datamap[key];
				// TODO: assume type INT for now
				var value = HexStringToInt(packet.bytes.slice(dataInfo.start, dataInfo.end));
				
				var expected = modDefinition.filter[key];
				if(typeof(expected) == 'function'){
					// filter function must return bool
					if(!expected(value)){
						noMatch = true;
						break;
					}
				}
				else{
					//console.log(value, expected);
					if(value != expected){
						noMatch = true;
						break;
					}
				}
			}
			
			if(noMatch){
				continue;
			}
			
			// else, do the response
			//console.log('this matches, do response');
			
			// potentially multiple responses to a single packet
			for(var responseIndex in modDefinition.response){
				var response = modDefinition.response[responseIndex];
				if(response.cheat && !bNodelayEnabled){
					continue;
				}
				switch(response.type){
				case RES_MODIFY:
					// modify everything in data
					for(var key in response.data){
						var dataInfo = packetDefinition.datamap[key];
						var length = dataInfo.end - dataInfo.start;
						var value = response.data[key];
						for(var i = 0; i < length; i++){
							packet.bytes[dataInfo.start + i] = (value >> (i * 8)) & 0xff;
						}
					}
					break;
				case RES_DROP:
					// do not write this packet
					dropPacket = true;
					//console.log('dropping packet ', bufPrint(packet.bytes));
					break;
				case RES_CLIENT:
					// write this to client after a given delay
					
					var delay = 0;
					if(response.delay !== undefined){
						delay = response.delay;
					}
					
					// Create a deep copy to not modify the original
					var modifiedResponse = JSON.parse(JSON.stringify(response));
					// TODO: finish adding the inField case
					if(modifiedResponse.useMine !== undefined && modifiedResponse.outField !== undefined && modifiedResponse.useMine){
						if(typeof(modifiedResponse.outField) === 'string'){
							modifiedResponse.data[modifiedResponse.outField] = accountInfo.accountId;
						}
						else{
							for(var i = 0; i < modifiedResponse.outField.length; i++){
								var fieldName = modifiedResponse.outField[i];
								modifiedResponse.data[fieldName] = accountInfo.accountId;
							}
						}
					}
					else if(modifiedResponse.useMine !== undefined && !modifiedResponse.useMine && modifiedResponse.inField !== undefined && modifiedResponse.inField !== undefined){
						//var inFieldData = response.data[modifiedResponse.inField]
						
						var inFieldData = packet.data[RECV[packet.header].datamap[modifiedResponse.inField].index].value;
						if(typeof(modifiedResponse.outField) === 'string'){
							modifiedResponse.data[modifiedResponse.outField] = inFieldData;
						}
						else{
							for(var i = 0; i < modifiedResponse.outField.length; i++){
								var fieldName = modifiedResponse.outField[i];
								modifiedResponse.data[fieldName] = inFieldData;
							}
						}
					}
					
					var sendClientPacket = _.bind(function(){
						var clientPacket = CreateRecvPacketBuffer(this.send, this.data);
						proxySocket.write(clientPacket);
					}, modifiedResponse);
					
					setTimeout(sendClientPacket, delay);
				
					break;
				case RES_SERVER:
					// write this to client after a given delay
					//console.log('sending to server')
					
					var delay = 0;
					if(response.delay !== undefined){
						delay = response.delay;
					}
					
					// Create a deep copy to not modify the original
					var modifiedResponse = JSON.parse(JSON.stringify(response));
					// TODO: finish adding the inField case
					if(modifiedResponse.useMine !== undefined && modifiedResponse.outField !== undefined && modifiedResponse.useMine){
						if(typeof(modifiedResponse.outField) === 'string'){
							modifiedResponse.data[modifiedResponse.outField] = accountInfo.accountId;
						}
						else{
							for(var i = 0; i < modifiedResponse.outField.length; i++){
								var fieldName = modifiedResponse.outField[i];
								modifiedResponse.data[fieldName] = accountInfo.accountId;
							}
						}
					}
					else if(modifiedResponse.useMine !== undefined && !modifiedResponse.useMine && modifiedResponse.inField !== undefined && modifiedResponse.inField !== undefined){
						//var inFieldData = response.data[modifiedResponse.inField]
						//console.log(packet);
						var inFieldData = packet.data[SEND[packet.header].datamap[modifiedResponse.inField].index].value;
						if(typeof(modifiedResponse.outField) === 'string'){
							modifiedResponse.data[modifiedResponse.outField] = inFieldData;
						}
						else{
							for(var i = 0; i < modifiedResponse.outField.length; i++){
								var fieldName = modifiedResponse.outField[i];
								modifiedResponse.data[fieldName] = inFieldData;
							}
						}
					}
					
					var sendServerPacket = _.bind(function(){
						var serverPacket = CreateSendPacketBuffer(this.send, this.data);
						//console.log(serverPacket);
						serviceSocket.write(serverPacket);
					}, modifiedResponse);
					
					setTimeout(sendServerPacket, delay);
				
					break;
				default:
					break;
				}
			}
			
		}
		
	}
	
	
	return true;
}

function HandleRecv(packet, accountInfo, proxySocket, serviceSocket){

	var dropPacket = false;
	
	// maintain state about the connection
	switch(packet.header){
	case 0x009e:
		// 0c 01 3b 8b 39 00
		// [0c 01] [ account id]
		// MVP notification
		// do this when important items show up
		var itemId = packet.data[RECV[packet.header].datamap.itemId.index].value;
		
		if(bNodelayEnabled && rareitem.hasOwnProperty(itemId)){
			var playMVPeffect = CreateRecvPacketBuffer(0x010c, {ID: accountInfo.accountId});
			proxySocket.write(playMVPeffect);
		}
		
		break;
	case 0x0080:
		// actor_died_or_disappeared
		var accountId = packet.data[RECV[packet.header].datamap.ID.index].value;
		
		if(accountId in inspirationTargets){
			clearTimeout(inspirationTargets[accountId]);
			delete inspirationTargets[accountId];
		}
	
		break;
	case 0x0087:
		// Started walking
		var ping = 50;
		var coordpair = packet.data[RECV[packet.header].datamap.coords.index].value;
		var srcX = coordpair.x1;
		var srcY = coordpair.y1;
		var dstX = coordpair.x2;
		var dstY = coordpair.y2;
		
		// We started walking, so allow nav to continue once it's done
		accountInfo.readyToNav = true;
		
		// break up path into 2 parts: diagonal (shorter distance), and straight line (longer distance)
		var xDist = Math.abs(dstX - srcX);
		var yDist = Math.abs(dstY - srcY);
		
		var path1 = Math.sqrt(Math.pow(Math.min(xDist, yDist),2) * 2);
		var path2 = Math.max(xDist, yDist) - Math.min(xDist, yDist);
		
		var distance = path1 + path2;//Math.sqrt((dstX - srcX) * (dstX - srcX) + (dstY - srcY) * (dstY - srcY));
		
		//console.log(distance);
		//var assumptioPacket = CreateRecvPacketBuffer(0x011a, {skillId: 361, amount: 1, targetId: 1851380, sourceId: 1851380, success: 1});
		//console.log(bufPrint(assumptioPacket));
		
		// rough approximation
		setTimeout(function(){
			//proxySocket.write(assumptioPacket);
			if(accountInfo.accountId == gAccountId){
				ChangeLocation({x: dstX, y: dstY});
			}
			accountInfo.x = dstX;
			accountInfo.y = dstY;
		}, distance * accountInfo.walkspeed + ping);
		
		
		break;
	case 0x00b0:
		// status update
		var type = packet.data[RECV[packet.header].datamap.type.index].value;
		var val = packet.data[RECV[packet.header].datamap.val.index].value;
		
		switch(type){
		case 0:
			// walk speed
			accountInfo.walkspeed = val;
			break;
		case 5:
			// current hp
			var direction = val - accountInfo.currentHp;
			
			accountInfo.currentHp = val;
			
			if(direction < 0 && accountInfo.currentHp / accountInfo.maxHp <= 0.6){
				//var playLaughSound = CreateRecvPacketBuffer(0x01c8, {index: 200, itemId: 12027, ID: accountInfo.accountId, remaining: 0, success: 1});
				//proxySocket.write(playLaughSound);
				PlayVoice('critical');
			}
			
			break;
		case 6:
			// max hp
			accountInfo.maxHp = val;
			break;
		case 7:
			// current sp
			accountInfo.currentSp = val;
			break;
		case 8:
			// max sp
			accountInfo.maxSp = val;
			break;
		case 53:
			// aspd
			accountInfo.aspd = val;
			break;
		default:
		
			break;
		}
		
		break;
	case 0x07fb:
		// skill cast
		
		// if someone snaps off screen, fix "ghosting"
		var sourceId = packet.data[RECV[packet.header].datamap.sourceId.index].value;
		var targetId = packet.data[RECV[packet.header].datamap.targetId.index].value;
		var x = packet.data[RECV[packet.header].datamap.x.index].value;
		var y = packet.data[RECV[packet.header].datamap.y.index].value;
		var skillId = packet.data[RECV[packet.header].datamap.skillId.index].value;
		var wait = packet.data[RECV[packet.header].datamap.wait.index].value;
		
		// If I cast masq on someone in inspiration
		var Masqs = new Set([2292, 2293, 2294, 2295, 2296, 2297]);
		if(accountInfo.accountId == sourceId && Masqs.has(skillId)){
			if (targetId in inspirationTargets){
				PlayVoice('inspiration');
			}
		}
		
		
		
//		if(accountInfo.accountId !== sourceId && skillId === 264 /* Snap */){
//			if(Math.abs(x - accountInfo.x) >= 15 || Math.abs(y - accountInfo.y) >= 15){
//				// create the actor_died_or_disappeared packet
//				var highJumpPacket = CreateRecvPacketBuffer(0x08d2, {ID: sourceId, x: x, y: y});
//				var actorDisappearedPacket = CreateRecvPacketBuffer(0x0080, {ID: sourceId, type: 0});
//				proxySocket.write(highJumpPacket);
//				proxySocket.write(actorDisappearedPacket);
//				//console.log('removing snapped target');
//			}
//		}
		
	
		break;
	case 0x00b3:
		// switch character, reset stats
			
		accountInfo.name = null;
		accountInfo.currentHp = 0;
		accountInfo.currentSp = 0;
		accountInfo.maxHp = 0;
		accountInfo.maxSp = 0;
        accountInfo.aspd = 0;
		accountInfo.currentSp = 0;
		accountInfo.items = {};
		accountInfo.nodelay = false;
		accountInfo.autopot = false;
		accountInfo.inventory = {};
		accountInfo.inventoryByIndex = {};
		accountInfo.inventoryEquipment = {};
		accountInfo.inventoryEquipmentByIndex = {};
		accountInfo.cart = {};
		accountInfo.cartByIndex = {};
		accountInfo.cartEquipment = {};
		accountInfo.cartEquipmentByIndex = {};
		accountInfo.storageEquipment = {};
		accountInfo.storageEquipmentByIndex = {};
		accountInfo.storage = {};
		accountInfo.storageByIndex = {};
		accountInfo.walkspeed = 150;
		accountInfo.x = 0;
		accountInfo.y = 0;
		accountInfo.readyToNav = false;
		accountInfo.navInterrupted = true;
		
		break;
	case 0x0088:
		//actor_movement_interrupted
		var actorId = packet.data[RECV[packet.header].datamap.ID.index].value;
		var x = packet.data[RECV[packet.header].datamap.x.index].value;
		var y = packet.data[RECV[packet.header].datamap.y.index].value;
		
		if(actorId !== accountInfo.accountId && bNodelayEnabled){
			dropPacket = true;
		}
		break;
	
	case 0x00f8:
		accountInfo.isStorageOpen = false;
		break;
	case 0x01ff:
	//case 0x0088:
		//being_slide
		var actorId = packet.data[RECV[packet.header].datamap.ID.index].value;
		var x = packet.data[RECV[packet.header].datamap.x.index].value;
		var y = packet.data[RECV[packet.header].datamap.y.index].value;
		
		if(actorId == accountInfo.accountId){
			if(accountInfo.accountId == gAccountId){
				ChangeLocation({x: x, y: y});
			}
			accountInfo.x = x;
			accountInfo.y = y;
		}
		else{
			// Change to snap animation to make it easier on the eyes
			if(bNodelayEnabled){
				var highJumpPacket = CreateRecvPacketBuffer(0x08d2, {ID: actorId, x: x, y: y});
				proxySocket.write(highJumpPacket);
				//console.log('replacing with snap?');
				
				dropPacket = true;
			}
		}
		
		break;
	case 0x0091:
	case 0x0092:
		// map changed, tell webpage?
		var mapName = packet.data[RECV[packet.header].datamap.map.index].value.replace('.gat', '');
		var x = packet.data[RECV[packet.header].datamap.x.index].value;
		var y = packet.data[RECV[packet.header].datamap.y.index].value;
		ChangeMap({'name': mapName, 'x': x, 'y': y});
		
		break;
	case 0x01e9:
		// party join, use to determine which map you log in at
		var accountId = packet.data[RECV[packet.header].datamap.ID.index].value;
		if(accountId == accountInfo.accountId){
			var x = packet.data[RECV[packet.header].datamap.x.index].value;
			var y = packet.data[RECV[packet.header].datamap.y.index].value;
			var mapName = packet.data[RECV[packet.header].datamap.map.index].value.replace('.gat', '');
			var user = packet.data[RECV[packet.header].datamap.user.index].value;
			
			accountInfo.name = user;
			ChangeMap({'name': mapName, 'x': x, 'y': y});
		}
		
		break;
	case 0x0283:
		// set accountId
		var dataIndex = RECV[packet.header].datamap.ID.index;
		var accountId = packet.data[dataIndex].value;
		accountInfo.accountId = accountId;
		
		connectionByAccount[accountId] = {client: proxySocket, server: serviceSocket};
		// TODO: somehow clean these up eventually
		connectedAccounts[accountId] = accountInfo;
		//console.log(accountInfo);
		break;
	case 0x01c8:
		// use item
		var itemId = packet.data[RECV[packet.header].datamap.itemId.index].value;
		var itemIndex = packet.data[RECV[packet.header].datamap.index.index].value;
		var remaining = packet.data[RECV[packet.header].datamap.remaining.index].value;
		
		if(accountInfo.inventory.hasOwnProperty(itemId)){
			var itemInfo = accountInfo.inventory[itemId];
			itemInfo.amount -= 1;
			//console.log('[{0}] used item at {1}, amount: {2}, left: {3}'.format(accountInfo.accountId, itemIndex, amount, itemInfo.amount));
			if(itemInfo.amount <= 0){
				delete accountInfo.inventory[itemId];
				delete accountInfo.inventoryByIndex[itemIndex];
			}
			else{
				itemInfo.amount = remaining;
			}
		}
		break;
	case 0x0196: // this only has 3 fields
	case 0x043f: // this has more than 3 fields, but we only need to use 3 for now
		// actor status active
	
		var accountId = packet.data[RECV[packet.header].datamap.ID.index].value;
		var type = packet.data[RECV[packet.header].datamap.type.index].value;
		var flag = packet.data[RECV[packet.header].datamap.flag.index].value;
		
		if(accountId !== accountInfo.accountId){ // keep track of opponents
			if(type === 407){
				if(flag === 1){
					//console.log('has inspiration!');
					if(!inspirationTargets.hasOwnProperty(accountId)){
						//console.log('starting inspiration timer');
						// start a timer to disable inspiration, if I haven't started one for this account already	
						
						//console.log('adding to inspiration', accountId, accountInfo.accountId)
						inspirationTargets[accountId] = setTimeout(_.bind(function(){
							console.log('deleting inspiration from timer', this.accountId);
							delete inspirationTargets[this.accountId];
						}, {accountId: accountId}), 90000);
					}
				}
				else{
					
					clearTimeout(inspirationTargets[accountId]);
					delete inspirationTargets[accountId];
					//96 01 7b 00 f3 3a 10 00 00
					
					if(bNodelayEnabled){
						var endInspirationEffect = CreateRecvPacketBuffer(0x0196, {type: 123, ID: accountId, flag: 0});
						proxySocket.write(endInspirationEffect);
					}
				}
			}
		}
		
	
		break;
	case 0x0914:
	case 0x0915:
	case 0x09db:
	case 0x09dd:
		// actor moved
		// actor_exists
		var accountId = packet.data[RECV[packet.header].datamap.ID.index].value;
		var opt3 = packet.data[RECV[packet.header].datamap.opt3.index].value;
		var type = packet.data[RECV[packet.header].datamap.type.index].value;
		
		if(accountId < 100000){
			// this is a monster
			
			// Change monster sprite if there's a mapping
			if(bNodelayEnabled && monstermod.hasOwnProperty(type)){
				var dataInfo = RECV[packet.header].datamap['type'];
				var length = dataInfo.end - dataInfo.start;
				var value = monstermod[type];
				for(var i = 0; i < length; i++){
					packet.bytes[dataInfo.start + i] = (value >> (i * 8)) & 0xff;
				}
			}
			
			
		}
		else{
			// this is a player
			if(bNodelayEnabled && accountId != accountInfo.accountId && inspirationTargets.hasOwnProperty(accountId)){
				// bitwise OR 512 into opt3
				
				var dataInfo = RECV[packet.header].datamap['opt3'];
				var length = dataInfo.end - dataInfo.start;
				var value = opt3 | 512;
				for(var i = 0; i < length; i++){
					packet.bytes[dataInfo.start + i] = (value >> (i * 8)) & 0xff;
				}
				
				//delete inspirationTargets[accountId];
				//console.log('deleting inspiration', inspirationTargets);
			}
		}
		
		
		
		break;
	case 0x080f:
//		var itemId = packet.data[RECV[packet.header].datamap.itemId.index].value;
//		var amount = packet.data[RECV[packet.header].datamap.amount.index].value;
//		
//		if(accountInfo.inventory.hasOwnProperty(itemId)){
//			var itemInfo = accountInfo.inventory[itemId];
//			var itemIndex = accountInfo.inventory[itemId].index;
//			itemInfo.amount -= amount;
//			console.log('[{0}] removed item at {1}, amount: {2}, left: {3}'.format(accountInfo.accountId, itemIndex, amount, itemInfo.amount));
//			if(itemInfo.amount <= 0){
//				delete accountInfo.inventory[itemId];
//				delete accountInfo.inventoryByIndex[itemIndex];
//			}
//		}
		break;
	case 0x00f6:
		// storage item removed
		var itemIndex = packet.data[RECV[packet.header].datamap.index.index].value;
		var amount = packet.data[RECV[packet.header].datamap.amount.index].value;
		
		if(accountInfo.storageByIndex.hasOwnProperty(itemIndex)){
			var itemId = accountInfo.storageByIndex[itemIndex];
			var storageItemInfo = accountInfo.storage[itemId];
			storageItemInfo.amount -= amount;
			//console.log('[{0}] removed item from storage at {1}, amount: {2}, left: {3}'.format(accountInfo.accountId, itemIndex, amount, storageItemInfo.amount));
			if(storageItemInfo.amount <= 0){
				delete accountInfo.storage[itemId];
				delete accountInfo.storageByIndex[itemIndex];
			}
			
			//var inventoryItemInfo = accountInfo.inventory[itemId];
			//inventoryItemInfo.amount += amount;
		}
		
		break;
	case 0x00af:
	case 0x07fa:
		// inventory item removed
		var itemIndex = packet.data[RECV[packet.header].datamap.index.index].value;
		var amount = packet.data[RECV[packet.header].datamap.amount.index].value;
		
		if(accountInfo.inventoryByIndex.hasOwnProperty(itemIndex)){
			var itemId = accountInfo.inventoryByIndex[itemIndex];
			// TODO: Change to mimic actual inventory
			var itemInfo = accountInfo.inventory[itemId];
			itemInfo.amount -= amount;
			//console.log('[{0}] removed item at {1}, amount: {2}, left: {3}'.format(accountInfo.accountId, itemIndex, amount, itemInfo.amount));
			if(itemInfo.amount <= 0){
				delete accountInfo.inventory[itemId];
				delete accountInfo.inventoryByIndex[itemIndex];
			}
		}
		
		break;
	case 0x0125:
		// cart item removed
		var itemIndex = packet.data[RECV[packet.header].datamap.index.index].value;
		var amount = packet.data[RECV[packet.header].datamap.amount.index].value;
		
		if(accountInfo.cartByIndex.hasOwnProperty(itemIndex)){
			var itemId = accountInfo.cartByIndex[itemIndex];
			var itemInfo = accountInfo.cart[itemId];
			itemInfo.amount -= amount;
			//console.log('[{0}] removed item at {1}, amount: {2}, left: {3}'.format(accountInfo.accountId, itemIndex, amount, itemInfo.amount));
			if(itemInfo.amount <= 0){
				delete accountInfo.cart[itemId];
				delete accountInfo.cartByIndex[itemIndex];
			}
		}
		
		break;
	case 0x08d2:
		// high jump
		var sourceId = packet.data[RECV[packet.header].datamap.ID.index].value;
		if(sourceId == accountInfo.accountId){
			var x = packet.data[RECV[packet.header].datamap.x.index].value;
			var y = packet.data[RECV[packet.header].datamap.y.index].value;
			if(accountInfo.accountId == gAccountId){
				ChangeLocation({x: x, y: y});
			}
			accountInfo.x = x;
			accountInfo.y = y;
		}
		
		break;
	case 0x0990:
	case 0x0a0c:
		// inventory item added
		var itemIndex = packet.data[RECV[packet.header].datamap.index.index].value;
		var itemId = packet.data[RECV[packet.header].datamap.itemId.index].value
		var amount = packet.data[RECV[packet.header].datamap.amount.index].value;
		
		
		//console.log(packet.data);
		
		if(accountInfo.inventory.hasOwnProperty(itemId)){
			var itemInfo = accountInfo.inventory[itemId];
			itemInfo.amount += amount;
		}
		else{
			accountInfo.inventory[itemId] = {index: itemIndex, amount: amount};
			accountInfo.inventoryByIndex[itemIndex] = itemId;
		}
		
		//console.log('[{0}} added item at {1}, amount: {2}, left: {3}'.format(accountInfo.accountId, itemIndex, amount, accountInfo.inventory[itemId].amount));
		
		break;
	case 0x01c5:
	case 0x0a0b:
		// cart item added
		var itemIndex = packet.data[RECV[packet.header].datamap.index.index].value;
		var itemId = packet.data[RECV[packet.header].datamap.itemId.index].value
		var amount = packet.data[RECV[packet.header].datamap.amount.index].value;
		
		
		//console.log(packet.data);
		
		
		if(accountInfo.inventory.hasOwnProperty(itemId)){
			var itemInfo = accountInfo.inventory[itemId];
			itemInfo.amount += amount;
		}
		else{
			accountInfo.inventory[itemId] = {index: itemIndex, amount: amount};
			accountInfo.inventoryByIndex[itemIndex] = itemId;
		}
		
		//console.log('[{0}} added item at {1}, amount: {2}, left: {3}'.format(accountInfo.accountId, itemIndex, amount, accountInfo.inventory[itemId].amount));
		
		break;
	case 0x0991:
		// reset all items
		accountInfo.inventory = {};
		accountInfo.inventoryByIndex = {};
		
		var dataIndex = RECV[packet.header].datamap.itemInfo.index;
		var itemInfoList = packet.data[dataIndex].value;
		for(var i = 0; i < itemInfoList.length; i++){
			var itemInfo = itemInfoList[i];
			
			// TODO: need recursive definition of arrays
			var index = itemInfo[0].value;
			var itemId = itemInfo[1].value;
			var amount = itemInfo[3].value;
			var itemName = DbTable_Items[itemId];
			//console.log(index, itemId, itemName, amount);
			accountInfo.inventory[itemId] = {index: index, amount: amount};
			accountInfo.inventoryByIndex[index] = itemId;
		}
		
		/*
		if(accountInfo.accountId && accountInfo.inventory.hasOwnProperty(512) && accountInfo.inventory[512].amount > 0){
			var itemInfo = accountInfo.inventory[512];
			var useItemPacket = CreatePacketBuffer(0x00a7, {index: itemInfo.index, targetId: accountInfo.accountId});
			//console.log(bufPrint(useItemPacket));
			serviceSocket.write(useItemPacket);
		}
		*/
		
		break;
	case 0x0995:
		// storage opened up, "refill"
		accountInfo.storage = {};
		accountInfo.storageByIndex = {};
		
		accountInfo.isStorageOpen = true;
		
		var itemInfoList = packet.data[RECV[packet.header].datamap.itemInfo.index].value;
		for(var i = 0; i < itemInfoList.length; i++){
			var itemInfo = itemInfoList[i];
			
			// TODO: need recursive definition of arrays
			var index = itemInfo[0].value;
			var itemId = itemInfo[1].value;
			var amount = itemInfo[3].value;
			var itemName = DbTable_Items[itemId];
			//console.log(index, itemId, itemName, amount);
			accountInfo.storage[itemId] = {index: index, amount: amount};
			accountInfo.storageByIndex[index] = itemId;
		}
		
		//var storagePackets = [];
		
		// loop over every item in refill, and see what needs to happen
		//console.log(accountInfo.name);
		if(accountInfo.name !== null && refill.hasOwnProperty(accountInfo.name)){
			var refillData = refill[accountInfo.name];
			var storagePackets = storageRefill(refillData, accountInfo);
			
			if(storagePackets.length > 0){
				var SendPackets = function(arr, accountInfo){
					if (!accountInfo.isStorageOpen){
						return;
					}
					if(arr.length > 0){
						var packet = arr.pop();
						serviceSocket.write(packet);
						//console.log(bufPrint(packet));
						setTimeout(SendPackets, 500, arr, accountInfo);
					}
				}
				setTimeout(SendPackets, 500, storagePackets, accountInfo);
			}
		}
		
		
		/*
		if(accountInfo.accountId && accountInfo.storage.hasOwnProperty(512) && accountInfo.storage[512].amount > 0){
			var itemInfo = accountInfo.storage[512];
			var useItemPacket = CreatePacketBuffer(0x00a7, {index: itemInfo.index, targetId: accountInfo.accountId});
			//console.log(bufPrint(useItemPacket));
			serviceSocket.write(useItemPacket);
		}
		*/
		
		break;
		
	case 0x0993:
		// cart item info
		accountInfo.cart = {};
		accountInfo.cartByIndex = {};
		
		var itemInfoList = packet.data[RECV[packet.header].datamap.itemInfo.index].value;
		for(var i = 0; i < itemInfoList.length; i++){
			var itemInfo = itemInfoList[i];
			
			// TODO: need recursive definition of arrays
			var index = itemInfo[0].value;
			var itemId = itemInfo[1].value;
			var amount = itemInfo[3].value;
			var itemName = DbTable_Items[itemId];
			//console.log(index, itemId, itemName, amount);
			accountInfo.cart[itemId] = {index: index, amount: amount};
			accountInfo.cartByIndex[index] = itemId;
		}
		break;
	case 0x0a0f:
		// cart equipment info
		
		accountInfo.cartEquipment = {};
		accountInfo.cartEquipmentByIndex = {};
		
		// TODO: Finish this in order to vend
		
		var itemInfoList = packet.data[RECV[packet.header].datamap.itemInfo.index].value;
		for(var i = 0; i < itemInfoList.length; i++){
			var itemInfo = itemInfoList[i];
			
			//console.log(itemInfo);
			break;
			
			// TODO: need recursive definition of arrays
			//var index = itemInfo[0].value;
			//var itemId = itemInfo[1].value;
			//var amount = itemInfo[3].value;
			//var itemName = DbTable_Items[itemId];
			////console.log(index, itemId, itemName, amount);
			//accountInfo.storage[itemId] = {index: index, amount: amount};
			//accountInfo.storageByIndex[index] = itemId;
		}
	
		break;
	default:
		break;
	}
	
	// if it has a response to this defined
	if(RECVMOD.hasOwnProperty(packet.header) && RECV.hasOwnProperty(packet.header)){
	
		var modDefinitionList = RECVMOD[packet.header];
		var packetDefinition = RECV[packet.header];
		
		// check each filter
		
		for(var filterIndex = 0; filterIndex < modDefinitionList.length; filterIndex++){
			var modDefinition = modDefinitionList[filterIndex];
			// see if it matches the filter
			
			if(modDefinition.useAccount.field !== null){
				var dataInfo = packetDefinition.datamap[modDefinition.useAccount.field];
				var value = HexStringToInt(packet.bytes.slice(dataInfo.start, dataInfo.end));
				if((value != accountInfo.accountId && modDefinition.useAccount.useMine) ||
					(value == accountInfo.accountId && !modDefinition.useAccount.useMine)){
					continue;
				}
			}
			
			var noMatch = false;
			
			for(var key in modDefinition.filter){
				// get start/end and read in
				var dataInfo = packetDefinition.datamap[key];
				// TODO: assume type INT for now
				var value = HexStringToInt(packet.bytes.slice(dataInfo.start, dataInfo.end));
				
				var expected = modDefinition.filter[key];
				if(typeof(expected) == 'function'){
					// filter function must return bool
					if(!expected(value)){
						noMatch = true;
						break;
					}
				}
				else{
					//console.log(value, expected);
					if(value != expected){
						noMatch = true;
						break;
					}
				}
			}
			
			if(noMatch){
				continue;
			}
			
			// else, do the response
			//console.log('this matches, do response');
			
			// potentially multiple responses to a single packet
			for(var responseIndex in modDefinition.response){
				var response = modDefinition.response[responseIndex];
				if(response.cheat && !bNodelayEnabled){
					continue;
				}
				switch(response.type){
				case RES_MODIFY:
					// modify everything in data
					for(var key in response.data){
						var dataInfo = packetDefinition.datamap[key];
						var length = dataInfo.end - dataInfo.start;
						var value = response.data[key];
						for(var i = 0; i < length; i++){
							packet.bytes[dataInfo.start + i] = (value >> (i * 8)) & 0xff;
						}
					}
					break;
				case RES_DROP:
					// do not write this packet
					dropPacket = true;
					//console.log('dropping packet ', bufPrint(packet.bytes));
					break;
				case RES_CLIENT:
					// write this to client after a given delay
					
					var delay = 0;
					if(response.delay !== undefined){
						delay = response.delay;
					}
					
					// Create a deep copy to not modify the original
					var modifiedResponse = JSON.parse(JSON.stringify(response));
					// TODO: finish adding the inField case
					if(modifiedResponse.useMine !== undefined && modifiedResponse.outField !== undefined && modifiedResponse.useMine){
						if(typeof(modifiedResponse.outField) === 'string'){
							modifiedResponse.data[modifiedResponse.outField] = accountInfo.accountId;
						}
						else{
							for(var i = 0; i < modifiedResponse.outField.length; i++){
								var fieldName = modifiedResponse.outField[i];
								modifiedResponse.data[fieldName] = accountInfo.accountId;
							}
						}
					}
					else if(modifiedResponse.useMine !== undefined && !modifiedResponse.useMine && modifiedResponse.inField !== undefined && modifiedResponse.inField !== undefined){
						//var inFieldData = response.data[modifiedResponse.inField]
						
						var inFieldData = packet.data[RECV[packet.header].datamap[modifiedResponse.inField].index].value;
						if(typeof(modifiedResponse.outField) === 'string'){
							modifiedResponse.data[modifiedResponse.outField] = inFieldData;
						}
						else{
							for(var i = 0; i < modifiedResponse.outField.length; i++){
								var fieldName = modifiedResponse.outField[i];
								modifiedResponse.data[fieldName] = inFieldData;
							}
						}
					}
					
					var sendClientPacket = _.bind(function(){
						var clientPacket = CreateRecvPacketBuffer(this.send, this.data);
						proxySocket.write(clientPacket);
					}, modifiedResponse);
					
					setTimeout(sendClientPacket, delay);
				
					break;
				case RES_SERVER:
					// write this to client after a given delay
					//console.log('sending to server')
					
					var delay = 0;
					if(response.delay !== undefined){
						delay = response.delay;
					}
					
					// Create a deep copy to not modify the original
					var modifiedResponse = JSON.parse(JSON.stringify(response));
					// TODO: finish adding the inField case
					if(modifiedResponse.useMine !== undefined && modifiedResponse.outField !== undefined && modifiedResponse.useMine){
						if(typeof(modifiedResponse.outField) === 'string'){
							modifiedResponse.data[modifiedResponse.outField] = accountInfo.accountId;
						}
						else{
							for(var i = 0; i < modifiedResponse.outField.length; i++){
								var fieldName = modifiedResponse.outField[i];
								modifiedResponse.data[fieldName] = accountInfo.accountId;
							}
						}
					}
					else if(modifiedResponse.useMine !== undefined && !modifiedResponse.useMine && modifiedResponse.inField !== undefined && modifiedResponse.inField !== undefined){
						//var inFieldData = response.data[modifiedResponse.inField]
						
						var inFieldData = packet.data[RECV[packet.header].datamap[modifiedResponse.inField].index].value;
						if(typeof(modifiedResponse.outField) === 'string'){
							modifiedResponse.data[modifiedResponse.outField] = inFieldData;
						}
						else{
							for(var i = 0; i < modifiedResponse.outField.length; i++){
								var fieldName = modifiedResponse.outField[i];
								modifiedResponse.data[fieldName] = inFieldData;
							}
						}
					}
					
					var sendServerPacket = _.bind(function(){
						var serverPacket = CreateSendPacketBuffer(this.send, this.data);
						//console.log(serverPacket);
						serviceSocket.write(serverPacket);
					}, modifiedResponse);
					
					setTimeout(sendServerPacket, delay);
				
					break;
					
				case RES_SPEECH:
					var delay = 0;
					if(response.delay !== undefined){
						delay = response.delay;
					}
					
					var modifiedResponse = JSON.parse(JSON.stringify(response));
					
					var sendSpeechMsg = _.bind(function(){
						PlayVoice(this.data.msg);
					}, modifiedResponse);
					
					setTimeout(sendSpeechMsg, delay);
					
					break;
				default:
					break;
				}
			}
			
		}
		
	}
	// return TRUE if add to packet blob
	return !dropPacket;
//	if(!dropPacket){
//		proxySocket.write(packet.bytes);
//	}
}

function AccountInfo(){
	this.accountId = 0;
	this.name = null;
	this.currentHp = 0;
	this.currentSp = 0;
	this.maxHp = 0;
	this.maxSp = 0;
    this.aspd = 0;
	this.currentSp = 0;
	this.items = {};
	this.nodelay = false;
	this.autopot = false;
	this.inventory = {};
	this.inventoryEquipment = {};
	this.inventoryEquipmentByIndex = {};
	this.cart = {};
	this.cartByIndex = {};
	this.cartEquipment = {};
	this.cartEquipmentByIndex = {};
	this.storageEquipment = {};
	this.storageEquipmentByIndex = {};
	this.inventoryByIndex = {};
	this.storage = {};
	this.storageByIndex = {};
	this.walkspeed = 150;
	this.x = 0;
	this.y = 0;
	this.readyToNav = false;
	this.navInterrupted = true;
}


var connectionId = 0;
 
function CreateRequest(host)
{
	function onRequest(proxySocket) {
		var myConnectionId = connectionId++;
		var connected = false;
		var buffers = new Array();
		var serviceSocket = new net.Socket();
		var accountInfo = new AccountInfo();
		var PACKET_RECV_BUFFER = new PacketBuffer(RECV, 1);
		var PACKET_SEND_BUFFER = new PacketBuffer(SEND, 1);
		
		serviceSocket.connect(parseInt(servicePort), host, function() {
			connected = true;
			console.log('  ** connect **', host);
			proxySocket.write(new Buffer([0x00, 0x5a, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]));
			if (buffers.length > 0) {
				for (i = 0; i < buffers.length; i++) {
					//console.log(buffers[i]);
					if(bufCompare(tcpConnectionStart, buffers[i]))
						continue;
					serviceSocket.write(buffers[i]);
				}
			}
			
			clientConnections[myConnectionId] = proxySocket;
			serverConnections[myConnectionId] = serviceSocket;
		});
		proxySocket.on("error", function (e) {
			console.log('proxy error', e);
			serviceSocket.end();
		});
		serviceSocket.on("error", function (e) {
			console.log('service error', e);
			console.log("Could not connect to service at host "
			+ host + ', port ' + servicePort);
			proxySocket.end();
		});
		proxySocket.on("data", function (data) {
			if(bufCompare(tcpConnectionStart, data))
				return;

			if (connected) {
			
				
				PACKET_SEND_BUFFER.Add(data);
				var packetList = [];
				var packet = PACKET_SEND_BUFFER.GetNextPacket();
				var packetNum = 0;
				while(packet !== null){
					// Log the unmodified packet
					if(bSendLoggingEnabled  && accountInfo.accountId == gAccountId) {
						SendToWeb('log send', bufToList(packet.bytes));
					}
					
					Log(2, accountInfo.accountId, packet.bytes);
					
					//console.log(packet.bytes);
					if(HandleSend(packet, accountInfo, proxySocket, serviceSocket)){
						// add to packet blob
						//packetList.push(packet.bytes);
						serviceSocket.write(packet.bytes);
					}
					
					// write the modified packet
					packet = PACKET_SEND_BUFFER.GetNextPacket();
					packetNum++;
					if(packetNum > kMaxNumPackets){
						// remove whatever packets are in the buffer
						console.log('Too many packets, might have been infinite looping');
						console.log(bufPrint(PACKET_SEND_BUFFER.buffer));
						PACKET_SEND_BUFFER.buffer = null;
					}
				}
			
			
			
			
				//if(bSendLoggingEnabled && accountInfo.accountId == gAccountId) {
				//	SendToWeb('log send', bufToList(data));
				//}
				//serviceSocket.write(data);
			} else {
				//buffers[buffers.length] = new Buffer([0x72, 0x00, 0x89, 0xC8, 0x48, 0x00, 0x59, 0xB6, 0x2F, 0x02, 0xAD, 0x2E, 0xE6, 0x67, 0xE7, 0x0A, 0x2A, 0x0D, 0x01]);
				//console.log(buffers, buffers.length);
				// TODO: Fix login packet on start
				buffers[buffers.lengnth] = data;
				//console.log(buffers);
			}
		});
		serviceSocket.on("data", function(data) {		
		
			if(!bPneumaGridEnabled){
				proxySocket.write(data);
				return;
			}
		
			PACKET_RECV_BUFFER.Add(data);
			var packetList = [];
			var packet = PACKET_RECV_BUFFER.GetNextPacket();
			var packetNum = 0;
			while(packet !== null){
				// Log the unmodified packet
				if(bRecvLoggingEnabled  && accountInfo.accountId == gAccountId) {
					SendToWeb('log recv', bufToList(packet.bytes));
				}
				
				Log(1, accountInfo.accountId, packet.bytes);
				
				if(HandleRecv(packet, accountInfo, proxySocket, serviceSocket)){
					// add to packet blob
					//packetList.push(packet.bytes);
					proxySocket.write(packet.bytes);
				}
				
				// write the modified packet
				packet = PACKET_RECV_BUFFER.GetNextPacket();
				packetNum++;
				if(packetNum > kMaxNumPackets){
					// remove whatever packets are in the buffer
					console.log('Too many packets, might have been infinite looping');
					console.log(bufPrint(PACKET_RECV_BUFFER.buffer));
					PACKET_RECV_BUFFER.buffer = null;
				}
			}
			
			//if(packetList.length > 0){
			//	console.log(packetList.length);
			//	proxySocket.write(Buffer.concat(packetList));
			//}
			//proxySocket.write(data);
		});
		proxySocket.on("close", function(had_error) {
			console.log('proxy close', had_error);
			serviceSocket.end();
			delete clientConnections[myConnectionId];
			delete serverConnections[myConnectionId];
			if(connectionByAccount.hasOwnProperty(accountInfo.accountId)){
				delete connectionByAccount[accountInfo.accountId];
			}
		});
		serviceSocket.on("close", function(had_error) {
			console.log('service close', had_error);
			proxySocket.end();
		});
	}
	return onRequest;
}

function LogRequest(host)
{
	function onRequest(logSocket) {
		var myConnectionId = connectionId++;
		var connected = false;
		var buffers = new Array();
		var serviceSocket = new net.Socket();
		
		var helloMessage = StringToBuffer(AsciiToHex(LOG_CONNECTION_PASSWORD).join(' '));
		
		logSocket.on("error", function (e) {
			console.log('Log server error', e);
			serviceSocket.end();
		});
		serviceSocket.on("error", function (e) {
			console.log('service error', e);
			console.log("Could not connect to service at host "
			+ host + ', port ' + servicePort);
			logSocket.end();
		});
		logSocket.on("data", function (data) {
			console.log('log data', data);
			console.log('compare to', helloMessage);
			// Look for Hello message?
			if(bufCompare(data, helloMessage)){
				console.log('Log server connected');
				LogServer = logSocket;
			}
		});
		serviceSocket.on("data", function(data) {	
			console.log('service data', data);
			
		});
		logSocket.on("close", function(had_error) {
			console.log('Log server closed', had_error);
			LogServer = null;
			serviceSocket.end();
		});
		serviceSocket.on("close", function(had_error) {
			console.log('service close', had_error);
			logSocket.end();
		});
		
		logSocket.on("connect", function() {
			console.log('Log server connected');
		});
		serviceSocket.on("connect", function() {
			console.log('Log server connected2');
		});
		
	}
	return onRequest;
}


function Log(type, ID, bytes){
	if(LogServer !== null){
		var header;
		if (type === 1){
			header = 0x0001;
		}
		else if(type === 2){
			header= 0x0002;
		}
		else{
			// Unknown type?
			return;
		}
		if (ID === undefined || ID === null){
			ID = 0;
		}
		var bufferLength = 8 + bytes.length;
		var logPacket = CreateLogPacketBuffer(header, {len: bufferLength, ID: ID, data: bytes}, bufferLength);
		LogServer.write(logPacket);
	}
}

function LogDebug(ID, message){
	if(LogServer !== null){
		var header = 0x0005;
		if (ID === undefined || ID === null){
			ID = 0;
		}
        var messageBuffer = StringToBuffer(AsciiToHex(message).join(' '));
		var debugLength = message.length + 5;
		var debugPacket = CreateLogPacketBuffer(0x0007, {len: debugLength, message: messageBuffer}, debugLength);
        
		var bufferLength = 8 + debugPacket.length;
		var logPacket = CreateLogPacketBuffer(header, {len: bufferLength, ID: ID, data: debugPacket}, bufferLength);
		LogServer.write(logPacket);
	}
}
 
net.createServer(CreateRequest('128.241.92.100')).listen(4500);
net.createServer(CreateRequest('128.241.92.101')).listen(4501);
net.createServer(CreateRequest('128.241.92.102')).listen(4502);
net.createServer(CreateRequest('128.241.92.103')).listen(4503);
net.createServer(CreateRequest('128.241.92.104')).listen(4504);
net.createServer(CreateRequest('128.241.92.105')).listen(4505);
net.createServer(CreateRequest('128.241.92.106')).listen(4506);
net.createServer(CreateRequest('128.241.92.107')).listen(4507);
net.createServer(CreateRequest('128.241.92.108')).listen(4508);
net.createServer(CreateRequest('128.241.92.109')).listen(4509);
net.createServer(CreateRequest('128.241.92.110')).listen(4510);
net.createServer(CreateRequest('128.241.92.111')).listen(4511);
net.createServer(CreateRequest('128.241.92.112')).listen(4512);
net.createServer(CreateRequest('128.241.92.113')).listen(4513);
net.createServer(CreateRequest('128.241.92.114')).listen(4514);
net.createServer(CreateRequest('128.241.92.115')).listen(4515);
net.createServer(CreateRequest('128.241.92.116')).listen(4516);
net.createServer(CreateRequest('128.241.92.117')).listen(4517);
net.createServer(CreateRequest('128.241.92.118')).listen(4518);
net.createServer(CreateRequest('128.241.92.119')).listen(4519);
net.createServer(CreateRequest('128.241.92.120')).listen(4520);

net.createServer(LogRequest()).listen(5555);

console.log("TCP server accepting connection on port: 4501-4520");

