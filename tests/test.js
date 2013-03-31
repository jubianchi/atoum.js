var test = require('../lib/test')
    unit = module.exports = {
        testClass: function() {
            var object;

            this
                .if(testClass = Math.random().toString(36).substring(7))
                .then()
                    .object(object = new test(testClass)).isInstanceOf(test)
                    .string(object.class).isEqualTo(testClass)
            ;
        },

        testIfAndThen: function() {
            var object;

            this
                .if(testClass = Math.random().toString(36).substring(7))
                .and(object = new test(testClass))
                .then()
                    .object(object.if()).isIdenticalTo(object)
                    .object(object.and()).isIdenticalTo(object)
                    .object(object.then()).isIdenticalTo(object)
        },

        testFail: function() {
            var message, object;

            this
                .if(testClass = Math.random().toString(36).substring(7))
                .and(message = Math.random().toString(36).substring(7))
                .and(object = new test(testClass))
                .then()
                    .error(function() {
                        object.fail(message)
                    })
                        .hasName('Failure')
                        .hasMessage(message)
        }
    };
