(function(){

window.addEvent('domready', function () {
    var sexes = {"all": "Все", "m": "Мужчины", "f": "Женщины"};
    function map_sex(key) {
        return sexes[key];
    };
    function map_company(key) {
        if (key == "all") {
            return "Все";
        }
        return "Количество людей от компании:" + key;
    };
    var positions = {"all": "Все", "hr": "HR", "mgmt": "Управляющий", "qa": "QA", "designer": "Дизайнер", "analysis": "Аналитик", "developer": "Разработчик", "admin": "Администратор", "student": "Студент", "na": "Н/Д"};
    function map_position(key) {
        return "Должность: " + positions[key];
    };

    function filter_values(filter_value, filter_field) {
        if (filter_value == "all") {
            return function(elem) { return true; };
        }
        return function(elem) {return elem[filter_field] == filter_value;};
    };

    function get_percentage(value, total) {
        if (total == 0) {
            return 0;
        }
        return Math.round(100*value/total);
    };
    function get_bar_width(value, total) {
        return get_percentage(value, total)*3;
    };

    function clear_children(elem) {
        while (elem.hasChildNodes()) {
            elem.removeChild(elem.lastChild);
        }
    };

    var filters = Object();
    filters["sex"] = "all";
    filters["company"] = "all";
    filters["position"] = "all";
    function add_filtering(filter_value, filter_field) {
        filters[filter_field] = filter_value;
    };

    function get_inner_html(div, value, total, filter_value, filter_field) {
        div.onclick = function () {
            add_filtering(filter_value, filter_field);
            filter_raw_data();
        };

        var value_div = new Element("div", {"class": "caption"});
        if (filters[filter_field] == filter_value) {
            value_div.className = "captionSelected";
        }

        var value_text = "";
        if (filter_field == "sex") {
            value_text = map_sex(filter_value);
        } else if (filter_field == "position") {
            value_text = map_position(filter_value);
        } else {
            value_text = map_company(filter_value);
        }
        value_div.innerText = value_text;
        value_div.setStyles({width: 250, left: 0, top:0});
        div.appendChild(value_div);

        var text_div = new Element("div", {"class": "value"});
        text_div.innerText = value+' (' + get_percentage(value, total) + '%)'
        if (filters[filter_field] == filter_value) {
            text_div.className = "valueSelected";
        }
        text_div.setStyles({width: 100, left: 40, top:0});
        div.appendChild(text_div);

        var bar_div = new Element("div", {"class": "bar"});
        if (filters[filter_field] == filter_value) {
            bar_div.className = "barSelected";
        }
        bar_div.setStyles({width: get_bar_width(value, total), height: 8, left: 160, top: 0});

        div.appendChild(bar_div);
    };

    function filter_raw_data() {
        var sex_total = 0;
        var index = 0;
        ["all", "m", "f"].map(function(elem) {
            var initial_val = Object();
            initial_val.amount = 0;

            var filtered = raw_data.filter(filter_values(elem, "sex"));
            filtered = filtered.filter(filter_values(filters["company"], "company"));
            filtered = filtered.filter(filter_values(filters["position"], "position"));
            var value = filtered.reduce(function(a, b) {
                var d = Object();
                d.amount = a.amount + b.amount;
                return d;
            }, initial_val).amount;

            if (sex_total == 0) {
                sex_total = value;
            }
            clear_children(document.getElementById("sex_" + elem));
            get_inner_html(document.getElementById("sex_" + elem), value, sex_total, elem, "sex");
            document.getElementById("sex_" + elem).setStyles({height: 30, top: index*60, width: 500});
            index += 1;
        });

        var company_total = 0;
        index = 0;
        ["all", "50+", "21-50", "16-20", "11-15", "6-10", "2-5", "1"].map(function(elem) {
            var initial_val = Object();
            initial_val.amount = 0;

            var filtered = raw_data.filter(filter_values(elem, "company"));
            filtered = filtered.filter(filter_values(filters["sex"], "sex"));
            filtered = filtered.filter(filter_values(filters["position"], "position"));
            var value = filtered.reduce(function(a, b) {
                var d = Object();
                d.amount = a.amount + b.amount;
                return d;
            }, initial_val).amount;

            if (company_total == 0) {
                company_total = value;
            }
            clear_children(document.getElementById("company_" + elem));
            get_inner_html(document.getElementById("company_" + elem), value, company_total, elem, "company");
            document.getElementById("company_" + elem).setStyles({height: 30, top: index*60, width: 500, left: 400});
            index += 1;
        });

        var position_total = 0;
        index = 0;
        ["all", "hr", "mgmt", "qa", "designer", "analysis", "developer", "admin", "student", "na"].map(function(elem) {
            var initial_val = Object();
            initial_val.amount = 0;

            var filtered = raw_data.filter(filter_values(elem, "position"));
            filtered = filtered.filter(filter_values(filters["sex"], "sex"));
            filtered = filtered.filter(filter_values(filters["company"], "company"));
            var value = filtered.reduce(function(a, b) {
                var d = Object();
                d.amount = a.amount + b.amount;
                return d;
            }, initial_val).amount;

            if (position_total == 0) {
                position_total = value;
            }
            clear_children(document.getElementById("position_" + elem));
            get_inner_html(document.getElementById("position_" + elem), value, position_total, elem, "position");
            document.getElementById("position_" + elem).setStyles({height: 30, top: index*60, width: 500, left: 800});
            index += 1;
        });
    };

    filter_raw_data();
});

})();
