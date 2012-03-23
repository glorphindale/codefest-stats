(function(){

window.addEvent('domready', function () {
    function filter_values(filter_value, filter_field) {
        if (filter_value == "all") {
            return function(elem) { return true; };
        }
        return function(elem) {return elem[filter_field] == filter_value;};
    };

    function get_percentage(value, total) {
        return Math.round(100*value/total);
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

    function get_value_element(value, total, filter_value, filter_field) {
        var div = new Element("div", { "class":"percentage" });
        var text = document.createTextNode(value+' (' + get_percentage(value, total) + '%)');
        div.appendChild(text);
        div.appendChild(document.createElement("br"));

        var img = new Image();
        img.className = "bar";
        img.src = "pixel.png";
        img.width = 3*get_percentage(value, total);
        img.height = 5;

        div.onclick = function () {
            add_filtering(filter_value, filter_field);
            filter_raw_data();
        };

        div.appendChild(img);
        return div;
    };

    var total = 1338; // TODO count amount

    function filter_raw_data() {
        var sex_total = 0;
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
            document.getElementById("sex_" + elem).appendChild(get_value_element(value, sex_total, elem, "sex"));
        });

        var company_total = 0;
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
            document.getElementById("company_" + elem).appendChild(get_value_element(value, company_total, elem, "company"));
        });

        var position_total = 0;
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
            document.getElementById("position_" + elem).appendChild(get_value_element(value, position_total, elem, "position"));
        });
    };

    filter_raw_data();
});

})();
