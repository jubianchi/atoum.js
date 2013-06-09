"use strict";

require("../../../..")(module);

var extend = require("node.extend"),
    util = require("util"),
    color = require("../../color"),
    Field = require("../../field"),
    Prompt = require("../../../cli/prompt"),
    header = module.exports = function header() {
        Field.call(this, [ "testStart" ]);

        this.prompt = new Prompt(">", color.header);
    };

header.prototype = new Field();
header.prototype.constructor = header;
header.prototype = extend(
    header.prototype,
    {
        toString: function () {
            return this.prompt.write(this.value[0].class).toString().concat("[");
        }
    }
);
