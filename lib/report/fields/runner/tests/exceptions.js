"use strict";

var extend = require("node.extend"),
    util = require("util"),
    color = require("../../../color"),
    field = require("../../../field"),
    exceptions = module.exports = function exceptions() {
        field.call(this, [ "runnerStop" ]);
    };

exceptions.prototype = new field();
exceptions.prototype.constructor = exceptions;
exceptions.prototype = extend(
    exceptions.prototype,
    {
        toString: function () {
            var runner = this.value[0],
                test,
                method,
                str = "",
                render = function (exception, method) {
                    return util.format(
                        ">>> " + color.error("%s: %s: %s") + "\n%s\n",
                        method,
                        exception.name,
                        exception.message,
                        exception.stack
                    );
                };

            if(runner.score.exceptions > 0) {
                str = util.format(
                    "> " + color.error("There were %d exceptions:") + "\n",
                    runner.score.exceptions
                );

                for(test in runner.score.tests) {
                    if(runner.score.tests.hasOwnProperty(test)) {
                        if(runner.score.tests[test].exceptions > 0) {
                            str = str.concat(">> " + test + "\n");

                            for(method in runner.score.tests[test].methods) {
                                if(typeof runner.score.tests[test].methods[method].exception !== "undefined") {
                                    str = str.concat(render(
                                        runner.score.tests[test].methods[method].exception,
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
