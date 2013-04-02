var atoum = require('../..'),
    testedClass = atoum.require('lib/test/score', module),
    unit = module.exports = {
        testClass: function() {
            var object;

            this
                .object(object = new testedClass())
                .array(object.errors).isEmpty()
                .array(object.exceptions).isEmpty()
                .array(object.failures).isEmpty()
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
            var object, exception;

            this
                .if(object = new testedClass())
                .and(exception = new Error())
                .then()
                    .object(object.addFailure(exception)).isIdenticalTo(object)
                    .object(object.failures[0]).isIdenticalTo(exception)
                    .bool(object.passed).isFalse()
            ;
        },

        testAddException: function() {
            var object, exception;

            this
                .if(object = new testedClass())
                .and(exception = new Error())
                .then()
                    .object(object.addException(exception)).isIdenticalTo(object)
                    .object(object.exceptions[0]).isIdenticalTo(exception)
                    .bool(object.passed).isFalse()
            ;
        },

        testAddError: function() {
            var object, exception;

            this
                .if(object = new testedClass())
                .and(exception = new Error())
                .then()
                    .object(object.addError(exception)).isIdenticalTo(object)
                    .object(object.errors[0]).isIdenticalTo(exception)
                    .bool(object.passed).isFalse()
            ;
        }
    };
