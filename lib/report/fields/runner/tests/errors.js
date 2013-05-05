"use strict";

require("../../../../..")(module);

var underscore = require("underscore"),
    extend = require("node.extend"),
    util = require("util"),
    color = require("../../../color"),
    Field = require("../../../field"),
    errors = module.exports = function errors() {
        Field.call(this, [ "runnerStop" ]);

        this.locale.translations.loadTranslations(require("../../../../../resources/locale/report/fields/runner/tests/errors.json"));
    };

errors.prototype = new Field();
errors.prototype.constructor = errors;
errors.prototype = extend(
    errors.prototype,
    {
        toString: function () {
            var runner = this.value[0],
                test,
                str = "",
                render = function (exception) {
                    return util.format(
                        ">>> " + color.error("%s: %s") + "\n%s\n",
                        exception.name,
                        exception.message,
                        exception.stack
                    );
                };

            if(runner.score.errors > 0) {
                str = "> "
                    .concat(color.error(this.locale.__("There was $[1] error:", "There were $[1] errors:", runner.score.errors)))
                    .concat("\n");

                for(test in runner.score.tests) {
                    if(runner.score.tests.hasOwnProperty(test)) {
                        if(underscore.size(runner.score.tests[test].errors) > 0) {
                            str = str
                                .concat(">> " + test + "\n")
                                .concat(underscore.map(runner.score.tests[test].errors, render, this).join("\n"))
                            ;
                        }
                    }
                }
            }

            return str;
        }
    }
);
