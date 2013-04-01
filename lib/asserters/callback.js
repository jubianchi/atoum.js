var callback = module.exports = function callback(generator) {
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

    wasRun: function() {
        this.generator.assertionsCount++;

        if(false === this.value.controller.wasRun) {
            this.fail('Callback was not run');
        }

        return this;
    },

    wasNotRun: function() {
        this.generator.assertionsCount++;

        if(this.value.controller.wasRun) {
            this.fail('Callback was run');
        }

        return this;
    },

    fail: function(message) {
        var error = new Error(message);
        error.name = 'Failure';

        throw error;
    }
};