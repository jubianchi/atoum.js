"use strict";

var atoum = require("..")(module),
    fs = require("fs"),
    Includer = require("./includer"),
    Instrument = require("./includer/instrument"),
    script = module.exports = function script(console) {
        this.console = (console || require("optimist"));

        this.definition = {};
    };

script.prototype = {
    run: function() {
        var argv = this.argv(),
            runner;

        atoum.includer = (argv.coverage ? new Instrument() : new Includer()).register(module);

        if(argv.help) {
            this.showHelp();

            process.exit();
        }

        if(argv.coverage) {
            require('jscoverage').processFile(argv["coverage-dir"], argv["coverage-dir"] + "-cov", [], {});
        }

        runner = new (require("./runner"))();

        this
            .setReports(runner, argv)
            .setEngine(runner, argv)
        ;

        if(typeof argv.directory === "string") {
            argv.directory = [ argv.directory ];
        }
        argv.directory.forEach(function(directory) { runner.addDirectory(directory); });

        if(typeof argv.file === "string") {
            argv.file = [ argv.file ];
        }
        argv.file.forEach(function(file) { runner.addFile(file); });

        return runner.run();
    },

    showHelp: function() {
        this.argv();

        this.console.showHelp();

        return this;
    },

    setReports: function(runner, argv) {
        var Cli = require("./reports/cli"),
            Xunit = require("./reports/xunit"),
            Coverage = require("./reports/coverage");

        runner.addReport(new Cli(process.stdout));

        if(argv.xunit) {
            runner.addReport(new Xunit(fs.createWriteStream(argv["xunit-output"])));
        }

        if(argv.coverage) {
            runner
                .setCoverage(true)
                .addReport(
                    new Coverage(process.stdout, runner, argv["coverage-dir"])
                )
            ;
        }

        return this;
    },

    setEngine: function(runner, argv) {
        var Inline = require("./test/engines/inline");

        if(argv.inline) {
            runner.setEngine(new Inline(runner.dispatcher));
        }

        return this;
    },

    argv: function() {
        var option,
            checks = [];

        for(option in this.definition) {
            if(this.definition.hasOwnProperty(option)) {
                this.console = this.console.options(option, this.definition[option]);

                if(this.definition[option].check) {
                    checks.push(this.definition[option].check);
                }
            }
        }

        this.console = this.console.check(function(args) {
            checks.forEach(function(check) {
                check(args);
            });
        });

        return this.console.argv;
    },

    addOption: function(name, definition) {
        this.definition[name] = definition;

        return this;
    },

    getOption: function(name) {
        return this.definition[name];
    }
};
