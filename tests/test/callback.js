var atoum = require('../..'),
    testedClass = atoum.require('lib/test/callback', module),
    unit = module.exports = {
        testClass: function() {
            var object;

            this
                .variable(object = testedClass())
                .object(object.controller)
            ;
        }
    };
