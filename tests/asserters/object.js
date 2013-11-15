var util = require('util'),
    atoum = require('../..')(module),
    Generator = require('../../lib/asserter/generator'),
    variable = require('../../lib/asserters/variable'),
    testedClass = require('../../lib/asserters/object'),
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
                        .hasMessage('undefined is not an object')
                .if(value = [])
                .then()
                    .error(function() {
                        object.setWith(value)
                    })
                        .hasName('Failure')
                        .hasMessage(util.format('%s is not an object', value))
                .if(value = {})
                .then()
                    .object(object.setWith(value)).isIdenticalTo(object)
                    .object(object.value).isIdenticalTo(value)
            ;
        },

        testIsInstanceOf: function() {
            var object, cls, otherCls, value;

            this
                .if(object = new testedClass(new Generator()))
                .and(cls = function cls() {})
                .and(otherCls = function otherCls() {})
                .and(object.setWith(value = new cls()))
                .then()
                    .error(function() {
                        object.isInstanceOf(otherCls)
                    })
                        .hasName('Failure')
                        .hasMessage(util.format(
                            '[object %s] is not an instance of %s',
                            value.constructor.name,
                            otherCls.name
                        ))
                .object(object.isInstanceOf(cls)).isIdenticalTo(object)
            ;
        },

        testIsNotInstanceOf: function() {
            var object, cls, otherCls, value;

            this
                .if(object = new testedClass(new Generator()))
                .and(cls = function cls() {})
                .and(otherCls = function otherCls() {})
                .and(object.setWith(value = new cls()))
                .then()
                    .error(function() {
                        object.isNotInstanceOf(cls)
                    })
                        .hasName('Failure')
                        .hasMessage(util.format(
                            '[object %s] is an instance of %s',
                            value.constructor.name,
                            cls.name
                        ))
                    .object(object.isNotInstanceOf(otherCls)).isIdenticalTo(object)
            ;
        },

        testIsIdenticalTo: function() {
            var object, value;

            this
                .if(object = new testedClass(new Generator()))
                .and(object.setWith(value = {}))
                .then()
                    .error(function() {
                        object.isIdenticalTo({});
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
                .and(object.setWith(value = {}))
                .then()
                    .error(function() {
                        object.isNotIdenticalTo(value);
                    })
                        .hasName('Failure')
                        .hasMessage(util.format('%s is identical to %s', value, value))
                    .object(object.isNotIdenticalTo({})).isIdenticalTo(object)
            ;
        },

        testIsEqualTo: function() {
            var object, value, expected;

            this
                .if(object = new testedClass(new Generator()))
                .and(object.setWith(value = {}))
                .then()
                    .object(object.isEqualTo(value)).isIdenticalTo(object)
                    .object(object.isEqualTo({})).isIdenticalTo(object)
                .if(expected = { "foo": "foo" })
                .then()
                    .error(function() {
                        object.isEqualTo(expected);
                    })
                        .hasName('Failure')
                        .hasMessage('[object Object] is not equal to [object Object]')
                .if(value = { "child": { "foo": "foo" } })
                .and(expected = { "child": { "foo": "bar" } })
                .and(object.setWith(value))
                .then()
                    .error(function() {
                        object.isEqualTo(expected);
                    })
                        .hasName('Failure')
                        .hasMessage('[object Object] is not equal to [object Object]')
                .if(expected = { "child": { "foo": "foo" } })
                .then()
                    .object(object.isEqualTo(expected)).isIdenticalTo(object)
            ;
        }
    };
