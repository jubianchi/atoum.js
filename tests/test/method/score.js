var atoum = require('../../..')(module),
    Usage = require('../../../lib/test/score/usage'),
    Coverage = require('../../../lib/test/score/coverage'),
    callback = require('../../../lib/test/callback'),
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
                    .undefined(object.output)
                    .bool(object.passed).isTrue()
                    .number(object.duration).isEqualTo(0)
                    .object(object.usage).isInstanceOf(Usage)
                    .object(object.coverage).isInstanceOf(Coverage)
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
        },

        testSetCoverage: function() {
            var object, coverage;

            this
                .if(object = new testedClass())
                .and(object.coverage.addFromStat = callback())
                .and(coverage = { "files": [] })
                .then()
                    .object(object.setCoverage(coverage)).isIdenticalTo(object)
                    .callback(object.coverage.addFromStat)
                        .wasCalled().withArguments(coverage)
            ;
        },

        testAddOutput: function() {
            var object, output, otherOutput;

            this
                .if(object = new testedClass())
                .and(output = Math.random().toString(36).substring(7))
                .then()
                    .object(object.addOutput(output)).isIdenticalTo(object)
                    .string(object.output).isEqualTo(output)
                .if(otherOutput = Math.random().toString(36).substring(7))
                .then()
                    .object(object.addOutput(otherOutput)).isIdenticalTo(object)
                    .string(object.output).isEqualTo(output + otherOutput)
            ;
        }
    };
