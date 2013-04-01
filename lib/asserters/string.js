var extend = require('node.extend'),
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
                this.fail('%s is not a string', this.value);
            }

            return this;
        },

        hasLength: function(expected) {
            this.generator.assertionsCount++;

            if(this.value.length !== expected) {
                this.fail('%s has not length %d', this.value, expected);
            }

            return this;
        }
    }
);