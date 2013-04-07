"use strict";

var usage = require('../score/usage'),
    score = module.exports = function score() {
        this.duration = 0;
        this.usage = new usage();
        this.passed = true;
    },
    priv = {
        add: function (type, value) {
            this[type] = value;
            this.passed = false;

            return this;
        }
    };

score.prototype = {
    addFailure: function (failure) {
        return priv.add.apply(this, [ 'failure', failure ]);
    },

    addException: function (exception) {
        return priv.add.apply(this, [ 'exception', exception ]);
    },

    setDuration: function (duration) {
        this.duration = duration;

        return this;
    },

    setUsage: function (usage) {
        this.usage.addFromStat(usage);

        return this;
    }
};
