var util = require('util'),
    atoum = require('../..')(module),
    asserter = require('../../lib/asserter'),
    testedClass = require('../../lib/asserters/undefined'),
    unit = module.exports = {
        testClass: function() {
            var generator, object;

            this
                .if(generator = new Generator())
                .then()
                    .object(object = new testedClass(generator)).isInstanceOf(asserter)
                    .object(object.generator).isEqualTo(generator)
            ;
        },

        testSetWith: function() {
            var object, value;

            this
                .if(object = new testedClass(new Generator()))
                .then()
                    .object(object.setWith(value)).isIdenticalTo(object)
                .if(value = Math.random().toString(36).substring(7))
                .then()
                    .error(function() {
                        object.setWith(value);
                    })
                        .hasName('Failure')
                        .hasMessage(util.format('%s is not undefined', value))
            ;
        }
    };
