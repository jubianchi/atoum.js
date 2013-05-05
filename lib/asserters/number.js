"use strict";

require("../..")(module);

var extend = require("node.extend"),
    Variable = require("./variable"),
    number = module.exports = function number(generator) {
        Variable.call(this, generator);

        this.locale.translations.loadTranslations(require("../../resources/locale/asserters/number.json"));
    };

number.prototype = new Variable();
number.prototype.constructor = number;
number.prototype = extend(
    number.prototype,
    {
        check: function () {
            if(typeof this.value !== "number") {
                this.fail(this.locale._("$[1] is not a number", this.value));
            }

            return this;
        }
    }
);
