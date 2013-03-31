var test = require('../../lib/test'),
    variable = require('../../lib/asserters/variable'),
    testedClass = require('../../lib/asserters/bool'),
    unit = module.exports = {
        testClass: function() {
            var object, generator;

            this
                .if(generator = {})
                .then()
                    .object(object = new testedClass(generator)).isInstanceOf(variable)
                    .object(object.generator).isEqualTo(generator)
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
                        .hasMessage('Value is not a boolean')
                .if(value = {})
                .then()
                    .error(function() {
                        object.setWith(value)
                    })
                        .hasName('Failure')
                        .hasMessage('Value is not a boolean')
                .if(value = true)
                .then()
                    .object(object.setWith(value)).isEqualTo(object)
                    .bool(object.value).isEqualTo(value)
            ;
        },

        testIsTrue: function() {
            var unit, object;

            this
                .if(testClass = Math.random().toString(36).substring(7))
                .and(unit = new test(testClass))
                .and(object = new testedClass(unit))
                .and(object.setWith(true))
                .then()
                    .object(object.isTrue()).isIdenticalTo(object)
                .if(object.setWith(false))
                .then()
                    .error(function() {
                        object.isTrue();
                    })
                        .hasName('Failure')
                        .hasMessage('false is not identical to true')
            ;
        }
    };
