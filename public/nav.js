function BinarySearchInsert(arr, value, cmp){
	// fuzzy Binary Search
	// return index to insert

	var bottom = 0;
	var top = arr.length - 1;
	var mid = Math.floor((top + bottom) / 2);
	
	var iterations = 0;
	while(top >= bottom){
		var temp = cmp(arr[mid]);
		
		if(temp > value){
			top = mid - 1;
		}
		else if(temp < value){
			bottom = mid + 1;
		}
		else{
			return mid;
		}
		
		mid = Math.floor((top + bottom) / 2);
		if(iterations++ > arr.length){
			console.log('something went wrong');
			return -1;
		}
	}
	
	return bottom;
}

function PriorityQueue(){
	this.array = [];
	this.length = this.array.length;
}

PriorityQueue.prototype.put = function(priority, value){
	var index = BinarySearchInsert(this.array, priority, function(x) { return x[0]; });
	this.array.splice(index, 0, [priority, value]);
	this.length = this.array.length;
}

PriorityQueue.prototype.pop = function(){
	return this.array.splice(0, 1)[0][1];
	this.length = this.array.length;
}

PriorityQueue.prototype.print = function(){
	var arr = [];
	for(var i in this.array){
		arr.push('({0},{1})'.format(this.array[i][0], this.array[i][1]));
	}
	
	return arr.join(' ');
}

var q = new PriorityQueue();
q.put(1, 'a');
q.put(3, 'c');
q.put(6, 'f');
q.put(5, 'e');

console.log(q.print());
console.log(BinarySearchInsert(q.array, 0, function(x) { return x[0]; }));


var permutations = function*(first, second){
	for(var i = 0; i < first.length; i++){
		for(var j = 0; j < second.length; j++){
			yield [first[i], second[j]];
		}
	}
}

function getNeighbors(pos){
	var neighbors = [];
	var p = permutations([-1, 0, 1], [-1, 0, 1]);
	var next = p.next();
	while(!next.done){
		if(next.value[0] || next.value[1]){
			neighbors.push([pos[0] + next.value[0], pos[1] + next.value[1]]);
		}
		next = p.next();
	}
	
	return neighbors;
}

function pathScore(pos, goal){
	return Math.sqrt(Math.pow(pos[0] - goal[0], 2) + Math.pow(pos[1] - goal[1], 2));
}

function isWalkable(value){
	var ret = value == 0 || value == 3;
	return ret;
}


function hashCoord(arr){
	// assume arr is length 2
	return '{0}_{1}'.format(arr[0], arr[1]);
}

function reconstructPath(cameFrom, end){
	var path = [end];
	var current = end;
	var currentHash = hashCoord(current);
	while(cameFrom.hasOwnProperty(currentHash)){
		current = cameFrom[currentHash].prev;
		currentHash = hashCoord(current);
		path.push(current);
	}
	
	return path.reverse();
}

function isStraight(start, end){
	var x = Math.abs(start[0] - end[0]);
	var y = Math.abs(start[1] - end[1]);
	
	return !!(x ^ y); // true if one or other (straight), false if both (diagonal)
}

function RODistance(start, end){
	var xDist = Math.abs(end[0] - start[0]);
	var yDist = Math.abs(end[1] - start[1]);
	
	var path1 = Math.sqrt(Math.pow(Math.min(xDist, yDist),2) * 2);
	var path2 = Math.max(xDist, yDist) - Math.min(xDist, yDist);

	return path1 + path2;
}

function StraightHead(path){
	var start = path[0];
	var end = path[0];
	
	// 0: not yet seen, 1: in progress, 2: start of new segment
	var straight = false;
	var diagonal = false;
	
	var head = null;
	
	//var current = start;
	// limit to RO "straight" paths: one straight and one diagonal segment
	for(var i = 1; i < path.length && i < 11; i++){
		if(isStraight(path[i-1], path[i])){
			if(!straight || (straight && !diagonal)){
				straight = true;
				continue;
			}
			else{
				// must be a straight after a diagonal, after a straight:
				// add the previous node
				head = path[i-1];
				path.splice(0, i-1);
				return head;
			}
		}
		else{
			if(!diagonal|| (diagonal && !straight)){
				diagonal = true;
				continue;
			}
			else{
				// must be a diagonal after a straight, after a diagonal:
				// add the previous node
				head = path[i-1];
				path.splice(0, i-1);
				return head;
			}
		}
		
	}
	
	// must be the end of the line (not necessarily the very end though)
	head = path[i - 1];
	path.splice(0, i);
	return head;
}

