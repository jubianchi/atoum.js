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
            this
                .if(message = Math.random().toString(36).substring(7))
                .and(asserter = {})
                .and(reference = 'bar\nfoo')
                .and(data = 'foo\nbar\nbar')
                .and(object = new testedClass(message, asserter, reference, data))
                .then()
                .string(object.toString()).isEqualTo(
                    "Strings are not equal\n"
                        .concat(color.bgRed.white(" - Reference ")).concat(" ").concat(color.bgGreen.white(" + Data "))
                        .concat("\n\n")
                        .concat(color.bgXterm(238).white(" R  D ")).concat("\n")
                        .concat(color.bgXterm(238).white("    1 ")).concat(" ").concat(color.bgGreen.white("foo")).concat("\n")
                        .concat(color.bgXterm(238).white(" 1  2 ")).concat(" bar").concat("\n")
                        .concat(color.bgXterm(238).white(" 2    ")).concat(" ").concat(color.bgRed.white("foo")).concat("\n")
                        .concat(color.bgXterm(238).white("    3 ")).concat(" ").concat(color.bgGreen.white("bar")).concat("\n")
                )
                .if(reference = Math.random().toString(36).substring(7))
                .and(data = Math.random().toString(36).substring(7))
                .and(object = new testedClass(message, asserter, reference, data))
                .then()
                .string(object.toString()).isEqualTo(
                    "Strings are not equal\n"
                        .concat(color.bgRed.white(" - Reference ")).concat(" ").concat(color.bgGreen.white(" + Data "))
                        .concat("\n\n")
                        .concat(color.bgXterm(238).white(" R  D ")).concat("\n")
                        .concat(color.bgXterm(238).white(" 1    ")).concat(" ").concat(color.bgRed.white(reference)).concat("\n")
                        .concat(color.bgXterm(238).white("    1 ")).concat(" ").concat(color.bgGreen.white(data)).concat("\n")
                )
            ;

            var object, message, asserter, reference, data;
        }
    };
