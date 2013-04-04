"use strict";

var extend = require('node.extend'),
    array = require('./array'),
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

            if(typeof this.value !== 'object' || type === '[object Array]') {
                this.fail('%s is not an object', this.value);
            }

            return this;
        },

        isInstanceOf: function (expected) {
            this.generator.assertionsCount += 1;

            if(false === (this.value instanceof expected)) {
                this.fail('%s is not an instance of %s', this.value, expected);
            }

            return this;
        },

        isNotInstanceOf: function (expected) {
            this.generator.assertionsCount += 1;

            if(this.value instanceof expected) {
                this.fail('%s is an instance of %s', this.value, expected);
            }

            return this;
        },

        hasMember: function (expected) {
            this.generator.assertionsCount += 1;

            if(false === this.value.hasOwnProperty(expected)) {
                this.fail('Value does not have member %s', expected);
            }

            return this;
        }
    }
);
