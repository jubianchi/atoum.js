var runner = module.exports = {
    testClass: function() {
        var runner = require('../lib/runner'),
            stdout, generator, object;

        this
            .if(generator = {})
            .and(stdout = {})
            .then()
                .object(object = new runner(stdout, generator)).isInstanceOf(runner)
                .object(object.stdout).isIdenticalTo(stdout)
                .object(object.generator).isIdenticalTo(generator)
        ;
    }
};
