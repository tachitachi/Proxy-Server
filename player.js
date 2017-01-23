
function Player(data, socket){
	this.data = data;
	this.socket = socket;
	this.GroundSkills = [];
	this.AutoSkills = [];
	this.ModifySkills = [];
	this.ModifyEnemySkills = [];
	this.MayaTrigger = null;
	this.EndureTrigger = null;
	this.SkillUse = [];
	this.CharacterStatuses = [];
	this.CharacterEnemyStatuses = [];
	this.ActorStatuses = [];
	//this.ModifySkillUse = [];
}

Player.prototype.IsGroundSendSkill = function(skillId){
	if(!bufStartsWith(this.data, groundSendHeader))
		return false;
		
	if(this.data[4] == skillId[0] && this.data[5] == skillId[1])
		return true;
		
	return false;
}

Player.prototype.IsTargetSendSkill = function(skillId){
	if(!bufStartsWith(this.data, targetSendHeader))
		return false;
		
	if(this.data[4] == skillId[0] && this.data[5] == skillId[1])
		return true;
		
	return false;
}

Player.prototype.ActivateMaya = function(){
	if(this.MayaTrigger != null && this.IsTargetSendSkill(this.MayaTrigger)){
		mayaPurplePacket[4] = accountId[0];
		mayaPurplePacket[5] = accountId[1];
		mayaPurplePacket[6] = accountId[2];
		mayaPurplePacket[7] = accountId[3];
		this.socket.write(mayaPurplePacket);
	}
}


Player.prototype.RemoveTransform = function(){
	var packetLen = 24;
	for(var curIdx = 0; curIdx < this.data.length; curIdx++)
	{
		// len 24?
		var actorStatusActiveHeaderPos = bufContains(this.data, actorStatusActiveHeader, curIdx);
		if(actorStatusActiveHeaderPos >= 0){		
			if(bufStartsWith(this.data.slice(actorStatusActiveHeaderPos + 2), actorStatusTypeTransform)){		
					this.data[actorStatusActiveHeaderPos + 13] = 0x00;
					this.data[actorStatusActiveHeaderPos + 14] = 0x00;
					this.data[actorStatusActiveHeaderPos + 15] = 0x00;
					this.data[actorStatusActiveHeaderPos + 16] = 0x00;
					curIdx += packetLen - 1;
					break;
			}
		}
		
		// len 24
		var actorStatusActiveHeader2Pos = bufContains(this.data, actorStatusActive2Header, curIdx);
		if(actorStatusActiveHeader2Pos >= 0){		
			if(bufStartsWith(this.data.slice(actorStatusActiveHeader2Pos + 6), actorStatusTypeTransform)){		
					this.data[actorStatusActiveHeader2Pos + 12] = 0x00;
					this.data[actorStatusActiveHeader2Pos + 13] = 0x00;
					this.data[actorStatusActiveHeader2Pos + 14] = 0x00;
					this.data[actorStatusActiveHeader2Pos + 15] = 0x00;
					curIdx += packetLen - 1;
					break;
			}
		}
	}
}


Player.prototype.ModifyActorStatuses = function(){
	this._ModifyActorStatuses(this.ActorStatuses, true);
}


