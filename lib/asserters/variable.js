var exports = module.exports,
    variable = module.exports = function variable(test) {
        this.test = test;

        return this;
    };

variable.prototype = {
    setWith: function(value) {
        this.value = value;

        return this.check();
    },

    check: function() {
        if(typeof this.value == 'undefined') {
            this.fail('Value is undefined');
        }

        return this;
    },

    isEqualTo: function(expected) {
        if(this.value != expected) {
            this.fail(this.value + ' is not equal to ' + expected);
        }

        return this;
    },

    isNotEqualTo: function(expected) {
        if(this.value == expected) {
            this.fail(this.value + ' is equal to ' + expected);
        }

        return this;
    },

    isIdenticalTo: function(expected) {
        if(this.value !== expected) {
            this.fail(this.value + ' is not identical to ' + expected);
        }

        return this;
    },

    isNotIdenticalTo: function(expected) {
        if(this.value === expected) {
            this.fail(this.value + ' is identical to ' + expected);
        }

        return this.test;
    },

    isTruthy: function() {
        if(this.value == false) {
            this.fail(this.value + ' is not truthy');
        }

        return this.test;
    },

    isFalsy: function() {
        if(this.value == true) {
            this.fail(this.value + ' is not false');
        }

        return this.test;
    },

    fail: function(message) {
        var error = new Error(message);
        error.name = 'Failure';

        throw error;
    }
};