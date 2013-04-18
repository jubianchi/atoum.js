"use strict";

require("../../../..")(module);

var extend = require("node.extend"),
    util = require("util"),
    color = require("../../color"),
    Field = require("../../field"),
    atoum = module.exports = function atoum() {
        Field.call(this, [ "runnerStart" ]);
    };

atoum.prototype = new Field();
atoum.prototype.constructor = atoum;
atoum.prototype = extend(
    atoum.prototype,
    {
        toString: function () {
            return util.format(color.title("atoum.js %s\n\n"), require("../../../..").version);
        }
    }
);