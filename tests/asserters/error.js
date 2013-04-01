var util = require('util'),
    test = require('../../lib/test'),
    variable = require('../../lib/asserters/variable'),
    testedClass = require('../../lib/asserters/error'),
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
            var value, object, notErroring, erroring, exception;

            this
                .if(object = new testedClass({}))
                .then()
                    .error(function() {
                        object.setWith(value)
                    })
                        .hasName('Failure')
                        .hasMessage(util.format('%s is not callable', value))
                .if(notErroring = function() {})
                .then()
                    .error(function() {
                        object.setWith(notErroring)
                    })
                        .hasName('Failure')
                        .hasMessage('There was no error')
                .if(exception = new Error())
                .and(erroring = function() { throw exception; })
                .then()
                    .object(object.setWith(erroring)).isEqualTo(object)
                    .object(object.exception).isIdenticalTo(exception)
            ;
        },

        testHasName: function() {
            var object, erroring, exception, name, wrongName;

            this
                .if(object = new testedClass({}))
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
                .if(object = new testedClass({}))
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
