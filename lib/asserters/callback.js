var extend = require('node.extend'),
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
        }
    }
);
