"use strict";

require("../../../../..")(module);

var extend = require("node.extend"),
    util = require("util"),
    color = require("../../../color"),
    Field = require("../../../field"),
    Prompt = require("../../../../cli/prompt"),
    failures = module.exports = function failures() {
        Field.call(this, [ "runnerStop" ]);

        this.locale.translations.loadTranslations(require("../../../../../resources/locale/report/fields/runner/tests/failures.json"));
        this.firstPrompt = new Prompt(">", color.error);
        this.secondPrompt = new Prompt(">>");
        this.thirdPrompt = new Prompt(">>>", color.error);
    };

failures.prototype = new Field();
failures.prototype.constructor = failures;
failures.prototype = extend(
    failures.prototype,
    {
        renderFailure: function (exception, method) {
            return this.thirdPrompt
                .write(
                    util.format(
                        "%s: %s" + "\n%s",
                        method,
                        exception.message,
                        exception.stack
                    )
                ).toString();
        },

        toString: function () {
            var runner = this.value[0],
                test,
                method,
                str = "";

            if(runner.score.failures === 0) {
                return str;
            }

            for(test in runner.score.tests) {
                if(runner.score.tests.hasOwnProperty(test)) {
                    if(runner.score.tests[test].failures === 0) {
                        continue;
                    }

                    str = str.concat(this.secondPrompt.write(test));

                    for(method in runner.score.tests[test].methods) {
                        if(typeof runner.score.tests[test].methods[method].failure !== "undefined") {
                            str = str
                                .concat(this.renderFailure(
                                    runner.score.tests[test].methods[method].failure,
                                    method
                                )
                            );
                        }
                    }
                }
            }

            return this.firstPrompt
                .write(this.locale.__("There was $[1] failure:", "There were $[1] failures:", runner.score.failures))
                .toString()
                .concat(str);
        }
    }
);
