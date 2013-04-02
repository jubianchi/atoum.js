var atoum = require('../..'),
    callback = require('../../lib/test/callback'),
    asserter = require('../../lib/asserter'),
    testedClass = atoum.require('lib/asserters/callback', module),
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

        testWasCalled: function() {
            var object, value;

            this
                .if(value = callback())
                .and(object = new testedClass({}))
                .and(object.setWith(value))
                .then()
                    .error(function() {
                        object.wasCalled()
                    })
                        .hasName('Failure')
                        .hasMessage('Callback was not called')
                .if(value())
                .then()
                    .object(object.wasCalled()).isIdenticalTo(object)
            ;
        },

        testWasNotCalled: function() {
            var object, value;

            this
                .if(value = callback())
                .and(object = new testedClass({}))
                .and(object.setWith(value))
                .then()
                    .object(object.wasNotCalled()).isIdenticalTo(object)
                .if(value())
                .then()
                    .error(function() {
                        object.wasNotCalled()
                    })
                        .hasName('Failure')
                        .hasMessage('Callback was called')
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
        }
    };
