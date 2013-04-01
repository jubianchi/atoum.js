var testedClass = require('../../lib/asserter/generator'),
    unit = module.exports = {
        testClass: function() {
            var object;

            this
                .if(object = new testedClass())
                .then()
                    .object(object.asserters).isNotEmpty()
                    .object(object.aliases)
                        .hasMember('if')
                        .hasMember('and')
                        .hasMember('then')
                        .hasMember('dump')
                    .number(object.assertionsCount).isEqualTo(0)
            ;
        },

        testReset: function() {
            var object;

            this
                .if(object = new testedClass())
                .and(object.assertionsCount = 5)
                .then()
                    .object(object.reset()).isIdenticalTo(object)
                    .number(object.assertionsCount).isEqualTo(0)
            ;
        }
    };
