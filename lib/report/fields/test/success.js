"use strict";

var extend = require("node.extend"),
    atoum = require('../../../..')(module),
    color = require("../../color"),
    field = require("../../field"),
    success = module.exports = function success() {
        field.call(this, [ "testMethodSuccess" ]);
    };

success.prototype = new field();
success.prototype.constructor = success;
success.prototype = extend(
    success.prototype,
    {
        toString: function () {
            return color.success("S");
        }
    }
);
