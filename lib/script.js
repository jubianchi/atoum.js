"use strict";

var atoum = require("..")(module),
    fs = require("fs"),
    Instrument = require("./includer/instrument"),
    script = module.exports = function script() {
        this
            .disableXunit()
            .disableCoverage()
            .useConcurrentEngine()
        ;

        this.directories = [];
        this.files = [];
        this.methods = [];
    };

script.prototype = {
    run: function (process, callback) {
        var runner;

        if(this.coverageEnabled) {
            atoum.includer = new Instrument(this.coveredDirectory);
            require("jscoverage").processFile(this.coveredDirectory, this.coveredDirectory.concat("-cov"), [], {});
        }

        atoum.includer.register(module);

        runner = new (require("./runner"))();

        this
            .setReports(runner, process)
            .setEngine(runner)
        ;

        this.directories.forEach(function(directory) { runner.addDirectory(directory); });
        this.files.forEach(function(file) { runner.addFile(file); });

        if(typeof callback !== "undefined") {
            runner.dispatcher.on("runnerStop", callback);
        }

        return runner.run(this.methods);
    },

    enableCoverage: function (directories) {
        this.coverageEnabled = true;
        this.coveredDirectory = directories || "lib";

        return this;
    },

    disableCoverage: function () {
        this.coverageEnabled = false;
        this.coveredDirectory = "";

        return this;
    },

    enableXunit: function (output) {
        this.xunitEnabled = true;
        this.xunitOutput = output || "xunit.xml";

        return this;
    },

    disableXunit: function () {
        this.xunitEnabled = false;
        this.xunitOutput = "";

        return this;
    },

    useConcurrentEngine: function () {
        this.usingConcurrentEngine = true;
        this.usingInlineEngine = false;

        return this;
    },

    useInlineEngine: function () {
        this.usingInlineEngine = true;
        this.usingConcurrentEngine = false;

        return this;
    },

    setReports: function (runner, process) {
        var Xunit = require("./reports/xunit"),
            Coverage = require("./reports/coverage");

        if(this.xunitEnabled) {
            runner.addReport(new Xunit(fs.createWriteStream(this.xunitOutput)));
        }

        if(this.coverageEnabled) {
            runner
                .setCoverage(true, this.coveredDirectory)
                .addReport(
                    new Coverage(process.stdout, this.coveredDirectory)
                )
            ;
        }

        return this;
    },

    setEngine: function (runner) {
        var Inline = require("./test/engines/inline"),
            Concurrent = require("./test/engines/concurrent");

        if(this.usingInlineEngine) {
            runner.setEngine(new Inline(runner.dispatcher));
        }

        if(this.usingConcurrentEngine) {
            runner.setEngine(new Concurrent(runner.dispatcher));
        }

        return this;
    },

    addDirectory: function (directory) {
        this.directories.push(directory);

        return this;
    },

    addFile: function (file) {
        this.files.push(file);

        return this;
    },

    addMethods: function (methods) {
        this.methods.concat(methods);

        return this;
    }
};
