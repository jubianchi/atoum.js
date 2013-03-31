var console = require('console'),
    asserters = require('./asserters'),
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
    },

    if: function() { return this; },
    and: function() { return this; },
    then: function() { return this; },
    dump: function(value) { console.dir(value); return this; },

    fail: function(message) {
        var error = new Error(message);
        error.name = 'Failure';

        throw error;
    }
};

function getAsserter(name) {
    return function(value) {
        return new asserters[name](this).setWith(value);
    };
}

for(var name in asserters) {
    if(asserters.hasOwnProperty(name)) {
        test.prototype[name] = getAsserter(name);
    }
}
