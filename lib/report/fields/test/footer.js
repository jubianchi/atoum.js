"use strict";

require("../../../..")(module);

var extend = require("node.extend"),
    util = require("util"),
    Field = require("../../field"),
    footer = module.exports = function footer() {
        Field.call(this, [ "testStop" ]);
    };

footer.prototype = new Field();
footer.prototype.constructor = footer;
footer.prototype = extend(
    footer.prototype,
    {
        toString: function () {
            return util.format(
                    "]\n=> Test duration: %d second(s).\n",
                    Math.round(this.value[0].score.duration * 10000) / 10000
                )
                .concat(util.format(
                    "=> Memore usage: %s\n",
                    util.inspect(this.value[0].score.usage.format("KB", 4).stat)
                ))
            ;
        }
    }
);
