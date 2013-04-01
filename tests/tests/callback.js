var testedClass = require('../../lib/test/callback'),
    unit = module.exports = {
        testClass: function() {
            var object;

            this
                .variable(object = testedClass())
                .object(object.controller)
            ;
        },

        testWasRun: function() {
            var object;

            this
                .if(object = testedClass())
                .then()
                    .bool(object.controller.wasRun).isFalse()
                    .undefined(object.call(object))
                    .bool(object.controller.wasRun).isTrue()
            ;
        }
    };
