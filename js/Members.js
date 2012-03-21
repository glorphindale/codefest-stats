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

    function get_value_element(value, total) {
        var element =
        '<div class="percentage"><img src="pixel.png" width="' + get_percentage(value, total) + '" height="15" border="1" class="bar">' + +value+' (' + get_percentage(value, total) + '%)</div>';
        return element;
    };


    var total = 1338; // TODO count amount

    ["all", "m", "f"].map(function(elem) {
        var value =  raw_data.filter(filter_values(elem, "sex")).reduce(function(a, b) {
            var d = Object();
            d.amount = a.amount + b.amount;
            return d;
        }).amount;
        document.getElementById("sex_" + elem).innerHTML = get_value_element(value, total);
    });

    ["all", "50+", "21-50", "16-20", "11-15", "6-10", "2-5", "1"].map(function(elem) {
        var value = raw_data.filter(filter_values(elem, "company")).reduce(function(a, b) {
            var d = Object();
            d.amount = a.amount + b.amount;
            return d;
        }).amount;
        document.getElementById("company_" + elem).innerHTML = get_value_element(value, total);
    });

    ["all", "hr", "mgmt", "qa", "designer", "analysis", "developer", "admin", "student", "na"].map(function(elem) {
        var value = raw_data.filter(filter_values(elem, "position")).reduce(function(a, b) {
            var d = Object();
            d.amount = a.amount + b.amount;
            return d;
        }).amount;
        document.getElementById("position_" + elem).innerHTML =  get_value_element(value, total);
    });
});

})();
