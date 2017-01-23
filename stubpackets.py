# -*- coding: utf-8 -*-
"""
Created on Thu Mar 17 10:08:42 2016

@author: aaron
"""


import re
import os
import json

infile = 'recvpackets.txt'
existingrecv = 'public/recv.js'

packetData = {}

rdata = r"\t*0x....: {\s*name: '.+',\s*length: -?\d+,\s*log: \d+,\s*data: \[\s*(?:{name: '.+', size: -?\d+, type: '.+', log: \d+},\s*)*\s*\],\s*},"

with open(existingrecv, 'r') as f:
    d = f.read()
    fa = re.findall(rdata, d)
    for packet in fa:
        m = re.search(r'0x(....): {', packet)
        if m:
            #print m.group(0)
            header = m.group(1).lower()
            packet = packet.replace(m.group(0), m.group(0).lower())
            packetData[header] = packet
            
#    0x007F: {
#		name: 'received_sync', 
#		length: 6, 
#		log: 0,
#		data: [
#			{name: 'time', size: 4, type: 'int', log: 2},
#		],
#	},
            

zeroTemplate = """	0x{0}: {{
		name: 'unknown_packet_{0}', 
		length: {1}, 
		log: 2,
		data: [
  
		],
	}},"""

fixedTemplate = """	0x{0}: {{
		name: 'unknown_packet_{0}', 
		length: {1}, 
		log: 2,
		data: [
			{{name: 'data', size: {2}, type: 'byte', log: 1}},
		],
	}},"""
 
variableTemplate = """	0x{0}: {{
		name: 'unknown_packet_{0}', 
		length: -1, 
		log: 2,
		data: [
			{{name: 'len', size: 2, type: 'int', log: 2}},
			{{name: 'data', size: -1, type: 'byte', log: 1}},
		],
	}},"""

recvData = []

with open(infile, 'r') as f:
    for line in f:
        m = re.search(r'([0-9A-F]+) (\d+)', line)
        if m:
            header = m.group(1).lower()
            size = int(m.group(2))
            if header not in packetData:
                #recvData.append({'header':header, 'size':size})
                if size > 2:
                    packet = fixedTemplate.format(header, size, size - 2)
                elif size == 2:
                    packet = zeroTemplate.format(header, size)
                elif size == 0:
                    packet = variableTemplate.format(header)
                else:
                    print 'Error with packet {} [{}]'.format(header, size)
                
                packetData[header] = packet

packetList = []

for packet in packetData:
    packetList.append((packet, packetData[packet]))

packetList.sort(key=lambda x: x[0])

headers, packets = zip(*packetList)

jsTemplate = 'var RECV = {{\n{}\n}};'

finalJs = jsTemplate.format('\n'.join(packets))

with open('recvTemplate.js', 'w') as out:
    out.write(finalJs)
    



#packetList = []
#
#for packet in recvData:
#    header = packet['header']
#    size = packet['size']
#    if size > 2:
#        s = fixedTemplate.format(header, size, size - 2)
#    elif size == 2:
#        s = zeroTemplate.format(header, size)
#    elif size == 0:
#        s = variableTemplate.format(header)
#    else:
#        console.log('Error with packet {} [{}]'.format(header, size))
#        
#    
#jsTemplate = 'var RECV = {{\n{}\n}};'
#
#finalJs = jsTemplate.format('\n'.join(packetList))
#
#with open('recvTemplate.js', 'w') as out:
#    out.write(finalJs)
#    
    
    
    
    
    