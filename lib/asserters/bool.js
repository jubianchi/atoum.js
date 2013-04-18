"use strict";

require("../..")(module);

var extend = require("node.extend"),
    Variable = require("./variable"),
    bool = module.exports = function bool(generator) {
        Variable.call(this, generator);
    };

bool.prototype = new Variable();
bool.prototype.constructor = bool;
bool.prototype = extend(
    bool.prototype,
    {
        check: function () {
            if(typeof this.value !== "boolean") {
                this.fail("%s is not a boolean", this.value);
            }

            return this;
        },

        isTrue: function () {
            return this.isIdenticalTo(true);
        },

        isFalse: function () {
            return this.isIdenticalTo(false);
        }
    }
);
