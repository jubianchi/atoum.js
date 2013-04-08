"use strict";

var util = require("util"),
    exception = module.exports = function exception(message) {
        this.message = message;
        this.name = "Skipped";
    };

exception.prototype.constructor = exception;
exception.prototype = {
    toString: function () {
        return util.format("%s: %s", this.name, this.message);
    }
};
