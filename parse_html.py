# -*- coding: utf-8 -*-
import re
from collections import namedtuple
from collections import defaultdict
name_regex = r"""^(<dt>(.+) <span?|<dt>(.+)</dt>)"""

def get_gender(name):
    clean_name = name.lower().strip()
    if clean_name in ["данила", "илья", "миша", "слава"]:
        return "M"

    if clean_name in ["любовь"]:
        return "F"

    if clean_name[-1] in ['а', 'е', 'и', 'о', 'у', 'э', 'ю', 'я']:
        return "F"
    else:
        return "M"

def parse_members():
    Member = namedtuple("member", ["gender", ])

    members = []
    names = defaultdict(int)
    companies_am = 0
    members_am = 0

    content = [l.strip() for l in open("by_names.html").readlines()]
    for line in content:
        name_match = re.match(r"""^<dt>(.+) <span?""", line)
        if name_match:
            name, surname = name_match.group(1).split(" ")
            members.append(Member(gender=get_gender(name)))
            names[name] += 1
            members_am += 1
            continue

        name_match = re.match(r"""^<dt>(.+) </dt>""", line)
        if name_match:
            name, surname = name_match.group(1).split(" ")
            members.append(Member(gender=get_gender(name)))
            names[name] += 1
            members_am += 1
            continue
        
        company_match = re.match(r"""<dd><a href""", line)
        if company_match:
            companies_am += 1
            continue

    assert companies_am == 1338
    assert members_am == 1338
    assert len(members) == 1338

    print_name_stats(names)

    return members

def print_name_stats(names):
    """ Get defaultdict with names, print some stats"""
    print("Names: %s" % (sorted(names.items(), key=lambda p: p[1])))

def print_stats(members):
    genders = defaultdict(int)
    for m in members:
        genders[m.gender] += 1
    print("Genders: %s" % genders)

if __name__ == "__main__":
    members = parse_members()
    print_stats(members)
