"use strict";

require("../../../..")(module);

var extend = require("node.extend"),
    color = require("../../color"),
    Field = require("../../field"),
    failure = module.exports = function failure() {
        Field.call(this, [ "testMethodFailure" ]);
    };

failure.prototype = new Field();
failure.prototype.constructor = failure;
failure.prototype = extend(
    failure.prototype,
    {
        toString: function () {
            return color.error("F");
        }
    }
);
