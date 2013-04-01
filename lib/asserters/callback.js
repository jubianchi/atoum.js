var util = require('util'),
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
            this.fail('Value is not a callback');
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
            this.fail(util.format('Callback was not called without argument: %s', util.inspect(this.value.controller.args)));
        }

        return this;
    },

    withArguments: function(expected) {
        this.generator.assertionsCount++;

        if(expected !== this.value.controller.args) {
            this.fail(util.format('Callback was not called with arguments %s: %s', util.inspect(expected), util.inspect(this.value.controller.args)));
        }

        return this;
    },

    fail: function(message) {
        var error = new Error(message);
        error.name = 'Failure';

        throw error;
    }
};