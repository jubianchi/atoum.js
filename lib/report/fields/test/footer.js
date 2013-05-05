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
            return "]\n=> "
                .concat(this.locale._("Test duration:")).concat(" ")
                .concat(this.locale.__("$[1] second", "$[1] seconds", Math.round(this.value[0].score.duration * 10000) / 10000))
                .concat("\n")
                .concat("=> ")
                .concat(this.locale._("Memore usage:")).concat(" ")
                .concat(util.inspect(this.value[0].score.usage.format("KB", 4).stat))
                .concat("\n")
            ;
        }
    }
);
