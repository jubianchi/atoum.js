var test = require('../lib/test')
    unit = module.exports = {
        testClass: function() {
            var object;

            this
                .if(testClass = Math.random().toString(36).substring(7))
                .then()
                    .object(object = new test(testClass)).isInstanceOf(test)
                    .string(object.class).isEqualTo(testClass)
            ;
        }
    };
