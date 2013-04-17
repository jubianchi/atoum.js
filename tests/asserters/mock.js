var util = require('util'),
    atoum = require('../..')(module),
    testedClass = require('../../lib/asserters/mock'),
    unit = module.exports = {
        testClass: function() {
            var object, generator;

            this
                .if(generator = {})
                .then()
                    .object(object = new testedClass(generator))
                    .object(object.generator).isEqualTo(generator)
            ;
        },

        testSetWith: function() {
            var object, mockClass, mockInstance;

            this
                .if(mockInstance = {})
                .and(object = new testedClass({}))
                .then()
                    .error(function() {
                        object.setWith(mockInstance);
                    })
                        .hasName('Failure')
                        .hasMessage('Value is not a mock')
                .if(mockClass = this.generateMock())
                .and(mockInstance = new mockClass())
                .then()
                    .object(object.setWith(mockInstance)).isIdenticalTo(object)
            ;
        }
    };