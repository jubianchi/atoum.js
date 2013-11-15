var atoum = require('../..')(module),
    variable = require('../../lib/asserters/variable'),
    Generator = require('../../lib/asserter/generator'),
    testedClass = require('../../lib/asserters/number'),
    unit = module.exports = {
        testClass: function() {
            var generator, object;

            this
                .if(generator = new Generator())
                .then()
                    .object(object = new testedClass(generator)).isInstanceOf(variable)
                    .object(object.generator).isIdenticalTo(generator)
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
                        .hasMessage('undefined is not a number')
                .if(value = {})
                .then()
                    .error(function() {
                        object.setWith(value)
                    })
                        .hasName('Failure')
                        .hasMessage('[object Object] is not a number')
                .if(value = 0)
                .then()
                    .object(object.setWith(value)).isIdenticalTo(object)
                    .number(object.value).isEqualTo(value)
                .if(value = Math.random())
                .then()
                    .object(object.setWith(value)).isIdenticalTo(object)
                    .number(object.value).isEqualTo(value)
            ;
        }
    };
