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

        testHeader: function() {
            var object, message, asserter, reference, data;

            this
                .if(message = Math.random().toString(36).substring(7))
                .and(reference = Math.random().toString(36).substring(7))
                .and(data = Math.random().toString(36).substring(7))
                .and(asserter = {})
                .and(object = new testedClass(message, asserter, reference, data))
                .then()
                    .string(object.header()).isEqualTo(
                        color.bgRed.white(" - Reference (" + reference.length + ")")
                            .concat(" ")
                            .concat(color.bgGreen.white(" + Data (" + data.length + ")"))
                            .concat("\n\n")
                            .concat(color.bgRed.white(" R "))
                            .concat(color.bgGreen.white(" D "))
                            .concat("\n")
                    )
                    .string(object.header(5)).isEqualTo(
                        color.bgRed.white(" - Reference (" + reference.length + ")")
                            .concat(" ")
                            .concat(color.bgGreen.white(" + Data (" + data.length + ")"))
                            .concat("\n\n")
                            .concat(color.bgRed.white(" R     "))
                            .concat(color.bgGreen.white(" D     "))
                            .concat("\n")
                    )
            ;
        },

        testLine: function() {
            var object, message, asserter, reference, data, value;

            this
                .if(message = Math.random().toString(36).substring(7))
                .and(reference = Math.random().toString(36).substring(7))
                .and(data = Math.random().toString(36).substring(7))
                .and(value = Math.random().toString(36).substring(7))
                .and(asserter = {})
                .and(object = new testedClass(message, asserter, reference, data))
                .then()
                    .string(object.line(1, value, "ref")).isEqualTo(
                        color.bgXterm(238).white(" 1    ")
                            .concat(" ")
                            .concat(color.bgRed.white(value))
                            .concat("\n")
                    )
                    .string(object.line(2, value, "data")).isEqualTo(
                        color.bgXterm(238).white("    2 ")
                            .concat(" ")
                            .concat(color.bgGreen.white(value))
                            .concat("\n")
                    )
                    .string(object.line(3, value, 3)).isEqualTo(
                        color.bgXterm(238).white(" 3  3 ")
                            .concat(" ")
                            .concat(value)
                            .concat("\n")
                    )
                    .string(object.line(4, value, 5)).isEqualTo(
                        color.bgXterm(238).white(" 4  5 ")
                            .concat(" ")
                            .concat(value)
                            .concat("\n")
                    )
                    .string(object.line(7, value, 6)).isEqualTo(
                        color.bgXterm(238).white(" 7  6 ")
                            .concat(" ")
                            .concat(value)
                            .concat("\n")
                    )
                    .string(object.line(10, value, 100, 3)).isEqualTo(
                        color.bgXterm(238).white(" 10   100 ")
                            .concat(" ")
                            .concat(value)
                            .concat("\n")
                    )
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
                        .concat(color.bgRed.white(" - Reference (" + reference.length + ")")).concat(" ").concat(color.bgGreen.white(" + Data (" + data.length + ")"))
                        .concat("\n\n")
                        .concat(color.bgRed.white(" R ")).concat(color.bgGreen.white(" D ")).concat("\n")
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
                        .concat(color.bgRed.white(" - Reference (" + reference.length + ")")).concat(" ").concat(color.bgGreen.white(" + Data (" + data.length + ")"))
                        .concat("\n\n")
                        .concat(color.bgRed.white(" R ")).concat(color.bgGreen.white(" D ")).concat("\n")
                        .concat(color.bgXterm(238).white(" 1    ")).concat(" ").concat(color.bgRed.white(reference)).concat("\n")
                        .concat(color.bgXterm(238).white("    1 ")).concat(" ").concat(color.bgGreen.white(data)).concat("\n")
                )
                .if(reference = Math.random().toString(36).substring(7))
                .and(data = Math.random().toString(36).substring(7))
                .and(object = new testedClass(message, asserter, reference.concat("\n"), data))
                .then()
                    .string(object.toString()).isEqualTo(
                        "Strings are not equal\n"
                            .concat(color.bgRed.white(" - Reference (" + reference.concat("\n").length + ")")).concat(" ").concat(color.bgGreen.white(" + Data (" + data.length + ")"))
                            .concat("\n\n")
                            .concat(color.bgRed.white(" R ")).concat(color.bgGreen.white(" D ")).concat("\n")
                            .concat(color.bgXterm(238).white(" 1    ")).concat(" ").concat(color.bgRed.white(reference)).concat("\n")
                            .concat(color.bgXterm(238).white("    1 ")).concat(" ").concat(color.bgGreen.white(data)).concat("\n")
                            .concat(color.bgXterm(238).white(" 2    ")).concat(" ").concat(color.bgRed.white("")).concat("\n")
                    )
                .if(object = new testedClass(message, asserter, reference, data.concat("\n")))
                .then()
                    .string(object.toString()).isEqualTo(
                        "Strings are not equal\n"
                            .concat(color.bgRed.white(" - Reference (" + reference.length + ")")).concat(" ").concat(color.bgGreen.white(" + Data (" + data.concat("\n").length + ")"))
                            .concat("\n\n")
                            .concat(color.bgRed.white(" R ")).concat(color.bgGreen.white(" D ")).concat("\n")
                            .concat(color.bgXterm(238).white(" 1    ")).concat(" ").concat(color.bgRed.white(reference)).concat("\n")
                            .concat(color.bgXterm(238).white("    1 ")).concat(" ").concat(color.bgGreen.white(data)).concat("\n")
                            .concat(color.bgXterm(238).white("    2 ")).concat(" ").concat(color.bgGreen.white("")).concat("\n")
                    )
                .if(object = new testedClass(message, asserter, reference.concat("\n"), data.concat("\n")))
                .then()
                    .string(object.toString()).isEqualTo(
                        "Strings are not equal\n"
                            .concat(color.bgRed.white(" - Reference (" + reference.concat("\n").length + ")")).concat(" ").concat(color.bgGreen.white(" + Data (" + data.concat("\n").length + ")"))
                            .concat("\n\n")
                            .concat(color.bgRed.white(" R ")).concat(color.bgGreen.white(" D ")).concat("\n")
                            .concat(color.bgXterm(238).white(" 1    ")).concat(" ").concat(color.bgRed.white(reference)).concat("\n")
                            .concat(color.bgXterm(238).white("    1 ")).concat(" ").concat(color.bgGreen.white(data)).concat("\n")
                            .concat(color.bgXterm(238).white(" 2  2 ")).concat(" ").concat("\n")
                    )
            ;

            var object, message, asserter, reference, data;
        }
    };
