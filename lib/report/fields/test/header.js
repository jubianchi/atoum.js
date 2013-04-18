"use strict";

require("../../../..")(module);

var extend = require("node.extend"),
    util = require("util"),
    color = require("../../color"),
    Field = require("../../field"),
    header = module.exports = function header() {
        Field.call(this, [ "testStart" ]);
    };

header.prototype = new Field();
header.prototype.constructor = header;
header.prototype = extend(
    header.prototype,
    {
        toString: function () {
            return util.format("\n> " + color.header("%s") + "\n[", this.value[0].class);
        }
    }
);
