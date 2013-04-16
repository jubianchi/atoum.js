"use strict";

var extend = require("node.extend"),
    underscore = require('underscore'),
    array = require("./array"),
    object = module.exports = function object(generator) {
        array.call(this, generator);
    };

object.prototype = new array();
object.prototype.constructor = object;
object.prototype = extend(
    object.prototype,
    {
        check: function () {
            var type = Object.prototype.toString.call(this.value);

            if(typeof this.value !== "object" || type === "[object Array]") {
                this.fail("%s is not an object", this.value);
            }

            return this;
        },

        isInstanceOf: function (expected) {
            this.generator.assertionsCount += 1;

            if(false === (this.value instanceof expected)) {
                this.fail("[object %s] is not an instance of %s", this.value.constructor.name, expected.name);
            }

            return this;
        },

        isNotInstanceOf: function (expected) {
            this.generator.assertionsCount += 1;

            if(this.value instanceof expected) {
                this.fail("[object %s] is an instance of %s", this.value.constructor.name, expected.name);
            }

            return this;
        },

        hasMember: function (expected) {
            this.generator.assertionsCount += 1;

            if(false === this.value.hasOwnProperty(expected)) {
                this.fail("Value does not have member %s", expected);
            }

            return this;
        },

        hasMethod: function (expected) {
            this.generator.assertionsCount += 1;

            if(typeof this.value[expected] === 'undefined' || typeof this.value[expected] !== 'function') {
                this.fail("[object %s] does not have method %s", this.value.constructor.name, expected);
            }

            return this;
        },

        hasLength: function (expected) {
            this.generator.assertionsCount += 1;

            if(underscore.size(this.value) !== expected) {
                this.fail("Array(%d) has not length %d", this.value.length, expected);
            }

            return this;
        }
    }
);
