(function () {
    "use strict";

    var usage = require('./test/score/usage'),
        score = module.exports = function score() {
            this.reset();
        };

    score.prototype = {
        reset: function () {
            this.tests = [];
            this.failedTests = 0;
            this.failures = 0;
            this.errors = 0;
            this.exceptions = 0;
            this.methods = 0;
            this.failedMethods = 0;
            this.duration = 0;
            this.usage = new usage();
            this.passed = true;
        },

        addTest: function (test) {
            this.tests[test.class] = test.score;
            this.failures += test.score.failures.length;
            this.errors += test.score.errors.length;
            this.exceptions += test.score.exceptions.length;
            this.methods += test.score.methods;
            this.failedMethods += test.score.failedMethods;
            this.duration += test.score.duration;

            this.passed = (this.passed && (typeof test.score.passed === 'undefined' ? true : test.score.passed));
            if(false === test.score.passed) {
                this.failedTests += 1;
            }

            this.usage.addFromStat(test.score.usage.stat);

            return this;
        }
    };
}());
