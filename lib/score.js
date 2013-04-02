var score = module.exports = function score() {
        this.reset();
    };

score.prototype = {
    reset: function() {
        this.tests = [];
        this.failedTests = 0;
        this.failures = 0;
        this.errors = 0;
        this.exceptions = 0;
        this.methods = 0;
        this.failedMethods = 0;
        this.duration = 0;
        this.usage = {};
        this.passed = true;
    },

    addTest: function(test) {
        this.tests[test.class] = test.score;
        this.failures += test.score.failures.length;
        this.errors += test.score.errors.length;
        this.exceptions += test.score.exceptions.length;
        this.methods += test.score.methods;
        this.failedMethods += test.score.failedMethods;
        this.duration += test.score.duration;

        this.passed = (this.passed && (typeof test.score.passed === 'undefined' ? true : test.score.passed));
        if(false === test.score.passed) {
            this.failedTests++;
        }

        for(var key in test.score.usage) {
            if(test.score.usage.hasOwnProperty(key)) {
                this.usage[key] = ((this.usage[key] || 0) + test.score.usage[key]);
            }
        }

        return this;
    }
};
