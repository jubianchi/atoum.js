var extend = require('node.extend'),
    variable = require('./variable'),
    array = module.exports = function array(generator) {
        variable.call(this, generator);
    };

array.prototype = new variable();
array.prototype.constructor = array;
array.prototype = extend(
    array.prototype,
    {
        check: function() {
            if(Object.prototype.toString.call(this.value) !== '[object Array]') {
                this.fail('%s is not an array', this.value);
            }

            return this;
        },

        hasLength: function(expected) {
            this.generator.assertionsCount++;

            if(this.value.length !== expected) {
                this.fail('Array(%d) has not length %d', this.value.length, expected);
            }

            return this;
        }
    }
);