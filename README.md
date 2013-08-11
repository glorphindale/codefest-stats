# Что это?
Эксперименты в JavaScript и интерактивной инфографике.

Хотели узнать, сколько менеджеров от компании в 100 человек пришло на Codefest 2012?
Или каково соотношение мужчин и женщин в QA?
Или "на сколько девчонок по статистике приходится один HR-мужчина"?

![Распределение мужчин по должностям на Codefest 2012](Screenshot.png "Распределение мужчин по должностям на Codefest 2012")

# Статистика по Codefest 2012
С официальной страницы Codefest были взяты данные об участниках, после некоторой ручной обработки
получился файл "by_names.html"
Запуск parse_html.py приводит к появлению файла с обработанными данными в js/MembersData.js

Открыв stats.html в браузере (проверено только в Chrome и Opera), можно активно изучить все аспекты
посетителей Codefest 2012

# Кто это придумал?
Оригинальная идея интерактивной инфографики такого рода принадлежит Брету Виктору, в его [How Many
Households](http://worrydream.com/HowManyHouseholds/). Я только применил его идеи к интересовавшему меня набору данных.
