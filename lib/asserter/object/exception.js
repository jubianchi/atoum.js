"use strict";

require("../../..")(module);

var extend = require("node.extend"),
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
            var data = require("objectdiff").diffOwnProperties(this.reference, this.data),
                str = this.message.concat("\n");

            str = str.concat(color.bgRed.white(" - Reference "))
                .concat(" ")
                .concat(color.bgGreen.white(" + Data "))
                .concat("\n");

            return str.concat(this.diff(data));
        },

        diff: function(data, level) {
            var str = "",
                indent = "  ";

            level = level || 1;

            while(indent.length < (level * 2)) {
                indent = indent.concat("  ");
            }

            if(typeof data === "object") {
                if(typeof data.changed === "undefined" || data.changed !== "equal") {
                    str = color.bgXterm(238).white("{ ").concat("\n");

                    for(var prop in data) {
                        if(data.hasOwnProperty(prop)) {
                            var value = data[prop];

                            switch(value.changed) {
                                case "removed":
                                    str = str.concat(color.bgXterm(238).white(indent + color.red(prop) + ":") + " " + color.bgRed.white(value.value) + "\n");
                                    break;
                                case "added":
                                    str = str.concat(color.bgXterm(238).white(indent + color.green(prop) + ":") + " " + color.bgGreen.white(value.value) + "\n");
                                    break;
                                case "primitive change":
                                    str = str.concat(color.bgXterm(238).white(indent + color.red(prop) + ":") + " " + color.bgRed.white(value.removed) + "\n");
                                    str = str.concat(color.bgXterm(238).white(indent + color.green(prop) + ":") + " " + color.bgGreen.white(value.added) + "\n");
                                    break;
                                case "object change":
                                    str = str.concat(color.bgXterm(238).white(indent + prop + ": ") + this.diff(value.diff, level + 1) + "\n");
                                    break;
                                default:
                                    str = str.concat(color.bgXterm(238).white(indent + prop + ":") + " " + value.value + "\n");
                            }
                        }
                    }

                    str = str.concat(color.bgXterm(238).white(indent.substr(0, (level - 1) * 2) + "} "));
                }
            }

            return str;
        }
    }
);
