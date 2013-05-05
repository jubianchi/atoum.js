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

            return this;
        },

        isEqualTo: function (expected) {
            this.generator.assertionsCount += 1;

            if(this.value != expected) {
                this.fail(this.locale._("$[1] is not equal to $[2]", this.value, expected));
            }

            return this;
        },

        isNotEqualTo: function (expected) {
            this.generator.assertionsCount += 1;

            if(this.value == expected) {
                this.fail(this.locale._("$[1] is equal to $[2]", this.value, expected));
            }

            return this;
        },

        isIdenticalTo: function (expected) {
            this.generator.assertionsCount += 1;

            if(this.value !== expected) {
                this.fail(this.locale._("$[1] is not identical to $[2]", this.value, expected));
            }

            return this;
        },

        isNotIdenticalTo: function (expected) {
            this.generator.assertionsCount += 1;

            if(this.value === expected) {
                this.fail(this.locale._("$[1] is identical to $[2]", this.value, expected));
            }

            return this;
        },

        isTruthy: function () {
            this.generator.assertionsCount += 1;

            if(this.value == false) {
                this.fail(this.locale._("$[1] is not true", this.value));
            }

            return this;
        },

        isFalsy: function () {
            this.generator.assertionsCount += 1;

            if(this.value == true) {
                this.fail(this.locale._("$[1] is not false", this.value));
            }

            return this;
        },

        isEmpty: function () {
            this.generator.assertionsCount += 1;

            if(this.length > 0) {
                this.fail(this.locale._("$[1] is not empty", this.value));
            }

            return this;
        },

        isNotEmpty: function () {
            this.generator.assertionsCount += 1;

            if(this.length === 0) {
                this.fail(this.locale._("$[1] is empty", this.value));
            }

            return this;
        }
    }
);
