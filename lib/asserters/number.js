var extend = require('node.extend'),
    util = require('util'),
    variable = require('./variable'),
    number = module.exports = function number(generator) {
        variable.call(this, generator);
    };

number.prototype = new variable();
number.prototype.constructor = number;
number.prototype = extend(
    number.prototype,
    {
        check: function() {
            if(typeof this.value !== 'number') {
                this.fail('Value is not a number');
            }

            return this;
        }
    }
);