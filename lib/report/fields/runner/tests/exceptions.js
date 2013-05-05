"use strict";

require("../../../../..")(module);

var extend = require("node.extend"),
    util = require("util"),
    color = require("../../../color"),
    Field = require("../../../field"),
    exceptions = module.exports = function exceptions() {
        Field.call(this, [ "runnerStop" ]);

        this.locale.translations.loadTranslations(require("../../../../../resources/locale/report/fields/runner/tests/exceptions.json"));
    };

exceptions.prototype = new Field();
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
                str = "> "
                    .concat(color.error(this.locale.__("There was $[1] exception:", "There were $[1] exceptions:", runner.score.exceptions)))
                    .concat("\n");

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
