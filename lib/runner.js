"use strict";

var fs = require("fs"),
    path = require("path"),
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

    run: function (path, tests) {
        var self = this;

        tests = tests || this.getTests(path);
        this.generator.reset();
        this.score.reset();

        this.dispatcher.emit("runnerStart", this);

        underscore.each(
            tests,
            function (test) {
                this.score.addTest(test.reset().run());
            },
            this
        );

        this.dispatcher.emit("runnerStop", this);

        if(true === this.loop) {
            this.dialog.question(
                "Press <enter> to reexecute or any other key and <enter> to quit...\n",
                function (answer) {
                    if(!answer) {
                        self.run(path, tests);
                    } else {
                        self.exit();
                    }
                });
        } else {
            this.exit();
        }
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
