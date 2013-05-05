"use strict";

require("../..")(module);

var util = require("util"),
    underscore = require("underscore"),
    extend = require("node.extend"),
    Variable = require("./variable"),
    Exception = require("../asserter/string/exception"),
    string = module.exports = function string(generator) {
        Variable.call(this, generator);

        this.locale.translations.loadTranslations(require("../../resources/locale/asserters/string.json"));
    };

string.prototype = new Variable();
string.prototype.constructor = string;
string.prototype = extend(
    string.prototype,
    {
        check: function () {
            if(typeof this.value !== "string") {
                Variable.prototype.fail.call(this, this.locale._("$[1] is not a string", this.value));
            }

            return this;
        },

        hasLength: function (expected) {
            this.generator.assertionsCount += 1;

            if(this.value.length !== expected) {
                Variable.prototype.fail.call(this, this.locale._("$[1] has not length $[2]", this.value, expected));
            }

            return this;
        },

        contains: function(expected) {
            this.generator.assertionsCount += 1;

            if(this.value.indexOf(expected) < 0) {
                Variable.prototype.fail.call(this, this.locale._("String $[1] does not contain $[2]", this.value, expected));
            }

            return this;
        },

        isEqualTo: function (expected) {
            this.generator.assertionsCount += 1;

            if(this.value != expected) {
                this.fail(
                    this.locale._("String $[1] is not equal to $[2]", this.value, expected),
                    expected,
                    this.value
                );
            }

            return this;
        },

        fail: function (message, reference, data) {
            var args = Array.prototype.slice.call(arguments, 3);

            underscore.map(
                args,
                function (arg) {
                    return util.inspect(arg);
                }
            );

            throw new Exception(
                util.format.apply(util, [ message ].concat(args)),
                this,
                reference,
                data
            );
        }
    }
);