Player.prototype._ModifyActorStatuses = function(statusList, bUseMyAccount){
	var packetLen = 25;
	for(var curIdx = 0; curIdx < this.data.length; curIdx++)
	{
		var actorStatusActiveHeaderPos = bufContains(this.data, actorStatusActiveHeader, curIdx);
		if(actorStatusActiveHeaderPos < 0)
			return;
		
		for(var i = 0; i < statusList.length; i++){
			var statusData = statusList[i];
			var typeId = statusData.typeId;
			var oldFlag = statusData.oldFlag;
			var oldUnknown1 = statusData.oldUnknown1;
			var oldUnknown2 = statusData.oldUnknown2;
			var oldUnknown3 = statusData.oldUnknown3;
			var newFlag = statusData.newFlag;
			var newUnknown1 = statusData.newUnknown1;
			var newUnknown2 = statusData.newUnknown2;
			var newUnknown3 = statusData.newUnknown3;
			var drop = statusData.drop;
			//console.log('data:', bufPrint(this.data.slice(actorStatusActiveHeaderPos, actorStatusActiveHeaderPos + 25)));
			
			if(!(bufStartsWith(this.data.slice(actorStatusActiveHeaderPos + 4), accountId) ^ bUseMyAccount) && bufStartsWith(this.data.slice(actorStatusActiveHeaderPos + 2), typeId)){
				//console.log('modifying actor status', bufPrint(this.data.slice(actorStatusActiveHeaderPos, actorStatusActiveHeaderPos + 25)));
				
				if(oldFlag != null && !bufStartsWith(this.data.slice(actorStatusActiveHeaderPos + 8), oldFlag)){
					//console.log('flag doesnt match');
					continue;
				}
				if(oldUnknown1 != null && !bufStartsWith(this.data.slice(actorStatusActiveHeaderPos + 13), oldUnknown1)){
					//console.log('unknown1 doesnt match');
					continue;
				}
				if(oldUnknown2 != null && !bufStartsWith(this.data.slice(actorStatusActiveHeaderPos + 17), oldUnknown2)){
					//console.log('unknown1 doesnt match');
					continue;
				}
				if(oldUnknown3 != null && !bufStartsWith(this.data.slice(actorStatusActiveHeaderPos + 21), oldUnknown3)){
					//console.log('unknown1 doesnt match');
					continue;
				}
			
				if(drop){
					this.data = bufRemove(this.data, actorStatusActiveHeaderPos, packetLen);
					curIdx += packetLen - 1;
					break;
				}
				
				if(newFlag != null){
					this.data[actorStatusActiveHeaderPos + 8] = newFlag[0];
				}
				if(newUnknown1 != null){
					this.data[actorStatusActiveHeaderPos + 13] = newUnknown1[0];
					this.data[actorStatusActiveHeaderPos + 14] = newUnknown1[1];
					this.data[actorStatusActiveHeaderPos + 15] = newUnknown1[2];
					this.data[actorStatusActiveHeaderPos + 16] = newUnknown1[3];
				}
				if(newUnknown2 != null){
					this.data[actorStatusActiveHeaderPos + 17] = newUnknown2[0];
					this.data[actorStatusActiveHeaderPos + 18] = newUnknown2[1];
					this.data[actorStatusActiveHeaderPos + 19] = newUnknown2[2];
					this.data[actorStatusActiveHeaderPos + 20] = newUnknown2[3];
				}
				if(newUnknown3 != null){
					this.data[actorStatusActiveHeaderPos + 21] = newUnknown3[0];
					this.data[actorStatusActiveHeaderPos + 22] = newUnknown3[1];
					this.data[actorStatusActiveHeaderPos + 23] = newUnknown3[1];
					this.data[actorStatusActiveHeaderPos + 24] = newUnknown3[3];
				}
				
				curIdx += packetLen - 1;
				break;
			}
		}
	}
}

Player.prototype.DropGroundSkills = function(){
	//console.log('checking ground skill');
	var packetLen = 18;
	
	for(var curIdx = 0; curIdx < this.data.length; curIdx++)
	{
		var groundRecvHeaderPos = bufContains(this.data, groundRecvHeader, curIdx);
		if(groundRecvHeaderPos < 0)
			return;
		
		for(var i = 0; i < this.GroundSkills.length; i++){
			var skillId = this.GroundSkills[i];
			if(bufStartsWith(this.data.slice(groundRecvHeaderPos + 2), skillId)){
				if(bufStartsWith(this.data.slice(groundRecvHeaderPos + 4), accountId)){
					this.data = bufRemove(this.data, groundRecvHeaderPos, packetLen);
					// what if there's a "header" in an early position, that's not the real header?
					curIdx += packetLen - 1;
					break;
				}
			}
		}
	}
}

