var atoum = require('../..')(module),
    controller = require('../../lib/test/callback/controller'),
    testedClass = require('../../lib/test/callback'),
    unit = module.exports = {
        testClass: function() {
            var object;

            this
                .function(object = testedClass())
                .object(object.controller).isInstanceOf(controller)
            ;
        }
    };
