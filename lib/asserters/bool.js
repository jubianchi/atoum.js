var extend = require('node.extend'),
    variable = require('./variable'),
    bool = module.exports = function bool(generator) {
        variable.call(this, generator);
    };

bool.prototype = new variable();
bool.prototype.constructor = bool;
bool.prototype = extend(
    bool.prototype,
    {
        check: function() {
            if(typeof this.value != 'boolean') {
                this.fail('Value is not a boolean');
            }

            return this;
        },

        isTrue: function() {
            return this.isIdenticalTo(true);
        },

        isFalse: function() {
            return this.isIdenticalTo(true);
        }
    }
);