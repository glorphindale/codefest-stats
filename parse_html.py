# -*- coding: utf-8 -*-
from xml.dom.minidom import parse, parseString

def parse_members():
    content = parse("by_names.html")

if __name__ == "__main__":
    parse_members()
