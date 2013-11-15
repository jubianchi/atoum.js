var util = require('util'),
    diff = require('diff'),
    atoum = require('../..')(module),
    Generator = require('../../lib/asserter/generator'),
    variable = require('../../lib/asserters/variable'),
    testedClass = require('../../lib/asserters/string'),
    unit = module.exports = {
        testClass: function() {
            var generator, object;

            this
                .if(generator = new Generator())
                .then()
                    .object(object = new testedClass(generator)).isInstanceOf(variable)
                    .object(object.generator).isIdenticalTo(generator)
            ;
        },

        testSetWith: function() {
            var object, value;

            this
                .if(object = new testedClass(new Generator()))
                .then()
                    .error(function() {
                        object.setWith(value)
                    })
                        .hasName('Failure')
                        .hasMessage('undefined is not a string')
                .if(value = {})
                .then()
                    .error(function() {
                        object.setWith(value)
                    })
                        .hasName('Failure')
                        .hasMessage('[object Object] is not a string')
                .if(value = Math.random().toString(36).substring(7))
                .then()
                    .object(object.setWith(value)).isIdenticalTo(object)
                    .string(object.value).isEqualTo(value)
            ;
        },

        testHasLength: function() {
            var object, value;

            this
                .if(object = new testedClass(new Generator()))
                .and(object.setWith(''))
                .then()
                    .object(object.hasLength(0)).isIdenticalTo(object)
                .if(object.setWith(value = Math.random().toString(36).substring(7)))
                .then()
                    .error(function() {
                        object.hasLength(0);
                    })
                        .hasName('Failure')
                        .hasMessage(util.format('%s has not length 0', value))
                    .object(object.hasLength(value.length)).isIdenticalTo(object)
            ;
        },

        testIsEqualTo: function() {
            var object, value, wrongValue;

            this
                .if(object = new testedClass(new Generator()))
                .and(value = Math.random().toString(36).substring(7))
                .and(wrongValue = Math.random().toString(36).substring(7))
                .and(object.setWith(wrongValue))
                .then()
                    .error(function() {
                        object.isEqualTo(value);
                    })
                        .hasName('Failure')
                        .hasMessage(util.format('String %s is not equal to %s', wrongValue, value))
            ;
        },

        testContains: function() {
            var object, value, wrongValue;

            this
                .if(object = new testedClass(new Generator()))
                .and(value = Math.random().toString(36).substring(7))
                .and(wrongValue = Math.random().toString(36).substring(7))
                .and(object.setWith(value))
                .then()
                    .error(function() {
                        object.contains(wrongValue);
                    })
                        .hasName('Failure')
                        .hasMessage(util.format('String %s does not contain %s', value, wrongValue))
                    .object(object.contains(value.substring(0, 5))).isIdenticalTo(object)
            ;
        }
    };
