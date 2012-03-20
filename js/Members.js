(function(){

window.addEvent('domready', function () {
    function filter_values(filter_value) {
        if (filter_value == "all") {
            return function(elem) { return true; };
        }
        return function(elem) {return elem[0] == filter_value;};
    };

    ["all", "m", "f"].map(function(elem) {
        document.getElementById("sex_" + elem).innerHTML = raw_data.filter(filter_values(elem)).reduce(function(a, b) {
            var d = [];
            d[3] = a[3] + b[3];
            return d;
        })[3];
    });

});

})();
