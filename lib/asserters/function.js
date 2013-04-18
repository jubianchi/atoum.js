"use strict";

require("../..")(module);

var extend = require("node.extend"),
    underscore = require("underscore"),
    Asserter = require("../asserter"),
    callback = module.exports = function callback(generator) {
        Asserter.call(this, generator);
    };

callback.prototype = new Asserter();
callback.prototype.constructor = callback;
callback.prototype = extend(
    callback.prototype,
    {
        check: function () {
            if(typeof this.value !== "function") {
                this.fail("%s is not a function", this.value);
            }

            return this;
        },

        hasName: function(expected) {
            this.generator.assertionsCount += 1;

            if(this.value.name !== expected) {
                this.fail("%s is not equal to %s", this.value.name, expected);
            }

            return this;
        }
    }
);
