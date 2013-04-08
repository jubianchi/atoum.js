"use strict";

var extend = require("node.extend"),
    underscore = require("underscore"),
    asserter = require("../asserter"),
    callback = module.exports = function callback(generator) {
        asserter.call(this, generator);
    };

callback.prototype = new asserter();
callback.prototype.constructor = callback;
callback.prototype = extend(
    callback.prototype,
    {
        setWith: function (value) {
            this.value = value;

            return this.check();
        },

        check: function () {
            if(typeof this.value !== "function") {
                this.fail("%s is not a callback", this.value);
            }

            return this;
        },

        wasCalled: function () {
            this.generator.assertionsCount += 1;

            if(this.value.controller.args.length === 0) {
                this.fail("Callback was not called");
            }

            return this;
        },

        wasNotCalled: function () {
            this.generator.assertionsCount += 1;

            if(this.value.controller.args.length > 0) {
                this.fail("Callback was called");
            }

            return this;
        },

        withoutArgument: function () {
            var actual = this.value.controller.args,
                found = false;

            this.generator.assertionsCount += 1;

            underscore.each(
                actual,
                function(value) {
                    if(value.length > 0) {
                        return;
                    }

                    found = true;
                }
            );

            if(found === false) {
                this.fail("Callback was not called without argument: %s", actual);
            }

            return this;
        },

        withArguments: function (expected) {
            var actual = this.value.controller.args,
                found = false;

            if(arguments.length === 1) {
                if(Object.prototype.toString.call(expected) !== "[object Array]") {
                    expected = [ expected ];
                }
            } else if(arguments.length > 1) {
                expected = underscore.values(arguments);
            }

            this.generator.assertionsCount += 1;


            underscore.each(
                actual,
                function(value) {
                    var i;

                    if(value.length !== expected.length) {
                        return;
                    }

                    for(i = 0; i < value.length; i += 1) {
                        if(value[i] != expected[i]) {
                            return;
                        }
                    }

                    found = true;
                }
            );

            if(found === false) {
                this.fail("Callback was not called with arguments %s: %s", expected, actual);
            }

            return this;
        }
    }
);
