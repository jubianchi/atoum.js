var atoum = require('../../..')(module),
    testedClass = require('../../../lib/test/method/score'),
    unit = module.exports = {
        testClass: function() {
            var object, method;

            this
                .if(method = Math.random().toString(36).substring(7))
                .then()
                    .object(object = new testedClass(method))
                    .undefined(object.error)
                    .undefined(object.exception)
                    .undefined(object.failure)
                    .bool(object.passed).isTrue()
                    .number(object.duration).isEqualTo(0)
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

        testAddFailure: function() {
            var object, exception;

            this
                .if(exception = new Error())
                .and(object = new testedClass())
                .then()
                    .object(object.addFailure(exception)).isIdenticalTo(object)
                    .object(object.failure).isIdenticalTo(exception)
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
                    .object(object.exception).isIdenticalTo(exception)
                    .bool(object.passed).isFalse()
            ;
        }
    };
