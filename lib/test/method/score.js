"use strict";

require("../../..")(module);

var Usage = require("../score/usage"),
    Coverage = require("../score/coverage"),
    score = module.exports = function score() {
        this.duration = 0;
        this.usage = new Usage();
        this.coverage = new Coverage();
        this.passed = true;
        this.assertions = 0;
        this.failure = undefined;
        this.exception = undefined;
    };

score.prototype = {
    addFailure: function (failure) {
        if(typeof failure.toString === "function") {
            failure.message = failure.toString();
        }

        return this.add.apply(this, [ "failure", failure ]);
    },

    addException: function (exception) {
        return this.add.apply(this, [ "exception", exception ]);
    },

    addSkipped: function (exception) {
        this.skipped = exception;

        return this;
    },

    setDuration: function (duration) {
        this.duration = duration;

        return this;
    },

    setUsage: function (usage) {
        this.usage.addFromStat(usage);

        return this;
    },

    setCoverage: function(coverage) {
        this.coverage.addFromStat(coverage);

        return this;
    },

    add: function (type, value) {
        this[type] = value;
        this.passed = false;

        return this;
    }
};
