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
            var run, setLoop, runner, object;

            this
                .if(runner = { 'run': (run = callback()), 'setLoop': (setLoop = callback(function() { return runner; })) })
                .and(object = new testedClass(runner))
                .then()
                    .object(object.run('path', false)).isIdenticalTo(object)
                    .callback(run).wasCalled().withArguments([ 'path' ])
                    .callback(setLoop).wasCalled().withArguments(false)
            ;
        }
    };
