"use strict";

require("../../../..")(module);

var extend = require("node.extend"),
    color = require("../../color"),
    Field = require("../../field"),
    skipped = module.exports = function skipped() {
        Field.call(this, [ "testMethodSkipped" ]);
    };

skipped.prototype = new Field();
skipped.prototype.constructor = skipped;
skipped.prototype = extend(
    skipped.prototype,
    {
        toString: function () {
            return color.skipped(".");
        }
    }
);
