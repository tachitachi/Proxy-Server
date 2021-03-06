var util = require('util');
var net = require('net');
var _ = require('underscore');
var fs = require('fs');

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var nodemailer = require('nodemailer');

require("amd-loader");
var recv = require('./common/recv');
var send = require('./common/send');
var bufutil = require('./bufutil');
var parse = require('./common/parse');
var recvmod = require('./common/recvmod');
var sendmod = require('./common/sendmod');
var refill = require('./common/refill');
var monstermod = require('./common/monstermod');
var rareitem = require('./common/rareitem');
var config = require('./config');
var itemutil = require('./itemutil');
var constants = require('./constants');
var logmessage = require('./LogMessage');
var DbTable_Items = require('./common/items')

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
var imukeTargets = {};
var noshieldTargets = {};
var messageBlacklist = new Set();

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


function copyEmblemAlliance(myId, theirId){
    var emblemFolder = path.join(config.RO_INSTALL_LOCATION, '_tmpEmblem');
    // find source emblem: guild emblem with the highest emblem ID
    
    
    fs.readdir(emblemFolder, function(err, files){
        if (err) {
            console.log(err);
            return;
        }
        var sourcePrefix = config.RO_SERVER + '_' + theirId + '_';
        var latestEmblem = null;
        var largestEmblemId = -1;
        
        
        for(var i = 0; i < files.length; i++){
            if(files[i].startsWith(sourcePrefix)){
                var emblemId = parseInt(files[i].substr(sourcePrefix.length, files[i].length - 4 - sourcePrefix.length));
                if(emblemId > largestEmblemId && emblemId < 1000){
                    largestEmblemId = emblemId;
                    latestEmblem = files[i];
                }
            }
        }
        
        if(latestEmblem !== null){
            //console.log(latestEmblem);
            var sourceEmblem = path.join(emblemFolder, latestEmblem);
            var destEmblem = path.join(emblemFolder, config.RO_SERVER + '_' + myId + '_' + theirId + '.ebm');
            
            fs.createReadStream(sourceEmblem).pipe(fs.createWriteStream(destEmblem));
        }
        
    });
    
}

var email_buffer = {};

function emailNotification(subject, message){
	var transporter = nodemailer.createTransport({
		'service': config.email.service,
		'auth': {
			'user': config.email.user,
			'pass': config.email.pass
		}
	});

	var mailOptions = {
		'from': config.email.user,
		'to': config.email.sendTo,
		'subject': subject,
		'text': message,
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
		}
		else{
			console.log('email sent');
		}
	});
}

function pushEmailNotification(name, message){
	if(!config.email.enabled){
		return;
	}

	if(!email_buffer.hasOwnProperty(name)){
		email_buffer[name] = [];
	}

	email_buffer[name].push(message);
}

if(config.email.enabled){
	setInterval(function(){

		if(Object.keys(email_buffer).length == 0){
			return;
		}

		let body = '';

		for(let name in email_buffer){
			body += '{0}:\n\n'.format(name);
			let messages = email_buffer[name];
			for(let i = 0; i < messages.length; i++){
				body += '{0}\n'.format(messages[i]);
			}
			body += '\n\n\n'
			delete email_buffer[name]
		}

		emailNotification('RO Notifications', body);

	}, config.email.delay);
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
			//console.log(bufutil.bufPrint(bufutil.StringToBuffer(msg)));
			clientConnections[i].write(bufutil.StringToBuffer(msg));
		}
	});
	
	socket.on('send to server', function(msg){
		for(var i in serverConnections){
			//console.log(bufutil.bufPrint(bufutil.StringToBuffer(msg)));
			serverConnections[i].write(bufutil.StringToBuffer(msg));
		}
	});
	
	socket.on('GetAccountInfo', function(data){
		var accountId = data.accountId;
		
		if(!connectedAccounts.hasOwnProperty(accountId)){
            //console.log('account', accountId, 'not connected');
			return;
		}
		
		var accountInfo = connectedAccounts[accountId];
		
		socket.emit('GetAccountInfo', {accountInfo: accountInfo, inspirationInfo: inspirationTargets});
		
	});
	
	socket.on('SetWalkPlan', function(data){

		return;
		
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
			var movePacket = send.CreateSendPacketBuffer(0x035f, {coords: parse.IntToCoordBuffer(coords[0], coords[1])});
			//console.log(bufutil.bufPrint(movePacket));
			
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
		//recvmod.RECVMOD[data.header].response[data.pos].data[data.field] = data.value;
		recvmod.RECVMOD[data.header][data.pos].response[0].data[data.field] = data.value;
	});

	socket.on('add to blacklist', function(data){
		if(data.hasOwnProperty('ID')){
			messageBlacklist.add(data.ID);

			fs.appendFile('blacklist.txt', '{0}\n'.format(data.ID), function(err) {
				if(err){
					console.log('Failed to add [{0}] to blacklist'.format(data.ID));
				}
			});

		}
	});
	
	// socket.on('refill', function(data){
	// 	// data = {
	// 	//	accountId: ID,
	// 	// 	items: [
	// 	// 		{
	// 	// 			ID: X,
	// 	// 			amount: Y
	// 	// 		}
	// 	// 	]
	// 	// }
		
	// 	console.log(data);
		
	// 	var accountId = data.accountId;
	// 	if(!connectedAccounts.hasOwnProperty(accountId)){
	// 		console.log('no connected account');
	// 		return;
	// 	}
	// 	if(!connectionByAccount.hasOwnProperty(accountId)){
	// 		console.log('no server connection');
	// 		return;
	// 	}
		
	// 	var accountInfo = connectedAccounts[accountId];
	// 	var serviceSocket = connectionByAccount[accountId].server;
		
		
		
	// 	var refillData = data.items;
		
	// 	var storagePackets = itemutil.storageRefill(refillData, accountInfo);
	// 	console.log(storagePackets);
		
	// 	if(storagePackets.length > 0){
	// 		var SendPackets = function(arr, accountInfo, serviceSocket){
	// 			if (!accountInfo.isStorageOpen){
	// 				return;
	// 			}
	// 			if(arr.length > 0){
	// 				var packet = arr.pop();
	// 				serviceSocket.write(packet);
	// 				//console.log(bufutil.bufPrint(packet));
	// 				setTimeout(SendPackets, 500, arr, accountInfo, serviceSocket);
	// 			}
	// 		}
	// 		setTimeout(SendPackets, 500, storagePackets, accountInfo, serviceSocket);
	// 	}
		
		
		
	// });
	
  
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});

