# -*- coding: utf-8 -*-
"""
Created on Fri Apr 08 12:59:26 2016

@author: aaron
"""

import struct
import random

import os

import numpy as np
import scipy.misc as smp
import queue as Q

# TODO:
#   1. Priority Queue
#   2. 14-cell "planning"
#   3. "Mipping" for faster pathing
#   
#


def getMapData(mapname):
    mapdata = []
    with open('convertedmaps\\{}.txt'.format(mapname), 'r') as f:
        for line in f:
            row = []
            for c in line[:-1]:
                row.append(int(c))
            mapdata.append(row)
    # Create a 1024x1024x3 array of 8 bit unsigned integers
            
    #height = len(mapdata)
    #width = len(mapdata[0]) if height > 0 else 0
    
    #return width, height, mapdata
    return mapdata
    

def drawMap(mapdata, save=False, name=None):
    
    #width, height, mapdata = getMapData(mapname)
    #mapdata = getMapData(mapname)
    
    height = len(mapdata)
    width = len(mapdata[0]) if height > 0 else 0
    
    data = np.zeros( (height,width,3), dtype=np.uint8 )
    
    for i in range(len(mapdata)):
        for j in range(len(mapdata[i])):
            chardata = mapdata[i][j]
            if chardata == 0:
                #pass
                data[height - i - 1,j] = [128, 128, 128]
            elif chardata == 3:
                data[height - i - 1,j] = [0, 128, 163]
            elif chardata == 9:
                data[height - i - 1,j] = [255, 0, 0]
    
    img = smp.toimage( data )       # Create a PIL image
    if save and name:
        img.save('public\\maps\\{}.png'.format(name))  
    else:
        img.show()


# Simple generator function to get all permutations
def permutations(s1, s2):
    for i in s1:
        for j in s2:
            yield (i, j)

def getAdjacent(pos):
    neighbors = []
    for p in permutations([-1, 0, 1], [-1, 0, 1]):
        xoffset = p[0]
        yoffset = p[1]
        if yoffset or xoffset:
            neighbors.append((pos[0] + xoffset, pos[1] + yoffset))
            
    return neighbors

def pathScore(pos, goal):
    # return euclidian distance to goal
    return pow(pow(pos[0] - goal[0], 2) + pow(pos[1] - goal[1], 2), 0.5)
    
def walkable(value):
    return value in (0, 3)
    
def reconstructPath(cameFrom, end):
    path = [end]
    current = end
    while current in cameFrom:
        current = cameFrom[current]
        path.append(current)
    return path
        


def FindPath(mapname, start, end):
    mapdata = getMapData(mapname)
    
    closedSet = set()
    
    openSet = Q.PriorityQueue()
    
    cameFrom = {}
    gScore = {start: 0}
    
    # TODO: create a priority queue
    openSet.put((0, start))
    
    i = 0
    while not openSet.empty():
        
        current = openSet.get()[1]#np.random.randint(len(openSet)))
        if current in closedSet:
            continue
        closedSet.add(current)
        
        if current == end:
            print('reached the goal', len(closedSet))
            break
        
        # check adjacent squares
        for neighbor in getAdjacent(current):
            if neighbor not in closedSet and walkable(mapdata[neighbor[1]][neighbor[0]]):
                #score = pathScore(neighbor, end)
                tentative_score = gScore[current] + pathScore(current, neighbor)
                #print neighbor, tentative_score
                if neighbor not in cameFrom:
                    cameFrom[neighbor] = current
                
                if neighbor not in gScore:
                    gScore[neighbor] = tentative_score
                elif gScore[neighbor] > tentative_score:
                    gScore[neighbor] = tentative_score
                    cameFrom[neighbor] = current
            
                openSet.put((gScore[neighbor] + pathScore(neighbor, end), neighbor))
        i += 1
        if i > 500000:
            print('too many iterations')
            return cameFrom
                
    #print 'cameFrom: {}'.format(cameFrom)
    #print 'gScore: {}'.format(gScore)
    #print 'closedSet: {}'.format(closedSet)
    #print 'openSet: {}'.format(openSet)
    
    
    #beginx = min(start[0], end[0])
    #beginy = min(start[1], end[1])
    #endx = max(start[0], end[0])
    #endy = max(start[1], end[1])
    
    #for i in range(beginx, endx):
    #    for j in range(beginy, endy):
    #        mapdata[j][i] = 9

    path = reconstructPath(cameFrom, end)
    
    #drawMap(mapdata)
    
    for point in path:
        mapdata[point[1]][point[0]] = 9

    drawMap(mapdata)
    
    return cameFrom
    
    
