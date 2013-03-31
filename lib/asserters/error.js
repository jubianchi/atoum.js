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
                this.fail('Value is not callable');
            }

            try {
                this.value();
            } catch(error) {
                this.exception = error;
            }

            if(typeof this.exception == 'undefined') {
                this.fail('There was no error')
            }

            return this;
        },

        hasName: function(expected) {
            if(expected != this.exception.name) {
                this.fail(util.format('Error name \'%s\' is not equal to \'%s\'', this.exception.name, expected));
            }

            return this;
        },

        hasMessage: function(expected) {
            if(expected != this.exception.message) {
                this.fail(util.format('Error message \'%s\' is not equal to \'%s\'', this.exception.message, expected));
            }

            return this;
        }
    }
);
