"use strict";

require("../..")(module);

var extend = require("node.extend"),
    Variable = require("./variable"),
    error = module.exports = function error(generator) {
        Variable.call(this, generator);
    };

error.prototype = new Variable();
error.prototype.constructor = error;
error.prototype = extend(
    error.prototype,
    {
        check: function () {
            if(typeof this.value !== "function") {
                this.fail("%s is not callable", this.value);
            }

            try {
                this.value();

                this.fail("There was no error");
            } catch(error) {
                this.exception = error;
            }

            return this;
        },

        hasName: function (expected) {
            this.generator.assertionsCount += 1;

            if(expected !== this.exception.name) {
                this.fail("Error name '%s' is not equal to '%s'", this.exception.name, expected);
            }

            return this;
        },

        hasMessage: function (expected) {
            this.generator.assertionsCount += 1;

            if(expected !== this.exception.message) {
                this.fail("Error message '%s' is not equal to '%s'", this.exception.message, expected);
            }

            return this;
        }
    }
);
