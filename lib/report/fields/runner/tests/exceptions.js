"use strict";

require("../../../../..")(module);

var extend = require("node.extend"),
    util = require("util"),
    color = require("../../../color"),
    Field = require("../../../field"),
    Prompt = require("../../../../cli/prompt"),
    exceptions = module.exports = function exceptions() {
        Field.call(this, [ "runnerStop" ]);

        this.locale.translations.loadTranslations(require("../../../../../resources/locale/report/fields/runner/tests/exceptions.json"));
        this.firstPrompt = new Prompt(">", color.error);
        this.secondPrompt = new Prompt(">>");
        this.thirdPrompt = new Prompt(">>>", color.error);
    };

exceptions.prototype = new Field();
exceptions.prototype.constructor = exceptions;
exceptions.prototype = extend(
    exceptions.prototype,
    {
        renderException: function (exception, method) {
            return this.thirdPrompt.write(
                util.format(
                    "%s: %s: %s" + "\n%s",
                    method,
                    exception.name,
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

            if(runner.score.exceptions === 0) {
                return str;
            }

            for(test in runner.score.tests) {
                if(runner.score.tests.hasOwnProperty(test)) {
                    if(runner.score.tests[test].exceptions === 0) {
                        continue;
                    }

                    str = str.concat(this.secondPrompt.write(test));

                    for(method in runner.score.tests[test].methods) {
                        if(typeof runner.score.tests[test].methods[method].exception !== "undefined") {
                            str = str
                                .concat(this.renderException(
                                    runner.score.tests[test].methods[method].exception,
                                    method
                                )
                            );
                        }
                    }
                }
            }

            return this.firstPrompt
                .write(this.locale.__("There was $[1] exception:", "There were $[1] exceptions:", runner.score.exceptions))
                .toString()
                .concat(str);
        }
    }
);
