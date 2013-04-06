var util = require('util'),
    color = require('cli-color'),
    atoum = require('../../../../')(module),
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
                            color.bgGreen.white('Success (%d test(s), %d method(s), %d assertion(s)) !\n'),
                            run.passedTests,
                            run.methods,
                            asserters.assertionsCount
                        )
                    )
                .if(run.passed = false)
                .then()
                    .string(object.toString()).isEqualTo(
                        util.format(
                            color.bgRed.white('Failure (%d/%d test(s), %d/%d method(s), %d assertion(s)) !\n'),
                            run.passedTests,
                            run.passedTests + run.failedTests,
                            (run.methods - run.failedMethods),
                            run.methods,
                            asserters.assertionsCount
                        )
                    )
            ;
        }
    };
