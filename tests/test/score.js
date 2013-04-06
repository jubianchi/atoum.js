var atoum = require('../..')(module),
    testedClass = require('../../lib/test/score'),
    unit = module.exports = {
        testClass: function() {
            var object;

            this
                .object(object = new testedClass())
                .object(object.errors).isEmpty()
                .object(object.exceptions).isEmpty()
                .object(object.failures).isEmpty()
                .number(object.methods).isEqualTo(0)
                .number(object.duration).isEqualTo(0)
                .number(object.failedMethods).isEqualTo(0)
                .bool(object.passed).isTrue()
            ;
        },

        testSetDuration: function() {
            var object, duration;

            this
                .if(object = new testedClass())
                .and(duration = Math.random())
                .then()
                .object(object.setDuration(duration)).isIdenticalTo(object)
                    .number(object.duration).isEqualTo(duration)
            ;
        },

        testAddMethod: function() {
            var object;

            this
                .if(object = new testedClass())
                .then()
                    .object(object.addMethod()).isIdenticalTo(object)
                    .number(object.methods).isEqualTo(1)
                .if(object.addMethod())
                .then()
                    .number(object.methods).isEqualTo(2)
            ;
        },

        testAddFailedMethod: function() {
            var object;

            this
                .if(object = new testedClass())
                .then()
                    .object(object.addFailedMethod()).isIdenticalTo(object)
                    .number(object.failedMethods).isEqualTo(1)
                .if(object.addFailedMethod())
                .then()
                    .number(object.failedMethods).isEqualTo(2)
            ;
        },

        testAddFailure: function() {
            var object, method, exception;

            this
                .if(object = new testedClass())
                .and(exception = new Error())
                .and(method = Math.random().toString(36).substring(7))
                .then()
                    .object(object.addFailure(method, exception)).isIdenticalTo(object)
                    .object(object.failures[method]).isIdenticalTo(exception)
                    .bool(object.passed).isFalse()
            ;
        },

        testAddException: function() {
            var object, method, exception;

            this
                .if(object = new testedClass())
                .and(exception = new Error())
                .and(method = Math.random().toString(36).substring(7))
                .then()
                    .object(object.addException(method, exception)).isIdenticalTo(object)
                    .object(object.exceptions[method]).isIdenticalTo(exception)
                    .bool(object.passed).isFalse()
            ;
        },

        testAddError: function() {
            var object, method, exception;

            this
                .if(object = new testedClass())
                .and(exception = new Error())
                .and(method = Math.random().toString(36).substring(7))
                .then()
                    .object(object.addError(method, exception)).isIdenticalTo(object)
                    .object(object.errors[method]).isIdenticalTo(exception)
                    .bool(object.passed).isFalse()
            ;
        }
    };
