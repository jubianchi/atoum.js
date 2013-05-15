"use strict";

require("../..")(module);

var extend = require("node.extend"),
    underscore = require('underscore'),
    Variable = require("./variable"),
    object = module.exports = function object(generator) {
        Variable.call(this, generator);

        this.locale.translations.loadTranslations(require("../../resources/locale/asserters/object.json"));
    };

object.prototype = new Variable();
object.prototype.constructor = object;
object.prototype = extend(
    object.prototype,
    {
        check: function () {
            var type = Object.prototype.toString.call(this.value);

            if(typeof this.value !== "object" || type === "[object Array]") {
                this.fail(this.locale._("$[1] is not an object", this.value));
            }

            return this.pass();
        },

        isInstanceOf: function (expected) {
            if(false === (this.value instanceof expected)) {
                this.fail(this.locale._("[object $[1]] is not an instance of $[2]", this.value.constructor.name, expected.name));
            }

            return this.pass();
        },

        isNotInstanceOf: function (expected) {
            if(this.value instanceof expected) {
                this.fail(this.locale._("[object $[1]] is an instance of $[2]", this.value.constructor.name, expected.name));
            }

            return this.pass();
        },

        hasMember: function (expected) {
            if(false === this.value.hasOwnProperty(expected)) {
                this.fail(this.locale._("[object $[1]] does not have member $[1]"), this.value.constructor.name, expected);
            }

            return this.pass();
        },

        hasMethod: function (expected) {
            if(typeof this.value[expected] === "undefined" || typeof this.value[expected] !== "function") {
                this.fail(this.locale._("[object $[1]] does not have method $[2]", this.value.constructor.name, expected));
            }

            return this.pass();
        },

        hasLength: function (expected) {
            if(Object.keys(this.value).length !== expected) {
                this.fail(this.locale._("Object($[1]) has not length $[2]", this.value.length, expected));
            }

            return this.pass();
        },

        isEqualTo: function(expected) {
            this.compare(expected, this.value);

            return this.pass();
        },

        isNotEqualTo: function(expected) {
            try {
                this.isEqualTo(expected);

                this.fail(this.locale._("$[1] is equal to $[2]", this.value, expected));
            } catch(exception) { }

            return this.pass();
        },

        compare: function(expected, value) {
            var prop;

            if(Object.keys(expected).length !== Object.keys(value).length) {
                this.fail(this.locale._("$[1] is not equal to $[2]", value, expected));
            }

            for(prop in expected) {
                if(expected.hasOwnProperty(prop)) {
                    if(value.hasOwnProperty(prop)) {
                        if(typeof value[prop] === 'object') {
                            this.compare(value[prop], expected[prop]);
                        } else {
                            if(value[prop] != expected[prop]) {
                                this.fail(this.locale._("$[1] is not equal to $[2]", value, expected));
                            }
                        }
                    }
                }
            }
        }
    }
);
