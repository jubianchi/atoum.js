var callback = require('../../lib/test/callback'),
    asserter = require('../../lib/asserter'),
    testedClass = require('../../lib/asserters/callback'),
    unit = module.exports = {
        testClass: function() {
            var object, generator;

            this
                .if(generator = {})
                .then()
                    .object(object = new testedClass(generator)).isInstanceOf(asserter)
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
                        .hasMessage('undefined is not a callback')
                .if(value = {})
                .then()
                    .error(function() {
                        object.setWith(value)
                    })
                        .hasName('Failure')
                        .hasMessage('[object Object] is not a callback')
                .if(value = callback())
                .then()
                    .object(object.setWith(value)).isEqualTo(object)
                    .variable(object.value).isEqualTo(value)
            ;
        },
    };
