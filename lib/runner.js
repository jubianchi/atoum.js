"use strict";

var fs = require('fs'),
    path = require('path'),
    dispatcher = require('events').EventEmitter,
    underscore = require('underscore'),
    atoum = require('./atoum'),
    test = require('./test'),
    score = require('./score'),
    runner = module.exports = function runner(generator) {
        this.generator = generator;
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
            if(typeof this.dialog === 'undefined') {
                this.dialog = (readline || require('readline')).createInterface({
                    input: process.stdin,
                    output: process.stdout
                });
            }
        } else {
            if(typeof this.dialog !== 'undefined') {
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
        var self = this;

        this.dispatcher.emit('runnerStart', this);

        underscore.each(
            this.getTests(path),
            function (test) {
                this.score.addTest(test.run());
            },
            this
        );

        this.dispatcher.emit('runnerStop', this);

        if(true === this.loop) {
            this.dialog.question(
                'Press <enter> to reexecute or any other key and <enter> to quit...\n',
                function (answer) {
                    if(!answer) {
                        self.generator.reset();
                        self.score.reset();

                        self.run(path);
                    } else {
                        self.exit();
                    }
                });
        } else {
            this.exit();
        }
    },

    exit: function () {
        if(typeof this.dialog !== 'undefined') {
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
