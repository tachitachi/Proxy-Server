'use strict';

define(function(require){

	var send = require('./common/send')

	function storageRefill(refillData, accountInfo){	
		storagePackets = [];
		for(var itemId in refillData){
			var inventoryData = {index: 0, amount: 0}; //accountInfo.inventory[itemId];
			var storageData = {index: 0, amount: 0}; //accountInfo.storage[itemId];
			
			if(accountInfo.inventory.hasOwnProperty(itemId))
				inventoryData = accountInfo.inventory[itemId];
			if(accountInfo.storage.hasOwnProperty(itemId))
				storageData = accountInfo.storage[itemId];
			
			var targetAmount = refillData[itemId];
			
			// put items back in storage
			if(inventoryData.index && inventoryData.amount > 0 && inventoryData.amount > targetAmount){
				var putBackAmount = inventoryData.amount - targetAmount;
				if(putBackAmount > 0){
					//console.log('[{0}] Too many of item [{1}] at [{2}], putting back {3}'.format(accountInfo.accountId, itemId, inventoryData.index, putBackAmount));
					var storeItemPacket = send.CreateSendPacketBuffer(0x0364, {index: inventoryData.index, amount: putBackAmount});
					storagePackets.push(storeItemPacket);
	                //LogDebug(accountInfo.accountId, 'I believe I have {0} of item {1}. Putting back {2}.'.format(inventoryData.amount, itemId, putBackAmount))
				}
			}
			// extract items from storage
			else if(storageData.index && storageData.amount > 0 && inventoryData.amount < targetAmount){
				var pullOutAmount = Math.min(targetAmount - inventoryData.amount, storageData.amount - 1);
				if(pullOutAmount > 0){
					//console.log('[{0}] Not enough of item [{1}] at [{2}], pulling out {3}'.format(accountInfo.accountId, itemId, storageData.index, pullOutAmount));
					var withdrawItemPacket = send.CreateSendPacketBuffer(0x0365, {index: storageData.index, amount: pullOutAmount});
					storagePackets.push(withdrawItemPacket);
	                //LogDebug(accountInfo.accountId, 'I believe I have {0} of item {1}. Taking out {2}.'.format(inventoryData.amount, itemId, pullOutAmount))
				}
			}
		}
		return storagePackets;
	}

	return {
		'storageRefill': storageRefill,
	};

});