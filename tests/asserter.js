require('..')(module);

var util = require('util'),
    Generator = require('../lib/asserter/generator'),
    testedClass = require('../lib/asserter'),
    unit = module.exports = {
        testClass: function() {
            var object, generator;

            this
                .if(generator = new Generator())
                .then()
                    .object(object = new testedClass(generator))
                    .undefined(object.value)
                    .object(object.generator).isIdenticalTo(generator)
            ;
        },

        testSetWith: function() {
            var object;

            this
                .if(object = new testedClass(new Generator()))
                .then()
                    .object(object.setWith()).isIdenticalTo(object)
            ;
        },

        testFail: function() {
            var object, message, param, otherParam;

            this
                .if(object = new testedClass(new Generator()))
                .and(message = Math.random().toString(36).substring(7))
                .then()
                    .error(function() {
                        object.fail(message)
                    })
                        .hasName('Failure')
                        .hasMessage(message)
                .if(otherParam = '%s %s')
                .and(param = Math.random().toString(36).substring(7))
                .and(param = Math.random().toString(36).substring(7))
                .then()
                    .error(function() {
                        object.fail(message, param, otherParam)
                    })
                        .hasName('Failure')
                        .hasMessage(util.format(message, param, otherParam))
            ;
        },

        testCheck: function() {
            var object, generator;

            this
                .if(generator = new Generator())
                .and(object = new testedClass(generator))
                .then()
                    .object(object.check()).isIdenticalTo(object)
            ;
        }
    };