Player.prototype.DropSkillUse = function(){
	//console.log('checking ground skill');
	var packetLen = 33;
	
	for(var curIdx = 0; curIdx < this.data.length; curIdx++)
	{
		var skillUseHeaderPos = bufContains(this.data, skillUseHeader, curIdx);
		if(skillUseHeaderPos < 0)
			return;
		
		for(var i = 0; i < this.SkillUse.length; i++){
			var skillId = this.SkillUse[i];
			if(bufStartsWith(this.data.slice(skillUseHeaderPos + 2), skillId)){
				if(bufStartsWith(this.data.slice(skillUseHeaderPos + 4), accountId)){
					this.data = bufRemove(this.data, skillUseHeaderPos, packetLen);
					// what if there's a "header" in an early position, that's not the real header?
					curIdx += packetLen - 1;
					break;
				}
			}
		}
	}
}

Player.prototype.ModifySkillUse = function(){
	//console.log('checking ground skill');
	var packetLen = 33;
	
	for(var curIdx = 0; curIdx < this.data.length; curIdx++)
	{
		var skillUseHeaderPos = bufContains(this.data, skillUseHeader, curIdx);
		if(skillUseHeaderPos < 0)
			return;
		
		for(var i = 0; i < this.SkillUse.length; i++){
			var skillData = this.SkillUse[i];
			var skillId = skillData.skill;
			var newSkillId = skillData.newskill;
			var hits = skillData.hits;
			var drop = skillData.drop;
			if(bufStartsWith(this.data.slice(skillUseHeaderPos + 2), skillId)){
				if(bufStartsWith(this.data.slice(skillUseHeaderPos + 4), accountId)){
					
					//this.data = bufRemove(this.data, skillUseHeaderPos, 33);
					// what if there's a "header" in an early position, that's not the real header?
					
					//console.log(skillData);
					//console.log(this.data.slice(skillUseHeaderPos, 33));
						
					if(drop){
						//console.log('dropping');
						this.data = bufRemove(this.data, skillUseHeaderPos, packetLen);
						curIdx += packetLen - 1;
						break;
					}
					
					if(newSkillId != null && newSkillId !== undefined && newSkillId.length == 2){
						// assume skill id is 2 bytes
						this.data[skillUseHeaderPos + 2] = newSkillId[0];
						this.data[skillUseHeaderPos + 3] = newSkillId[1];
					}
					
					if(hits != null && hits !== undefined){
						// assume skill id is 2 bytes
						this.data[skillUseHeaderPos + 30] = hits;
						//this.data[skillUseHeaderPos + 31] = hits[1];
					}
					
					curIdx += packetLen - 1;
					break;
				}
				
			}
		}
	}
}

Player.prototype.DropAutoSkills = function(){
	//console.log('DropAutoSkills');
	
	var packetLen = 15;
	
	for(var curIdx = 0; curIdx < this.data.length; curIdx++)
	{
		var autoSkillHeaderPos = bufContains(this.data, autoSkillHeader, curIdx);
		if(autoSkillHeaderPos < 0)
			return;
		
		for(var i = 0; i < this.AutoSkills.length; i++){
			var skillId = this.AutoSkills[i];
			if(bufStartsWith(this.data.slice(autoSkillHeaderPos + 2), skillId)){
				if(bufStartsWith(this.data.slice(autoSkillHeaderPos + 10), accountId)){
					this.data = bufRemove(this.data, autoSkillHeaderPos, packetLen);
					// what if there's a "header" in an early position, that's not the real header?
					curIdx += packetLen - 1;
					break;
				}
			}
		}
	}
}

Player.prototype.ModifyCasts = function(){
	this._ModifyCasts(this.ModifySkills, true);
}

Player.prototype.ModifyEnemyCasts = function(){
	this._ModifyCasts(this.ModifyEnemySkills, false);
}

