var util = require('util'),
    test = require('../../lib/test'),
    error = require('../../lib/asserters/error'),
    variable = require('../../lib/asserters/variable'),
    unit = module.exports = {
        testClass: function() {
            var unit, object;

            this
                .if(testClass = Math.random().toString(36).substring(7))
                .and(unit = new test(testClass))
                .then()
                    .object(object = new error(unit)).isInstanceOf(variable)
                    .object(object.test).isEqualTo(unit)
            ;
        },

        testSetWith: function() {
            var unit, object, notErroring, erroring, exception;

            this
                .if(testClass = Math.random().toString(36).substring(7))
                .and(unit = new test(testClass))
                .and(object = new error(unit))
                .then()
                    .error(function() {
                        object.setWith('')
                    })
                        .hasName('Failure')
                        .hasMessage('Value is not callable')
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
                    .object(object.error).isIdenticalTo(exception)
            ;
        },

        testHasName: function() {
            var unit, object, erroring, exception, name, wrongName;

            this
                .if(testClass = Math.random().toString(36).substring(7))
                .and(unit = new test(testClass))
                .and(object = new error(unit))
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
            var unit, object, erroring, exception, message, wrongMsg;

            this
                .if(testClass = Math.random().toString(36).substring(7))
                .and(unit = new test(testClass))
                .and(object = new error(unit))
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
                    .object(object.hasMessage(message)).isIdenticalTo(unit)
            ;
        }
    };
