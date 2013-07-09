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
        },

        testToString: function() {
            var object, exception;

            this
                .if(object = new testedClass())
                .then()
                    .string(object.toString()).isEqualTo("{" +
                        "\"duration\":0," +
                        "\"usage\":{" +
                            "\"unit\":{" +
                                "\"B\":1," +
                                "\"KB\":1024," +
                                "\"MB\":1048576," +
                                "\"GB\":1073741824" +
                            "}," +
                            "\"stat\":{" +
                                "\"rss\":0," +
                                "\"heapTotal\":0," +
                                "\"heapUsed\":0" +
                            "}" +
                        "}," +
                        "\"coverage\":{" +
                            "\"files\":{}" +
                        "}," +
                        "\"passed\":true," +
                        "\"assertions\":0" +
                    "}")
                .if(exception = new Error(Math.random().toString(36).substring(7)))
                .and(exception.stack = Math.random().toString(36).substring(7))
                .and(object.addException(exception))
                .then()
                    .string(object.toString()).isEqualTo("{" +
                        "\"duration\":0," +
                        "\"usage\":{" +
                            "\"unit\":{" +
                                "\"B\":1," +
                                "\"KB\":1024," +
                                "\"MB\":1048576," +
                                "\"GB\":1073741824" +
                            "}," +
                            "\"stat\":{" +
                                "\"rss\":0," +
                                "\"heapTotal\":0," +
                                "\"heapUsed\":0" +
                            "}" +
                        "}," +
                        "\"coverage\":{" +
                            "\"files\":{}" +
                        "}," +
                        "\"passed\":false," +
                        "\"assertions\":0," +
                        "\"exception\":{" +
                            "\"name\":\"" + exception.name + "\"," +
                            "\"message\":\"" + exception.message + "\"," +
                            "\"stack\":\"" + exception.stack + "\"" +
                        "}" +
                    "}")
            ;
        }
    };