function getAngle(node1, node2){
	var angle = Math.atan2(node2[0] - node1[0], node2[1] - node1[1]) * 180 / Math.PI;
	return angle;
}

function getDistanceComponents(start, end){
	return {x: Math.abs(end[0] - start[0]), y:Math.abs(end[1] - start[1])};
}

function SplitPlan(fullpath){
	var ROPath = [];
	var i = 0;
	var startNode = fullpath[0];
	var lastNode = null;
	var lastAngle = null;
	//var totalDist = null;
	// what is the length * 10?
	var collapsed = 0;
	while(fullpath.length && i < fullpath.length * 10){
		var head = StraightHead(fullpath);
		
		if(lastNode === null){
			lastNode = head;
			lastAngle = getAngle(startNode, lastNode);
			//totalDist = getDistanceComponents(startNode, lastNode);
			continue;
		}
		
		var dist = getDistanceComponents(startNode, head);
		var angle = getAngle(startNode, head);
		if(dist.x >= 11 || dist.y >= 11 || lastAngle !== angle){
			var distance = RODistance(startNode, lastNode);
			ROPath.push({node: lastNode, distance: distance});
			AddMarker(lastNode, 2);
			
			
			startNode = lastNode;
			lastNode = head;
			lastAngle = getAngle(startNode, lastNode);
			//totalDist = null;
		}
		else{
			lastNode = head;
			collapsed += 1;
		}
		
		//var distance = RODistance(startNode, head);
		//ROPath.push({node: head, distance: distance});
		//startNode = head;
		//AddMarker(head, 2);
		i++;
	}
	
	// final piece
	var dist = getDistanceComponents(startNode, head);
	var angle = getAngle(startNode, head);
	if(dist.x >= 11 || dist.y >= 11 || lastAngle !== angle){
		var distance = RODistance(startNode, lastNode);
		ROPath.push({node: lastNode, distance: distance});
		AddMarker(lastNode, 2);
		
		distance = RODistance(lastNode, head);
		ROPath.push({node: head, distance: distance});
		AddMarker(head, 2);
	}
	else{
		var distance = RODistance(startNode, head);
		ROPath.push({node: head, distance: distance});
		AddMarker(head, 2);
	}
	
	console.log('Collapsed', collapsed);
	return ROPath;
}

function FindPath(mapdata, start, end){
	if(!isWalkable(mapdata[end[1]][end[0]])){
		console.log('no walkable path');
		return [];
	}

	RemoveMarkers();
	
	var closedSet = new Set();
	var openSet = new PriorityQueue();

	var cameFrom = {};
	var gScore = {};
	gScore[hashCoord(start)] = 0;
	
	openSet.put(0, start);
	
	var i = 0;
	while(openSet.length > 0){
		var current = openSet.pop(); // grab first in list
		var currentHash = hashCoord(current);
		
		if(closedSet.has(currentHash)){
			continue;
		}
		closedSet.add(currentHash);
		AddMarker(current, 1);
	
		if(current[0] == end[0] && current[1] == end[1]){
			console.log('Reached the goal', i);
			var path = reconstructPath(cameFrom, end);
			
			var $mapsection = $('#mapsection');
			for(var pathIndex in path){
				AddMarker(path[pathIndex]);
			}
			return SplitPlan(path);
		}
		
		var neighbors = getNeighbors(current);
		for(var neighborIndex in neighbors){
			var neighbor = neighbors[neighborIndex];
			var neighborHash = hashCoord(neighbor);

			if(!closedSet.has(neighborHash) && isWalkable(mapdata[neighbor[1]][neighbor[0]])){
				var tentative_score = gScore[currentHash] + pathScore(current, neighbor);
				
				if(!cameFrom.hasOwnProperty(neighborHash)){
					cameFrom[neighborHash] = {current: neighbor, prev: current};
				}
				
				if(!gScore.hasOwnProperty(neighborHash)){
					gScore[neighborHash] = tentative_score;
				}
				else if(gScore[neighborHash] > tentative_score){
					gScore[neighborHash] = tentative_score;
					cameFrom[neighborHash].prev = current;
				}
				openSet.put(tentative_score + (pathScore(neighbor, end)), neighbor);
			}
		}
	
		i++;
		if(i % 50000 == 0){
			console.log('Iteration number: {0}, Queue Length: {1}'.format(i, openSet.length));
		}
		if(i > 100000){
			console.log('too many iterations');
			return [];
		}
	}
	
	console.log(i);
}

//FindPath(mapdata['2@nyd'], [202, 13], [202, 177])












