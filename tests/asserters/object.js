var util = require('util'),
    test = require('../../lib/test'),
    array = require('../../lib/asserters/array'),
    testedClass = require('../../lib/asserters/object'),
    unit = module.exports = {
        testClass: function() {
            var generator, object;

            this
                .if(generator = {})
                .then()
                    .object(object = new testedClass(generator)).isInstanceOf(array)
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
                        .hasMessage('undefined is not an object')
                .if(value = [])
                .then()
                    .error(function() {
                        object.setWith(value)
                    })
                        .hasName('Failure')
                        .hasMessage(util.format('%s is not an object', value))
                .if(value = {})
                .then()
                    .object(object.setWith(value)).isEqualTo(object)
                    .object(object.value).isEqualTo(value)
            ;
        }
    };
