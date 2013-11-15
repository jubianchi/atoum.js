var atoum = require('../..')(module),
    util = require('util'),
    Generator = require('../../lib/asserter/generator'),
    obj = require('../../lib/asserters/object'),
    testedClass = require('../../lib/asserters/array'),
    unit = module.exports = {
        testClass: function() {
            var object, generator;

            this
                .if(generator = new Generator())
                .then()
                    .object(object = new testedClass(generator)).isInstanceOf(obj)
                    .object(object.generator).isEqualTo(generator)
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
                        .hasMessage('undefined is not an array')
                .if(value = {})
                .then()
                    .error(function() {
                        object.setWith(value)
                    })
                        .hasName('Failure')
                        .hasMessage('[object Object] is not an array')
                .if(value = [])
                .then()
                    .object(object.setWith(value)).isIdenticalTo(object)
                    .array(object.value).isEqualTo(value)
            ;
        },

        testHasLength: function() {
            var object;

            this
                .if(object = new testedClass(new Generator()))
                .and(object.setWith([]))
                .then()
                    .object(object.hasLength(0)).isIdenticalTo(object)
                .if(object.setWith([ 0 ]))
                .then()
                    .error(function() {
                        object.hasLength(0);
                    })
                        .hasName('Failure')
                        .hasMessage('Array(1) has not length 0')
                    .object(object.hasLength(1)).isIdenticalTo(object)
            ;
        },

        testIsEqualTo: function() {
            var object, value, wrongValue;

            this
                .if(object = new testedClass(new Generator()))
                .and(object.setWith(value = [ 'foobar' ]))
                .then()
                    .error(function() {
                        object.isEqualTo(wrongValue = [ Math.random().toString(36).substring(7) ]);
                    })
                        .hasName('Failure')
                        .hasMessage(util.format('%s is not equal to %s', value, wrongValue))
                    .object(object.isEqualTo([ 'foobar' ])).isIdenticalTo(object)
                .if(object.setWith(value = [ Math.random().toString(36).substring(7), Math.random().toString(36).substring(7) ]))
                .then()
                    .error(function() {
                        object.isEqualTo(wrongValue = []);
                    })
                        .hasName('Failure')
                        .hasMessage(util.format('%s is not equal to %s', value, wrongValue))
                .if(object.setWith(value = [ undefined ]))
                .then()
                    .object(object.isEqualTo(value)).isIdenticalTo(object)
                    .object(object.isEqualTo([ undefined ])).isIdenticalTo(object)
            ;
        }
    };
