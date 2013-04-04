var atoum = require('../..')(module),
    variable = require('../../lib/asserters/variable'),
    testedClass = require('../../lib/asserters/array'),
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
            var object, value;

            this
                .if(object = new testedClass({}))
                .then()
                    .error(function() {
                            object.setWith(value)
                    })
                        .hasName('Failure')
                        .hasMessage('undefined is not an array')
                .if(value = {})
                .then()
                    .error(function() {
                        object.setWith(value)
                    })
                        .hasName('Failure')
                        .hasMessage('[object Object] is not an array')
                .if(value = [])
                .then()
                    .object(object.setWith(value)).isEqualTo(object)
                    .array(object.value).isEqualTo(value)
            ;
        },

        testHasLength: function() {
            var object;

            this
                .if(object = new testedClass({}))
                .and(object.setWith([]))
                .then()
                    .object(object.hasLength(0)).isIdenticalTo(object)
                .if(object.setWith([ 0 ]))
                .then()
                    .error(function() {
                        object.hasLength(0);
                    })
                        .hasName('Failure')
                        .hasMessage('Array(1) has not length 0')
                    .object(object.hasLength(1)).isIdenticalTo(object)
            ;
        }
    };
