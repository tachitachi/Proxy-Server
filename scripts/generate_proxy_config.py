import os
import xml.etree.ElementTree as ET
import xml.dom.minidom
import lxml.etree

if __name__ == '__main__':

    tree = ET.parse('template.xml')
    root = tree.getroot()

    configs = []

    with open('proxyservers.txt', 'r') as f:
        configs.extend(list(map(lambda x: x.split('\t'), filter(lambda x: len(x) > 0 and x[0] != '#', map(lambda x: x.strip(), f.readlines())))))

    proxy_id = 100

    for source, target_port in configs:
        source_ip, source_port = source.split(':')
        target_ip = '127.0.0.1'
        print('{}:{} -> {}:{}'.format(source_ip, source_port, target_ip, target_port))

        proxy = ET.fromstring('''
            <Proxy id="{0}" type="SOCKS4">
              <Address>{1}</Address>
              <Port>{2}</Port>
              <Options>48</Options>
              <Authentication enabled="false">
                <Username></Username>
              </Authentication>
            </Proxy>
        '''.format(proxy_id, target_ip, target_port))

        rule = ET.fromstring('''
            <Rule enabled="true">
              <Name>Ragnarok {0}</Name>
              <Applications>Ragexe.exe</Applications>
              <Targets>{1}</Targets>
              <Ports>{2}</Ports>
              <Action type="Proxy">{0}</Action>
            </Rule>
        '''.format(proxy_id, source_ip, source_port))

        proxy_id += 1

        root.find('ProxyList').append(proxy)
        root.find('RuleList').append(rule)

    s = ET.tostring(root, encoding='UTF-8', short_empty_elements=True)

    parser = lxml.etree.XMLParser(remove_blank_text=True)
    s = lxml.etree.tostring(lxml.etree.XML(s, parser=parser), xml_declaration=False)

    s = xml.dom.minidom.parseString(s)

    s = s.toprettyxml(indent='  ')

    # Remove automatically generated xml declaration
    s = '\n'.join(s.split('\n')[1:])

    # Hack required for proxifier to read this properly
    s = s.replace('<Username/>', '<Username></Username>')

    with open('ragnarok_proxy.ppx', 'w') as f:
        f.write('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n')
        f.write(s)
