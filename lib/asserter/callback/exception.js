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
            var str = "",
                mapper = function (arg) {
                    switch(true) {
                        case typeof arg === "function":
                            return "[Function <" + (arg.name || "anonymous") + ">]";

                        case typeof arg === "object" && arg !== null:
                            return "[Object <" + (arg.constructor.name || "anonymous") + ">]";

                        default:
                            return util.inspect(arg);
                    }
                };

            this.data.forEach(
                function(value, index) {
                    if(value) {
                        value = underscore.map(value, mapper);

                        str = str.concat("#")
                            .concat((index++).toString())
                            .concat(": ")
                            .concat(this.asserter.value.name || "<anonymous>")
                            .concat("(")
                            .concat(value.join(", "))
                            .concat(")")
                            .concat("\n");
                    }
                },
                this
            );

            return this.message.concat("\n").concat(str);
        }
    }
);
