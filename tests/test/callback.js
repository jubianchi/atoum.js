var atoum = require('../..')(module),
    testedClass = require('../../lib/test/callback'),
    unit = module.exports = {
        testClass: function() {
            var object;

            this
                .variable(object = testedClass())
                .object(object.controller)
            ;
        }
    };
