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
                    var args = "",
                        sep = "";

                    underscore.map(
                        this.data[index],
                        function (arg) {
                            switch(true) {
                                case typeof arg === "function":
                                    args = args.concat(sep).concat("[Function <" + (arg.name || "anonymous") + ">]");
                                    break;

                                case typeof arg === "object" && arg !== null:
                                    args = args.concat(sep).concat("[Object <" + (arg.constructor.name || "anonymous") + ">]");
                                    break;

                                default:
                                    args = args.concat(sep).concat(util.inspect(arg));
                            }

                            sep = ", ";
                        }
                    );

                    str = str.concat("#")
                        .concat(index.toString())
                        .concat(": ")
                        .concat(this.asserter.value.name || "<anonymous>")
                        .concat("(")
                        .concat(args)
                        .concat(")")
                        .concat("\n");
                }
            }

            return this.message.concat("\n").concat(str);
        }
    }
);
