var atoum = require('../..')(module),
    testedClass = require('../../lib/asserter/exception'),
    unit = module.exports = {
        testClass: function() {
            var object, message, asserter;

            this
                .if(message = Math.random().toString(36).substring(7))
                .and(asserter = {})
                .and(object = new testedClass(message, asserter))
                .then()
                    .string(object.name).isEqualTo('Failure')
                    .string(object.message).isEqualTo(message)
                    .string(object.stack)
                    .object(object.asserter).isIdenticalTo(asserter)
            ;
        },

        testTostring: function() {
            var object, message, asserter;

            this
                .if(message = Math.random().toString(36).substring(7))
                .and(asserter = {})
                .and(object = new testedClass(message, asserter))
                .then()
                    .string(object.toString()).isEqualTo(object.message + '\n' + object.stack)
            ;
        }
    };
