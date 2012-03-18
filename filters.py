# -*- coding: utf-8 -*-
def group_companies(members):
    pass

def reduce_companies(members):
    mappings = {"\"Алавар.ру\"": "Alawar", "Alawar Stargaze": "Alawar",
            "Alawar Friday’s Games": "Alawar",
            "10sheet.com": "10sheet"}

    for member in members:
        for key in mappings:
            if member.company == key:
                member.company = mappings[key]

    return members
