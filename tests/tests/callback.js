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
            var object, callback, args;

            this
                .if(object = testedClass())
                .then()
                    .bool(object.controller.wasRun).isFalse()
                    .undefined(object())
                    .bool(object.controller.wasRun).isTrue()
                .if(callback = testedClass())
                .and(object = testedClass(callback))
                .and(object(args = ['foo', 'bar']))
                .then()
                    .callback(callback).wasCalled().withArguments(args)
            ;
        }
    };
