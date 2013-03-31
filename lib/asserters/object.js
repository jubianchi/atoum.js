var extend = require('node.extend'),
    array = require('./array'),
    object = module.exports = function object(test) {
        array.call(this, test);
    };

object.prototype = new array();
object.prototype.constructor = object;
object.prototype = extend(
    object.prototype,
    {
        check: function() {
            var type = Object.prototype.toString.call(this.value);

            if(typeof this.value !== 'object' || type === '[object Array]') {
                this.test.fail('Value is not an object');
            }

            return this;
        },

        isInstanceOf: function(expected) {
            if(false === (this.value instanceof expected)) {
                this.test.fail(this.value + ' is not an instance of ' + expected);
            }

            return this.test;
        },

        isNotInstanceOf: function(expected) {
            if(this.value instanceof expected) {
                this.test.fail(this.value + ' is an instance of ' + expected);
            }

            return this.test;
        },

        hasMember: function(expected) {
            if(this.value.hasOwnProperty(expected)) {
                this.test.fail('Value does not have key ' + expected);
            }

            return this.test;
        }
    }
);
