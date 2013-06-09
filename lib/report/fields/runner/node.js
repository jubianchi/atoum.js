"use strict";

require("../../../..")(module);

var extend = require("node.extend"),
    util = require("util"),
    color = require("../../color"),
    Field = require("../../field"),
    Prompt = require("../../../cli/prompt"),
    node = module.exports = function node() {
        Field.call(this, [ "runnerStart" ]);

        this.prompt = new Prompt(">", color.header, null);
    };

node.prototype = new Field();
node.prototype.constructor = node;
node.prototype = extend(
    node.prototype,
    {
        toString: function () {
            return this.prompt
                .write(
                    "node path:"
                        .concat(color.clean(" "))
                        .concat(process.execPath)
                )
                .write(
                    "node versions:"
                        .concat(color.clean(" "))
                        .concat(util.inspect(process.versions))
                )
                .toString()
            ;
        }
    }
);
