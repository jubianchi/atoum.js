var atoum = require('..')(module),
    score = require('../lib/test/score'),
    testedClass = require('../lib/score'),
    unit = module.exports = {
        testClass: function() {
            var object;

            this
                .object(object = new testedClass())
                .object(object.tests).isEmpty(0)
                .number(object.failedTests).isEqualTo(0)
                .number(object.passedTests).isEqualTo(0)
                .number(object.errors).isEqualTo(0)
                .number(object.exceptions).isEqualTo(0)
                .number(object.failures).isEqualTo(0)
                .number(object.methods).isEqualTo(0)
                .number(object.failedMethods).isEqualTo(0)
                .number(object.duration).isEqualTo(0)
                .number(object.runningDuration).isEqualTo(0)
                .bool(object.passed).isTrue()
            ;
        },

        testAddTest: function() {
            var object, test;

            this
                .if(test = { 'score': new score(), methods: {} })
                .and(object = new testedClass())
                .then()
                    .object(object.addTest(test)).isIdenticalTo(object)
                    .number(object.errors).isEqualTo(0)
                    .number(object.exceptions).isEqualTo(0)
                    .number(object.failures).isEqualTo(0)
                    .number(object.methods).isEqualTo(0)
                    .number(object.failedMethods).isEqualTo(0)
                    .bool(object.passed).isTrue()
                .if(test.score.passed = false)
                .and(test.score.methods = { 'one': {}, 'two': {}, 'three': {}, 'four': {}, 'five': {} })
                .and(test.score.failedMethods = 10)
                .and(object.addTest(test))
                .then()
                    .bool(object.passed).isFalse()
                    .number(object.methods).isEqualTo(5)
                    .number(object.failedMethods).isEqualTo(test.score.failedMethods)
                    .number(object.failedTests).isEqualTo(1)
                .if(object.addTest(test))
                .then()
                    .bool(object.passed).isFalse()
                    .number(object.methods).isEqualTo(10)
                    .number(object.failedMethods).isEqualTo(test.score.failedMethods * 2)
                    .number(object.failedTests).isEqualTo(2)
                .if(test.score.duration = Math.random())
                .and(object.addTest(test))
                .then()
                    .number(object.duration).isEqualTo(test.score.duration)
                .if(object.addTest(test))
                .then()
                    .number(object.duration).isEqualTo(test.score.duration * 2)
            ;
        }
    };
