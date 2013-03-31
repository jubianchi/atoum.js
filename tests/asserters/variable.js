var util = require('util'),
    test = require('../../lib/test'),
    testedClass = require('../../lib/asserters/variable'),
    unit = module.exports = {
        testClass: function() {
            var unit, object, testClass;

            this
                .if(testClass = Math.random().toString(36).substring(7))
                .and(unit = new test(testClass))
                .then()
                    .object(object = new testedClass(unit)).isInstanceOf(testedClass)
                    .object(object.test).isEqualTo(unit)
            ;
        },

        testSetWith: function() {
            var unit, object, value, testClass;

            this
                .if(testClass = Math.random().toString(36).substring(7))
                .and(unit = new test(testClass))
                .and(object = new testedClass(unit))
                .then()
                    .error(function() {
                        object.setWith(value)
                    })
                        .hasName('Failure')
                        .hasMessage('Value is undefined')
                .if(value = {})
                .then()
                    .object(object.setWith(value)).isEqualTo(object)
                    .object(object.value).isIdenticalTo(value)
                .if(value = [])
                .then()
                    .object(object.setWith(value)).isEqualTo(object)
                    .array(object.value).isIdenticalTo(value)
                .if(value = Math.random().toString(36).substring(7))
                .then()
                    .object(object.setWith(value)).isEqualTo(object)
                    .string(object.value).isEqualTo(value)
            ;
        },

        testFail: function() {
            var unit, object, message, testClass;

            this
                .if(testClass = Math.random().toString(36).substring(7))
                .and(unit = new test(testClass))
                .and(message = Math.random().toString(36).substring(7))
                .and(object = new testedClass(unit))
                .then()
                    .error(function() {
                        object.fail(message)
                    })
                        .hasName('Failure')
                        .hasMessage(message)
        }
    };
