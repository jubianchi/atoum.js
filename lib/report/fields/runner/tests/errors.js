"use strict";

require("../../../../..")(module);

var underscore = require("underscore"),
    extend = require("node.extend"),
    util = require("util"),
    color = require("../../../color"),
    Field = require("../../../field"),
    Prompt = require("../../../../cli/prompt"),
    errors = module.exports = function errors() {
        Field.call(this, [ "runnerStop" ]);

        this.locale.translations.loadTranslations(require("../../../../../resources/locale/report/fields/runner/tests/errors.json"));
        this.firstPrompt = new Prompt(">", color.error);
        this.secondPrompt = new Prompt(">>");
        this.thirdPrompt = new Prompt(">>>", color.error);
    };

errors.prototype = new Field();
errors.prototype.constructor = errors;
errors.prototype = extend(
    errors.prototype,
    {
        renderError: function (exception) {
            return this.thirdPrompt.write(
                util.format(
                    "%s: %s" + "\n%s",
                    exception.name,
                    exception.message,
                    exception.stack
                )
            ).toString();
        },

        toString: function () {
            var runner = this.value[0],
                test,
                str = "";

            if(runner.score.errors === 0) {
                return str;

            }
            for(test in runner.score.tests) {
                if(runner.score.tests.hasOwnProperty(test)) {
                    if(underscore.size(runner.score.tests[test].errors) === 0) {
                        continue;
                    }

                    str = str
                        .concat(this.secondPrompt.write(test))
                        .concat(underscore.map(runner.score.tests[test].errors, this.renderError, this).join("\n"))
                    ;
                }
            }

            return this.firstPrompt
                .write(this.locale.__("There was $[1] error:", "There were $[1] errors:", runner.score.errors))
                .toString()
                .concat(str);
        }
    }
);
