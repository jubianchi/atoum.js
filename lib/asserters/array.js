var util = require('util'),
    extend = require('node.extend'),
    variable = require('./variable'),
    array = module.exports = function array(test) {
        variable.call(this, test);
    };

array.prototype = new variable();
array.prototype.constructor = array;
array.prototype = extend(
    array.prototype,
    {
        check: function() {
            if(Object.prototype.toString.call(this.value) !== '[object Array]') {
                this.test.fail('Value is not an array');
            }

            return this;
        },

        hasLength: function(expected) {
            if(this.value.length !== expected) {
                this.test.fail(util.format('Array(%d) has not length %d', this.value.length, expected));
            }

            return this.test;
        }
    }
);