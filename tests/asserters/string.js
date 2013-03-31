var util = require('util'),
    test = require('../../lib/test'),
    variable = require('../../lib/asserters/variable'),
    testedClass = require('../../lib/asserters/string'),
    unit = module.exports = {
        testClass: function() {
            var unit, object;

            this
                .if(testClass = Math.random().toString(36).substring(7))
                .and(unit = new test(testClass))
                .then()
                    .object(object = new testedClass(unit)).isInstanceOf(variable)
                    .object(object.test).isEqualTo(unit)
            ;
        },

        testSetWith: function() {
            var unit, object, value;

            this
                .if(testClass = Math.random().toString(36).substring(7))
                .and(unit = new test(testClass))
                .and(object = new testedClass(unit))
                .then()
                    .error(function() {
                        object.setWith(value)
                    })
                        .hasName('Failure')
                        .hasMessage('Value is not a string')
                .if(value = {})
                .then()
                    .error(function() {
                        object.setWith(value)
                    })
                        .hasName('Failure')
                        .hasMessage('Value is not a string')
                .if(value = Math.random().toString(36).substring(7))
                .then()
                    .object(object.setWith(value)).isEqualTo(object)
                    .string(object.value).isEqualTo(value)
            ;
        },

        testHasLength: function() {
            var unit, object, value;

            this
                .if(testClass = Math.random().toString(36).substring(7))
                .and(unit = new test(testClass))
                .and(object = new testedClass(unit))
                .and(object.setWith(''))
                .then()
                    .object(object.hasLength(0)).isIdenticalTo(object)
                .if(object.setWith(value = Math.random().toString(36).substring(7)))
                .then()
                    .error(function() {
                        object.hasLength(0);
                    })
                        .hasName('Failure')
                        .hasMessage(util.format('String(%d) has not length 0', value.length))
                    .object(object.hasLength(value.length)).isIdenticalTo(object)
            ;
        }
    };
