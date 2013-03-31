var util = require('util'),
    test = require('../../lib/test'),
    variable = require('../../lib/asserters/variable'),
    testedClass = require('../../lib/asserters/number'),
    unit = module.exports = {
        testClass: function() {
            var generator, object;

            this
                .if(generator = {})
                .then()
                    .object(object = new testedClass(generator)).isInstanceOf(variable)
                    .object(object.generator).isEqualTo(generator)
            ;
        },

        testSetWith: function() {
            var object, value;

            this
                .if(object = new testedClass({}))
                .then()
                    .error(function() {
                        object.setWith(value)
                    })
                        .hasName('Failure')
                        .hasMessage('Value is not a number')
                .if(value = {})
                .then()
                    .error(function() {
                        object.setWith(value)
                    })
                        .hasName('Failure')
                        .hasMessage('Value is not a number')
                .if(value = Math.random())
                .then()
                    .object(object.setWith(value)).isEqualTo(object)
                    .number(object.value).isEqualTo(value)
            ;
        }
    };
