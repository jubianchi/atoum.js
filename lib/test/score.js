"use strict";

var underscore = require('underscore'),
    usage = require('./score/usage'),
    score = module.exports = function score() {
        this.methods = {};
        this.passedMethods = 0;
        this.failedMethods = 0;
        this.usage = new usage();
        this.passed = true;
        this.failures = 0;
        this.errors = [];
        this.exceptions = 0;
        this.duration = 0;
    };

score.prototype = {
    addMethod: function (method) {
        this.methods[method.name] = method.score;
        this.failures += (typeof method.score.failure === 'undefined' ? 0 : 1);
        this.exceptions += (typeof method.score.exception === 'undefined' ? 0 : 1);
        this.duration += method.score.duration;

        if(false === method.score.passed) {
            this.failedMethods += 1;
            this.passed = false;
        } else {
            this.passedMethods += 1;
        }

        this.usage.addFromStat(method.score.usage.stat);

        return this;
    },

    addError: function (error) {
        this.errors.push(error);
        this.passed = false;

        return this;
    }
};
