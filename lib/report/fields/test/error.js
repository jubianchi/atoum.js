"use strict";

var extend = require('node.extend'),
    util = require('util'),
    color = require('../../color'),
    field = require('../../field'),
    error = module.exports = function error() {
        field.call(this, [ 'testError' ]);
    };

error.prototype = new field();
error.prototype.constructor = error;
error.prototype = extend(
    error.prototype,
    {
        toString: function () {
            return color.error('E');
        }
    }
);
