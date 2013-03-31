var extend = require('node.extend'),
    util = require('util'),
    variable = require('./variable'),
    string = module.exports = function string(generator) {
        variable.call(this, generator);
    };

string.prototype = new variable();
string.prototype.constructor = string;
string.prototype = extend(
    string.prototype,
    {
        check: function() {
            if(typeof this.value !== 'string') {
                this.fail('Value is not a string');
            }

            return this;
        },

        hasLength: function(expected) {
            this.generator.assertionsCount++;

            if(this.value.length !== expected) {
                this.fail(util.format('String(%d) has not length %d', this.value.length, expected));
            }

            return this;
        }
    }
);