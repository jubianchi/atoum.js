var testedClass = require('../lib/atoum'),
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
            var wasRun, runner, object;

            this
                .if(wasRun = false)
                .if(runner = { run: function() { wasRun = true; } })
                .and(object = new testedClass(runner))
                .then()
                    .object(object.run()).isIdenticalTo(object)
                    .bool(wasRun).isTrue()
            ;
        }
    };
