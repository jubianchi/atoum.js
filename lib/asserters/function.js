"use strict";

require("../..")(module);

var extend = require("node.extend"),
    Locale = require("../locale"),
    Asserter = require("../asserters/object"),
    func = module.exports = function func(generator) {
        Asserter.call(this, generator);

        this.locale = new Locale(require("../../resources/locale/asserters/function.json"));
    };

func.prototype = new Asserter();
func.prototype.constructor = func;
func.prototype = extend(
    func.prototype,
    {
        check: function () {
            if(typeof this.value !== "function") {
                this.fail(this.locale._("$[1] is not a function", this.value));
            }

            return this.pass();
        },

        hasName: function(expected) {
            if(this.value.name !== expected) {
                this.fail(this.locale._("$[1] is not equal to $[2]", this.value.name, expected));
            }

            return this.pass();
        },

        isIdenticalTo: function (expected) {
            if(this.value !== expected) {
                this.fail(this.locale._("$[1] is not identical to $[2]", this.value, expected));
            }

            return this.pass();
        }
    }
);
