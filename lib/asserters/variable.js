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
            this.test.fail('Value is undefined');
        }

        return this;
    },

    isEqualTo: function(expected) {
        if(this.value != expected) {
            this.test.fail(this.value + ' is not equal to ' + expected);
        }

        return this.test;
    },

    isNotEqualTo: function(expected) {
        if(this.value == expected) {
            this.test.fail(this.value + ' is equal to ' + expected);
        }

        return this.test;
    },

    isIdenticalTo: function(expected) {
        if(this.value !== expected) {
            this.test.fail(this.value + ' is not identical to ' + expected);
        }

        return this.test;
    },

    isNotIdenticalTo: function(expected) {
        if(this.value === expected) {
            this.test.fail(this.value + ' is identical to ' + expected);
        }

        return this.test;
    },

    isTruthy: function() {
        if(this.value == false) {
            this.test.fail(this.value + ' is not truthy');
        }

        return this.test;
    },

    isFalsy: function() {
        if(this.value == true) {
            this.test.fail(this.value + ' is not false');
        }

        return this.test;
    }
};