"use strict";

var extend = require("node.extend"),
    atoum = require('../../../..')(module),
    color = require("../../color"),
    field = require("../../field"),
    failure = module.exports = function failure() {
        field.call(this, [ "testMethodFailure" ]);
    };

failure.prototype = new field();
failure.prototype.constructor = failure;
failure.prototype = extend(
    failure.prototype,
    {
        toString: function () {
            return color.error("F");
        }
    }
);
