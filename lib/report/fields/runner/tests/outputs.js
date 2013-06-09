"use strict";

require("../../../../..")(module);

var extend = require("node.extend"),
    util = require("util"),
    color = require("../../../color"),
    Field = require("../../../field"),
    Prompt = require("../../../../cli/prompt"),
    outputs = module.exports = function outputs() {
        Field.call(this, [ "runnerStop" ]);

        this.locale.translations.loadTranslations(require("../../../../../resources/locale/report/fields/runner/tests/outputs.json"));
        this.firstPrompt = new Prompt(">", color.title);
        this.secondPrompt = new Prompt(">>");
        this.thirdPrompt = new Prompt(">>>");
    };

outputs.prototype = new Field();
outputs.prototype.constructor = outputs;
outputs.prototype = extend(
    outputs.prototype,
    {
        toString: function () {
            var runner = this.value[0],
                test,
                method,
                str = "";

            if(runner.score.outputs === 0) {
                return str;
            }

            for(test in runner.score.tests) {
                if(runner.score.tests.hasOwnProperty(test)) {
                    if(runner.score.tests[test].outputs === 0) {
                        continue;
                    }

                    str = str.concat(this.secondPrompt.write(test));

                    for(method in runner.score.tests[test].methods) {
                        if(typeof runner.score.tests[test].methods[method].output !== "undefined") {
                            str = str.concat(
                                this.thirdPrompt
                                    .write(method)
                                    .write(runner.score.tests[test].methods[method].output)
                            );
                        }
                    }
                }
            }

            return this.firstPrompt
                .write(this.locale.__("There was $[1] output:", "There were $[1] outputs:", runner.score.outputs))
                .toString()
                .concat(str);
        }
    }
);
