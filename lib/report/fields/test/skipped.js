"use strict";

var extend = require("node.extend"),
    atoum = require('../../../..')(module),
    color = require("../../color"),
    field = require("../../field"),
    skipped = module.exports = function skipped() {
        field.call(this, [ "testMethodSkipped" ]);
    };

skipped.prototype = new field();
skipped.prototype.constructor = skipped;
skipped.prototype = extend(
    skipped.prototype,
    {
        toString: function () {
            return color.skipped(".");
        }
    }
);
