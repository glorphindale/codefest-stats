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

def reduce_position(member):
    position = member.position.lower()

    hrs = ["hr", "персонал", "алексей сухоруков"]
    for hr in hrs:
        if hr in position:
            member.position = "hr"
            return

    mgmts = ["director", "директор", "manager", "начальник", "pm", "leader", "менеджер",
            "руководитель", "lead", "лидер", "рук."]
    for mgmt in mgmts:
        if mgmt in position:
            member.position = "mgmt"
            return

    qas = ["qa", "тестирован", "качеств", "test", "тестировщик"]
    for qa in qas:
        if qa in position:
            member.position = "qa"
            return

    designers = ["дизайнер", "ui", "интерф"]
    for designer in designers:
        if designer in position:
            member.position = "designer"
            return

    analysis = ["аналитик", "архи"]
    for an in analysis:
        if an in position:
            member.position = "analysis"
            return

    devs = ["developer", "разработчик", "программист", "engineer", "rnd"]
    for dev in devs:
        if dev in position:
            member.position = "developer"
            return
            
    admins = ["админ",]
    for adm in admins:
        if adm in position:
            member.position = "admin"
            return
    
    if "студент" in position:
        member.position = "student"
        return

    member.position = "na"

def reduce_positions(members):
    """ Replace positions and reduce them to smaller amount of values """
    for member in members:
        reduce_position(member)

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
        return "m"

    if clean_name in ["любовь"]:
        return "f"

    if clean_name[-1] in ['а', 'е', 'и', 'о', 'у', 'э', 'ю', 'я']:
        return "f"
    else:
        return "m"

def replace_names(members):
    for member in members:
        member.name = get_gender(member.name)
