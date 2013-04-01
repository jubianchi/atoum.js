var undefined = module.exports = function undefined(generator) {
        this.generator = generator;

        return this;
    };

undefined.prototype = {
    setWith: function(value) {
        this.value = value;

        return this.check();
    },

    check: function() {
        if(typeof this.value !== 'undefined') {
            this.fail('Value is not undefined');
        }

        return this;
    },

    fail: function(message) {
        var error = new Error(message);
        error.name = 'Failure';

        throw error;
    }
};