var runner = module.exports = {
    testClass: function() {
        var runner = require('../lib/runner'),
            stdout, test, object;

        this
            .if(test = {})
            .and(stdout = {})
            .then()
                .object(object = new runner(stdout, test)).isInstanceOf(runner)
                .object(object.stdout).isIdenticalTo(stdout)
                .object(object.test).isIdenticalTo(test)
        ;
    }
};
