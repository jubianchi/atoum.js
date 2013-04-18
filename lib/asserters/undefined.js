"use strict";

require("../..")(module);

var extend = require("node.extend"),
    Asserter = require("../asserter"),
    undefined = module.exports = function undefined(generator) {
        Asserter.call(this, generator);
    };

undefined.prototype = new Asserter();
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
