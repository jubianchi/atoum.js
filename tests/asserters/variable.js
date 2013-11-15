var util = require('util'),
    atoum = require('../..')(module),
    asserter = require('../../lib/asserter'),
    Generator = require('../../lib/asserter/generator'),
    testedClass = require('../../lib/asserters/variable'),
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
                    .error(function() {
                        object.setWith(value)
                    })
                        .hasName('Failure')
                        .hasMessage('Value is undefined')
                .if(value = {})
                .then()
                    .object(object.setWith(value)).isIdenticalTo(object)
                    .object(object.value).isIdenticalTo(value)
                .if(value = [])
                .then()
                    .object(object.setWith(value)).isIdenticalTo(object)
                    .array(object.value).isIdenticalTo(value)
                .if(value = Math.random().toString(36).substring(7))
                .then()
                    .object(object.setWith(value)).isIdenticalTo(object)
                    .string(object.value).isEqualTo(value)
            ;
        },

        testIsEqualTo: function() {
            var object, message, value, wrongValue;

            this
                .if(message = Math.random().toString(36).substring(7))
                .and(object = new testedClass(new Generator()))
                .and(object.setWith(value = Math.random().toString(36).substring(7)))
                .then()
                    .error(function() {
                        object.isEqualTo(wrongValue = Math.random().toString(36).substring(7));
                    })
                        .hasName('Failure')
                        .hasMessage(util.format('%s is not equal to %s', value, wrongValue))
                    .object(object.isEqualTo(value)).isIdenticalTo(object)
        },

        testIsNotEqualTo: function() {
            var object, message, value;

            this
                .if(message = Math.random().toString(36).substring(7))
                .and(object = new testedClass(new Generator()))
                .and(object.setWith(value = Math.random().toString(36).substring(7)))
                .then()
                    .error(function() {
                        object.isNotEqualTo(value);
                    })
                        .hasName('Failure')
                        .hasMessage(util.format('%s is equal to %s', value, value))
                    .object(object.isNotEqualTo(Math.random().toString(36).substring(7))).isIdenticalTo(object)
        },

        testFail: function() {
            var object, message;

            this
                .if(message = Math.random().toString(36).substring(7))
                .and(object = new testedClass(new Generator()))
                .then()
                    .error(function() {
                        object.fail(message)
                    })
                        .hasName('Failure')
                        .hasMessage(message)
        },

        testIsFalsy: function() {
            var object, value;

            this
                .if(object = new testedClass(new Generator()))
                .and(object.setWith(value = 1))
                .then()
                    .error(function() {
                        object.isFalsy();
                    })
                        .hasName('Failure')
                        .hasMessage(util.format('%s is not false', value))
                    .object(object.setWith(0).isFalsy()).isIdenticalTo(object)
                    .object(object.setWith(0.0).isFalsy()).isIdenticalTo(object)
                    .object(object.setWith('').isFalsy()).isIdenticalTo(object)
                    .object(object.setWith(null).isFalsy()).isIdenticalTo(object)
                    .object(object.setWith({}).isFalsy()).isIdenticalTo(object)
                    .object(object.setWith([]).isFalsy()).isIdenticalTo(object)
                    .object(object.setWith([ 0 ]).isFalsy()).isIdenticalTo(object)
                    .object(object.setWith(NaN).isFalsy()).isIdenticalTo(object)
            ;
        },

        testIsTruthy: function() {
            var object, value;

            this
                .if(object = new testedClass(new Generator()))
                .and(object.setWith(value = 0))
                .then()
                    .error(function() {
                        object.isTruthy();
                    })
                        .hasName('Failure')
                        .hasMessage(util.format('%s is not true', value))
                    .object(object.setWith(1).isTruthy()).isIdenticalTo(object)
                    .object(object.setWith(0.1).isTruthy()).isIdenticalTo(object)
                    .object(object.setWith(Math.random().toString(36).substring(7)).isTruthy()).isIdenticalTo(object)
                    .object(object.setWith({ foo: 'bar' }).isTruthy()).isIdenticalTo(object)
                    .object(object.setWith([ 0, 1 ]).isTruthy()).isIdenticalTo(object)
            ;
        },

        testIsIdenticalTo: function() {
            var object, value;

            this
                .if(object = new testedClass(new Generator()))
                .and(object.setWith(value = 0))
                .then()
                    .error(function() {
                        object.isIdenticalTo(value.toString());
                    })
                        .hasName('Failure')
                        .hasMessage(util.format('%s is not identical to %s', value, value))
                    .object(object.isIdenticalTo(value)).isIdenticalTo(object)
            ;
        },

        testIsNotIdenticalTo: function() {
            var object, value;

            this
                .if(object = new testedClass(new Generator()))
                .and(object.setWith(value = 0))
                .then()
                    .error(function() {
                        object.isNotIdenticalTo(value);
                    })
                        .hasName('Failure')
                        .hasMessage(util.format('%s is identical to %s', value, value))
                    .object(object.isNotIdenticalTo(value.toString())).isIdenticalTo(object)
            ;
        },

        testIsEmpty: function() {
            var object, value;

            this
                .if(object = new testedClass(new Generator()))
                .and(object.setWith(value = Math.random().toString(36).substring(7)))
                .then()
                    .error(function() {
                        object.isEmpty(value);
                    })
                        .hasName('Failure')
                        .hasMessage(util.format('%s is not empty', value))
                .if(object.setWith(''))
                .then()
                    .object(object.isEmpty()).isIdenticalTo(object)
                .if(object.setWith([]))
                .then()
                    .object(object.isEmpty()).isIdenticalTo(object)
                .if(object.setWith({}))
                .then()
                    .object(object.isEmpty()).isIdenticalTo(object)
            ;
        },

        testIsNull: function() {
            var object, value;


            this
                .if(object = new testedClass(new Generator()))
                .and(object.setWith(value = Math.random().toString(36).substring(7)))
                .then()
                    .error(function() {
                        object.isNull();
                    })
                        .hasName('Failure')
                        .hasMessage(util.format('%s is not null', value))
                .if(object.setWith(null))
                .then()
                    .object(object.isNull()).isIdenticalTo(object)
        },

        testIsNotNull: function() {
            var object;


            this
                .if(object = new testedClass(new Generator()))
                .and(object.setWith(null))
                .then()
                    .error(function() {
                        object.isNotNull();
                    })
                        .hasName('Failure')
                        .hasMessage('Value is null')
                .if(object.setWith(Math.random().toString(36).substring(7)))
                .then()
                    .object(object.isNotNull()).isIdenticalTo(object)
        }
    };
