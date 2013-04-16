var atoum = require('../../..')(module),
    callback = require('../../../lib/test/callback'),
    testedClass = require('../../../lib/test/mock/controller'),
    unit = module.exports = {
        testClass: function() {
            var object, mock;

            this
                .if(mock = {})
                .then()
                    .object(object = new testedClass(mock))
                    .object(object.mock).isIdenticalTo(mock)
                    .object(object.args).isEmpty()
            ;
        },

        testRun: function() {
            var controller, mockInstance, returned, method, args;

            this
                .if(returned = Math.random().toString(36).substring(7))
                .and(mockInstance = {
                    "method": method = callback(function () { return returned; })
                })
                .and(controller = new testedClass(mockInstance))
                .then()
                    .variable(controller.run('method', method)).isIdenticalTo(returned)
                    .callback(mockInstance.method).wasCalled().withoutArgument()
                    .object(controller.args).hasLength(1).hasMember('method')
                    .array(controller.args.method).hasLength(1)
                    .array(controller.args.method[0]).isEmpty()
                .if(args = ['foo', 'bar'])
                .then()
                    .variable(controller.run('method', method, args)).isIdenticalTo(returned)
                    .callback(mockInstance.method).wasCalled().withArguments(args[0], args[1])
                    .object(controller.args).hasLength(1).hasMember('method')
                    .array(controller.args.method).hasLength(2)
                    .array(controller.args.method[1]).isEqualTo(args)
            ;
        },

        testOverride: function() {
            var controller, mockInstance, method, overridden, unknown;

            this
                .if(mockInstance = { "method": method = callback() })
                .and(controller = new testedClass(mockInstance))
                .then()
                    .object(controller.override('method', overridden = callback(function() { return this; }))).isIdenticalTo(controller)
                    .object(controller.run('method', method)).isIdenticalTo(mockInstance)
                    .callback(method).wasNotCalled()
                    .callback(overridden).wasCalled().withoutArgument()
                .if(controller = new testedClass(mockInstance))
                .then()
                    .and(controller.override('unknown', unknown = callback(function() { return this; })))
                    .object(controller.run('unknown')).isIdenticalTo(mockInstance)
                    .callback(unknown).wasCalled().withoutArgument()
                .if(mockInstance = { "method": method = callback() })
                .and(controller = new testedClass(mockInstance))
                .and(mockInstance.controller = controller)
                .and(controller.override('method', method = callback(function() { return this; })))
                .then()
                    .object(mockInstance.method()).isIdenticalTo(mockInstance)
                    .callback(method).wasCalled().withoutArgument()
            ;
        }
    };
