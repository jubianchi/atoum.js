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
            var object, mock, returned, prototype, args;

            this
                .if(returned = Math.random().toString(36).substring(7))
                .and(mock = {
                    method: prototype = callback(function () { return returned; })
                })
                .and(object = new testedClass(mock))
                .then()
                    .variable(object.run('method', prototype)).isIdenticalTo(returned)
                    .callback(mock.method).wasCalled().withoutArgument()
                    .object(object.args).hasLength(1).hasMember('method')
                    .array(object.args.method).hasLength(1)
                    .array(object.args.method[0]).isEmpty()
                .if(args = ['foo', 'bar'])
                .then()
                    .variable(object.run('method', prototype, args)).isIdenticalTo(returned)
                    .callback(mock.method).wasCalled().withArguments(args[0], args[1])
                    .object(object.args).hasLength(1).hasMember('method')
                    .array(object.args.method).hasLength(2)
                    .array(object.args.method[1]).isEqualTo(args)
            ;
        }
    };
