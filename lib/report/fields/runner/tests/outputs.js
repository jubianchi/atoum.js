"use strict";

require("../../../../..")(module);

var extend = require("node.extend"),
    util = require("util"),
    color = require("../../../color"),
    Field = require("../../../field"),
    outputs = module.exports = function outputs() {
        Field.call(this, [ "runnerStop" ]);

        this.locale.translations.loadTranslations(require("../../../../../resources/locale/report/fields/runner/tests/outputs.json"));
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

            if(runner.score.outputs > 0) {
                str = "> "
                    .concat(color.title(this.locale.__("There was $[1] output:", "There were $[1] outputs:", runner.score.outputs)))
                    .concat("\n");

                for(test in runner.score.tests) {
                    if(runner.score.tests.hasOwnProperty(test)) {
                        if(runner.score.tests[test].outputs > 0) {
                            str = str.concat(">> " + test + "\n");

                            for(method in runner.score.tests[test].methods) {
                                if(typeof runner.score.tests[test].methods[method].output !== "undefined") {
                                    str = str.concat(">>> " + method + "\n").concat(runner.score.tests[test].methods[method].output);
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
