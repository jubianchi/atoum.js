var atoum = require('../..')(module),
    Generator = require('../../lib/asserter/generator'),
    variable = require('../../lib/asserters/variable'),
    testedClass = require('../../lib/asserters/bool'),
    unit = module.exports = {
        testClass: function() {
            var object, generator;

            this
                .if(generator = new Generator())
                .then()
                    .object(object = new testedClass(generator)).isInstanceOf(variable)
                    .object(object.generator).isEqualTo(generator)
            ;
        },

        testSetWith: function() {
            var object, value;

            this
                .if(object = new testedClass(new Generator()))
                .then()
                    .error(function() {
                        object.setWith(value)
                    })
                        .hasName('Failure')
                        .hasMessage('undefined is not a boolean')
                .if(value = {})
                .then()
                    .error(function() {
                        object.setWith(value)
                    })
                        .hasName('Failure')
                        .hasMessage('[object Object] is not a boolean')
                .if(value = true)
                .then()
                    .object(object.setWith(value)).isIdenticalTo(object)
                    .bool(object.value).isEqualTo(value)
            ;
        },

        testIsTrue: function() {
            var object;

            this
                .if(object = new testedClass(new Generator()))
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
