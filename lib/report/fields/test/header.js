"use strict";

var extend = require("node.extend"),
    util = require("util"),
    color = require("../../color"),
    field = require("../../field"),
    header = module.exports = function header() {
        field.call(this, [ "testStart" ]);
    };

header.prototype = new field();
header.prototype.constructor = header;
header.prototype = extend(
    header.prototype,
    {
        toString: function () {
            return util.format("\n> " + color.header("%s") + "\n[", this.value[0].class);
        }
    }
);