Player.prototype._ModifyCasts = function(skillList, bUseMyAccount){
	// add cast time to pneuma
	var packetLen = 25;
	
	for(var curIdx = 0; curIdx < this.data.length; curIdx++)
	{
		var skillCastHeaderPos = bufContains(this.data, skillCastHeader, curIdx);
		if(skillCastHeaderPos < 0)
			return;
		
		for(var i = 0; i < skillList.length; i++){
			var skillData = skillList[i];
			var skillId = skillData.skill;
			var newSkillId = skillData.newskill;
			var castTime = skillData.cast;
			var drop = skillData.drop;
			
			if(!(bufStartsWith(this.data.slice(skillCastHeaderPos + 2), accountId) ^ bUseMyAccount) && bufStartsWith(this.data.slice(skillCastHeaderPos + 14), skillId)){
				if(drop){
					this.data = bufRemove(this.data, skillCastHeaderPos, packetLen);
					curIdx += packetLen - 1;
					break;
				}
				
				if(castTime != null && castTime !== undefined){
				
					var prevCast = this.data[20] + (this.data[21] << 8);
					if(castTime > prevCast){
						var x1 = castTime & 0xff;
						var x2 = (castTime & 0xff00) >> 8;
						this.data[skillCastHeaderPos + 20] = x1;
						this.data[skillCastHeaderPos + 21] = x2;
					}
					
					//this.data[skillCastHeaderPos + 20] = castTime;
				}
				if(newSkillId != null && newSkillId !== undefined && newSkillId.length == 2){
					// assume skill id is 2 bytes
					this.data[skillCastHeaderPos + 14] = newSkillId[0];
					this.data[skillCastHeaderPos + 15] = newSkillId[1];
				}
				curIdx += packetLen - 1;
				break;
			}
		}
	}
}


Player.prototype.ModifyAutoCasts = function(){
	// add cast time to pneuma
	var packetLen = 15;
	
	for(var curIdx = 0; curIdx < this.data.length; curIdx++)
	{
		var autoSkillHeaderPos = bufContains(this.data, autoSkillHeader, curIdx);
		if(autoSkillHeaderPos < 0)
			return;
		
		for(var i = 0; i < this.AutoSkills.length; i++){
			var skillData = this.AutoSkills[i];
			var skillId = skillData.skill;
			var newSkillId = skillData.newskill;
			//var castTime = skillData.cast;
			var drop = skillData.drop;
			
			if(bufStartsWith(this.data.slice(autoSkillHeaderPos + 10), accountId) && bufStartsWith(this.data.slice(autoSkillHeaderPos + 2), skillId)){
				if(drop){
					this.data = bufRemove(this.data, autoSkillHeaderPos, packetLen);
					curIdx += packetLen - 1;
					break;
				}
				
				if(newSkillId != null && newSkillId !== undefined && newSkillId.length == 2){
					// assume skill id is 2 bytes
					this.data[autoSkillHeaderPos + 2] = newSkillId[0];
					this.data[autoSkillHeaderPos + 3] = newSkillId[1];
				}
				curIdx += packetLen - 1;
				break;
			}
		}
	}
}


Player.prototype.ModifyCharacterStatuses = function(){
	this._ModifyCharacterStatuses(this.CharacterStatuses, true);
}

Player.prototype.ModifyCharacterEnemyStatuses = function(){
	this._ModifyCharacterStatuses(this.CharacterEnemyStatuses, false);
}

