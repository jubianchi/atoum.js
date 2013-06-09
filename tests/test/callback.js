var atoum = require('../..')(module),
    controller = require('../../lib/test/callback/controller'),
    testedClass = require('../../lib/test/callback'),
    unit = module.exports = {
        testClass: function() {
            var object, otherObject;

            this
                .function(object = testedClass())
                .object(object.controller).isInstanceOf(controller)
                .function(otherObject = new testedClass()).isNotIdenticalTo(object)
                .object(otherObject.controller).isInstanceOf(controller)
            ;
        }
    };
