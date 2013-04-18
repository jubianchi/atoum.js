"use strict";

require("../../../..")(module);

var extend = require("node.extend"),
    color = require("../../color"),
    Field = require("../../field"),
    error = module.exports = function error() {
        Field.call(this, [ "testError" ]);
    };

error.prototype = new Field();
error.prototype.constructor = error;
error.prototype = extend(
    error.prototype,
    {
        toString: function () {
            return color.error("E");
        }
    }
);
