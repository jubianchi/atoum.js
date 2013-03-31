var extend = require('node.extend'),
    variable = require('./variable'),
    util = require('util'),
    error = module.exports = function error(test) {
        variable.call(this, test);
    };

error.prototype = new variable();
error.prototype.constructor = error;
error.prototype = extend(
    error.prototype,
    {
        check: function() {
            if(typeof this.value !== 'function') {
                this.test.fail('Value is not callable');
            }

            try {
                this.value();
            } catch(error) {
                this.error = error;
            }

            if(typeof this.error == 'undefined') {
                this.test.fail('There was no error')
            }

            return this;
        },

        hasName: function(expected) {
            if(expected != this.error.name) {
                this.test.fail(util.format('Error name \'%s\' is not equal to \'%s\'', this.error.name, expected));
            }

            return this;
        },

        hasMessage: function(expected) {
            if(expected != this.error.message) {
                this.test.fail(util.format('Error message \'%s\' is not equal to \'%s\'', this.error.message, expected));
            }

            return this.test;
        }
    }
);
