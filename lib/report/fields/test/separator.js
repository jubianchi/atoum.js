"use strict";

require("../../../..")(module);

var extend = require("node.extend"),
    color = require("../../color"),
    Field = require("../../field"),
    failure = module.exports = function failure() {
        Field.call(this, [ "testMethodStop" ]);

        this.count = 0;
    };

failure.prototype = new Field();
failure.prototype.constructor = failure;
failure.prototype = extend(
    failure.prototype,
    {
        toString: function () {
            if(++this.count >= 50) {
                this.count = 0;

                return "\n";
            }
        }
    }
);
