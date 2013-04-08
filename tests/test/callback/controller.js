var atoum = require('../../..')(module),
    callback = require('../../../lib/test/callback'),
    testedClass = require('../../../lib/test/callback/controller'),
    unit = module.exports = {
        testClass: function() {
            var object, code;

            this
                .if(object = new testedClass())
                .then()
                    .undefined(object.code)
                    .array(object.args).isEmpty()
                .if(code = function() {})
                .and(object = new testedClass(code))
                .then()
                    .variable(object.code).isIdenticalTo(code)
            ;
        },

        testRun: function() {
            var object, code, args, returned;

            this
                .if(object = new testedClass())
                .then()
                    .undefined(object.run())
                    .array(object.args).hasLength(1)
                    .array(object.args[0]).isEmpty()
                .if(object = new testedClass())
                .and(args = [ 'foo', 'bar' ])
                .then()
                    .undefined(object.run(args[0], args[1]))
                    .array(object.args).hasLength(1)
                    .array(object.args[0]).isEqualTo(args)
                .if(code = callback())
                .and(object = new testedClass(code))
                .then()
                    .undefined(object.run())
                    .callback(code).wasCalled().withoutArgument()
                .if(code = callback())
                .and(object = new testedClass(code))
                .then()
                    .undefined(object.run(args[0], args[1]))
                    .callback(code).wasCalled().withArguments(args)
                .if(returned = Math.random().toString(36).substring(7))
                .and(code = callback(function() { return returned; }))
                .and(object = new testedClass(code))
                .then()
                    .variable(object.run()).isIdenticalTo(returned)
                    .callback(code).wasCalled().withoutArgument()
            ;
        }
    };
