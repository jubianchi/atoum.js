"use strict";

require("../..")(module);

var extend = require("node.extend"),
    Usage = require("./score/usage"),
    Coverage = require("./score/coverage"),
    score = module.exports = function score() {
        this.methods = {};
        this.passedMethods = 0;
        this.failedMethods = 0;
        this.usage = new Usage();
        this.coverage = new Coverage();
        this.passed = true;
        this.failures = 0;
        this.outputs = 0;
        this.errors = [];
        this.exceptions = 0;
        this.duration = 0;
        this.skipped = 0;
        this.assertions = 0;
    };

score.prototype = {
    addMethod: function (method) {
        this.methods[method.name] = method.score;
        this.failures += (typeof method.score.failure === "undefined" ? 0 : 1);
        this.outputs += (typeof method.score.output === "undefined" ? 0 : 1);
        this.exceptions += (typeof method.score.exception === "undefined" ? 0 : 1);
        this.skipped += (typeof method.score.skipped === "undefined" ? 0 : 1);
        this.duration += method.score.duration;
        this.assertions += method.score.assertions;

        if(false === method.score.passed) {
            this.failedMethods += 1;
            this.passed = false;
        } else {
            this.passedMethods += 1;
        }

        this.usage.addFromStat(method.score.usage.stat);
        this.coverage.merge(method.score.coverage);

        return this;
    },

    addError: function (error) {
        this.errors.push(error);
        this.passed = false;

        return this;
    },

    merge: function(score) {
        this.methods = extend(this.methods, score.methods || {});
        this.failures += score.failures;
        this.outputs += score.outputs;
        this.exceptions += score.exceptions;
        this.skipped += score.skipped;
        this.duration += score.duration;
        this.assertions += score.assertions;
        this.passedMethods += score.passedMethods;
        this.failedMethods += score.failedMethods;
        this.errors = this.errors.concat(score.errors || []);

        if(this.failedMethods > 0 || this.errors.length > 0) {
            this.passed = false;
        }

        for(var method in score.methods) {
            if(score.methods.hasOwnProperty(method)) {
                this.usage.addFromStat(score.methods[method].usage.stat);
                this.coverage.merge(score.methods[method].coverage);
            }
        }

        return this;
    }
};
