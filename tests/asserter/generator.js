var atoum = require('../..')(module),
    testedClass = require('../../lib/asserter/generator'),
    unit = module.exports = {
        testClass: function() {
            var object;

            this
                .if(object = new testedClass())
                .then()
                    .object(object.asserters).isNotEmpty()
                    .object(object.aliases)
                        .hasMember('if')
                        .hasMember('and')
                        .hasMember('then')
                        .hasMember('dump')
                    .number(object.assertionsCount).isEqualTo(0)
            ;
        },

        testReset: function() {
            var object;

            this
                .if(object = new testedClass())
                .and(object.assertionsCount = 5)
                .then()
                    .object(object.reset()).isIdenticalTo(object)
                    .number(object.assertionsCount).isEqualTo(0)
                    .object(object.asserters).isNotEmpty()
                    .object(object.aliases).isNotEmpty()
            ;
        },

        testSkip: function() {
            var object, test, message;

            this
                .if(object = new testedClass())
                .and(test = {})
                .and(message = Math.random().toString(36).substring(7))
                .and(object.injectInto(test))
                .then()
                    .error(function() {
                        test.skip(message, function() { return true; });
                    })
                        .hasName('Skipped')
                        .hasMessage(message)
                    .object(test.skip(message, function() { return false; })).isIdenticalTo(test)
            ;
        }
    };
