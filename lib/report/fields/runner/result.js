"use strict";

require("../../../..")(module);

var extend = require("node.extend"),
    color = require("../../color"),
    Field = require("../../field"),
    result = module.exports = function result() {
        Field.call(this, [ "runnerStop" ]);

        this.locale.translations.loadTranslations(require("../../../../resources/locale/report/fields/runner/result.json"));
    };

result.prototype = new Field();
result.prototype.constructor = result;
result.prototype = extend(
    result.prototype,
    {
        toString: function () {
            var runner = this.value[0];

            if(runner.score.passed === true) {
                return color.ribbon.success(
                    this.locale._(
                        "Success ($[1])!",
                        this.locale.__("$[1] test", "$[1] tests", runner.score.passedTests).concat(", ")
                            .concat(this.locale.__("$[1] method", "$[1] methods", runner.score.methods)).concat(", ")
                            .concat(this.locale.__("$[1] assertion", "$[1] assertions", runner.score.assertions))
                    )
                ).concat("\n");
            } else {
                return color.ribbon.error(
                    this.locale._(
                        "Failure ($[1])!",
                        this.locale.__("$[1]/$[2] test", "$[1]/$[2] tests", runner.score.passedTests, runner.score.passedTests + runner.score.failedTests).concat(", ")
                            .concat(this.locale.__("$[1]/$[2] method", "$[1]/$[2] methods", runner.score.passedMethods, runner.score.methods)).concat(", ")
                            .concat(this.locale.__("$[1] assertion", "$[1] assertions", runner.score.assertions))
                    )
                ).concat("\n");
            }
        }
    }
);
