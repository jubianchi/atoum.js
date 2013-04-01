var testedClass = require('../lib/runner'),
    unit = module.exports = {
    testClass: function() {
        var stdout, generator, object;

        this
            .if(generator = {})
            .and(stdout = {})
            .then()
                .object(object = new testedClass(stdout, generator))
                .object(object.stdout).isIdenticalTo(stdout)
                .object(object.generator).isIdenticalTo(generator)
        ;
    }
};
