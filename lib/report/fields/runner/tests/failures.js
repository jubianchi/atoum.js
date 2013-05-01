"use strict";

require("../../../../..")(module);

var extend = require("node.extend"),
    util = require("util"),
    color = require("../../../color"),
    Field = require("../../../field"),
    failures = module.exports = function failures() {
        Field.call(this, [ "runnerStop" ]);
    };

failures.prototype = new Field();
failures.prototype.constructor = failures;
failures.prototype = extend(
    failures.prototype,
    {
        toString: function () {
            var runner = this.value[0],
                test,
                method,
                str = "",
                render = function (exception, method) {
                    return util.format(
                        ">>> " + color.error("%s: %s") + "\n%s\n",
                        method,
                        exception.message,
                        exception.stack
                    );
                };

            if(runner.score.failures > 0) {
                str = util.format(
                    "> " + color.error("There were %d failures:") + "\n",
                    runner.score.failures
                );

                for(test in runner.score.tests) {
                    if(runner.score.tests.hasOwnProperty(test)) {
                        if(runner.score.tests[test].failures > 0) {
                            str = str.concat(">> " + test + "\n");

                            for(method in runner.score.tests[test].methods) {
                                if(typeof runner.score.tests[test].methods[method].failure !== "undefined") {
                                    str = str.concat(render(
                                        runner.score.tests[test].methods[method].failure,
                                        method
                                    ));
                                }
                            }
                        }
                    }
                }
            }

            return str;
        }
    }
);
