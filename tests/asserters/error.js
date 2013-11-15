var util = require('util'),
    atoum = require('../..')(module),
    Generator = require('../../lib/asserter/generator'),
    variable = require('../../lib/asserters/variable'),
    failure = require('../../lib/asserter/exception'),
    testedClass = require('../../lib/asserters/error'),
    unit = module.exports = {
        testClass: function() {
            var asserter, generator;

            this
                .if(generator = new Generator())
                .then()
                    .object(asserter = new testedClass(generator)).isInstanceOf(variable)
                    .object(asserter.generator).isIdenticalTo(generator)
            ;
        },

        testSetWith: function() {
            var value, object, notErroring, erroring, exception;

            this
                .if(object = new testedClass(new Generator()))
                .then()
                    .error(function() {
                        object.setWith(value);
                    })
                        .hasName('Failure')
                        .hasMessage(util.format('%s is not callable', value))
                .if(notErroring = function() {})
                .then()
                    .error(function() {
                        object.setWith(notErroring);
                    })
                        .hasName('Failure')
                        .hasMessage('There was no error')
                .if(exception = new Error())
                .and(erroring = function() { throw exception; })
                .then()
                    .object(object.setWith(erroring)).isIdenticalTo(object)
                    .object(object.exception).isIdenticalTo(exception)
            ;
        },

        testHasName: function() {
            var object, erroring, exception, name, wrongName;

            this
                .if(object = new testedClass(new Generator()))
                .and(exception = new Error())
                .and(exception.name = name = Math.random().toString(36).substring(7))
                .and(erroring = function() { throw exception; })
                .and(object.setWith(erroring))
                .then()
                    .error(function() {
                        object.hasName(wrongName = Math.random().toString(36).substring(7));
                    })
                        .hasName('Failure')
                        .hasMessage(util.format('Error name \'%s\' is not equal to \'%s\'', name, wrongName))
                    .object(object.hasName(name)).isIdenticalTo(object)
            ;
        },

        testHasMessage: function() {
            var object, erroring, exception, message, wrongMsg;

            this
                .if(object = new testedClass(new Generator()))
                .and(exception = new Error())
                .and(exception.message = message = Math.random().toString(36).substring(7))
                .and(erroring = function() { throw exception; })
                .and(object.setWith(erroring))
                .then()
                    .error(function() {
                        object.hasMessage(wrongMsg = Math.random().toString(36).substring(7));
                    })
                        .hasName('Failure')
                        .hasMessage(util.format('Error message \'%s\' is not equal to \'%s\'', message, wrongMsg))
                    .object(object.hasMessage(message)).isIdenticalTo(object)
            ;
        }
    };
