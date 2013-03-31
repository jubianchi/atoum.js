var test = require('../../lib/test'),
    array = require('../../lib/asserters/array'),
    testedClass = require('../../lib/asserters/object'),
    unit = module.exports = {
        testClass: function() {
            var unit, object;

            this
                .if(testClass = Math.random().toString(36).substring(7))
                .and(unit = new test(testClass))
                .then()
                    .object(object = new testedClass(unit)).isInstanceOf(array)
                    .object(object.test).isEqualTo(unit)
            ;
        },

        testSetWith: function() {
            var unit, object, value;

            this
                .if(testClass = Math.random().toString(36).substring(7))
                .and(unit = new test(testClass))
                .and(object = new testedClass(unit))
                .then()
                    .error(function() {
                        object.setWith(value)
                    })
                        .hasName('Failure')
                        .hasMessage('Value is not an object')
                .if(value = [])
                .then()
                    .error(function() {
                        object.setWith(value)
                    })
                        .hasName('Failure')
                        .hasMessage('Value is not an object')
                .if(value = new Object())
                .then()
                    .object(object.setWith(value)).isEqualTo(object)
                    .object(object.value).isEqualTo(value)
            ;
        }
    };
