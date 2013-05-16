"use strict";

require("../../..")(module);

var util = require("util"),
    underscore = require("underscore"),
    extend = require("node.extend"),
    color = require("cli-color"),
    Failure = require("../exception"),
    exception = module.exports = function exception(message, asserter, reference, data) {
        Failure.apply(this, [ message, asserter ]);

        this.reference = reference;
        this.data = data;
    };

exception.prototype = new Failure();
exception.prototype.constructor = exception;
exception.prototype = extend(
    exception.prototype,
    {
        toString: function() {
            var diff = require("diff").diffLines(this.data, this.reference),
                str;

            str = color.bgRed.white(" - Reference ")
                .concat(" ")
                .concat(color.bgGreen.white(" + Data "))
                .concat("\n\n")
                .concat(color.bgXterm(238).white(" R  D "))
                .concat("\n")
            ;

            var expectedLineNum = 0,
                actualLineNum = 0;

            for(var i = 0; i < diff.length; i++) {
                var value = diff[i];

                switch(true) {
                    case value.added:
                        value.value = value.value.replace("\t", "    ").replace(/^\n|\n$/, "").split("\n");

                        for(var j = 0; j < value.value.length; j++) {
                            expectedLineNum += 1;

                            str = str
                                .concat(color.bgXterm(238).white(" " + expectedLineNum + "    "))
                                .concat(" ")
                                .concat(color.bgRed.white(value.value[j]))
                                .concat("\n")
                            ;
                        }
                        break;

                    case value.removed:
                        value.value = value.value.replace("\t", "    ").replace(/^\n|\n$/, "").split("\n");

                        for(var j = 0; j < value.value.length; j++) {
                            actualLineNum += 1;

                            str = str
                                .concat(color.bgXterm(238).white("    " + actualLineNum + " "))
                                .concat(" ")
                                .concat(color.bgGreen.white(value.value[j]))
                                .concat("\n")
                            ;
                        }
                        break;

                    default:
                        value.value = value.value.replace("\t", "    ").replace(/^\n|\n$/, "").split("\n");

                        for(var j = 0; j < value.value.length; j++) {
                            expectedLineNum += 1;
                            actualLineNum += 1;

                            str = str
                                .concat(color.bgXterm(238).white(" " + expectedLineNum + "  " + actualLineNum + " "))
                                .concat(" ")
                                .concat(value.value[j])
                                .concat("\n")
                            ;
                        }
                        break;
                }
            }

            return util.format("Strings are not equal\n%s", str);
        }
    }
);
