"use strict";

var fs = require("fs"),
    path = require("path"),
    microtime = require("microtime-x"),
    Dispatcher = require("events").EventEmitter,
    underscore = require("underscore"),
    test = require("./test"),
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
        this.reports = [];
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
            start;

        this.score.reset();

        this.dispatcher.emit("runnerStart", this);
        start = microtime();

        this.dispatcher.on('testStop', function(test) {
            self.score.addTest(test);

            if(tests.length === 0) {
                self.score.runningDuration = (microtime() - start) / Math.pow(10, 6);
                self.dispatcher.emit("runnerStop", self);

                if(true === self.loop) {
                    self.dialog.question(
                        "Press <enter> to reexecute or any other key and <enter> to quit...\n",
                        function (answer) {
                            if(answer.length === 0) {
                                tests = self.getTests(path);
                                self.score.reset();

                                start = microtime();
                                self.engine.run(tests.shift().reset());
                            } else {
                                self.setLoop(false);
                            }
                        }
                    );
                }
            }

            var unit = tests.shift();
            if(unit) {
                self.engine.run(unit.reset());
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
                var testfile = path.resolve(directory, value);

                if(fs.statSync(testfile).isDirectory()) {
                    this.getTests(testfile, tests);
                } else {
                    tests.push(new test(testfile));
                }
            },
            this
        );

        return tests;
    }
};
