(function () {
    "use strict";

    var extend = require('node.extend'),
        variable = require('./variable'),
        number = module.exports = function number(generator) {
            variable.call(this, generator);
        };

    number.prototype = new variable();
    number.prototype.constructor = number;
    number.prototype = extend(
        number.prototype,
        {
            check: function () {
                if(typeof this.value !== 'number') {
                    this.fail('%s is not a number', this.value);
                }

                return this;
            }
        }
    );
}());
