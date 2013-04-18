"use strict";

require("../..")(module);

var extend = require("node.extend"),
    Asserter = require("../asserter"),
    variable = module.exports = function variable(generator) {
        Asserter.call(this, generator);
    };

variable.prototype = new Asserter();
variable.prototype.constructor = variable;
variable.prototype = extend(
    variable.prototype,
    {
        check: function () {
            if(typeof this.value === "undefined") {
                this.fail("Value is undefined");
            }

            return this;
        },

        isEqualTo: function (expected) {
            this.generator.assertionsCount += 1;

            if(this.value != expected) {
                this.fail("%s is not equal to %s", this.value, expected);
            }

            return this;
        },

        isNotEqualTo: function (expected) {
            this.generator.assertionsCount += 1;

            if(this.value == expected) {
                this.fail("%s is equal to %s", this.value, expected);
            }

            return this;
        },

        isIdenticalTo: function (expected) {
            this.generator.assertionsCount += 1;

            if(this.value !== expected) {
                this.fail("%s is not identical to %s", this.value, expected);
            }

            return this;
        },

        isNotIdenticalTo: function (expected) {
            this.generator.assertionsCount += 1;

            if(this.value === expected) {
                this.fail("%s is identical to %s", this.value, expected);
            }

            return this;
        },

        isTruthy: function () {
            this.generator.assertionsCount += 1;

            if(this.value == false) {
                this.fail("%s is not true", this.value);
            }

            return this;
        },

        isFalsy: function () {
            this.generator.assertionsCount += 1;

            if(this.value == true) {
                this.fail("%s is not false", this.value);
            }

            return this;
        },

        isEmpty: function () {
            this.generator.assertionsCount += 1;

            if(this.length > 0) {
                this.fail("%s is not empty", this.value);
            }

            return this;
        },

        isNotEmpty: function () {
            this.generator.assertionsCount += 1;

            if(this.length === 0) {
                this.fail("%s is empty", this.value);
            }

            return this;
        }
    }
);
