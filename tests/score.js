var atoum = require('..')(module),
    score = require('../lib/test/score'),
    testedClass = require('../lib/score'),
    unit = module.exports = {
        testClass: function() {
            var object;

            this
                .object(object = new testedClass())
                .array(object.tests).isEmpty()
                .number(object.failedTests).isEqualTo(0)
                .number(object.errors).isEqualTo(0)
                .number(object.exceptions).isEqualTo(0)
                .number(object.failures).isEqualTo(0)
                .number(object.methods).isEqualTo(0)
                .number(object.failedMethods).isEqualTo(0)
                .number(object.duration).isEqualTo(0)
                .bool(object.passed).isTrue()
            ;
        },

        testAddTest: function() {
            var object, test;

            this
                .if(test = { 'score': new score() })
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
                .and(test.score.methods = 5)
                .and(test.score.failedMethods = 10)
                .and(object.addTest(test))
                .then()
                    .bool(object.passed).isFalse()
                    .number(object.methods).isEqualTo(test.score.methods)
                    .number(object.failedMethods).isEqualTo(test.score.failedMethods)
                .if(object.addTest(test))
                .then()
                    .bool(object.passed).isFalse()
                    .number(object.methods).isEqualTo(test.score.methods * 2)
                    .number(object.failedMethods).isEqualTo(test.score.failedMethods * 2)
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
