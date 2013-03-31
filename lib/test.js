var console = require('console'),
    test = module.exports = function test(testClass) {
        this.class = testClass;
    };

test.prototype = {
    getMethods: function() {
        var unit = require(this.class),
            methods = [];

        for(method in unit) {
            if(unit.hasOwnProperty(method)) {
                methods[method] = unit[method];
            }
        }

        return methods;
    }
};
