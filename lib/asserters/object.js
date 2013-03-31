var extend = require('node.extend'),
    array = require('./array'),
    object = module.exports = function object(generator) {
        array.call(this, generator);
    };

object.prototype = new array();
object.prototype.constructor = object;
object.prototype = extend(
    object.prototype,
    {
        check: function() {
            var type = Object.prototype.toString.call(this.value);

            if(typeof this.value !== 'object' || type === '[object Array]') {
                this.fail('Value is not an object');
            }

            return this;
        },

        isInstanceOf: function(expected) {
            this.generator.assertionsCount++;

            if(false === (this.value instanceof expected)) {
                this.fail(this.value + ' is not an instance of ' + expected);
            }

            return this;
        },

        isNotInstanceOf: function(expected) {
            this.generator.assertionsCount++;

            if(this.value instanceof expected) {
                this.fail(this.value + ' is an instance of ' + expected);
            }

            return this;
        },

        hasMember: function(expected) {
            this.generator.assertionsCount++;

            if(false === this.value.hasOwnProperty(expected)) {
                this.fail('Value does not have member ' + expected);
            }

            return this;
        }
    }
);
