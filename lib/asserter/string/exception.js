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
        header: function(gutter) {
            var ref = "R",
                data = "D";

            if(gutter) {
                while(ref.toString().length < gutter) {
                    ref = ref.concat(" ");
                }

                while(data.toString().length < gutter) {
                    data = data.concat(" ");
                }
            }

            return color.bgRed.white(" - Reference (" + this.reference.length + ")")
                .concat(" ")
                .concat(color.bgGreen.white(" + Data (" + this.data.length + ")"))
                .concat("\n\n")
                .concat(color.bgRed.white(" " + ref + " "))
                .concat(color.bgGreen.white(" " + data + " "))
                .concat("\n")
            ;
        },

        line: function(num, value, type, gutter) {
            var str, colorize, indent;

            num = num.toString();
            gutter = gutter || num.toString().length;

            while(num.length < gutter) {
                num = num.concat(" ");
            }

            indent = new Array(gutter + 3).join(" ");

            switch(type) {
                case "ref":
                    str = " ".concat(num).concat(" ").concat(indent);
                    colorize = color.bgRed.white;
                    break;

                case "data":
                    str = (indent || "") + " " + num + " ";
                    colorize = color.bgGreen.white;
                    break;

                default:
                    type = type || num;
                    type = type.toString();

                    while(type.length < gutter) {
                        type = type.concat(" ");
                    }

                    str = " " + num + "  " + type + " ";
                    colorize = function(v) { return v; };
            }

            return color.bgXterm(238).white(str)
                .concat(" ")
                .concat(colorize(value))
                .concat("\n");
        },

        toString: function() {
            var diff = require("diff").diffLines(this.data, this.reference),
                str = "",
                expectedLineNum = 0,
                actualLineNum = 0,
                gutter = Math.max(
                    this.data.split("\n").length,
                    this.reference.split("\n").length
                ).toString().length;

            str = str.concat(this.header(gutter));

            var dcrlf = false,
                rcrlf = false;

            for(var i = 0; i < diff.length; i++) {
                var value = diff[i],
                    crlf = !!value.value.match(/\n$/);

                value.value = value.value.replace("\t", "    ").replace(/^\n|\n$/, "").split("\n");

                for(var j = 0; j < value.value.length; j++) {
                    switch(true) {
                        case value.added:
                            rcrlf = crlf;
                            str = str.concat(this.line(expectedLineNum += 1, value.value[j], "ref", gutter));
                            break;

                        case value.removed:
                            dcrlf = crlf;
                            str = str.concat(this.line(actualLineNum += 1, value.value[j], "data", gutter));
                            break;

                        default:
                            rcrlf = dcrlf = crlf;
                            str = str.concat(this.line(expectedLineNum += 1, value.value[j], actualLineNum += 1, gutter));
                    }
                }
            }

            if(rcrlf && dcrlf) {
                str = str.concat(this.line(expectedLineNum += 1, "", actualLineNum += 1, gutter));
            } else {
                if(rcrlf) {
                    str = str.concat(this.line(expectedLineNum += 1, "", "ref", gutter));
                }

                if(dcrlf) {
                    str = str.concat(this.line(actualLineNum += 1, "", "data", gutter));
                }
            }

            return util.format("Strings are not equal\n%s", str);
        }
    }
);
