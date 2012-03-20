(function(){

window.addEvent('domready', function () {
    function filter_values(filter_value, filter_field) {
        if (filter_value == "all") {
            return function(elem) { return true; };
        }
        return function(elem) {return elem[filter_field] == filter_value;};
    };

    ["all", "m", "f"].map(function(elem) {
        document.getElementById("sex_" + elem).innerHTML = raw_data.filter(filter_values(elem, "sex")).reduce(function(a, b) {
            var d = Object();
            d.amount = a.amount + b.amount;
            return d;
        }).amount;
    });

    ["all", "50+", "21-50", "16-20", "11-15", "6-10", "2-5", "1"].map(function(elem) {
        document.getElementById("company_" + elem).innerHTML = raw_data.filter(filter_values(elem, "company")).reduce(function(a, b) {
            var d = Object();
            d.amount = a.amount + b.amount;
            return d;
        }).amount;
    });

    ["all", "hr", "mgmt", "qa", "designer", "analysis", "developer", "admin", "student", "na"].map(function(elem) {
        document.getElementById("position_" + elem).innerHTML = raw_data.filter(filter_values(elem, "position")).reduce(function(a, b) {
            var d = Object();
            d.amount = a.amount + b.amount;
            return d;
        }).amount;
    });
});

})();
