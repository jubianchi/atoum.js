"use strict";

require("../..")(module);

var extend = require("node.extend"),
    util = require("util"),
    fs = require("fs"),
    color = require("cli-color"),
    Script = require("../script"),
    grunt = module.exports = function cli(options) {
        Script.call(this);

        this.options = options || {};
    };

grunt.prototype = new Script();
grunt.prototype.constructor = grunt;
grunt.prototype = extend(
    grunt.prototype,
    {
        run: function(process, callback) {
            if(this.options.suites.default.inline) {
                this.useInlineEngine();
            } else {
                this.useConcurrentEngine();
            }

            if(this.options.suites.default.xunit) {
                this.enableXunit(this.options.suites.default.xunit);
            }

            if(this.options.suites.default.coverage) {
                this.enableCoverage(this.options.suites.default.coverage);
            }

            var directories = this.options.suites.default.directory;
            if(typeof directories === "string") {
                directories = [ directories ];
            }
            directories.forEach(function(directory) { this.addDirectory(directory); }, this);

            var files = this.options.suites.default.file;
            if(typeof files === "string") {
                files = [ files ];
            }
            files.forEach(function(file) { this.addFile(file); }, this);

            return Script.prototype.run.apply(this, [ process, callback ]);
        },

        setReports: function (runner, process) {
            var Cli = require("../reports/light");

            runner.addReport(new Cli(process.stdout));

            return Script.prototype.setReports.apply(this, [ runner, process ]);
        }
    }
);
