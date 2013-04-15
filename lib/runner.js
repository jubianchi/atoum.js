"use strict";

var fs = require("fs"),
    path = require("path"),
    microtime = require("microtime-x"),
    Dispatcher = require("events").EventEmitter,
    underscore = require("underscore"),
    Test = require("./test"),
    Score = require("./score"),
    Concurrent = require('./test/engines/concurrent'),
    Includer = require("./includer"),
    runner = module.exports = function runner(includer, engine) {
        this.dispatcher = new Dispatcher();
        this.includer = (includer || new Includer());
        this.engine = (engine || new Concurrent());
        this.score = new Score();

        this.engine.dispatcher = this.dispatcher;
        this.loop = false;
        this.coverage = false;
        this.reports = [];
    };

runner.prototype = {
    setCoverage: function(enable) {
        this.coverage = true;

        return this;
    },

    addReport: function(report) {
        this.reports.push(report.register(this.dispatcher));

        return this;
    },

    run: function (path) {
        var self = this,
            tests = this.getTests(path),
            start;

        this.score.reset();

        this.dispatcher.emit("runnerStart", this);
        start = microtime();

        this.dispatcher.on('testStop', function(test) {
            self.score.addTest(test);

            if(tests.length === 0) {
                self.score.runningDuration = (microtime() - start) / Math.pow(10, 6);
                self.dispatcher.emit("runnerStop", self);
            } else {
                var unit = tests.shift();
                if(unit) {
                    self.engine.run(unit.reset());
                }
            }
        });

        this.engine.run(tests.shift().reset());
    },

    getTests: function(directory, tests) {
        var entries = fs.readdirSync(directory);

        tests = tests || [];

        underscore.each(
            entries,
            function (value) {
                var testfile = path.resolve(directory, value),
                    test;

                if(fs.statSync(testfile).isDirectory()) {
                    this.getTests(testfile, tests);
                } else {
                    test = new Test(testfile);
                    test.setCoverage(this.coverage);
                    tests.push(test);
                }
            },
            this
        );

        return tests;
    }
};
