var util = require('util'),
    _ = require('underscore'),
    exception = require('../asserter/exception'),
    callback = module.exports = function callback(generator) {
        this.generator = generator;

        return this;
    };

callback.prototype = {
    setWith: function(value) {
        this.value = value;

        return this.check();
    },

    check: function() {
        if(typeof this.value !== 'function') {
            this.fail('%s is not a callback', this.value);
        }

        return this;
    },

    wasCalled: function() {
        this.generator.assertionsCount++;

        if(false === this.value.controller.wasRun) {
            this.fail('Callback was not called');
        }

        return this;
    },

    wasNotCalled: function() {
        this.generator.assertionsCount++;

        if(this.value.controller.wasRun) {
            this.fail('Callback was called');
        }

        return this;
    },

    withoutArgument: function() {
        this.generator.assertionsCount++;

        if([] !== this.value.controller.arguments) {
            this.fail('Callback was not called without argument: %s', this.value.controller.args);
        }

        return this;
    },

    withArguments: function(expected) {
        this.generator.assertionsCount++;

        if(expected !== this.value.controller.args) {
            this.fail('Callback was not called with arguments %s: %s', expected, this.value.controller.args);
        }

        return this;
    },

    fail: function() {
        var message = arguments[0],
            args = Array.prototype.slice.call(arguments, 1);

        _.map(
            args,
            function(arg) {
                return util.inspect(arg);
            }
        );

        throw new exception(util.format.apply(util, [ message ].concat(args)), this);
    }
};