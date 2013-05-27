"use strict";

require("../..")(module);

var extend = require("node.extend"),
    underscore = require('underscore'),
    util = require('util'),
    Variable = require("./variable"),
    Exception = require("../asserter/object/exception"),
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
            if(this.compare(expected, this.value, false) === false) {
                this.fail(this.locale._("$[1] is not equal to $[2]", this.value, expected), expected, this.value);
            }

            return this.pass();
        },

        isNotEqualTo: function(expected) {
            try {
                this.isEqualTo(expected);

                this.fail(this.locale._("$[1] is equal to $[2]", this.value, expected));
            } catch(exception) { }

            return this.pass();
        },

        isIdenticalTo: function(expected) {
            if(this.compare(expected, this.value, true) === false) {
                this.fail(this.locale._("$[1] is not identical to $[2]", this.value, expected), expected, this.value);
            }

            return this.pass();
        },

        isNotIdenticalTo: function(expected) {
            try {
                this.isIdenticalTo(expected);
            } catch(exception) {
                return this.pass()
            }

            this.fail(this.locale._("$[1] is identical to $[2]", this.value, expected));

            return this;
        },

        compare: function(expected, value, strict) {
            if(strict === false) {
                var p;
                for(p in value) {
                    if(typeof expected[p] === "undefined" && typeof value[p] !== "undefined") {
                        return false;
                    }
                }

                for(p in value) {
                    if (value[p]) {
                        switch(typeof value[p]) {
                            case "object":
                                if (!this.compare(expected[p], value[p], strict)) {
                                    return false;
                                }
                                break;
                            case "function":
                                if (typeof expected[p] === "undefined" || value[p].toString() != expected[p].toString()) {
                                    return false;
                                }
                                break;
                            default:
                                if(value[p] != expected[p]) {
                                    return false;
                                }
                        }
                    } else {
                        if(expected[p]) {
                            return false;
                        }
                    }
                }

                for(p in expected) {
                    if(typeof value[p] === "undefined" && typeof expected[p] !== "undefined") {
                        return false;
                    }
                }

                return true;
            } else {
                return value === expected;
            }
        },

        fail: function (message, reference, data) {
            var args = Array.prototype.slice.call(arguments, 3);

            this.generator.assertionsCount += 1;

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