Player.prototype._ModifyCharacterStatuses = function(skillList, bUseMyAccount){
	var packetLen = 15;
	
	for(var curIdx = 0; curIdx < this.data.length; curIdx++)
	{
		var characterStatusHeaderPos = bufContains(this.data, characterStatusHeader, curIdx);
		if(characterStatusHeaderPos < 0)
			return;
		
		
		for(var i = 0; i < skillList.length; i++){
			var statusData = skillList[i];
			var oldOpt1 = statusData.oldOpt1;
			var oldOpt2 = statusData.oldOpt2;
			var oldOption = statusData.oldOption;
			var newOpt1 = statusData.newOpt1;
			var newOpt2 = statusData.newOpt2;
			var newOption = statusData.newOption;
			var drop = statusData.drop;
			
			if(!(bufStartsWith(this.data.slice(characterStatusHeaderPos + 2), accountId) ^ bUseMyAccount)){
			
				if(oldOpt1 != null && !bufStartsWith(this.data.slice(characterStatusHeaderPos + 6), oldOpt1)){
					continue;
				}
				if(oldOpt2 != null && !bufStartsWith(this.data.slice(characterStatusHeaderPos + 8), oldOpt2)){
					continue;
				}
				if(oldOption != null && !bufStartsWith(this.data.slice(characterStatusHeaderPos + 10), oldOption)){
					continue;
				}
			
				if(drop){
					this.data = bufRemove(this.data, characterStatusHeaderPos, packetLen);
					curIdx += packetLen - 1;
					break;
				}
				
				if(newOpt1 != null){
					this.data[characterStatusHeaderPos + 6] = newOpt1[0];
					this.data[characterStatusHeaderPos + 7] = newOpt1[1];
				}
				if(newOpt2 != null){
					this.data[characterStatusHeaderPos + 8] = newOpt2[0];
					this.data[characterStatusHeaderPos + 9] = newOpt2[1];
				}
				if(newOption != null){
					this.data[characterStatusHeaderPos + 10] = newOption[0];
					this.data[characterStatusHeaderPos + 11] = newOption[1];
					this.data[characterStatusHeaderPos + 12] = newOption[1];
					this.data[characterStatusHeaderPos + 13] = newOption[3];
				}
				curIdx += packetLen - 1;
				break;
			}
		}
	}
	
}

function ShadowChaser(data, socket){
	Player.call(this, data, socket);
	this.ModifySkills = [
		{skill:masqWeaknessId, newskill: divestShieldId, cast: null, drop: false},
		{skill:masqGloomyId, newskill: divestArmorId, cast: null, drop: false},
		{skill:masqIgnoranceId, newskill: divestWeaponId, cast: null, drop: false},
		{skill:divestAccessoryId, newskill: divestHelmId, cast: null, drop: false},
		{skill:fullDivestId, newskill: divestHelmId, cast: 0x01, drop: false},
		{skill:closeConfineId, newskill: null, cast: 0x01, drop: false},
		//{skill:flyingKickId, newskill: preserveId, cast: null, drop: true},
	];
	
	this.ModifyEnemySkills = [
		{skill:masqWeaknessId, newskill: null, cast: 0x01, drop: false},
		{skill:masqGloomyId, newskill: null, cast: 0x01, drop: false},
		{skill:masqIgnoranceId, newskill: null, cast: 0x01, drop: false},
		{skill:divestAccessoryId, newskill: null, cast: 0x01, drop: false},
		{skill:fullDivestId, newskill: null, cast: 0x01, drop: false},
		//{skill:closeConfineId, newskill: null, cast: 0x01, drop: false},
		//{skill:flyingKickId, newskill: preserveId, cast: null, drop: true},
	];
	this.SkillUse = [
		//{skill:flyingKickId, newskill: null, hits: null, drop: true},
		{skill:flyingKickId, newskill: senseId, hits: 0x00, drop: false},
	];
	
	this.AutoSkills = [
		{skill:hideId, newskill: null, drop: true},
		{skill:closeConfineId, newskill: null, drop: true},
		//{skill:backslideId, newskill: feintBombId, drop: false},
	];
	
	
	this.CharacterEnemyStatuses = [
		{oldOpt1: empty2Buf, oldOpt2: empty2Buf, oldOption: feintBombOption,
			newOpt1: null, newOpt2: null, newOption: empty4Buf, drop: false},
	];
	
	this.ActorStatuses = [
		{typeId: hallucinationActorStatusTypeId, oldFlag: new Buffer([0x01]),
			newFlag: empty1Buf, oldUnknown1: null, oldUnknown2: null, oldUnknown3: null, 
			newUnknown1: null, newUnknown2: null, newUnknown3: null, drop: false},
	];
	
	this.MayaTrigger = bodyPaintId;
}
_.extend(ShadowChaser.prototype, Player.prototype);

ShadowChaser.prototype.ProcessRecv = function(){
	//this.DropGroundSkills();
	this.ModifyCasts();
	this.ModifyEnemyCasts();
	this.ModifySkillUse();
	this.ModifyAutoCasts();
	this.RemoveTransform();
	this.ModifyCharacterStatuses();
	this.ModifyCharacterEnemyStatuses();
	this.ModifyActorStatuses();
	
	return this.data;
}

