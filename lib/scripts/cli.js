"use strict";

require("../..")(module);

var extend = require("node.extend"),
    util = require("util"),
    fs = require("fs"),
    color = require("cli-color"),
    Script = require("../script"),
    cli = module.exports = function cli(console) {
        Script.call(this);

        this.console = (console || require("optimist"));
        this.definition = {};

        this
            .addOption("help", {
                alias : "h",
                description: "Display this help message",
                type: "boolean"
            })
            .addOption("directory", {
                alias: "d",
                description: "Test directory",
                default: [],
                type: "string",
                check: function(args) {
                    if(typeof args.directory === 'string') {
                        args.directory = [ args.directory ];
                    }

                    args.directory.forEach(function(directory) {
                        if(fs.existsSync(directory) === false) {
                            throw new Error(util.format(color.red("Directory '%s' does not exist"), directory));
                        }
                    });
                }
            })
            .addOption("file", {
                alias: "f",
                description: "Test file",
                default: [],
                type: "string",
                check: function(args) {
                    if(typeof args.file === 'string') {
                        args.file = [ args.file ];
                    }

                    args.file.forEach(function(file) {
                        if(fs.existsSync(file) === false) {
                            throw new Error(util.format(color.red("File '%s' does not exist"), file));
                        }
                    });
                }
            })
            .addOption("xunit", {
                description: "Enable xUnit report",
                type: "boolean",
                default: false
            })
            .addOption("xunit-output", {
                description: "Path to xUnit report file",
                default: "xunit.xml",
                type: "string"
            })
            .addOption("coverage", {
                description: "Enable code coverage report",
                type: "boolean",
                default: false
            })
            .addOption("coverage-dir", {
                description: "Path to sources to instrument",
                default: "lib",
                type: "string",
                check: function(args) {
                    if(args.coverage) {
                        if(typeof args["coverage-dir"] !== "undefined" && fs.existsSync(args["coverage-dir"]) === false) {
                            throw new Error(util.format(color.red("Directory '%s' does not exist"), args["coverage-dir"]));
                        }
                    }
                }
            })
            .addOption("inline", {
                description: "Use inline engine instead of concurrent",
                boolean: true
            })
        ;
    };

cli.prototype = new Script();
cli.prototype.constructor = cli;
cli.prototype = extend(
    cli.prototype,
    {
        run: function(process) {
            var argv = this.argv();

            if(argv.help) {
                this.showHelp();

                return 0;
            }

            if(argv.inline) {
                this.useInlineEngine();
            } else {
                this.useConcurrentEngine();
            }

            if(argv.xunit) {
                this.enableXunit(argv["xunit-output"]);
            }

            if(argv.coverage) {
                this.enableCoverage(argv["coverage-dir"]);
            }

            if(typeof argv.directory === "string") {
                argv.directory = [ argv.directory ];
            }
            argv.directory.forEach(function(directory) { this.addDirectory(directory); }, this);

            if(typeof argv.file === "string") {
                argv.file = [ argv.file ];
            }
            argv.file.forEach(function(file) { this.addFile(file); }, this);

            return Script.prototype.run.call(this, process);
        },

        showHelp: function() {
            this.argv();

            this.console.showHelp();

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
        },

        setReports: function (runner, process) {
            var Cli = require("../reports/cli");

            runner.addReport(new Cli(process.stdout));

            return Script.prototype.setReports.apply(this, [ runner, process ]);
        }
    }
);
