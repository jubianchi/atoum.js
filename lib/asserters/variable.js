"use strict";

require("../..")(module);

var extend = require("node.extend"),
    Asserter = require("../asserter"),
    Locale = require("../locale"),
    variable = module.exports = function variable(generator) {
        Asserter.call(this, generator);

        this.locale = new Locale(require("../../resources/locale/asserters/variable.json"));
    };

variable.prototype = new Asserter();
variable.prototype.constructor = variable;
variable.prototype = extend(
    variable.prototype,
    {
        check: function () {
            if(typeof this.value === "undefined") {
                this.fail(this.locale._("Value is undefined"));
            }

            return this.pass();
        },

        isEqualTo: function (expected) {
            if(this.value != expected) {
                this.fail(this.locale._("$[1] is not equal to $[2]", this.value, expected));
            }

            return this.pass();
        },

        isNotEqualTo: function (expected) {
            if(this.value == expected) {
                this.fail(this.locale._("$[1] is equal to $[2]", this.value, expected));
            }

            return this.pass();
        },

        isIdenticalTo: function (expected) {
            if(this.value !== expected) {
                this.fail(this.locale._("$[1] is not identical to $[2]", this.value, expected));
            }

            return this.pass();
        },

        isNotIdenticalTo: function (expected) {
            if(this.value === expected) {
                this.fail(this.locale._("$[1] is identical to $[2]", this.value, expected));
            }

            return this.pass();
        },

        isTruthy: function () {
            if(this.value == false) {
                this.fail(this.locale._("$[1] is not true", this.value));
            }

            return this.pass();
        },

        isFalsy: function () {
            if(this.value == true) {
                this.fail(this.locale._("$[1] is not false", this.value));
            }

            return this.pass();
        },

        isEmpty: function () {
            if(this.value.length > 0) {
                this.fail(this.locale._("$[1] is not empty", this.value));
            }

            return this.pass();
        },

        isNotEmpty: function () {
            if(this.value.length === 0) {
                this.fail(this.locale._("$[1] is empty", this.value));
            }

            return this.pass();
        }
    }
);
