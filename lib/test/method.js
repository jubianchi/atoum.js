"use strict";

require("../..")(module);

var microtime = require("microtime-x"),
    Writable = require("stream").Writable,
    Score = require("./method/score"),
    Failure = require("../asserter/exception"),
    Skipped = require("./method/exception"),
    method = module.exports = function method(name, test, method) {
        this.name = name;
        this.test = test;
        this.method = method;

        this.reset();
    };

method.prototype = {
    reset: function() {
        this.score = new Score();

        return this;
    },

    run: function (global) {
        var usage = process.memoryUsage(),
            start = microtime(),
            coverage,
            consolelog = console.log,
            procout = process.stdout.write,
            procend = process.stdout.end,
            self = this;

        process.stdout.write = process.stdout.end = function(chunk) {
            self.score.addOutput(chunk);
        };

        try {
            this.method.call(this.test);
        } catch(exception) {
            switch(true) {
                case (exception instanceof Failure):
                    this.score.addFailure(exception);
                    break;

                case (exception instanceof Skipped):
                    this.score.addSkipped(exception);
                    break;

                default:
                    exception.stack = (exception.stack || "").split("\n").slice(1).join("\n");
                    this.score.addException(exception);
                    break;
            }
        }
        process.stdout.write = procout;
        process.stdout.end = procend
        console.log = consolelog;

        this.score
            .setDuration((microtime() - start) / Math.pow(10, 6))
            .setUsage((function (before) {
                var after = process.memoryUsage(),
                    key;

                for(key in after) {
                    if(after.hasOwnProperty(key)) {
                        before[key] = ((after[key] - (before[key] || 0)) / 1024);
                    }

                    before[key] = ((before[key] || 0) > 0 ? (before[key] || 0) : 0);
                }

                return before;
            }(usage)))
        ;

        coverage = (global ? global._$jscoverage : undefined);
        if(typeof coverage !== "undefined") {
            this.score.setCoverage(coverage);
        }

        return this;
    }
};
