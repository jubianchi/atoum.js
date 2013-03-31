var extend = require('node.extend'),
    util = require('util'),
    variable = require('./variable'),
    string = module.exports = function string(test) {
        variable.call(this, test);
    };

string.prototype = new variable();
string.prototype.constructor = string;
string.prototype = extend(
    string.prototype,
    {
        check: function() {
            if(typeof this.value !== 'string') {
                this.test.fail('Value is not a string');
            }

            return this;
        },

        hasLength: function(expected) {
            if(this.value.length !== expected) {
                this.test.fail(util.format('String(%d) has not length %d', this.value.length, expected));
            }

            return this.test;
        }
    }
);