#c = FindPath('prontera', (268, 46), (126, 257))
#c = FindPath('prontera', (268, 46), (51, 259))
#c = FindPath('prontera', (51, 259), (153, 318))
#c = FindPath('prontera', (269, 357), (50, 47))
#c = FindPath('ayo_dun01', (18, 17), (270, 279))
#c = FindPath('ayo_dun01', (286, 17), (28, 275))
#c = FindPath('ayo_dun01', (18, 17), (28, 275))
#c = FindPath('ayo_dun01', (286, 17), (270, 279))
#c = FindPath('2@nyd', (200, 16), (200, 176))
#c = FindPath('prontera', (268, 46), (226, 257))
#c = FindPath('prontera', (268, 46), (226, 257))
#c = FindPath('prontera', (268, 46), (280, 174))
    



'''
struct GATFile {                // Offset
   unsigned char magic[6];     // 0
   uint32 width;               // 6
   uint32 height;              // 10
   struct GATBlock blocks[];   // 14
};


// Total size: 20 bytes
struct GATBlock {                 // Offset
   float upperLeftHeight;        // 0
   float upperRightHeight;       // 4
   float lowerLeftHeight;        // 8
   float lowerRightHeight;       // 12
   unsigned char type;           // 16
   unsigned char unknown[3];     // 17
};

0 = walkable block
1 = non-walkable block
2 = non-walkable water (not snipable)
3 = walkable water
4 = non-walkable water (snipable)
5 = cliff (snipable)
6 = cliff (not snipable)
Everything else = unknown
'''

def convertGat(filepath):
    
    f = open(filepath, 'rb')
    data = f.read()
    
    magic = data[0:6]
    width = struct.unpack('<I', data[6:10])[0]
    height = struct.unpack('<I', data[10:14])[0]
    
    print(magic, width,  height)
    
    GATBlocks = [] # = data[14:] # Everything else
    row = []
    
    x = 0
    for i in range(14, len(data), 20):
        block = struct.unpack('<ffffBBBB', data[i:i+20])
        walkType = block[4]
        row.append(walkType)
        
        x += 1
        if x >= width:
            x = 0
            GATBlocks.append(row)
            row = []
            
    mapname = os.path.basename(filepath).replace('.gat','')
    if not os.path.isdir('convertedmaps'):
        os.makedirs('convertedmaps')
    
    with open('convertedmaps\\{}.txt'.format(mapname), 'w') as out:
        for rowdata in GATBlocks:
            out.write('{}\n'.format(''.join([str(c) for c in rowdata])))
            
    with open('public\\mapdata\\{}.txt'.format(mapname), 'w') as out:
        out.write('[\n')
        outlines = []
        for rowdata in GATBlocks:
            outlines.append('\t[{}]'.format(','.join([str(c) for c in rowdata])))
            
        out.write(',\n'.join(outlines))
        out.write('\n]')
            
    #mapdata = '\t[\n{}\n\t],\n'.format(',\n'.join(['\t\t[{}]'.format(','.join([str(c) for c in rowdata])) for rowdata in GATBlocks]))
    
    mapdata = getMapData(mapname)
    drawMap(mapdata, True, mapname)
            
    f.close()
            
    #return {'name': mapname, 'data': mapdata}
    
def convertAll():
    if not os.path.isdir('public\\mapdata'):
        os.makedirs('public\\mapdata')
    
    for root, dirs, files in os.walk('GRF\\files'):
        for f in files:
            if f.endswith('.gat'):
                filepath = os.path.join(root, f)
                data = convertGat(filepath)
        
if __name__ == '__main__':
    convertAll()
    