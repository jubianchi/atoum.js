var atoum = require('../..')(module),
    score = require('../../lib/test/method/score'),
    Coverage = require('../../lib/test/score/coverage'),
    testedClass = require('../../lib/test/score'),
    unit = module.exports = {
        testClass: function() {
            var object;

            this
                .object(object = new testedClass())
                .array(object.errors).isEmpty()
                .number(object.exceptions).isEqualTo(0)
                .number(object.failures).isEqualTo(0)
                .number(object.outputs).isEqualTo(0)
                .object(object.methods).isEmpty()
                .number(object.duration).isEqualTo(0)
                .number(object.failedMethods).isEqualTo(0)
                .bool(object.passed).isTrue()
                .object(object.coverage).isInstanceOf(Coverage)
            ;
        },

        testAddMethod: function() {
            var object, method;

            this
                .if(method = { 'score': new score(), methods: { name: Math.random().toString(36).substring(7) } })
                .and(object = new testedClass())
                .then()
                    .object(object.addMethod(method)).isIdenticalTo(object)
                    .number(object.failedMethods).isEqualTo(0)
                    .number(object.passedMethods).isEqualTo(1)
                    .array(object.errors).isEmpty()
                    .number(object.exceptions).isEqualTo(0)
                    .number(object.failures).isEqualTo(0)
                    .number(object.outputs).isEqualTo(0)
                    .object(object.methods).hasMember(method.name)
                    .object(object.methods[method.name]).isIdenticalTo(method.score)
                    .number(object.failedMethods).isEqualTo(0)
                    .bool(object.passed).isTrue()
                .if(method.score.passed = false)
                .and(method.score.failure = {})
                .and(method.score.output = Math.random().toString(36).substring(7))
                .and(object.addMethod(method))
                .then()
                    .bool(object.passed).isFalse()
                    .number(object.failedMethods).isEqualTo(1)
                    .number(object.passedMethods).isEqualTo(1)
                    .number(object.outputs).isEqualTo(1)
                .if(method.score.duration = Math.random())
                .and(object.addMethod(method))
                .then()
                    .number(object.duration).isEqualTo(method.score.duration)
                    .number(object.outputs).isEqualTo(2)
                .if(object.addMethod(method))
                .then()
                    .number(object.duration).isEqualTo(method.score.duration * 2)
            ;
        },

        testAddError: function() {
            var object, exception;

            this
                .if(object = new testedClass())
                .and(exception = new Error())
                .then()
                    .object(object.addError(exception)).isIdenticalTo(object)
                    .array(object.errors).hasLength(1)
                    .object(object.errors[0]).isIdenticalTo(exception)
                    .bool(object.passed).isFalse()
            ;
        }
    };
