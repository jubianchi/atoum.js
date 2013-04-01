var callback = require('../lib/test/callback'),
    testedClass = require('../lib/atoum'),
    unit = module.exports = {
        testClass: function() {
            var runner, object;

            this
                .if(runner = {})
                .then()
                    .object(object = new testedClass(runner))
                    .string(object.version).isEqualTo('dev-alpha')
                    .object(object.runner).isIdenticalTo(runner)
            ;
        },

        testRun: function() {
            var cb, runner, object;

            this
                .if(runner = { run: cb = callback() })
                .and(object = new testedClass(runner))
                .then()
                    .object(object.run()).isIdenticalTo(object)
                    .callback(cb).wasRun()
            ;
        }
    };
