"use strict";

require("../..")(module);

var extend = require("node.extend"),
    Asserter = require("../asserter"),
    Locale = require("../locale"),
    undefined = module.exports = function undefined(generator) {
        Asserter.call(this, generator);

        this.locale = new Locale(require("../../resources/locale/asserters/undefined.json"));
    };

undefined.prototype = new Asserter();
undefined.prototype.constructor = undefined;
undefined.prototype = extend(
    undefined.prototype,
    {
        check: function () {
            if(typeof this.value !== "undefined") {
                this.fail(this.locale._("$[1] is not undefined", this.value));
            }

            return this.pass();
        }
    }
);
