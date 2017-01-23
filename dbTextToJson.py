# -*- coding: utf-8 -*-
"""
Created on Tue Mar 15 21:12:35 2016

@author: aaron
"""


import re
import os
import urllib

if False:
    items = {}
    
    with open('item_db.txt', 'r') as f:
        for line in f:
            m = re.search('(.+),(.+)', line)
            if m:
                itemId = int(m.group(1))
                itemName = m.group(2)
                items[itemId] = itemName
    
    jsonString = 'var DbTable_Items = {{{}\n}};'
    
    itemlines = []
    
    for itemId in sorted(list(items)):
        itemlines.append('\t{}:"{}",'.format(itemId, items[itemId]))
        
    finalJson = jsonString.format('\n'.join(itemlines))
    
    with open('items.js', 'w') as out:
        out.write(finalJson)

if True:
    skillsById = {}
    skillsByEnum = {}
    
    with open('SKID.txt', 'r') as f:
        for line in f:
            m = re.search(r'\t(.+) = (\d+),', line)
            if m:
                skillEnum = m.group(1)
                skillId = int(m.group(2))
                #print skillEnum, skillId
                skillsByEnum[skillEnum] = skillId
                skillsById[skillId] = skillEnum
                
                
    with open('C:\\Users\\aaron\\Documents\\openkore_ready\\OtherClient\\tables\\iRO\\skillnametable.txt', 'r') as f:
        for line in f:
            #print line
            m = re.search(r'(.+)#(.+)#', line)
            if m:
                skillEnum = m.group(1)
                skillName = m.group(2).replace('_', ' ').replace('"', '')
                if skillEnum not in skillsByEnum:
                    print skillEnum, skillName
                else:
                    skillsById[skillsByEnum[skillEnum]] = skillName
                    #http://ratemyserver.net/skill_icons/rk_dragonbreath_water.gif
                    #urllib.urlretrieve("http://db.irowiki.org/image/item/512.png", "public/item/512.png")
                    if not os.path.isdir('public/skills'):
                        os.makedirs('public/skills')
                    
                    urllib.urlretrieve("http://ratemyserver.net/skill_icons/{}.gif".format(skillEnum.lower()), "public/skills/{}.png".format(skillsByEnum[skillEnum]))
    
                    
    
    jsonString = 'var DbTable_Skills = {{{}\n}};'
    
    skilllines = []
    
    for skillId in sorted(list(skillsById)):
        skilllines.append('\t{}:"{}",'.format(skillId, skillsById[skillId]))
        
    finalJson = jsonString.format('\n'.join(skilllines))
    
    with open('skills.js', 'w') as out:
        out.write(finalJson)                
                    
                    
                    
                    
                    
                    
                    
                    
                    