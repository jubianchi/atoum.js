var util = require('util'),
    asserter = require('../../lib/asserter'),
    testedClass = require('../../lib/asserters/variable'),
    unit = module.exports = {
        testClass: function() {
            var generator, object;

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
                        .hasMessage('Value is undefined')
                .if(value = {})
                .then()
                    .object(object.setWith(value)).isEqualTo(object)
                    .object(object.value).isIdenticalTo(value)
                .if(value = [])
                .then()
                    .object(object.setWith(value)).isEqualTo(object)
                    .array(object.value).isIdenticalTo(value)
                .if(value = Math.random().toString(36).substring(7))
                .then()
                    .object(object.setWith(value)).isEqualTo(object)
                    .string(object.value).isEqualTo(value)
            ;
        },

        testIsEqualTo: function() {
            var object, message, value, wrongValue;

            this
                .if(message = Math.random().toString(36).substring(7))
                .and(object = new testedClass({}))
                .and(object.setWith(value = Math.random().toString(36).substring(7)))
                .then()
                    .error(function() {
                        object.isEqualTo(wrongValue = Math.random().toString(36).substring(7));
                    })
                        .hasName('Failure')
                        .hasMessage(util.format('%s is not equal to %s', value, wrongValue))
                    .object(object.isEqualTo(value)).isEqualTo(object)
        },

        testIsNotEqualTo: function() {
            var object, message, value;

            this
                .if(message = Math.random().toString(36).substring(7))
                .and(object = new testedClass({}))
                .and(object.setWith(value = Math.random().toString(36).substring(7)))
                .then()
                    .error(function() {
                        object.isNotEqualTo(value);
                    })
                        .hasName('Failure')
                        .hasMessage(util.format('%s is equal to %s', value, value))
                    .object(object.isNotEqualTo(Math.random().toString(36).substring(7))).isEqualTo(object)
        },

        testFail: function() {
            var object, message;

            this
                .if(message = Math.random().toString(36).substring(7))
                .and(object = new testedClass({}))
                .then()
                    .error(function() {
                        object.fail(message)
                    })
                        .hasName('Failure')
                        .hasMessage(message)
        }
    };
