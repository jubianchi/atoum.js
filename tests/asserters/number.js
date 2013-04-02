var atoum = require('../..'),
    variable = require('../../lib/asserters/variable'),
    testedClass = atoum.require('lib/asserters/number', module),
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
                    .object(object.setWith(value)).isEqualTo(object)
                    .number(object.value).isEqualTo(value)
                .if(value = Math.random())
                .then()
                    .object(object.setWith(value)).isEqualTo(object)
                    .number(object.value).isEqualTo(value)
            ;
        }
    };
