"use strict";

require("../..")(module);

var extend = require("node.extend"),
    Variable = require("./variable"),
    integer = module.exports = function integer(generator) {
        Variable.call(this, generator);

        this.locale.translations.loadTranslations(require("../../resources/locale/asserters/integer.json"));
    };

integer.prototype = new Variable();
integer.prototype.constructor = integer;
integer.prototype = extend(
    integer.prototype,
    {
        check: function () {
            if(typeof this.value === "number" && (this.value === +this.value && isFinite(this.value) && !(this.value % 1))) {
                return this.pass();
            }

            this.fail(this.locale._("$[1] is not an integer", this.value));
        }
    }
);
