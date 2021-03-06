"use strict";

require("..")(module);

var fs = require("fs"),
    path = require("path"),
    microtime = require("microtime-x"),
    Dispatcher = require("events").EventEmitter,
    underscore = require("underscore"),
    Test = require("./test"),
    Score = require("./score"),
    Concurrent = require("./test/engines/concurrent"),
    runner = module.exports = function runner(engine) {
        this.dispatcher = new Dispatcher();
        this.score = new Score();

        this.reports = [];
        this.directories = [];
        this.files = [];
        this.currentTest = undefined;
        this.currentTestMethod = undefined;

        this.setEngine(engine);
    };

runner.prototype = {
    setEngine: function(engine) {
        this.engine = (engine || new Concurrent(this.dispatcher));

        return this;
    },

    setCoverage: function(enable, directory) {
        this.coverage = enable;
        this.coveredDirectory = directory;

        return this;
    },

    addReport: function(report) {
        this.reports.push(report.register(this.dispatcher));

        return this;
    },

    addDirectory: function(directory) {
        this.directories.push(directory);

        return this;
    },

    addFile: function(file) {
        this.files.push(file);

        return this;
    },

    run: function (methods) {
        var self = this,
            tests = this.getTests(),
            start,
            test;

        this.score.reset();

        this.dispatcher.emit("runnerStart", this);
        start = microtime();

        this.dispatcher.on("testStop", function(test) {
            self.score.addTest(test);

            if(tests.length === 0) {
                self.score.runningDuration = (microtime() - start) / Math.pow(10, 6);
                self.dispatcher.emit("runnerStop", self);
            } else {
                var unit = tests.shift();

                unit.setDefaultEngine(self.engine);

                if(unit) {
                    unit.run(methods);
                }
            }
        });

        this.dispatcher.on("testStart", function(test) {
            self.currentTest = test;
        });

        this.dispatcher.on("testMethodStart", function(method) {
            self.currentTestMethod = method;
        });

        test = tests.shift();
        if(test) {
            test.run(methods);
        } else {
            self.dispatcher.emit("runnerStop", self);
        }
    },

    getTests: function() {
        var self = this,
            tests = [];

        this.directories.forEach(function(directory) {
            tests = tests.concat(self.getTestsFromDirectory(directory));
        });

        this.files.forEach(function(file) {
            tests.push(self.getTest(path.resolve(process.cwd(), file)));
        });

        return tests;
    },

    getTestsFromDirectory: function(directory, tests) {
        var entries = fs.readdirSync(directory);

        tests = tests || [];

        underscore.each(
            entries,
            function (value) {
                var testfile = path.resolve(directory, value);

                if(fs.statSync(testfile).isDirectory()) {
                    this.getTestsFromDirectory(testfile, tests);
                } else {
                    if(path.extname(testfile) === ".js") {
                        tests.push(this.getTest(testfile));
                    }
                }
            },
            this
        );

        return tests;
    },

    getTest: function(file) {
        var test = new Test(file, this.dispatcher);

        test.setCoverage(this.coverage, this.coveredDirectory);

        return test;
    },

    getCurrentTest: function() {
        return this.currentTest;
    },

    getCurrentTestMethod: function() {
        return this.currentTestMethod;
    }
};
