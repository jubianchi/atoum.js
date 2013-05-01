var atoum = require('../../..')(module),
    callback = require('../../../lib/test/callback'),
    testedClass = require('../../../lib/test/mock/generator'),
    unit = module.exports = {
        testGenerate: function() {
            var generator, cls, mockClass, mockInstance, returned, args, method, otherMethod;

            this
                .if(generator = new testedClass())
                .and(cls = undefined)
                .then()
                    .function(mockClass = generator.generate(cls)).hasName('mock')
                    .object(mockClass.prototype).isInstanceOf(Object)
                    .object(new mockClass()).isInstanceOf(mockClass)
                .if(cls = function cls() { this.prop = null; })
                .and(returned = Math.random().toString(36).substring(7))
                .and(cls.prototype = {
                    "method": (method = callback(function() {
                        return returned;
                    })),

                    "otherMethod": (otherMethod = callback(function() {
                        return this;
                    }))
                })
                .and(args = [ 'foo', 'bar' ])
                .then()
                    .function(mockClass = generator.generate(cls)).hasName('mock')
                    .object(mockClass.prototype).isInstanceOf(cls)
                    .object(mockInstance = new mockClass()).isInstanceOf(cls).hasMethod('method').hasMethod('otherMethod')
                    .variable(mockInstance.method(args[0], args[1])).isIdenticalTo(returned)
                    .callback(method).wasCalled().withArguments(args)
                    .object(mockInstance.otherMethod()).isIdenticalTo(mockInstance)
                    .callback(otherMethod).wasCalled().withoutArgument()
            ;
        }
    };
