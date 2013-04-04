"use strict";

var fs = require('fs'),
    dispatcher = require('events').EventEmitter,
    readline = require('readline'),
    underscore = require('underscore'),
    atoum = require('./atoum'),
    test = require('./test'),
    score = require('./score'),
    runner = module.exports = function runner(report, generator) {
        this.generator = generator;
        this.loop = false;
        this.score = new score();
        this.dispatcher = new dispatcher();
        this.report = report.register(this.dispatcher);
        this.dialog = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return this;
    },
    priv = {
        loadTests: function (directory, files) {
            var entries = fs.readdirSync(directory);

            files = files || [];

            underscore.each(
                entries,
                function (value) {
                    var path = directory + '/' + value;

                    if(fs.statSync(path).isDirectory()) {
                        priv.loadTests(path, files);
                    } else {
                        files.push(path);
                    }
                }
            );

            return files;
        }
    };

runner.prototype = {
    setLoop: function (enable) {
        this.loop = enable;

        return this;
    },

    run: function (path) {
        var self = this,
            files = priv.loadTests(path);

        this.dispatcher.emit('runnerStart', this);

        underscore.each(
            files,
            function (value) {
                var unit = new test(value, this.dispatcher);

                this.generator.injectInto(unit).run(this.stdout);
                this.score.addTest(unit);
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
        this.dialog.close();
    }
};