var proxyPort = 4500;
var serviceHost = '128.241.92.114';
var servicePort = 4500;

//var tcpConnectionStart = new Buffer([0x04, 0x01, 0x11, 0x94, 0x80, 0xf1, 0x5c, 0x72, 0x00]);

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
		var emoteId = packet.data[send.SEND[packet.header].datamap.emoteId.index].value;
		console.log('emoteId', emoteId);
		
        if(bNodelayEnabled){
            
            if(emoteId === 36){
                // use force Stand instead, useful when sitting while hidden
                //var castZenPacket = send.CreateSendPacketBuffer(0x0113, {lv: 1, skillId: 401, targetId: accountInfo.accountId});
                var forceStandPacket = send.CreateSendPacketBuffer(0x0089, {ID: 0, type: 3});
                var resetEmotePacket = recv.CreateRecvPacketBuffer(0x00c0, {ID: accountInfo.accountId, type: 255});
                serviceSocket.write(forceStandPacket);
                proxySocket.write(resetEmotePacket);
                return false;
            }
            
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
	
		var skillId = packet.data[send.SEND[packet.header].datamap.skillId.index].value;
		var lv = packet.data[send.SEND[packet.header].datamap.lv.index].value;
		var x = packet.data[send.SEND[packet.header].datamap.x.index].value;
		var y = packet.data[send.SEND[packet.header].datamap.y.index].value;
		//console.log(skillId);
		
		if(skillId == 2300 && lv == 2){ // Dimension Door level 2
		
			
			var angle = Math.atan2(x - accountInfo.x, y - accountInfo.y) * 180 / Math.PI;
			
			var direction = 7 - (Math.floor((angle + 22.5) / 45) + 3);
			//var directionValues = [7, 6, 5, 4, 3, 2, 1, 0];
			
			//console.log(x, y, accountInfo.x, accountInfo.y, angle, direction);	

			
			var lookat = send.CreateSendPacketBuffer(0x0361, {head: 0, body: direction});
			
		
			var backslide = send.CreateSendPacketBuffer(0x0113, {lv: 1, skillId: 150, targetId: accountInfo.accountId});
			
			serviceSocket.write(lookat);
			serviceSocket.write(backslide);
			
		
			return false;
		}
		if(skillId == 2483 && lv == 9){ // crazy vines 9
		
			var actorMovementInterruptedPacket = recv.CreateRecvPacketBuffer(0x08d2, {ID: accountInfo.accountId, x: x, y: y});
			// 0x0087 character moves
			proxySocket.write(actorMovementInterruptedPacket);
			
			return false;
		}
		
		break;
	default:
		break;
	}
	
	
	
	if(sendmod.SENDMOD.hasOwnProperty(packet.header) && send.SEND.hasOwnProperty(packet.header)){
		var modDefinitionList = sendmod.SENDMOD[packet.header];
		var packetDefinition = send.SEND[packet.header];
		//console.log(modDefinitionList);
		
		// check each filter
		
		for(var filterIndex = 0; filterIndex < modDefinitionList.length; filterIndex++){
			var modDefinition = modDefinitionList[filterIndex];
			// see if it matches the filter
			
			if(modDefinition.useAccount.field !== null){
				var dataInfo = packetDefinition.datamap[modDefinition.useAccount.field];
				var value = parse.HexStringToInt(packet.bytes.slice(dataInfo.start, dataInfo.end));
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
				var value = parse.HexStringToInt(packet.bytes.slice(dataInfo.start, dataInfo.end));
				
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
				case recvmod.RES_MODIFY:
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
				case recvmod.RES_DROP:
					// do not write this packet
					dropPacket = true;
					//console.log('dropping packet ', bufutil.bufPrint(packet.bytes));
					break;
				case recvmod.RES_CLIENT:
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
						
						var inFieldData = packet.data[recv.RECV[packet.header].datamap[modifiedResponse.inField].index].value;
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
						var clientPacket = recv.CreateRecvPacketBuffer(this.send, this.data);
						proxySocket.write(clientPacket);
					}, modifiedResponse);
					
					setTimeout(sendClientPacket, delay);
				
					break;
				case recvmod.RES_SERVER:
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
						var inFieldData = packet.data[send.SEND[packet.header].datamap[modifiedResponse.inField].index].value;
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
						var serverPacket = send.CreateSendPacketBuffer(this.send, this.data);
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
		var itemId = packet.data[recv.RECV[packet.header].datamap.itemId.index].value;
		
		if(bNodelayEnabled && rareitem.hasOwnProperty(itemId)){
			var playMVPeffect = recv.CreateRecvPacketBuffer(0x010c, {ID: accountInfo.accountId});
			proxySocket.write(playMVPeffect);
		}
		
		break;
	case 0x0080:
		// actor_died_or_disappeared
		var accountId = packet.data[recv.RECV[packet.header].datamap.ID.index].value;
		
		if(accountId in inspirationTargets){
			clearTimeout(inspirationTargets[accountId]);
			delete inspirationTargets[accountId];
		}
	
		break;
	case 0x0087:
		// Started walking
		var ping = 50;
		var coordpair = packet.data[recv.RECV[packet.header].datamap.coords.index].value;
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
		//var assumptioPacket = recv.CreateRecvPacketBuffer(0x011a, {skillId: 361, amount: 1, targetId: 1851380, sourceId: 1851380, success: 1});
		//console.log(bufutil.bufPrint(assumptioPacket));
		
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
		var type = packet.data[recv.RECV[packet.header].datamap.type.index].value;
		var val = packet.data[recv.RECV[packet.header].datamap.val.index].value;
		
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
				//var playLaughSound = recv.CreateRecvPacketBuffer(0x01c8, {index: 200, itemId: 12027, ID: accountInfo.accountId, remaining: 0, success: 1});
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
	case 0x00b1:
		//stat_info2
		var type = packet.data[recv.RECV[packet.header].datamap.type.index].value;
		var val = packet.data[recv.RECV[packet.header].datamap.val.index].value;

		switch(type){
		case 20:
			accountInfo.zeny = val;
			break;
		default:
			break;
		}

		break
	case 0x07fb:
		// skill cast
		
		// if someone snaps off screen, fix "ghosting"
		var sourceId = packet.data[recv.RECV[packet.header].datamap.sourceId.index].value;
		var targetId = packet.data[recv.RECV[packet.header].datamap.targetId.index].value;
		var x = packet.data[recv.RECV[packet.header].datamap.x.index].value;
		var y = packet.data[recv.RECV[packet.header].datamap.y.index].value;
		var skillId = packet.data[recv.RECV[packet.header].datamap.skillId.index].value;
		var wait = packet.data[recv.RECV[packet.header].datamap.wait.index].value;
		
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
//				var highJumpPacket = recv.CreateRecvPacketBuffer(0x08d2, {ID: sourceId, x: x, y: y});
//				var actorDisappearedPacket = recv.CreateRecvPacketBuffer(0x0080, {ID: sourceId, type: 0});
//				proxySocket.write(highJumpPacket);
//				proxySocket.write(actorDisappearedPacket);
//				//console.log('removing snapped target');
//			}
//		}
		
	
		break;
	case 0x00b3:
		// switch character, reset stats
			
		//accountInfo.name = null;
        //accountInfo.guildId = 0;
        //accountInfo.allies = {};
		//accountInfo.currentHp = 0;
		//accountInfo.currentSp = 0;
		//accountInfo.maxHp = 0;
		//accountInfo.maxSp = 0;
        //accountInfo.aspd = 0;
		//accountInfo.currentSp = 0;
		//accountInfo.items = {};
		//accountInfo.nodelay = false;
		//accountInfo.autopot = false;
		//accountInfo.inventory = {};
		//accountInfo.inventoryByIndex = {};
		//accountInfo.inventoryEquipment = {};
		//accountInfo.inventoryEquipmentByIndex = {};
		//accountInfo.cart = {};
		//accountInfo.cartByIndex = {};
		//accountInfo.cartEquipment = {};
		//accountInfo.cartEquipmentByIndex = {};
		//accountInfo.storageEquipment = {};
		//accountInfo.storageEquipmentByIndex = {};
		//accountInfo.storage = {};
		//accountInfo.storageByIndex = {};
		//accountInfo.walkspeed = 150;
		//accountInfo.x = 0;
		//accountInfo.y = 0;
		//accountInfo.readyToNav = false;
		//accountInfo.navInterrupted = true;
		
		break;
	case 0x0088:
		//actor_movement_interrupted
		var actorId = packet.data[recv.RECV[packet.header].datamap.ID.index].value;
		var x = packet.data[recv.RECV[packet.header].datamap.x.index].value;
		var y = packet.data[recv.RECV[packet.header].datamap.y.index].value;
		
		if(actorId !== accountInfo.accountId && bNodelayEnabled){
			dropPacket = true;
		}
		break;
	case 0x008d:
		//public_chat

		if(accountInfo.isInChatroom){
			// email notifiication

			var message = packet.data[recv.RECV[packet.header].datamap.message.index].value;

			console.log('Email notification [chatroom]', message);

			var body = '[{0}] [chatroom] {1}'.format(parse.GetTime().string, message);
			pushEmailNotification(accountInfo.name, body);
		}

		break;
	case 0x00d6:
		//chat_created

		// Must be in a party to activate afk-notification mode
		if(accountInfo.name !== null){
			accountInfo.isInChatroom = true;
		}

		break;
	case 0x00dc:
		//chat_user_join

		break;
	case 0x00dd:
		//chat_user_leave

		var name = packet.data[recv.RECV[packet.header].datamap.name.index].value;

		// Disable afk-notification after leaving chatroom
		if(name === accountInfo.name){
			accountInfo.isInChatroom = false;
		}

		break;
	case 0x09de:
		//private_message
		var ID = packet.data[recv.RECV[packet.header].datamap.ID.index].value;
		var name = packet.data[recv.RECV[packet.header].datamap.name.index].value;
		var msg = packet.data[recv.RECV[packet.header].datamap.msg.index].value;

		console.log('[private]', ID, name, msg);

		if(messageBlacklist.has(ID)){
			dropPacket = true;
		}

		if(accountInfo.isInChatroom || accountInfo.isVending){
			// email notification

			console.log('Email notification [private]', ID, name, msg);

			var body = '[{0}] [private] {1} [{2}] : {3}'.format(parse.GetTime().string, name, ID, msg);
			pushEmailNotification(accountInfo.name, body);
		}

		break;
	case 0x0136:
		//vending_start
		if(accountInfo.name !== null){
			var itemInfoList = packet.data[recv.RECV[packet.header].datamap.itemInfo.index].value;

			accountInfo.isVending = true;
			accountInfo.vendData = {};

			for(var i = 0; i < itemInfoList.length; i++){
				var itemInfo = itemInfoList[i];
				// TODO: need recursive definition of arrays
				var price = itemInfo[0].value;
				var index = itemInfo[1].value;
				var quantity = itemInfo[2].value;
				var itemId = itemInfo[4].value;
				accountInfo.vendData[index] = {
					'itemId': itemId,
					'price': price,
					'quantity': quantity,
				}
			}
		}

		break;
	case 0x0137:
		//shop_sold

		if(accountInfo.isVending){

			var index = packet.data[recv.RECV[packet.header].datamap.index.index].value;
			var quantity = packet.data[recv.RECV[packet.header].datamap.quantity.index].value;

			var itemData = accountInfo.vendData[index];

			var totalSale = itemData.price * quantity;
			itemData.quantity -= quantity;
			var remaining = itemData.quantity;
			var itemId = itemData.itemId;
			var itemName = DbTable_Items.hasOwnProperty(itemId) ? DbTable_Items[itemId] : 'Unknown Item {0}'.format(itemId);

			var msg = '[{0}] Sold [{1}] [{2}] for [{3}] zeny. [{4}] remaining. Current zeny: [{5}]'.format(parse.GetTime().string, quantity, itemName, totalSale, remaining, accountInfo.zeny);
			console.log(msg);
			pushEmailNotification(accountInfo.name, msg);

	}


		break;
	case 0x00f8:
		accountInfo.isStorageOpen = false;
		break;
	case 0x01ff:
	//case 0x0088:
		//being_slide
		var actorId = packet.data[recv.RECV[packet.header].datamap.ID.index].value;
		var x = packet.data[recv.RECV[packet.header].datamap.x.index].value;
		var y = packet.data[recv.RECV[packet.header].datamap.y.index].value;
		
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
				var highJumpPacket = recv.CreateRecvPacketBuffer(0x08d2, {ID: actorId, x: x, y: y});
				proxySocket.write(highJumpPacket);
				//console.log('replacing with snap?');
				
				dropPacket = true;
			}
		}
		
		break;
	case 0x0091:
	case 0x0092:
		// map changed, tell webpage?
		var mapName = packet.data[recv.RECV[packet.header].datamap.map.index].value.replace('.gat', '');
		var x = packet.data[recv.RECV[packet.header].datamap.x.index].value;
		var y = packet.data[recv.RECV[packet.header].datamap.y.index].value;
		ChangeMap({'name': mapName, 'x': x, 'y': y});
		
		break;
	case 0x01e9:
		// party join, use to determine which map you log in at
		var accountId = packet.data[recv.RECV[packet.header].datamap.ID.index].value;
		if(accountId == accountInfo.accountId){
			var x = packet.data[recv.RECV[packet.header].datamap.x.index].value;
			var y = packet.data[recv.RECV[packet.header].datamap.y.index].value;
			var mapName = packet.data[recv.RECV[packet.header].datamap.map.index].value.replace('.gat', '');
			var user = packet.data[recv.RECV[packet.header].datamap.user.index].value;
			
			accountInfo.name = user;
			ChangeMap({'name': mapName, 'x': x, 'y': y});
		}
		
		break;
	case 0x0283:
		// set accountId
		var dataIndex = recv.RECV[packet.header].datamap.ID.index;
		var accountId = packet.data[dataIndex].value;
		accountInfo.accountId = accountId;
		
		connectionByAccount[accountId] = {client: proxySocket, server: serviceSocket};
		// TODO: somehow clean these up eventually
		connectedAccounts[accountId] = accountInfo;
		//console.log(accountInfo);
		break;
	case 0x01c8:
		// use item
        var accountID = packet.data[recv.RECV[packet.header].datamap.ID.index].value;
		var itemId = packet.data[recv.RECV[packet.header].datamap.itemId.index].value;
		var itemIndex = packet.data[recv.RECV[packet.header].datamap.index.index].value;
		var remaining = packet.data[recv.RECV[packet.header].datamap.remaining.index].value;
		
		if(accountID == accountInfo.accountId && accountInfo.inventory.hasOwnProperty(itemId)){
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
	case 0x0983: // also has more than 3 fields
		// actor status active
	
		var accountId = packet.data[recv.RECV[packet.header].datamap.ID.index].value;
		var type = packet.data[recv.RECV[packet.header].datamap.type.index].value;
		var flag = packet.data[recv.RECV[packet.header].datamap.flag.index].value;
		
		if(accountId !== accountInfo.accountId){ // keep track of opponents
			if(type === 407){
				if(flag === 1){
					//console.log('has inspiration!');
					if(!inspirationTargets.hasOwnProperty(accountId)){
						//console.log('starting inspiration timer');
						// start a timer to disable inspiration, if I haven't started one for this account already	
						
						//console.log('adding to inspiration', accountId, accountInfo.accountId)
                        
                        if(bNodelayEnabled){
                            var startInspirationEffect = recv.CreateRecvPacketBuffer(0x0983, {type: constants.INSPIRATION_EFFECT['clear'], ID: accountId, flag: 1});
                            proxySocket.write(startInspirationEffect);
                        }
                        
						inspirationTargets[accountId] = setTimeout(_.bind(function(){
							//console.log('deleting inspiration from timer', this.accountId);
							delete inspirationTargets[this.accountId];
						}, {accountId: accountId}), 90000);
					}
				}
				else{
					
					clearTimeout(inspirationTargets[accountId]);
					delete inspirationTargets[accountId];
					//96 01 7b 00 f3 3a 10 00 00
					
					if(bNodelayEnabled){
						var endInspirationEffect = recv.CreateRecvPacketBuffer(0x0196, {type: constants.INSPIRATION_EFFECT['clear'], ID: accountId, flag: 0});
						proxySocket.write(endInspirationEffect);
					}
				}
			}
		}
		else{
			// do stuff for myself

			// disable afk-notifications if shop closes
			if(type === 95 && flag === 0 && accountInfo.isVending){
				accountInfo.isVending = false;
			}
		}
		
	
		break;
    case 0x01d7:
        // player_equipment
        //console.log(packet);
        
		var accountId = packet.data[recv.RECV[packet.header].datamap.sourceId.index].value;
		var ID1 = packet.data[recv.RECV[packet.header].datamap.ID1.index].value;
		var ID2 = packet.data[recv.RECV[packet.header].datamap.ID2.index].value;
        
        if(accountId !== accountInfo.accountId){
            // If no shield, turn them red
            
            //console.log('equipping items', ID1, ID2);
            
            // No shield
            if(ID1 == 0 || ID2 == 0){
                
                if(bNodelayEnabled){
                    var startNoshieldEffect = recv.CreateRecvPacketBuffer(0x0983, {type: constants.NOSHIELD_EFFECT['clear'], ID: accountId, flag: 1});
                    proxySocket.write(startNoshieldEffect);
                }
                
                noshieldTargets[accountId] = setTimeout(_.bind(function(){
                    //console.log('deleting no shield from timer', this.accountId);
                    delete noshieldTargets[this.accountId];
                }, {accountId: accountId}), 5000); 
                
                // clear imuke
                clearTimeout(imukeTargets[accountId]);
                delete imukeTargets[accountId];
                //96 01 7b 00 f3 3a 10 00 00
                
                if(bNodelayEnabled){
                    var endImukeEffect = recv.CreateRecvPacketBuffer(0x0196, {type: constants.IMUKE_EFFECT['clear'], ID: accountId, flag: 0});
                    proxySocket.write(endImukeEffect);
                }
            }
            else if(ID2 != 28910){
                //console.log('imuke unequipped');
                
                // clear imuke
                clearTimeout(imukeTargets[accountId]);
                delete imukeTargets[accountId];
                
                
                if(bNodelayEnabled){
                    var endImukeEffect = recv.CreateRecvPacketBuffer(0x0196, {type: constants.IMUKE_EFFECT['clear'], ID: accountId, flag: 0});
                    proxySocket.write(endImukeEffect);
                }
                
                // clear noshield
                clearTimeout(noshieldTargets[accountId]);
                delete noshieldTargets[accountId];
                
                if(bNodelayEnabled){
                    var endNoshieldEffect = recv.CreateRecvPacketBuffer(0x0196, {type: constants.NOSHIELD_EFFECT['clear'], ID: accountId, flag: 0});
                    proxySocket.write(endNoshieldEffect);
                }
            }
            // If target put on an imuke shield
            else if(ID2 == 28910){
                
                if(bNodelayEnabled){
                    var startImukeEffect = recv.CreateRecvPacketBuffer(0x0983, {type: constants.IMUKE_EFFECT['clear'], ID: accountId, flag: 1});
                    proxySocket.write(startImukeEffect);
                }
                
               imukeTargets[accountId] = setTimeout(_.bind(function(){
                    //console.log('deleting no shield from timer', this.accountId);
                    delete imukeTargets[this.accountId];
                }, {accountId: accountId}), 5000); 
                
                // clear noshield
                clearTimeout(noshieldTargets[accountId]);
                delete noshieldTargets[accountId];
                
                if(bNodelayEnabled){
                    var endNoshieldEffect = recv.CreateRecvPacketBuffer(0x0196, {type: constants.NOSHIELD_EFFECT['clear'], ID: accountId, flag: 0});
                    proxySocket.write(endNoshieldEffect);
                }
                
            }
            
        }
        
        break;
    case 0x090f:
	case 0x0914:
	case 0x0915:
	case 0x09db:
	case 0x09dc:
	case 0x09dd:
        // actor_connected
		// actor_moved
		// actor_exists
		var accountId = packet.data[recv.RECV[packet.header].datamap.ID.index].value;
		var opt3 = packet.data[recv.RECV[packet.header].datamap.opt3.index].value;
		var type = packet.data[recv.RECV[packet.header].datamap.type.index].value;
		var guildId = packet.data[recv.RECV[packet.header].datamap.guildId.index].value;
		var emblemId = packet.data[recv.RECV[packet.header].datamap.emblemId.index].value;
		var weapon = packet.data[recv.RECV[packet.header].datamap.weapon.index].value;
		var shield = packet.data[recv.RECV[packet.header].datamap.shield.index].value;
		
		if(accountId < 100000){
			// this is a monster
			
			// Change monster sprite if there's a mapping
			if(bNodelayEnabled && monstermod.hasOwnProperty(type)){
				var dataInfo = recv.RECV[packet.header].datamap['type'];
				var length = dataInfo.end - dataInfo.start;
				var value = monstermod[type];
				for(var i = 0; i < length; i++){
					packet.bytes[dataInfo.start + i] = (value >> (i * 8)) & 0xff;
				}
			}
			
			
		}
		else{
			// this is a player
            
            // Modify guildId and emblemId if this is an ally
            if(guildId in accountInfo.allies){
				var dataInfo = recv.RECV[packet.header].datamap['guildId'];
				var length = dataInfo.end - dataInfo.start;
				var value = accountInfo.guildId;
				for(var i = 0; i < length; i++){
					packet.bytes[dataInfo.start + i] = (value >> (i * 8)) & 0xff;
				}
                
                dataInfo = recv.RECV[packet.header].datamap['emblemId'];
				length = dataInfo.end - dataInfo.start;
				value = guildId;
				for(var i = 0; i < length; i++){
					packet.bytes[dataInfo.start + i] = (value >> (i * 8)) & 0xff;
				}
            }
            
            if(weapon == 0 || shield == 0){
                // clear imuke
                clearTimeout(imukeTargets[accountId]);
                delete imukeTargets[accountId];
                
                if(bNodelayEnabled){
                    var endImukeEffect = recv.CreateRecvPacketBuffer(0x0196, {type: constants.IMUKE_EFFECT['clear'], ID: accountId, flag: 0});
                    proxySocket.write(endImukeEffect);
                }
                
                // reset noshield
                clearTimeout(noshieldTargets[accountId]);
                noshieldTargets[accountId] = setTimeout(_.bind(function(){
                    //console.log('deleting no shield from timer', this.accountId);
                    delete noshieldTargets[this.accountId];
                }, {accountId: accountId}), 5000); 
            }
            else if(shield == 28910){
                // reset imuke
                clearTimeout(imukeTargets[accountId]);
                imukeTargets[accountId] = setTimeout(_.bind(function(){
                    //console.log('deleting no shield from timer', this.accountId);
                    delete imukeTargets[this.accountId];
                }, {accountId: accountId}), 5000); 
                
                // clear noshield 
                clearTimeout(noshieldTargets[accountId]);
                delete noshieldTargets[accountId];
                
                if(bNodelayEnabled){
                    var endNoshieldEffect = recv.CreateRecvPacketBuffer(0x0196, {type: constants.NOSHIELD_EFFECT['clear'], ID: accountId, flag: 0});
                    proxySocket.write(endNoshieldEffect);
                }
            }
            else{
                // clear imuke
                clearTimeout(imukeTargets[accountId]);
                delete imukeTargets[accountId];
                //96 01 7b 00 f3 3a 10 00 00
                
                if(bNodelayEnabled){
                    var endImukeEffect = recv.CreateRecvPacketBuffer(0x0196, {type: constants.IMUKE_EFFECT['clear'], ID: accountId, flag: 0});
                    proxySocket.write(endImukeEffect);
                }
                
                // clear noshield
                clearTimeout(noshieldTargets[accountId]);
                delete noshieldTargets[accountId];
                
                if(bNodelayEnabled){
                    var endNoshieldEffect = recv.CreateRecvPacketBuffer(0x0196, {type: constants.NOSHIELD_EFFECT['clear'], ID: accountId, flag: 0});
                    proxySocket.write(endNoshieldEffect);
                }
            }
            
			if(bNodelayEnabled && accountId != accountInfo.accountId && inspirationTargets.hasOwnProperty(accountId)){
				// bitwise OR 512 into opt3
                
                //console.log('target is in inspiration');
				
				var dataInfo = recv.RECV[packet.header].datamap['opt3'];
				var length = dataInfo.end - dataInfo.start;
				var value = opt3 | constants.INSPIRATION_EFFECT['update'];
				for(var i = 0; i < length; i++){
					packet.bytes[dataInfo.start + i] = (value >> (i * 8)) & 0xff;
				}
				
			}
            
			if(bNodelayEnabled && accountId != accountInfo.accountId && imukeTargets.hasOwnProperty(accountId)){
				// bitwise OR 65536 into opt3
                
                // Not in my guild or ally guilds
                if(!(guildId in accountInfo.allies || (guildId == accountInfo.guildId && accountInfo.guildId !== 0))){
                    //console.log('target is in imuke');
                    
                    var dataInfo = recv.RECV[packet.header].datamap['opt3'];
                    var length = dataInfo.end - dataInfo.start;
                    var value = opt3 | constants.IMUKE_EFFECT['update'];
                    for(var i = 0; i < length; i++){
                        packet.bytes[dataInfo.start + i] = (value >> (i * 8)) & 0xff;
                    }
                }
			}
            
            if(bNodelayEnabled && accountId != accountInfo.accountId && noshieldTargets.hasOwnProperty(accountId)){
				// bitwise OR 65536 into opt3
                
                //console.log('target is shieldless');
                
                var dataInfo = recv.RECV[packet.header].datamap['opt3'];
                var length = dataInfo.end - dataInfo.start;
                var value = opt3 | constants.NOSHIELD_EFFECT['update'];
                for(var i = 0; i < length; i++){
                    packet.bytes[dataInfo.start + i] = (value >> (i * 8)) & 0xff;
                }
                
			}
		}
		
		
		
		break;
	case 0x080f:
//		var itemId = packet.data[recv.RECV[packet.header].datamap.itemId.index].value;
//		var amount = packet.data[recv.RECV[packet.header].datamap.amount.index].value;
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
		var itemIndex = packet.data[recv.RECV[packet.header].datamap.index.index].value;
		var amount = packet.data[recv.RECV[packet.header].datamap.amount.index].value;
		
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
		var itemIndex = packet.data[recv.RECV[packet.header].datamap.index.index].value;
		var amount = packet.data[recv.RECV[packet.header].datamap.amount.index].value;
		
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
		var itemIndex = packet.data[recv.RECV[packet.header].datamap.index.index].value;
		var amount = packet.data[recv.RECV[packet.header].datamap.amount.index].value;
		
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
		var sourceId = packet.data[recv.RECV[packet.header].datamap.ID.index].value;
		if(sourceId == accountInfo.accountId){
			var x = packet.data[recv.RECV[packet.header].datamap.x.index].value;
			var y = packet.data[recv.RECV[packet.header].datamap.y.index].value;
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
		var itemIndex = packet.data[recv.RECV[packet.header].datamap.index.index].value;
		var itemId = packet.data[recv.RECV[packet.header].datamap.itemId.index].value
		var amount = packet.data[recv.RECV[packet.header].datamap.amount.index].value;
		
		
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
		var itemIndex = packet.data[recv.RECV[packet.header].datamap.index.index].value;
		var itemId = packet.data[recv.RECV[packet.header].datamap.itemId.index].value
		var amount = packet.data[recv.RECV[packet.header].datamap.amount.index].value;
		
		
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
		
		var dataIndex = recv.RECV[packet.header].datamap.itemInfo.index;
		var itemInfoList = packet.data[dataIndex].value;
		for(var i = 0; i < itemInfoList.length; i++){
			var itemInfo = itemInfoList[i];
			
			// TODO: need recursive definition of arrays
			var index = itemInfo[0].value;
			var itemId = itemInfo[1].value;
			var amount = itemInfo[3].value;
			//var itemName = DbTable_Items[itemId];
			//console.log(index, itemId, itemName, amount);
			accountInfo.inventory[itemId] = {index: index, amount: amount};
			accountInfo.inventoryByIndex[index] = itemId;
		}
		
		/*
		if(accountInfo.accountId && accountInfo.inventory.hasOwnProperty(512) && accountInfo.inventory[512].amount > 0){
			var itemInfo = accountInfo.inventory[512];
			var useItemPacket = CreatePacketBuffer(0x00a7, {index: itemInfo.index, targetId: accountInfo.accountId});
			//console.log(bufutil.bufPrint(useItemPacket));
			serviceSocket.write(useItemPacket);
		}
		*/
		
		break;
	case 0x0995:
		// storage opened up, "refill"
		accountInfo.storage = {};
		accountInfo.storageByIndex = {};
		
		accountInfo.isStorageOpen = true;
		
		var itemInfoList = packet.data[recv.RECV[packet.header].datamap.itemInfo.index].value;
		for(var i = 0; i < itemInfoList.length; i++){
			var itemInfo = itemInfoList[i];
			
			// TODO: need recursive definition of arrays
			var index = itemInfo[0].value;
			var itemId = itemInfo[1].value;
			var amount = itemInfo[3].value;
			//var itemName = DbTable_Items[itemId];
			//console.log(index, itemId, itemName, amount);
			accountInfo.storage[itemId] = {index: index, amount: amount};
			accountInfo.storageByIndex[index] = itemId;
		}
		
		//var storagePackets = [];
		
		// loop over every item in refill, and see what needs to happen
		//console.log(accountInfo.name);
		//if(accountInfo.name !== null && refill.hasOwnProperty(accountInfo.name)){
		//	var refillData = refill[accountInfo.name];
		//	var storagePackets = itemutil.storageRefill(refillData, accountInfo);
		//	
		//	if(storagePackets.length > 0){
		//		var SendPackets = function(arr, accountInfo){
		//			if (!accountInfo.isStorageOpen){
		//				return;
		//			}
		//			if(arr.length > 0){
		//				var packet = arr.pop();
		//				serviceSocket.write(packet);
		//				//console.log(bufutil.bufPrint(packet));
		//				setTimeout(SendPackets, 500, arr, accountInfo);
		//			}
		//		}
		//		setTimeout(SendPackets, 500, storagePackets, accountInfo);
		//	}
		//}
		
		
		/*
		if(accountInfo.accountId && accountInfo.storage.hasOwnProperty(512) && accountInfo.storage[512].amount > 0){
			var itemInfo = accountInfo.storage[512];
			var useItemPacket = CreatePacketBuffer(0x00a7, {index: itemInfo.index, targetId: accountInfo.accountId});
			//console.log(bufutil.bufPrint(useItemPacket));
			serviceSocket.write(useItemPacket);
		}
		*/
		
		break;
		
	case 0x0993:
		// cart item info
		accountInfo.cart = {};
		accountInfo.cartByIndex = {};
		
		var itemInfoList = packet.data[recv.RECV[packet.header].datamap.itemInfo.index].value;
		for(var i = 0; i < itemInfoList.length; i++){
			var itemInfo = itemInfoList[i];
			
			// TODO: need recursive definition of arrays
			var index = itemInfo[0].value;
			var itemId = itemInfo[1].value;
			var amount = itemInfo[3].value;
			//var itemName = DbTable_Items[itemId];
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
		
		var itemInfoList = packet.data[recv.RECV[packet.header].datamap.itemInfo.index].value;
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
    // Guild Alliance Stuff
    case 0x016c:
        // guild_name
        
        // TODO: Join/Leave guild
		var guildId = packet.data[recv.RECV[packet.header].datamap.guildId.index].value;
        accountInfo.guildId = guildId;
        break;
        
    case 0x014c:
        // guild_allies_enemies_list
        accountInfo.allies = {};
        
		var guildInfoList = packet.data[recv.RECV[packet.header].datamap.guildInfo.index].value;
        
        for(var i = 0; i < guildInfoList.length; i++){
            var guildInfo = guildInfoList[i];
            var type = guildInfo[0].value;
            var guildId = guildInfo[1].value;
            var guildName = guildInfo[2].value;
            
            if(type == 0){
                accountInfo.allies[guildId] = true;
                copyEmblemAlliance(accountInfo.guildId, guildId);
            }
        }
        break;
    case 0x0184:
        // guild unally
		var type = packet.data[recv.RECV[packet.header].datamap.type.index].value;
		var guildId = packet.data[recv.RECV[packet.header].datamap.guildId.index].value;
        
        if(type == 0 && guildId in accountInfo.allies){
            delete accountInfo.allies[guildId];
        }
    
        break;
    case 0x0185:
        // guild ally
		var type = packet.data[recv.RECV[packet.header].datamap.type.index].value;
		var guildId = packet.data[recv.RECV[packet.header].datamap.guildId.index].value;
        
        if(type == 0){
            accountInfo.allies[guildId] = true;
            copyEmblemAlliance(accountInfo.guildId, guildId);
        }
        
        break;
    default:
		break;
	}
	
	// if it has a response to this defined
	if(recvmod.RECVMOD.hasOwnProperty(packet.header) && recv.RECV.hasOwnProperty(packet.header)){
	
		var modDefinitionList = recvmod.RECVMOD[packet.header];
		var packetDefinition = recv.RECV[packet.header];
		
		// check each filter
		
		for(var filterIndex = 0; filterIndex < modDefinitionList.length; filterIndex++){
			var modDefinition = modDefinitionList[filterIndex];
			// see if it matches the filter
			
			if(modDefinition.useAccount.field !== null){
				var dataInfo = packetDefinition.datamap[modDefinition.useAccount.field];
				var value = parse.HexStringToInt(packet.bytes.slice(dataInfo.start, dataInfo.end));
				if((value != accountInfo.accountId && modDefinition.useAccount.useMine) ||
					(value == accountInfo.accountId && !modDefinition.useAccount.useMine)){
					continue;
				}
			}
			
			// Default to false if no filter
			var noMatch = false;
			
			for(var key in modDefinition.filter){
				// get start/end and read in
				var dataInfo = packetDefinition.datamap[key];
				// TODO: assume type INT for now
				var value = parse.HexStringToInt(packet.bytes.slice(dataInfo.start, dataInfo.end));
				
				var expected = modDefinition.filter[key];
				if(typeof(expected) == 'function'){
					// filter function must return bool
					if(!expected(value, accountInfo)){
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
				case recvmod.RES_MODIFY:
					// modify everything in data
					for(var key in response.data){
						var dataInfo = packetDefinition.datamap[key];
						var length = dataInfo.end - dataInfo.start;
						var value = response.data[key];
						if(typeof(value) === 'function'){
							value = value(accountInfo);
						}
						for(var i = 0; i < length; i++){
							packet.bytes[dataInfo.start + i] = (value >> (i * 8)) & 0xff;
						}
					}
					break;
				case recvmod.RES_DROP:
					// do not write this packet
					dropPacket = true;
					//console.log('dropping packet ', bufutil.bufPrint(packet.bytes));
					break;
				case recvmod.RES_CLIENT:
					// write this to client after a given delay
					
					var delay = 0;
					if(response.delay !== undefined){
						delay = response.delay;
					}
					
					// Create a deep copy to not modify the original
					var modifiedResponse = JSON.parse(JSON.stringify(response));
					// TODO: finish adding the inField case
					if(modifiedResponse.useMine !== undefined && modifiedResponse.myField !== undefined && modifiedResponse.useMine){
						if(typeof(modifiedResponse.myField) === 'string'){
							modifiedResponse.data[modifiedResponse.myField] = accountInfo.accountId;
						}
						else{
							for(var i = 0; i < modifiedResponse.myField.length; i++){
								var fieldName = modifiedResponse.myField[i];
								modifiedResponse.data[fieldName] = accountInfo.accountId;
							}
						}
					}
					if(modifiedResponse.inField !== undefined && modifiedResponse.outField !== undefined){
						//var inFieldData = response.data[modifiedResponse.inField]
						
						var inFieldData = packet.data[recv.RECV[packet.header].datamap[modifiedResponse.inField].index].value;
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
						var clientPacket = recv.CreateRecvPacketBuffer(this.send, this.data);
						proxySocket.write(clientPacket);
					}, modifiedResponse);
					
					setTimeout(sendClientPacket, delay);
				
					break;
				case recvmod.RES_SERVER:
					// write this to client after a given delay
					//console.log('sending to server')
					break; // disabled
					
					var delay = 0;
					if(response.delay !== undefined){
						delay = response.delay;
					}
					
					// Create a deep copy to not modify the original
					var modifiedResponse = JSON.parse(JSON.stringify(response));
					// TODO: finish adding the inField case
					if(modifiedResponse.useMine !== undefined && modifiedResponse.myField !== undefined && modifiedResponse.useMine){
						if(typeof(modifiedResponse.myField) === 'string'){
							modifiedResponse.data[modifiedResponse.myField] = accountInfo.accountId;
						}
						else{
							for(var i = 0; i < modifiedResponse.myField.length; i++){
								var fieldName = modifiedResponse.myField[i];
								modifiedResponse.data[fieldName] = accountInfo.accountId;
							}
						}
					}
					if(modifiedResponse.inField !== undefined && modifiedResponse.outField !== undefined){
						//var inFieldData = response.data[modifiedResponse.inField]
						
						var inFieldData = packet.data[recv.RECV[packet.header].datamap[modifiedResponse.inField].index].value;
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
						var serverPacket = send.CreateSendPacketBuffer(this.send, this.data);
						//console.log(serverPacket);
						serviceSocket.write(serverPacket);
					}, modifiedResponse);
					
					setTimeout(sendServerPacket, delay);
				
					break;
					
				case recvmod.RES_SPEECH:
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
    this.guildId = 0;
    this.allies = {};
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
	this.isInChatroom = false;
	this.isVending = false;
	this.vendData = {};
	this.zeny = 0;
}


var connectionId = 0;
 
function CreateRequest(host, port)
{
	function onRequest(proxySocket) {
		var myConnectionId = connectionId++;
		var connected = false;
		var buffers = new Array();
		var serviceSocket = new net.Socket();
		var accountInfo = new AccountInfo();
		var PACKET_RECV_BUFFER = new parse.PacketBuffer(recv.RECV, 1);
		var PACKET_SEND_BUFFER = new parse.PacketBuffer(send.SEND, 1);
		
		serviceSocket.connect(parseInt(port), host, function() {
			connected = true;
			console.log('  ** connect **', host, port);
			if (buffers.length > 0) {
				for (i = 0; i < buffers.length; i++) {
					serviceSocket.write(buffers[i]);
				}
			}
			
			clientConnections[myConnectionId] = proxySocket;
			serverConnections[myConnectionId] = serviceSocket;
		});
		proxySocket.on("error", function (e) {
			console.log('proxy error', e);
			//serviceSocket.end();
		});
		serviceSocket.on("error", function (e) {
			console.log('service error', e);
			console.log("Could not connect to service at host "
			+ host + ', port ' + port);
			proxySocket.end();
		});
		proxySocket.on("data", function (data) {
			if (connected) {
			
				
				PACKET_SEND_BUFFER.Add(data);
				var packetList = [];
				var packet = PACKET_SEND_BUFFER.GetNextPacket();
				var packetNum = 0;
				while(packet !== null){
					// Log the unmodified packet
					//if(bSendLoggingEnabled  && accountInfo.accountId == gAccountId) {
					//	SendToWeb('log send', bufutil.bufToList(packet.bytes));
					//}
					if(bSendLoggingEnabled) {
						SendToWeb('log send', bufutil.bufToList(packet.bytes));
					}
					
					Log(2, accountInfo.accountId, packet.bytes);
					
					//console.log(packet.bytes);
					//if(HandleSend(packet, accountInfo, proxySocket, serviceSocket)){
					//	// add to packet blob
					//	//packetList.push(packet.bytes);
					//	serviceSocket.write(packet.bytes);
					//}

					// Write unmodified packet
					serviceSocket.write(packet.bytes);
					
					// write the modified packet
					packet = PACKET_SEND_BUFFER.GetNextPacket();
					packetNum++;
					if(packetNum > kMaxNumPackets){
						// remove whatever packets are in the buffer
						console.log('Too many packets, might have been infinite looping');
						console.log(bufutil.bufPrint(PACKET_SEND_BUFFER.buffer));
						PACKET_SEND_BUFFER.buffer = null;
					}
				}
			
			} else {
				buffers[buffers.length] = data;
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
					SendToWeb('log recv', bufutil.bufToList(packet.bytes));
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
					console.log(bufutil.bufPrint(PACKET_RECV_BUFFER.buffer));
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

			if(accountInfo.isVending || accountInfo.isInChatroom){
				let msg = '[{0}] Disconnected'.format(parse.GetTime().string);
				pushEmailNotification(accountInfo.name, msg);
			}

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
		
		var helloMessage = bufutil.StringToBuffer(parse.AsciiToHex(constants.LOG_CONNECTION_PASSWORD).join(' '));
		
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
			if(bufutil.bufCompare(data, helloMessage)){
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
		var logPacket = logmessage.CreateLogPacketBuffer(header, {len: bufferLength, ID: ID, data: bytes}, bufferLength);
		LogServer.write(logPacket);
	}
}

function LogDebug(ID, message){
	if(LogServer !== null){
		var header = 0x0005;
		if (ID === undefined || ID === null){
			ID = 0;
		}
        var messageBuffer = bufutil.StringToBuffer(parse.AsciiToHex(message).join(' '));
		var debugLength = message.length + 5;
		var debugPacket = logmessage.CreateLogPacketBuffer(0x0007, {len: debugLength, message: messageBuffer}, debugLength);
        
		var bufferLength = 8 + debugPacket.length;
		var logPacket = logmessage.CreateLogPacketBuffer(header, {len: bufferLength, ID: ID, data: debugPacket}, bufferLength);
		LogServer.write(logPacket);
	}
}

fs.readFile('proxyservers.txt', 'utf8', function(err, results){

	if (err){
		console.log('err', err);
	}

	let lines = results.split('\n');
	for(let i = 0; i < lines.length; i++){
		let line = lines[i].trim();
		if(line.length == 0 || line[0] === '#'){
			continue;
		}
		line = line.split('\t');
		let source = line[0].split(':');
		let target_port = parseInt(line[1]);
		let source_ip = source[0];
		let source_port = parseInt(source[1]);

		console.log(source_ip + ':' + source_port + ' -> 127.0.0.1:' + target_port);
		net.createServer(CreateRequest(source_ip, source_port)).listen(target_port);
	}
});

fs.readFile('blacklist.txt', 'utf8', function(err, results){

	if (err){
		console.log('err', err);
	}

	let lines = results.split('\n');
	for(let i = 0; i < lines.length; i++){
		let line = lines[i].trim();
		if(line.length == 0 || line[0] === '#'){
			continue;
		}
		let blacklistId = parseInt(line);
		messageBlacklist.add(blacklistId);

		console.log('Blacklisting [{0}]'.format(blacklistId));
	}
});
 
net.createServer(LogRequest()).listen(5555);
