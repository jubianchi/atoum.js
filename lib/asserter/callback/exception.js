"use strict";

require("../../..")(module);

var extend = require("node.extend"),
    underscore = require("underscore"),
    util = require("util"),
    Failure = require("../exception"),
    exception = module.exports = function exception(message, asserter, reference, data) {
        Failure.apply(this, [ message, asserter ]);

        this.reference = reference;
        this.data = data;
    },
    mapper = function() {
        return function (arg) {
            switch(true) {
                case typeof arg === "function":
                    return "[Function <" + (arg.name || "anonymous") + ">]";

                case typeof arg === "object" && arg !== null:
                    return "[Object <" + (arg.constructor.name || "anonymous") + ">]";

                default:
                    return util.inspect(arg);
            }
        };
    };

exception.prototype = new Failure();
exception.prototype.constructor = exception;
exception.prototype = extend(
    exception.prototype,
    {
        toString: function() {
            var str = "";

            for(var index = 0; index < this.data.length; index += 1) {
                if(this.data[index]) {
                    this.data[index] = underscore.map(this.data[index], mapper());

                    str = str.concat("#")
                        .concat(index.toString())
                        .concat(": ")
                        .concat(this.asserter.value.name || "<anonymous>")
                        .concat("(")
                        .concat(this.data[index].join(", "))
                        .concat(")")
                        .concat("\n");
                }
            }

            return this.message.concat("\n").concat(str);
        }
    }
);
