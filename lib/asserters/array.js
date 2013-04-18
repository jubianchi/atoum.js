"use strict";

require("../..")(module);

var extend = require("node.extend"),
    Variable = require("./variable"),
    array = module.exports = function array(generator) {
        Variable.call(this, generator);
    };

array.prototype = new Variable();
array.prototype.constructor = array;
array.prototype = extend(
    array.prototype,
    {
        check: function () {
            if(Object.prototype.toString.call(this.value) !== "[object Array]") {
                this.fail("%s is not an array", this.value);
            }

            return this;
        },

        hasLength: function (expected) {
            this.generator.assertionsCount += 1;

            if(this.value.length !== expected) {
                this.fail("Array(%d) has not length %d", this.value.length, expected);
            }

            return this;
        },

        isEqualTo: function(expected) {
            var i;

            this.generator.assertionsCount += 1;

            if(expected.length !== this.value.length) {
                this.fail("%s is not equal to %s", this.value, expected);
            }

            for(i = 0; i < expected.length; i += 1) {
                if(this.value[i] != expected[i]) {
                    this.fail("%s is not equal to %s", this.value, expected);
                }
            }

            return this;
        },

        isNotEqualTo: function(expected) {
            this.generator.assertionsCount += 1;

            try {
                this.isEqualTo(expected);

                this.fail("%s is equal to %s", this.value, expected);
            } catch(exception) { }
        }
    }
);
