"use strict";

var util = require("util"),
    underscore = require("underscore"),
    extend = require("node.extend"),
    color = require("cli-color"),
    atoum = require('../../..')(module),
    failure = require("../exception"),
    exception = module.exports = function exception(message, asserter, reference, data) {
        failure.apply(this, [ message, asserter ]);

        this.reference = reference;
        this.data = data;
    };

exception.prototype = new failure();
exception.prototype.constructor = exception;
exception.prototype = extend(
    exception.prototype,
    {
        toString: function() {
            var diff = require("diff").diffChars(this.data, this.reference),
                str = "",
                diffcontent = "";

            str = str.concat(color.bgRed.white(" - Reference "))
                .concat(" ")
                .concat(color.bgGreen.white(" + Data "))
                .concat("\n\n")
            ;

            underscore.each(
                diff,
                function(value) {
                    switch(true) {
                        case value.added:
                            value.value = value.value
                                .replace("\n", color.bgRed.white(" \n"))
                                .replace("\t", color.bgRed.white("    "))
                            ;
                            diffcontent = diffcontent.concat(color.bgRed.white(value.value));
                            break;

                        case value.removed:
                            value.value = value.value
                                .replace("\n", color.bgGreen.white(" \n"))
                                .replace("\t", color.bgGreen.white("    "))
                            ;
                            diffcontent = diffcontent.concat(color.bgGreen.white(value.value));
                            break;

                        default:
                            diffcontent = diffcontent.concat(value.value);
                            break;
                    }
                }
            );

            return  util.format(
                "Strings are not equal\n%s%s\n\n%s",
                str,
                diffcontent,
                this.stack
            );
        }
    }
);
