var test = require('../../lib/test'),
    array = require('../../lib/asserters/array'),
    variable = require('../../lib/asserters/variable'),
    unit = module.exports = {
        testClass: function() {
            var unit, object;

            this
                .if(testClass = Math.random().toString(36).substring(7))
                .and(unit = new test(testClass))
                .then()
                    .object(object = new array(unit)).isInstanceOf(variable)
                    .object(object.test).isEqualTo(unit)
            ;
        },

        testSetWith: function() {
            var unit, object, value;

            this
                .if(testClass = Math.random().toString(36).substring(7))
                .and(unit = new test(testClass))
                .and(object = new array(unit))
                .then()
                    .error(function() {
                        object.setWith(value)
                    })
                        .hasName('Failure')
                        .hasMessage('Value is not an array')
                .if(value = {})
                .then()
                    .error(function() {
                        object.setWith(value)
                    })
                        .hasName('Failure')
                        .hasMessage('Value is not an array')
                .if(value = [])
                .then()
                    .object(object.setWith(value)).isEqualTo(object)
                    .array(object.value).isEqualTo(value)
            ;
        },

        testHasLength: function() {
            var unit, object;

            this
                .if(testClass = Math.random().toString(36).substring(7))
                .and(unit = new test(testClass))
                .and(object = new array(unit))
                .and(object.setWith([]))
                .then()
                    .object(object.hasLength(0)).isIdenticalTo(unit)
                .if(object.setWith([ 0 ]))
                .then()
                    .error(function() {
                        object.hasLength(0);
                    })
                        .hasName('Failure')
                        .hasMessage('Array(1) has not length 0')
                    .object(object.hasLength(1)).isIdenticalTo(unit)
            ;
        }
    };
