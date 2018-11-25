# -*- coding: utf-8 -*-
"""
Created on Tue Mar 15 16:44:47 2016

@author: aaron
"""
import os
import re
import urllib
from lxml import html

#test=html.xpath("//ul[@class='toc']/li[@class='level2']/div[@class='li']/a/text()='One'")


if False:
    urlTemplate = "http://db.irowiki.org/db/item-info/{}/"
    with open('item_db.txt', 'a') as f:
        for itemId in range(23000, 23200):
            
            print 'Attempting to load page {}'.format(itemId)
            url = urlTemplate.format(itemId)
            page = html.fromstring(urllib.urlopen(url).read())
        
            
            
            itemPath = "//img"
            namePath = "//td[@class='mdTitle']"
            
            names = page.xpath(namePath)
            for node in names:
                print node.text
                f.write('{},{}\n'.format(itemId, node.text))
                
            images = page.xpath(itemPath)
            for node in images:
                if 'src' in node.attrib:
                    #print node.attrib['src']
                    imageurl = node.attrib['src']
                    m = re.search('http://db\.irowiki\.org/image/item/\d+\.png', imageurl)
                    if m:
                        if not os.path.isdir('public/item'):
                            os.makedirs('public/item')
                        urllib.urlretrieve(imageurl, "public/item/{}.png".format(itemId))
            
            #imgurl = 'http://db.irowiki.org/image/item/512.png'
            
            #urllib.urlretrieve("http://db.irowiki.org/image/item/512.png", "public/item/512.png")
if True:
    #http://ratemyserver.net/skill_db.php?skid=261&small=1&back=1
    urlTemplate = "http://ratemyserver.net/skill_db.php?skid={}&small=1&back=1"
    with open('skill_db.txt', 'a') as f:
        for skillId in range(261, 262):
            
            print 'Attempting to load page {}'.format(skillId)
            url = urlTemplate.format(itemId)
            page = html.fromstring(urllib.urlopen(url).read())
        
            
            
            itemPath = "//img"
            namePath = "//td[@class='mdTitle']"
            
            names = page.xpath(namePath)
            for node in names:
                print node.text
                f.write('{},{}\n'.format(skillId, node.text))
                
            images = page.xpath(itemPath)
            for node in images:
                if 'src' in node.attrib:
                    #print node.attrib['src']
                    imageurl = node.attrib['src']
                    m = re.search('http://db\.irowiki\.org/image/item/\d+\.png', imageurl)
                    if m:
                        if not os.path.isdir('public/item'):
                            os.makedirs('public/item')
                        urllib.urlretrieve(imageurl, "public/skill/{}.png".format(skillId))
                        
                        
                        