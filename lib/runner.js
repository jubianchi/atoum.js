"use strict";

var fs = require("fs"),
    path = require("path"),
    microtime = require("microtime-x"),
    dispatcher = require("events").EventEmitter,
    underscore = require("underscore"),
    test = require("./test"),
    score = require("./score"),
    runner = module.exports = function runner(generator, includer) {
        this.generator = generator;
        this.includer = includer;
        this.loop = false;
        this.score = new score();
        this.dispatcher = new dispatcher();
        this.reports = [];

        return this;
    };

runner.prototype = {
    setLoop: function (enable, readline) {
        this.loop = enable;

        if(this.loop) {
            if(typeof this.dialog === "undefined") {
                this.dialog = (readline || require("readline")).createInterface({
                    input: process.stdin,
                    output: process.stdout,
                    terminal: false
                });
            }
        } else {
            if(typeof this.dialog !== "undefined") {
                this.dialog.close();
            }
        }

        return this;
    },

    addReport: function(report) {
        this.reports.push(report.register(this.dispatcher));

        return this;
    },

    run: function (path) {
        var self = this,
            tests = this.getTests(path),
            remain = tests.length,
            start;

        this.generator.reset();
        this.score.reset();

        this.dispatcher.emit("runnerStart", this);
        start = microtime();
        tests.shift().reset().run();

        this.dispatcher.on('testStop', function(test) {
            remain -= 1;

            self.score.addTest(test);

            if(remain === 0) {
                self.score.runningDuration = (microtime() - start) / Math.pow(10, 6);
                self.dispatcher.emit("runnerStop", self);

                if(true === self.loop) {
                    self.dialog.question(
                        "Press <enter> to reexecute or any other key and <enter> to quit...\n",
                        function (answer) {
                            if(!answer) {
                                tests = self.getTests(path);
                                remain = tests.length;
                                self.generator.reset();
                                self.score.reset();

                                start = microtime();
                                tests.shift().reset().run();
                            } else {
                                self.exit();
                            }
                        });
                } else {
                    self.exit();
                }
            }

            var unit = tests.shift();

            if(unit) {
                unit.reset().run();
            }
        });
    },

    exit: function () {
        if(typeof this.dialog !== "undefined") {
            this.dialog.close();
        }
    },

    getTests: function(directory, tests) {
        var entries = fs.readdirSync(directory);

        tests = tests || [];

        underscore.each(
            entries,
            function (value) {
                var testfile = path.resolve(directory, value);

                if(fs.statSync(testfile).isDirectory()) {
                    this.getTests(testfile, tests);
                } else {
                    tests.push(this.generator.injectInto(new test(testfile, this.dispatcher)));
                }
            },
            this
        );

        return tests;
    }
};
