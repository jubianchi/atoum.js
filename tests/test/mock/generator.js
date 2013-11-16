var atoum = require('../../..')(module),
    testedClass = require('../../../lib/test/mock/generator'),
    unit = module.exports = {
        testGenerate: function() {
            var generator, cls, mockClass, mockInstance, returned, args, method, otherMethod;

            this
                .if(generator = new testedClass())
                .then()
                    .function(mockClass = generator.generate()).hasName('mock')
                    .object(mockClass.prototype).isInstanceOf(Object)
                    .object(new mockClass()).isInstanceOf(mockClass)
                .if(cls = function cls() { this.prop = null; })
                .and(returned = Math.random().toString(36).substring(7))
                .and(cls.prototype = {
                    "method": (method = this.generateCallback(function() {
                        return returned;
                    })),

                    "otherMethod": (otherMethod = this.generateCallback(function() {
                        return this;
                    }))
                })
                .and(args = [ 'foo', 'bar' ])
                .then()
                    .function(mockClass = generator.generate(cls)).hasName('mock')
                    .object(mockClass.prototype).isInstanceOf(cls)
                    .object(mockInstance = new mockClass())
                        .isInstanceOf(cls)
                        .hasMethod('method')
                        .hasMethod('otherMethod')
                    .variable(mockInstance.method(args[0], args[1])).isIdenticalTo(returned)
                    .callback(method).wasCalled().withArguments(args)
                    .object(mockInstance.otherMethod()).isIdenticalTo(mockInstance)
                    .callback(otherMethod).wasCalled().withoutArgument()
                .if(cls = {
                    "method": (method = this.generateCallback(function() {
                        return returned;
                    })),

                    "otherMethod": (otherMethod = this.generateCallback(function() {
                        return this;
                    }))
                })
                .then()
                    .function(mockClass = generator.generate(cls)).hasName('mock')
                    .object(mockClass.prototype).isIdenticalTo(cls)
                    .object(mockInstance = new mockClass())
                        .hasMethod('method')
                        .hasMethod('otherMethod')
                    .variable(mockInstance.method(args[0], args[1])).isIdenticalTo(returned)
                    .callback(method).wasCalled().withArguments(args)
                    .object(mockInstance.otherMethod()).isIdenticalTo(mockInstance)
                    .callback(otherMethod).wasCalled().withoutArgument()
            ;
        }
    };
