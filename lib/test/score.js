var score = module.exports = function score() {
        this.failures = [];
        this.errors = [];
        this.exceptions = [];
        this.methods = 0;
        this.failedMethods = 0;
        this.passed = true;
    },
    priv = {
        add: function(type, value) {
            this[type][this[type].length] = value;

            return this;
        }
    };

score.prototype = {
    addMethod: function() {
        this.methods++;

        return this;
    },

    addFailedMethod: function() {
        this.failedMethods++;
        this.passed = false;

        return this;
    },

    addFailure: function(failure) {
        return priv.add.apply(this, [ 'failures', failure ]).addFailedMethod();
    },

    addException: function(exception) {
        return priv.add.apply(this, [ 'exceptions', exception ]).addFailedMethod();
    },

    addError: function(error) {
        return priv.add.apply(this, [ 'errors', error ]).addFailedMethod();
    }
};
