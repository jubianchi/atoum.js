var atoum = require('../../..')(module),
    util = require("util"),
    underscore = require('underscore'),
    color = require('cli-color'),
    testedClass = require('../../../lib/asserter/object/exception'),
    unit = module.exports = {
        testTostring: function() {
            this
                .if(message = Math.random().toString(36).substring(7))
                .and(asserter = {})
                .and(reference = {
                    name: 'my object',
                    description: 'it\'s an object!',
                    details: {
                        it: 'has',
                        an: 'array',
                        with: ['a', 'few', 'elements'],
                        without: ['a', 'few', 'elements']
                    },
                    foo: "bar"
                })
                .and(data = {
                    bar: "foo",
                    baz: function() { return 0; },
                    name: 'updated object',
                    description: 'it\'s an object!',
                    details: {
                        it: 'has',
                        an: 'array',
                        with: ['a', 'few', 'more', 'elements', { than: 'before', obj: { 'bar': 'foo' } }],
                        without: ['a', 'few', 'more', 'elements', { than: 'before', obj: { 'bar': 'foo' } }]
                    }
                })
                .and(object = new testedClass(message, asserter, reference, data))
                .then()
                .string(object.toString()).isEqualTo(
                    message.concat("\n")
                        .concat(color.bgRed.white(" - Reference ")).concat(" ").concat(color.bgGreen.white(" + Data "))
                        .concat("\n")
                        .concat(color.bgXterm(238).white("{ ")).concat("\n")
                        .concat(color.bgXterm(238).white("  ".concat(color.red("name")).concat(":"))).concat(" ").concat(color.bgRed.white(reference.name)).concat("\n")
                        .concat(color.bgXterm(238).white("  ".concat(color.green("name")).concat(":"))).concat(" ").concat(color.bgGreen.white(data.name)).concat("\n")
                        .concat(color.bgXterm(238).white("  description:")).concat(" ").concat(reference.description).concat("\n")
                        .concat(color.bgXterm(238).white("  details: ").concat(color.bgXterm(238).white("{ "))).concat("\n")
                        .concat(color.bgXterm(238).white("    it:")).concat(" ").concat(reference.details.it).concat("\n")
                        .concat(color.bgXterm(238).white("    an:")).concat(" ").concat(reference.details.an).concat("\n")
                        .concat(color.bgXterm(238).white("    with: ")).concat(color.bgXterm(238).white("{ ")).concat("\n")
                        .concat(color.bgXterm(238).white("      0:")).concat(" ").concat(reference.details.with[0]).concat("\n")
                        .concat(color.bgXterm(238).white("      1:")).concat(" ").concat(reference.details.with[1]).concat("\n")
                        .concat(color.bgXterm(238).white("      ".concat(color.red("2")).concat(":"))).concat(" ").concat(color.bgRed.white(reference.details.with[2])).concat("\n")
                        .concat(color.bgXterm(238).white("      ".concat(color.green("2")).concat(":"))).concat(" ").concat(color.bgGreen.white(data.details.with[2])).concat("\n")
                        .concat(color.bgXterm(238).white("      ".concat(color.green("3")).concat(":"))).concat(" ").concat(color.bgGreen.white(data.details.with[3])).concat("\n")
                        .concat(color.bgXterm(238).white("      ".concat(color.green("4")).concat(":"))).concat(" ").concat(color.bgGreen.white(data.details.with[4])).concat("\n")
                        .concat(color.bgXterm(238).white("    } ")).concat("\n")
                        .concat(color.bgXterm(238).white("    without: ")).concat(color.bgXterm(238).white("{ ")).concat("\n")
                        .concat(color.bgXterm(238).white("      0:")).concat(" ").concat(reference.details.with[0]).concat("\n")
                        .concat(color.bgXterm(238).white("      1:")).concat(" ").concat(reference.details.with[1]).concat("\n")
                        .concat(color.bgXterm(238).white("      ".concat(color.red("2")).concat(":"))).concat(" ").concat(color.bgRed.white(reference.details.with[2])).concat("\n")
                        .concat(color.bgXterm(238).white("      ".concat(color.green("2")).concat(":"))).concat(" ").concat(color.bgGreen.white(data.details.with[2])).concat("\n")
                        .concat(color.bgXterm(238).white("      ".concat(color.green("3")).concat(":"))).concat(" ").concat(color.bgGreen.white(data.details.with[3])).concat("\n")
                        .concat(color.bgXterm(238).white("      ".concat(color.green("4")).concat(":"))).concat(" ").concat(color.bgGreen.white(data.details.with[4])).concat("\n")
                        .concat(color.bgXterm(238).white("    } ")).concat("\n")
                        .concat(color.bgXterm(238).white("  } ")).concat("\n")
                        .concat(color.bgXterm(238).white("  ".concat(color.red("foo")).concat(":"))).concat(" ").concat(color.bgRed.white(reference.foo)).concat("\n")
                        .concat(color.bgXterm(238).white("  ".concat(color.green("bar")).concat(":"))).concat(" ").concat(color.bgGreen.white(data.bar)).concat("\n")
                        .concat(color.bgXterm(238).white("  ".concat(color.green("baz")).concat(":"))).concat(" ").concat(color.bgGreen.white(data.baz.toString())).concat("\n")
                        .concat(color.bgXterm(238).white("} "))
                )
            ;

            var object, message, asserter, reference, data;
        }
    };
