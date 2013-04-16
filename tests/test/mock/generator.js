var atoum = require('../../..')(module),
    callback = require('../../../lib/test/callback'),
    testedClass = require('../../../lib/test/mock/generator'),
    unit = module.exports = {
        testGenerate: function() {
            var object, cls, mock, instance, returned, args, method, otherMethod;

            this
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
                .and(object = new testedClass())
                .then()
                    .function(mock = object.generate(cls)).hasName('mock')
                    .object(mock.prototype).isInstanceOf(cls)
                    .object(instance = new mock()).isInstanceOf(cls).hasMethod('method').hasMethod('otherMethod')
                    .variable(instance.method(args[0], args[1])).isIdenticalTo(returned)
                    .callback(method).wasCalled().withArguments(args)
                    .object(instance.otherMethod()).isIdenticalTo(instance)
                    .callback(otherMethod).wasCalled().withoutArgument()
            ;
        }
    };