ShadowChaser.prototype.ProcessSend = function(){
	return this.data;
}

function Sura(data, socket){
	Player.call(this, data, socket);
	this.GroundSkills = [pneumaId];
	this.ModifySkills = [
		{skill:pneumaId, newskill: null, cast: 0x64, drop: false},
		{skill:ppCureId, newskill: null, cast: 0x01, drop: false},
		{skill:healId, newskill: null, cast: 0x1, drop: false},
		{skill:guardId, newskill: null, cast: 0x1, drop: false},
		{skill:zenId, newskill: preserveId, cast: null, drop: false},
		{skill:absorbId, newskill: preserveId, cast: null, drop: false},
		{skill:gohId, newskill: jupitalThunderId, cast: null, drop: false},
		//{skill:holyLightId, newskill: preserveId, cast: null, drop: false},
	];
	this.SkillUse = [
		//{skill:holyLightId, newskill: jupitalThunderId, cast: null, drop: false},
		{skill:gohId, newskill: null, hits: 0x00, drop: false},
	];
	this.AutoSkills = [
		{skill:hideId, newskill: null, drop: true},
		{skill:healId, newskill: null, drop: true},
		{skill:guardId, newskill: null, drop: true},
		{skill:spiritSphereId, newskill: null, drop: true},
		{skill:holyLightId, newskill: null, drop: true},
	];
	this.MayaTrigger = ruwatchId;
	//this.SkillUse = [holyLightId];
}

_.extend(Sura.prototype, Player.prototype);

Sura.prototype.ProcessRecv = function(){
	this.DropGroundSkills();
	this.ModifyCasts();
	this.ModifySkillUse();
	this.ModifyAutoCasts();
	//this.DropSkillUse();
	
	return this.data;
}

Sura.prototype.ProcessSend = function(){
	if(this.IsGroundSendSkill(pneumaId)){
		var x = this.data[6] + (this.data[7] << 8);
		var y = this.data[8] + (this.data[9] << 8);
		
		x = ~~(x / 3)  * 3 + 1;
		y = ~~(y / 3)  * 3 + 1;
		
		var x1 = x & 0xff;
		var x2 = (x & 0xff00) >> 8;
		var y1 = y & 0xff;
		var y2 = (y & 0xff00) >> 8;
		
		//console.log(printHex(x1), printHex(x2), printHex(y1), printHex(y2));
		this.data[6] = x1;
		this.data[7] = x2;
		this.data[8] = y1;
		this.data[9] = y2;
	}
	
	return this.data;
}

 
function RuneKnight(data, socket){
	Player.call(this, data, socket);
	this.GroundSkills = [dragonBreathId, waterDragonBreathId];
	this.ModifySkills = [
		{skill:parryId, newskill: null, cast: 0x01, drop: false},
		{skill:twoHandQuickenId, newskill: null, cast: 0x01, drop: false},
		{skill:endureId, newskill: null, cast: 0x01, drop: false},
	];
	
	this.AutoSkills = [
		{skill:parryId, newskill: null, drop: true},
		{skill:hideId, newskill: null, drop: true},
		{skill:twoHandQuickenId, newskill: null, drop: true},
		{skill:endureId, newskill: null, drop: true},
	];
	
	this.EndureTrigger = twoHandQuickenId;
}
_.extend(RuneKnight.prototype, Player.prototype);

RuneKnight.prototype.ProcessRecv = function(){
	this.DropGroundSkills();
	this.ModifyCasts();
	this.ModifyAutoCasts();
	
	return this.data;
}

RuneKnight.prototype.ProcessSend = function(){
	return this.data;
}
 
