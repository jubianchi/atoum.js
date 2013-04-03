(function () {
    "use strict";

    var extend = require('node.extend'),
        underscore = require('underscore'),
        asserter = require('../asserter'),
        exception = require('../asserter/exception'),
        callback = module.exports = function callback(generator) {
            asserter.call(this, generator);
        };

    callback.prototype = new asserter();
    callback.prototype.constructor = undefined;
    callback.prototype = extend(
        callback.prototype,
        {
            setWith: function (value) {
                this.value = value;

                return this.check();
            },

            check: function () {
                if(typeof this.value !== 'function') {
                    this.fail('%s is not a callback', this.value);
                }

                return this;
            },

            wasCalled: function () {
                this.generator.assertionsCount += 1;

                if(false === this.value.controller.wasRun) {
                    this.fail('Callback was not called');
                }

                return this;
            },

            wasNotCalled: function () {
                this.generator.assertionsCount += 1;

                if(this.value.controller.wasRun) {
                    this.fail('Callback was called');
                }

                return this;
            },

            withoutArgument: function () {
                var actual = underscore.values(this.value.controller.args);

                this.generator.assertionsCount += 1;

                if(actual.length > 0) {
                    this.fail('Callback was not called without argument: %s', actual);
                }

                return this;
            },

            withArguments: function (expected) {
                var actual = this.value.controller.args;

                this.generator.assertionsCount += 1;

                if(underscore.intersection(expected, actual) === expected) {
                    this.fail('Callback was not called with arguments %s: %s', expected, actual);
                }

                return this;
            }
        }
    );
}());
