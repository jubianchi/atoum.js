"use strict";

require("../../../../..")(module);

var extend = require("node.extend"),
    util = require("util"),
    color = require("../../../color"),
    Field = require("../../../field"),
    failures = module.exports = function failures() {
        Field.call(this, [ "runnerStop" ]);

        this.locale.translations.loadTranslations(require("../../../../../resources/locale/report/fields/runner/tests/failures.json"));
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
                str = "> "
                    .concat(color.error(this.locale.__("There was $[1] failure:", "There were $[1] failures:", runner.score.failures)))
                    .concat("\n");

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
