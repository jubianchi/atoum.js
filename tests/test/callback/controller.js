var atoum = require('../../..')(module),
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
            var object, code, args, returned, scope;

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
                .if(code = this.generateCallback())
                .and(object = new testedClass(code))
                .then()
                    .undefined(object.run())
                    .callback(code).wasCalled().withoutArgument()
                .if(code = this.generateCallback())
                .and(object = new testedClass(code))
                .then()
                    .undefined(object.run(args[0], args[1]))
                    .callback(code).wasCalled().withArguments(args)
                .if(returned = Math.random().toString(36).substring(7))
                .and(code = this.generateCallback(function() { return returned; }))
                .and(object = new testedClass(code))
                .then()
                    .variable(object.run()).isIdenticalTo(returned)
                    .callback(code).wasCalled().withoutArgument()
                .if(code = this.generateCallback(function() { return this; }))
                .and(object = new testedClass(code))
                .then()
                    .object(object.run()).isIdenticalTo(object)
                .if(scope = {})
                .and(object.scope = scope)
                .then()
                    .object(object.run()).isIdenticalTo(scope)
            ;
        }
    };
