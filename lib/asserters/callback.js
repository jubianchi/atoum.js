"use strict";

require("../..")(module);

var extend = require("node.extend"),
    underscore = require("underscore"),
    Func = require("./function"),
    callback = module.exports = function callback(generator) {
        Func.call(this, generator);

        this.locale.translations.loadTranslations(require("../../resources/locale/asserters/callback.json"));
    };

callback.prototype = new Func();
callback.prototype.constructor = callback;
callback.prototype = extend(
    callback.prototype,
    {
        wasCalled: function () {
            this.generator.assertionsCount += 1;

            if(this.value.controller.args.length === 0) {
                this.fail(this.locale._("Callback was not called"));
            }

            return this;
        },

        wasNotCalled: function () {
            this.generator.assertionsCount += 1;

            if(this.value.controller.args.length > 0) {
                this.fail(this.locale._("Callback was called"));
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
                this.fail(this.locale._("Callback was not called without argument: $[1]", actual));
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
                this.fail(this.locale._("Callback was not called with arguments $[1]: $[2]", expected, actual));
            }

            return this;
        }
    }
);
