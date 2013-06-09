"use strict";

require("../../../../..")(module);

var extend = require("node.extend"),
    util = require("util"),
    color = require("../../../color"),
    Field = require("../../../field"),
    Prompt = require("../../../../cli/prompt"),
    skipped = module.exports = function failures() {
        Field.call(this, [ "runnerStop" ]);

        this.locale.translations.loadTranslations(require("../../../../../resources/locale/report/fields/runner/tests/skipped.json"));
        this.firstPrompt = new Prompt(">", color.skipped);
        this.secondPrompt = new Prompt(">>");
        this.thirdPrompt = new Prompt(">>>", color.skipped);
    };

skipped.prototype = new Field();
skipped.prototype.constructor = skipped;
skipped.prototype = extend(
    skipped.prototype,
    {
        renderSkipped: function (exception, method) {
            return this.thirdPrompt.write(
                util.format(
                    "%s: %s",
                    method,
                    exception.stack
                )
            ).toString();
        },

        toString: function () {
            var runner = this.value[0],
                test,
                method,
                str = "";

            if(runner.score.skipped === 0) {
                return str;
            }

            for(test in runner.score.tests) {
                if(runner.score.tests.hasOwnProperty(test)) {
                    if(runner.score.tests[test].skipped === 0) {
                        continue;
                    }

                    str = str.concat(this.secondPrompt.write(test));

                    for(method in runner.score.tests[test].methods) {
                        if(typeof runner.score.tests[test].methods[method].skipped !== "undefined") {
                            str = str.concat(this.renderSkipped(
                                runner.score.tests[test].methods[method].skipped,
                                method
                            ));
                        }
                    }
                }
            }

            return  this.firstPrompt
                .write(this.locale.__("There was $[1] skipped method:", "There were $[1] skipped methods:", runner.score.skipped))
                .toString()
                .concat(str);
        }
    }
);
