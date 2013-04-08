"use strict";

var extend = require("node.extend"),
    util = require("util"),
    color = require("../../../color"),
    field = require("../../../field"),
    skipped = module.exports = function failures() {
        field.call(this, [ "runnerStop" ]);
    };

skipped.prototype = new field();
skipped.prototype.constructor = skipped;
skipped.prototype = extend(
    skipped.prototype,
    {
        toString: function () {
            var runner = this.value[0],
                test,
                method,
                str = "",
                render = function (exception, method) {
                    return util.format(
                        ">>> " + color.skipped("%s: %s") + "\n",
                        method,
                        exception.message
                    );
                };

            if(runner.score.skipped > 0) {
                str = util.format(
                    "> " + color.skipped("There were %d skipped methods:") + "\n",
                    runner.score.skipped
                );

                for(test in runner.score.tests) {
                    if(runner.score.tests.hasOwnProperty(test)) {
                        if(runner.score.tests[test].skipped > 0) {
                            str = str.concat(">> " + test + "\n");

                            for(method in runner.score.tests[test].methods) {
                                if(typeof runner.score.tests[test].methods[method].skipped !== "undefined") {
                                    str = str.concat(render(
                                        runner.score.tests[test].methods[method].skipped,
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
