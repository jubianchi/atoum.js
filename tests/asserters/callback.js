var util = require('util'),
    atoum = require('../..')(module),
    Generator = require('../../lib/asserter/generator'),
    func = require('../../lib/asserters/function'),
    testedClass = require('../../lib/asserters/callback'),
    unit = module.exports = {
        testClass: function() {
            var object, generator;

            this
                .if(generator = new Generator())
                .then()
                    .object(object = new testedClass(generator)).isInstanceOf(func)
                    .object(object.generator).isIdenticalTo(generator)
            ;
        },

        testWasCalled: function() {
            var object, value;

            this
                .if(value = this.generateCallback())
                .and(object = new testedClass(new Generator()))
                .and(object.setWith(value))
                .then()
                    .error(function() {
                        object.wasCalled()
                    })
                        .hasName('Failure')
                        .hasMessage('Callback was not called')
                .if(value())
                .then()
                    .object(object.wasCalled()).isIdenticalTo(object)
            ;
        },

        testWasNotCalled: function() {
            var object, value;

            this
                .if(value = this.generateCallback())
                .and(object = new testedClass(new Generator()))
                .and(object.setWith(value))
                .then()
                    .object(object.wasNotCalled()).isIdenticalTo(object)
                .if(value())
                .then()
                    .error(function() {
                        object.wasNotCalled()
                    })
                        .hasName('Failure')
                        .hasMessage('Callback was called')
            ;
        },

        testSetWith: function() {
            var object, value;

            this
                .if(object = new testedClass(new Generator()))
                .then()
                    .error(function() {
                        object.setWith(value)
                    })
                        .hasName('Failure')
                        .hasMessage('undefined is not a function')
                .if(value = {})
                .then()
                    .error(function() {
                        object.setWith(value)
                    })
                        .hasName('Failure')
                        .hasMessage('[object Object] is not a function')
                .if(value = this.generateCallback())
                .then()
                    .object(object.setWith(value)).isIdenticalTo(object)
                    .variable(object.value).isEqualTo(value)
            ;
        },

        testWithArguments: function() {
            var object, value, args, otherArgs;

            this
                .if(value = this.generateCallback())
                .and(object = new testedClass(new Generator()))
                .and(object.setWith(value))
                .and(value.apply(value, args = ['foo', 'bar']))
                .then()
                    .object(object.withArguments(args)).isIdenticalTo(object)
                    .object(object.withArguments(args[0], args[1])).isIdenticalTo(object)
                    .error(function() {
                        object.withArguments(args[1], args[0]);
                    })
                        .hasName('Failure')
                        .hasMessage('Callback was not called with arguments ' + [args[1], args[0]].join(','))
                .if(value = this.generateCallback())
                .and(object.setWith(value))
                .and(value.apply(value, args = ['foo', 'bar']))
                .and(value.apply(value, otherArgs = ['lorem', 'ipsum']))
                .then()
                    .object(object.withArguments(args)).isIdenticalTo(object)
                    .object(object.withArguments(otherArgs)).isIdenticalTo(object)
            ;
        },

        testWithoutArgument: function() {
            var object, value, args;

            this
                .if(value = this.generateCallback())
                .and(object = new testedClass(new Generator()))
                .and(object.setWith(value))
                .and(value.apply(value, args = ['foo', 'bar']))
                .then()
                    .error(function() {
                        object.withoutArgument();
                    })
                        .hasName('Failure')
                        .hasMessage('Callback was not called without argument')
                .if(value.call(value))
                .then()
                    .object(object.withoutArgument()).isIdenticalTo(object)
            ;
        }
    };