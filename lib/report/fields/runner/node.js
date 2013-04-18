"use strict";

require("../../../..")(module);

var extend = require("node.extend"),
    util = require("util"),
    color = require("../../color"),
    Field = require("../../field"),
    node = module.exports = function node() {
        Field.call(this, [ "runnerStart" ]);
    };

node.prototype = new Field();
node.prototype.constructor = node;
node.prototype = extend(
    node.prototype,
    {
        toString: function () {
            return util.format("> " + color.header("node path") + ": %s\n", process.execPath)
                .concat(util.format(
                    "> " + color.header("node versions") + ": %s\n",
                    util.inspect(process.versions)
                ))
            ;
        }
    }
);
