"use strict";

var extend = require("node.extend"),
    color = require("../../color"),
    field = require("../../field"),
    exception = module.exports = function exception() {
        field.call(this, [ "testMethodException" ]);
    };

exception.prototype = new field();
exception.prototype.constructor = exception;
exception.prototype = extend(
    exception.prototype,
    {
        toString: function () {
            return color.error("X");
        }
    }
);
