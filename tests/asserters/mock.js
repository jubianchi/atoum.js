var util = require('util'),
    atoum = require('../..')(module),
    Controller = require('../../lib/test/mock/controller'),
    Generator = require('../../lib/asserter/generator'),
    MockGenerator = require('../../lib/test/mock/generator'),
    testedClass = require('../../lib/asserters/mock'),
    unit = module.exports = {
        testClass: function() {
            var object, generator;

            this
                .if(generator = new Generator())
                .then()
                    .object(object = new testedClass(generator))
                    .object(object.generator).isEqualTo(generator)
            ;
        },

        testSetWith: function() {
            var object, mockClass, mockInstance;

            this
                .if(mockInstance = {})
                .and(object = new testedClass(new Generator()))
                .then()
                    .error(function() {
                        object.setWith(mockInstance);
                    })
                        .hasName('Failure')
                        .hasMessage('Value is not a mock')
                .if(mockClass = function mock() { this.controller = new Controller(); })
                .and(mockInstance = new mockClass())
                .then()
                    .object(object.setWith(mockInstance)).isIdenticalTo(object)
            ;
        },

        testCall: function() {
            var object, mockClass, mockInstance, method, generator;

            this
                .if(mockClass = function() {})
                .and(mockClass.prototype = {
                    foo: function() {}
                })
                .and(generator = new MockGenerator())
                .and(mockInstance = new (generator.generate(mockClass)))
                .and(object = new testedClass(new Generator()))
                .and(method = Math.random().toString(36).substring(7))
                .and(object.setWith(mockInstance))
                .then()
                    .error(function() {
                        object.call(method);
                    })
                        .hasName('Failure')
                        .hasMessage('Method ' + method + ' was not called')
                .if(mockInstance.foo())
                .then()
                    .object(object.call('foo')).isIdenticalTo(object)
            ;
        }
    };