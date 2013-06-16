"use strict";

require("../../../..")(module);

var path = require("path"),
    underscore = require("underscore"),
    extend = require("node.extend"),
    Field = require("../../field"),
    xml = require("xmlbuilder"),
    xunit = module.exports = function xunit() {
        Field.call(this, [ "runnerStop" ]);
    };

xunit.prototype = new Field();
xunit.prototype.constructor = xunit;
xunit.prototype = extend(
    xunit.prototype,
    {
        end: function (elem) {
            return elem.end({
                pretty: true,
                indent: "\t"
            });
        },

        addSuite: function (root, test, score, index) {
            var testsuite = root.ele("testsuite", {
                id: index,
                name: path.basename(test, ".js"),
                package: path.dirname(test),
                time: score.duration,
                tests: underscore.size(score.methods),
                failures: score.failures,
                errors: (score.errors + score.exceptions),
                skipped: score.skipped,
                timestamp: new Date().toISOString().split(".")[0],
                hostname: "localhost"
            });

            for(var method in score.methods) {
                if(score.methods.hasOwnProperty(method)) {
                    this.addCase(testsuite, test, score.methods[method], method);
                }
            }

            return this.end(testsuite);
        },

        addCase: function(suite, test, score, method) {
            var testcase = suite.ele("testcase", {
                name: method,
                classname: path.basename(test, ".js"),
                time: score.duration
            });

            if(typeof score.failure !== "undefined") {
                this.addFailure(testcase, score.failure.asserter.constructor.name, score.failure.message);
            }

            if(typeof score.exception !== "undefined") {
                this.addFailure(testcase, score.exception.name, score.exception.message, "error");
            }

            if(typeof score.skipped !== "undefined") {
                this.addSkip(testcase, score.skipped.name, score.skipped.message);
            }

            return this.end(testcase);
        },

        addFailure: function(testcase, name, message, type) {
            return this.end(
                testcase.ele(type || "failure", {
                    type: name,
                    message: message
                })
            );
        },

        addSkip: function(testcase, name, message) {
            return this.end(
                testcase.ele(
                    "skipped",
                    {
                        type: name
                    },
                    message
                )
            );
        },

        toString: function () {
            var runner = this.value[0],
                testsuites = xml.create("testsuites"),
                test,
                suites = 0;

            for(test in runner.score.tests) {
                if(runner.score.tests.hasOwnProperty(test)) {
                    suites += 1;

                    this.addSuite(testsuites, test, runner.score.tests[test], suites);
                }
            }

            return this.end(testsuites).toString();
        }
    }
);
