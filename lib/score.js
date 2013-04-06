"use strict";

var underscore = require('underscore'),
    usage = require('./test/score/usage'),
    score = module.exports = function score() {
        this.reset();
    };

score.prototype = {
    reset: function () {
        this.tests = [];
        this.passedTests = 0;
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
        this.failures += underscore.size(test.score.failures);
        this.errors += underscore.size(test.score.errors);
        this.exceptions += underscore.size(test.score.exceptions);
        this.methods += test.score.methods;
        this.failedMethods += test.score.failedMethods;
        this.duration += test.score.duration;

        this.passed = (this.passed && (typeof test.score.passed === 'undefined' ? true : test.score.passed));
        if(false === test.score.passed) {
            this.failedTests += 1;
        } else {
            this.passedTests += 1;
        }

        this.usage.addFromStat(test.score.usage.stat);

        return this;
    }
};
