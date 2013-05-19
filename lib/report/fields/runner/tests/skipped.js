"use strict";

require("../../../../..")(module);

var extend = require("node.extend"),
    util = require("util"),
    color = require("../../../color"),
    Field = require("../../../field"),
    skipped = module.exports = function failures() {
        Field.call(this, [ "runnerStop" ]);

        this.locale.translations.loadTranslations(require("../../../../../resources/locale/report/fields/runner/tests/skipped.json"));
    };

skipped.prototype = new Field();
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
                str = "> "
                    .concat(color.skipped(this.locale.__("There was $[1] skipped method:", "There were $[1] skipped methods:", runner.score.skipped)))
                    .concat("\n");

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
