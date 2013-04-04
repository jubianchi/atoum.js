var atoum = require('..')(module),
    testedClass = require('../lib/test'),
    unit = module.exports = {
        testClass: function() {
            var object;

            this
                .if(testClass = Math.random().toString(36).substring(7))
                .then()
                    .object(object = new testedClass(testClass))
                    .string(object.class).isEqualTo(testClass)
            ;
        }
    };
