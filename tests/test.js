var atoum = require('..')(module),
    testedClass = require('../lib/test'),
    unit = module.exports = {
        testClass: function() {
            var object, testClass;

            this
                .if(testClass = Math.random().toString(36).substring(7))
                .then()
                    .object(object = new testedClass(testClass))
                    .string(object.class).isEqualTo(testClass)
                    .bool(object.coverage).isFalse()
            ;
        },

        testSetCoverage: function() {
            var object, testClass;

            this
                .if(testClass = Math.random().toString(36).substring(7))
                .if(object = new testedClass(testClass))
                .then()
                    .bool(object.coverage).isFalse()
                    .object(object.setCoverage(true)).isIdenticalTo(object)
                    .bool(object.coverage).isTrue()
                    .object(object.setCoverage(false)).isIdenticalTo(object)
                    .bool(object.coverage).isFalse()
            ;
        }
    };
