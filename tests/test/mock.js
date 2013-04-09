var atoum = require('../..')(module),
    callback = require('../../lib/test/callback'),
    testedClass = require('../../lib/test/mock'),
    unit = module.exports = {
        testClass: function() {
            var object;

            this
                .function(object = testedClass(function () {}))
            ;
        },

        testMockPrototype: function() {
            var cls, mock, instance, returned, args, cb, otherCb;

            this
                .if(cls = function cls() { this.prop = null; })
                .and(returned = Math.random().toString(36).substring(7))
                .and(cls.prototype = {
                    method: (cb = callback(function() {
                        return returned;
                    })),
                    otherMethod: (otherCb = callback(function() {
                        return this;
                    }))
                })
                .and(args = [ 'foo', 'bar' ])
                .then()
                    .function(mock = testedClass(cls)).hasName('mock')
                    .object(mock.prototype).isInstanceOf(cls)
                    .object(instance = new mock()).isInstanceOf(cls)
                        .hasMethod('method')
                        .hasMethod('otherMethod')
                    .variable(instance.method(args[0], args[1])).isIdenticalTo(returned)
                    .callback(cb).wasCalled().withArguments(args)
                    .object(instance.otherMethod()).isIdenticalTo(instance)
                    .callback(otherCb).wasCalled().withoutArgument()
            ;
        }
    };
