# -*- coding: utf-8 -*-
from collections import defaultdict
def reduce_companies(members):
    """ Group mistypes and similar companies together"""
    mappings = {"\"Алавар.ру\"": "Alawar", "Alawar Stargaze": "Alawar",
            "Alawar Friday’s Games": "Alawar",
            "10sheet.com": "10sheet",
            "Excelsior, LLC": "Excelsior",
            "Percona Inc": "Percona",
            "Playtox": "Playtox LLC",
            "Freelancer": "н/д",
            "Hosting Concepts, B.V.": "Hosting Concepts",
            "N/A": "н/д",
            "n/a": "н/д",
            "self-employed": "н/д",
            "Ищу работу =)": "н/д",
            "Нет": "н/д",
            "Яяя": "н/д",
            "ремесленник": "н/д",
            "фриланс": "н/д",
            "фрилансер": "н/д",
            "ищу свою": "н/д",
            "лично": "н/д",
            "n\\a": "н/д",
            "Частное лицо": "н/д",
            "Стратоплан.Ру": "Стратоплан",
            "None": "н/д"}

    for member in members:
        for key in mappings:
            if member.company == key:
                member.company = mappings[key]

    return members

def get_amount_str(amount):
    if 0 < amount < 2:
        return "1"
    if 1 < amount < 6:
        return "2-5"
    if 5 < amount < 11:
        return "6-10"
    if 10 < amount < 16:
        return "11-15"
    if 15 < amount < 21:
        return "16-20"
    if 20 < amount < 51:
        return "21-50"
    if 51 < amount:
        return "50+"
    return "9000+"

def group_companies(members):
    """ Replace company name with size """
    companies = defaultdict(int)
    for member in members:
        companies[member.company] += 1

    for member in members:
        amount = companies[member.company]
        member.company = get_amount_str(amount)

def get_gender(name):
    clean_name = name.lower().strip()
    if clean_name in ["данила", "илья", "миша", "слава"]:
        return "м"

    if clean_name in ["любовь"]:
        return "ж"

    if clean_name[-1] in ['а', 'е', 'и', 'о', 'у', 'э', 'ю', 'я']:
        return "ж"
    else:
        return "м"

def replace_names(members):
    for member in members:
        member.name = get_gender(member.name)
