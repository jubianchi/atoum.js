var util = require('util'),
    atoum = require('../..')(module),
    array = require('../../lib/asserters/array'),
    testedClass = require('../../lib/asserters/object'),
    unit = module.exports = {
        testClass: function() {
            var generator, object;

            this
                .if(generator = {})
                .then()
                    .object(object = new testedClass(generator)).isInstanceOf(array)
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
                    .object(object.setWith(value)).isEqualTo(object)
                    .object(object.value).isEqualTo(value)
            ;
        },

        testIsInstanceOf: function() {
            var object, cls, otherCls, value;

            this
                .if(object = new testedClass({}))
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
                .if(object = new testedClass({}))
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
                .if(object = new testedClass({}))
                .and(object.setWith(value = {}))
                .then()
                    .error(function() {
                        object.isIdenticalTo({});
                    })
                        .hasName('Failure')
                        .hasMessage(util.format('%s is not identical to %s', value, value))
                    .object(object.isIdenticalTo(value)).isEqualTo(object)
            ;
        },

        testIsNotIdenticalTo: function() {
            var object, value;

            this
                .if(object = new testedClass({}))
                .and(object.setWith(value = {}))
                .then()
                    .error(function() {
                        object.isNotIdenticalTo(value);
                    })
                        .hasName('Failure')
                        .hasMessage(util.format('%s is identical to %s', value, value))
                    .object(object.isNotIdenticalTo({})).isEqualTo(object)
            ;
        }
    };
