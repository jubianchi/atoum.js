"use strict";

var underscore = require("underscore"),
    util = require("util"),
    color = require("cli-color"),
    atoum = require("..")(),
    fs = require("fs"),
    Script = require("../lib/script");

try {
    var script = new Script()
        .addOption("help", {
            alias : "h",
            description: "Display this help message",
            type: "boolean"
        })
        .addOption("directory", {
            alias: "d",
            description: "Test directory",
            default: "tests",
            type: "string",
            check: function(args) {
                if(fs.existsSync(args.directory) === false) {
                    throw new Error(util.format(color.red("Directory '%s' does not exist"), args.directory));
                }
            }
        })
        .addOption("xunit", {
            description: "Enable xUnit report",
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

    script.run();
} catch(exception) {
    process.stderr.write(util.format(
        color.red("[%s] %s\n%s\n"),
        exception.name,
        exception.message,
        exception.stack
    ));

    process.exit(1);
}
