"use strict";

var extend = require("node.extend"),
    asserter = require("../asserter"),
    undefined = module.exports = function undefined(generator) {
        asserter.call(this, generator);
    };

undefined.prototype = new asserter();
undefined.prototype.constructor = undefined;
undefined.prototype = extend(
    undefined.prototype,
    {
        check: function () {
            if(typeof this.value !== "undefined") {
                this.fail("%s is not undefined", this.value);
            }

            return this;
        }
    }
);