function Genetic(data, socket){
	Player.call(this, data, socket);
	this.ModifySkills = [
		{skill:cultivatePlantId, newskill: null, cast: 0x01, drop: false},
		//{skill:masqGloomyId, newskill: divestArmorId, cast: null, drop: false},
		//{skill:masqIgnoranceId, newskill: divestWeaponId, cast: null, drop: false},
		//{skill:divestAccessoryId, newskill: divestHelmId, cast: null, drop: false},
		//{skill:fullDivestId, newskill: null, cast: 0x32, drop: false},
		//{skill:closeConfineId, newskill: null, cast: 0x01, drop: false},
		//{skill:hideId, newskill: preserveId, cast: 0x01, drop: false},
	];
	this.SkillUse = [
		//{skill:holyLightId, newskill: jupitalThunderId, cast: null, drop: false},
		{skill:acidBombId, newskill: null, hits: 0x00, drop: false},
		{skill:fireExpansionId, newskill: null, hits: 0x00, drop: false},
	];
	this.GroundSkills = [cultivatePlantId];
	this.AutoSkills = [
		{skill:cartCannonId, newskill: null, drop: true},
	];
	//this.MayaTrigger = bodyPaintId;
}
_.extend(Genetic.prototype, Player.prototype);

Genetic.prototype.ProcessRecv = function(){
	this.DropGroundSkills();
	this.ModifyCasts();
	this.ModifySkillUse();
	this.ModifyAutoCasts();
	
	return this.data;
}

Genetic.prototype.ProcessSend = function(){

	//if(this.IsTargetSendSkill(crazyUproarId)){
	//	this.data = mushroomPacket;
	//}

	return this.data;
}

function GuillotineCross(data, socket){
	Player.call(this, data, socket);
	this.ModifySkills = [
		{skill:rollingCutterId, newskill: null, cast: 0x01, drop: false},
		{skill:crossImpactId, newskill: null, cast: 0x01, drop: false},
	];
	//this.GroundSkills = [cultivatePlantId];
	this.AutoSkills = [
		{skill:rollingCutterId, newskill: null, drop: true},
		{skill:crossImpactId, newskill: null, drop: true},
	];
	//this.SkillUse = [rollingCutterId, crossImpactId];
	
	this.SkillUse = [
		{skill:crossImpactId, newskill: jupitalThunderId, cast: null, drop: false},
		{skill:rollingCutterId, newskill: jupitalThunderId, cast: null, drop: false},
	];
	//this.MayaTrigger = bodyPaintId;
}
_.extend(GuillotineCross.prototype, Player.prototype);

GuillotineCross.prototype.ProcessRecv = function(){
	this.DropGroundSkills();
	this.ModifyCasts();
	this.ModifyAutoCasts();
	this.ModifySkillUse();
	
	return this.data;
}

GuillotineCross.prototype.ProcessSend = function(){

	return this.data;
}


function Sorcerer(data, socket){
	Player.call(this, data, socket);
	this.ModifySkills = [
		//{skill:castCancelId, newskill: null, cast: null, drop: true},
		//{skill:masqGloomyId, newskill: divestArmorId, cast: null, drop: false},
		//{skill:masqIgnoranceId, newskill: divestWeaponId, cast: null, drop: false},
		//{skill:divestAccessoryId, newskill: divestHelmId, cast: null, drop: false},
		//{skill:fullDivestId, newskill: null, cast: 0x32, drop: false},
		//{skill:closeConfineId, newskill: null, cast: 0x01, drop: false},
		//{skill:flyingKickId, newskill: preserveId, cast: null, drop: true},
	];
	this.SkillUse = [
		{skill:frostDiverId, newskill: senseId, hits: null, drop: false},
		{skill:lightningBoltId, newskill: null, hits: 0x00, drop: false},
		//{skill:castCancelId, newskill: null, hits: null, drop: true},
		//{skill:spellBreakerId, newskill: null, hits: null, drop: true},
	];
	//this.AutoSkills = [castCancelId];
	this.MayaTrigger = sightId;
}
_.extend(Sorcerer.prototype, Player.prototype);

Sorcerer.prototype.ProcessRecv = function(){
	this.ModifyCasts();
	this.ModifySkillUse();
	//this.DropAutoSkills();
	
	return this.data;
}

Sorcerer.prototype.ProcessSend = function(){
	return this.data;
}
 