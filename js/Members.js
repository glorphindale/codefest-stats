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

    var total = 1338; // TODO count amount

    ["all", "m", "f"].map(function(elem) {
        var value =  raw_data.filter(filter_values(elem, "sex")).reduce(function(a, b) {
            var d = Object();
            d.amount = a.amount + b.amount;
            return d;
        }).amount;
        document.getElementById("sex_" + elem).innerHTML = '<div style="font-size: 10pt; color: #AAAAAA;"><img src="pixel.png" width="'+get_percentage(value, total)+'" height="15" border="1" style="border-color: #00AA00"> '+value+' (' + get_percentage(value, total) + '%)</div>';
    });

    ["all", "50+", "21-50", "16-20", "11-15", "6-10", "2-5", "1"].map(function(elem) {
        var value = raw_data.filter(filter_values(elem, "company")).reduce(function(a, b) {
            var d = Object();
            d.amount = a.amount + b.amount;
            return d;
        }).amount;
        document.getElementById("company_" + elem).innerHTML = '<div style="font-size: 10pt; color: #AAAAAA;"><img src="pixel.png" width="'+get_percentage(value, total)+'" height="15" border="1" style="border-color: #00AA00"> '+value+' (' + get_percentage(value, total) + '%)</div>';
    });

    ["all", "hr", "mgmt", "qa", "designer", "analysis", "developer", "admin", "student", "na"].map(function(elem) {
        var value = raw_data.filter(filter_values(elem, "position")).reduce(function(a, b) {
            var d = Object();
            d.amount = a.amount + b.amount;
            return d;
        }).amount;
        document.getElementById("position_" + elem).innerHTML = '<div style="font-size: 10pt; color: #AAAAAA;"><img src="pixel.png" width="'+get_percentage(value, total)+'" height="15" border="1" style="border-color: #00AA00"> '+value+' (' + get_percentage(value, total) + '%)</div>';
    });
});

})();
