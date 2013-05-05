var atoum = require('../../../../')(module),
    util = require('util'),
    color = require('cli-color'),
    score = require('../../../../lib/score'),
    generator = require('../../../../lib/asserter/generator'),
    field = require('../../../../lib/report/field'),
    testedClass = require('../../../../lib/report/fields/runner/result'),
    unit = module.exports = {
        testClass: function() {
            var object;

            this
                .object(object = new testedClass()).isInstanceOf(field)
                .array(object.events).isEqualTo([ 'runnerStop' ])
            ;
        },

        testToString: function() {
            var object, run, asserters;

            this
                .if(run = new score())
                .and(asserters = new generator())
                .and(object = new testedClass())
                .and(object.value = [ { 'score': run, 'generator': asserters } ])
                .then()
                    .string(object.toString()).isEqualTo(
                        util.format(
                            color.bgGreen.white('Success (%d test, %d method, %d assertion)!').concat('\n'),
                            run.passedTests,
                            run.methods,
                            run.assertions
                        )
                    )
                .if(run.passedTests = 2)
                .and(run.methods = 2)
                .and(run.assertions = 2)
                .then()
                    .string(object.toString()).isEqualTo(
                        util.format(
                            color.bgGreen.white('Success (%d tests, %d methods, %d assertions)!').concat('\n'),
                            run.passedTests,
                            run.methods,
                            run.assertions
                        )
                    )
                .if(run.passed = false)
                .and(run.passedTests = 1)
                .and(run.failedTests = 1)
                .and(run.methods = 2)
                .and(run.passedMethods = 1)
                .and(run.assertions = 1)
                .then()
                    .string(object.toString()).isEqualTo(
                        util.format(
                            color.bgRed.white('Failure (%d/%d test, %d/%d method, %d assertion)!').concat('\n'),
                            run.passedTests,
                            run.passedTests + run.failedTests,
                            run.passedMethods,
                            run.methods,
                            run.assertions
                        )
                    )
                .if(run.passedTests = 2)
                .and(run.failedTests = 1)
                .and(run.methods = 3)
                .and(run.passedMethods = 2)
                .and(run.assertions = 2)
                .then()
                    .string(object.toString()).isEqualTo(
                        util.format(
                            color.bgRed.white('Failure (%d/%d tests, %d/%d methods, %d assertions)!').concat('\n'),
                            run.passedTests,
                            run.passedTests + run.failedTests,
                            run.passedMethods,
                            run.methods,
                            run.assertions
                        )
                    )
            ;
        }
    };
