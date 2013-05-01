var atoum = require('../../..')(module),
    testedClass = require('../../../lib/test/engines/concurrent'),
    unit = module.exports = {
        testClass: function() {
            var object, dispatcher;

            this
                .if(dispatcher = {})
                .then()
                    .object(object = new testedClass(dispatcher))
                    .object(object.dispatcher).isIdenticalTo(dispatcher)
            ;
        },

        testGetTestCode: function() {

        }
    };
