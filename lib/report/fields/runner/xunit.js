"use strict";

var path = require("path"),
    underscore = require("underscore"),
    extend = require("node.extend"),
    field = require("../../field"),
    xunit = module.exports = function xunit() {
        field.call(this, [ "runnerStop" ]);
    };

xunit.prototype = new field();
xunit.prototype.constructor = xunit;
xunit.prototype = extend(
    xunit.prototype,
    {
        toString: function () {
            var runner = this.value[0],
                xml = "<testsuites>\n",
                test,
                method,
                score,
                methodScore,
                suites = 0;

            for(test in runner.score.tests) {
                score = runner.score.tests[test];

                xml = xml.concat("\t<testsuite ")
                    .concat("id=\"" + suites++ + "\" ")
                    .concat("name=\"" + path.basename(test, ".js") + "\" ")
                    .concat("package=\"" + path.dirname(test) + "\" ")
                    .concat("time=\"" + score.duration + "\" ")
                    .concat("tests=\"" + underscore.size(score.methods) + "\" ")
                    .concat("failures=\"" + score.failures + "\" ")
                    .concat("errors=\"" + (score.errors + score.exceptions) + "\" ")
                    .concat("skipped=\"0\" ")
                    .concat("timestamp=\"" + new Date().toISOString().split(".")[0] + "\" ")
                    .concat("hostname=\"localhost\" ")
                    .concat(">\n");

                for(method in score.methods) {
                    if(score.methods.hasOwnProperty(method)) {
                        methodScore = score.methods[method];

                        xml = xml.concat("\t\t<testcase ")
                            .concat("name=\"" + method + "\" ")
                            .concat("classname=\"" + path.basename(test, ".js") + "\" ")
                            .concat("time=\"" + methodScore.duration + "\" ")
                            .concat(">\n");

                        if(typeof methodScore.failure !== "undefined") {
                            xml = xml.concat("\t\t\t<failure ")
                                .concat("type=\"" + methodScore.failure.asserter.constructor.name + "\" ")
                                .concat("message=\"" + methodScore.failure.message + "\" ")
                                .concat("></failure>\n");
                        }

                        if(typeof methodScore.exception !== "undefined") {
                            xml = xml.concat("\t\t\t<error ")
                                .concat("type=\"" + methodScore.exception.name + "\" ")
                                .concat("message=\"" + methodScore.exception.message + "\" ")
                                .concat("></error>\n");
                        }

                        xml = xml.concat("\t\t</testcase>\n");
                    }
                }

                xml = xml.concat("\t</testsuite>\n");
            }

            xml = xml.concat("</testsuites>\n");

            return xml;
        }
    }
);
