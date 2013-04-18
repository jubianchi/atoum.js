"use strict";

require("../../../..")(module);

var extend = require("node.extend"),
    color = require("../../color"),
    Field = require("../../field"),
    success = module.exports = function success() {
        Field.call(this, [ "testMethodSuccess" ]);
    };

success.prototype = new Field();
success.prototype.constructor = success;
success.prototype = extend(
    success.prototype,
    {
        toString: function () {
            return color.success("S");
        }
    }
);
