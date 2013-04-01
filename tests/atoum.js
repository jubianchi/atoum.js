var callback = require('../lib/test/callback'),
    testedClass = require('../lib/atoum'),
    unit = module.exports = {
        testClass: function() {
            var runner, object;

            this
                .if(runner = { setLoop: function() {} })
                .then()
                    .object(object = new testedClass(runner))
                    .string(object.version).isEqualTo('dev-alpha')
                    .object(object.runner).isIdenticalTo(runner)
            ;
        },

        testRun: function() {
            var cbRun, cbSetLoop, runner, object;

            this
                .if(runner = { run: (cbRun = callback()), setLoop: (cbSetLoop = callback(function() { return runner; })) })
                .and(object = new testedClass(runner))
                .then()
                    .object(object.run('path', false)).isIdenticalTo(object)
                    .callback(cbRun).wasCalled().withArguments('path')
                    .callback(cbSetLoop).wasCalled().withArguments(false)
            ;
        }
    };
