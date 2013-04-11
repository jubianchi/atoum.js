"use strict";

var extend = require("node.extend"),
    util = require("util"),
    color = require("../../color"),
    field = require("../../field"),
    result = module.exports = function result() {
        field.call(this, [ "runnerStop" ]);
    };

result.prototype = new field();
result.prototype.constructor = result;
result.prototype = extend(
    result.prototype,
    {
        toString: function () {
            var runner = this.value[0];

            if(runner.score.passed === true) {
                return util.format(
                    color.ribbon.success("Success (%d test(s), %d method(s), %d assertion(s)) !").concat("\n"),
                    runner.score.passedTests,
                    runner.score.methods,
                    runner.score.assertions
                );
            } else {
                return util.format(
                    color.ribbon.error("Failure (%d/%d test(s), %d/%d method(s), %d assertion(s)) !").concat("\n"),
                    runner.score.passedTests,
                    runner.score.passedTests + runner.score.failedTests,
                    runner.score.passedMethods,
                    runner.score.methods,
                    runner.score.assertions
                );
            }
        }
    }
);
