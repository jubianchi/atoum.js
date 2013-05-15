"use strict";

require("../..")(module);

var extend = require("node.extend"),
    Variable = require("./variable"),
    error = module.exports = function error(generator) {
        Variable.call(this, generator);

        this.locale.translations.loadTranslations(require("../../resources/locale/asserters/error.json"));
    };

error.prototype = new Variable();
error.prototype.constructor = error;
error.prototype = extend(
    error.prototype,
    {
        check: function () {
            if(typeof this.value !== "function") {
                this.fail(this.locale._("$[1] is not callable", this.value));
            }

            try {
                this.value();

                this.fail(this.locale._("There was no error"));
            } catch(error) {
                this.exception = error;
            }

            return this.pass();
        },

        hasName: function (expected) {
            if(expected !== this.exception.name) {
                this.fail(this.locale._("Error name '$[1]' is not equal to '$[2]'", this.exception.name, expected));
            }

            return this.pass();
        },

        hasMessage: function (expected) {
            if(expected !== this.exception.message) {
                this.fail(this.locale._("Error message '$[1]' is not equal to '$[2]'", this.exception.message, expected));
            }

            return this.pass();
        }
    }
);
