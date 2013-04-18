"use strict";

require("../../../..")(module);

var extend = require("node.extend"),
    color = require("../../color"),
    Field = require("../../field"),
    exception = module.exports = function exception() {
        Field.call(this, [ "testMethodException" ]);
    };

exception.prototype = new Field();
exception.prototype.constructor = exception;
exception.prototype = extend(
    exception.prototype,
    {
        toString: function () {
            return color.error("X");
        }
    }
);
