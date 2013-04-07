var atoum = require('../../..')(module),
    underscore = require('underscore'),
    color = require('cli-color'),
    diff = require('diff'),
    testedClass = require('../../../lib/asserter/string/exception'),
    unit = module.exports = {
        testClass: function() {
            var object, message, asserter, reference, data;

            this
                .if(message = Math.random().toString(36).substring(7))
                .and(reference = Math.random().toString(36).substring(7))
                .and(data = Math.random().toString(36).substring(7))
                .and(asserter = {})
                .and(object = new testedClass(message, asserter, reference, data))
                .then()
                    .string(object.name).isEqualTo('Failure')
                    .string(object.message).isEqualTo(message)
                    .string(object.reference).isEqualTo(reference)
                    .string(object.data).isEqualTo(data)
                    .string(object.stack)
                    .object(object.asserter).isIdenticalTo(asserter)
            ;
        },

        testTostring: function() {
            var object, message, asserter, reference, data;

            this
                .if(message = Math.random().toString(36).substring(7))
                .and(reference = Math.random().toString(36).substring(7))
                .and(data = Math.random().toString(36).substring(7))
                .and(asserter = {})
                .and(object = new testedClass(message, asserter, reference, data))
                .then()
                    .string(object.toString())
                        .contains('Strings are not equal\n')
                        .contains((function() {
                            var diffcontent = '';

                            underscore.each(
                                diff.diffChars(data, reference),
                                function(value) {
                                    switch(true) {
                                        case value.added:
                                            diffcontent = diffcontent.concat(color.bgRed.white(value.value));
                                            break;

                                        case value.removed:
                                            diffcontent = diffcontent.concat(color.bgGreen.white(value.value));
                                            break;

                                        default:
                                            diffcontent = diffcontent.concat(value.value);
                                            break;
                                    }
                                }
                            );

                            return diffcontent;
                        }()))
            ;
        }
    };
