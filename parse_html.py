# -*- coding: utf-8 -*-
import re
from collections import namedtuple
from collections import defaultdict

import filters

class Member:
    def __init__(self, name, company="н/д", position="н/д"):
        self.name = name
        self.company = company
        self.position = position

    def __repr__(self):
        return "%s works at %s as %s" % (self.name, self.company, self.position)

    def row(self):
        return "<tr><td>%s</td><td>%s</td><td>%s</td></tr>\n" % (self.name, self.company, self.position)

def parse_members():
    members = []
    names = defaultdict(int)
    companies_am = 0
    members_am = 0

    content = [l.strip() for l in open("by_names.html").readlines()]
    for line in content:
        name_match = re.match(r"""^<dt>(.+) <span?""", line)
        if name_match:
            name, surname = name_match.group(1).split(" ")
            members.append(Member(name=name))
            names[name] += 1
            members_am += 1
            continue

        name_match = re.match(r"""^<dt>(.+) </dt>""", line)
        if name_match:
            name, surname = name_match.group(1).split(" ")
            members.append(Member(name=name))
            names[name] += 1
            members_am += 1
            continue

        searcher_match = re.match(r"""<dd><a href="companies#company_\d+" rel="company_\d+">(.+)</a>(, .*)?<span class="(.*)"><img src""", line)
        if searcher_match:
            # Add employee/job statistics if desired
            if len(searcher_match.group(1)) > 2:
                members[-1].company = searcher_match.group(1)
            if searcher_match.group(2):
                members[-1].position = searcher_match.group(2)[2:]
            companies_am += 1
            continue

        company_match = re.match(r"""<dd><a href="companies#company_\d+" rel="company_\d+">(.+)</a>(, .*)?</dd>""", line)
        if company_match:
            if len(company_match.group(1)) > 2:
                members[-1].company = company_match.group(1)
            if company_match.group(2):
                members[-1].position = company_match.group(2)[2:]
            companies_am += 1
            continue

    assert companies_am == 1338
    assert members_am == 1338
    assert len(members) == 1338

    return members

def store_raw_stats(members):
    template = open("raw_stats_template.html", "r").read()
    out = open("raw_stats.html", "w")

    filters.group_companies(members)
    filters.replace_names(members)
    raw_data = "".join(map(Member.row, members))

    content = template % locals()
    out.write(content)
    out.close()

if __name__ == "__main__":
    members = parse_members()
    members = filters.reduce_companies(members)
    store_raw_stats(members)
