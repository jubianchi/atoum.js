"use strict";

require("..")(module);

var util = require("util"),
    underscore = require("underscore"),
    Exception = require("./asserter/exception"),
    asserter = module.exports = function asserter(generator) {
        this.generator = generator;
    };

asserter.prototype = {
    setWith: function (value) {
        this.value = value;

        return this.check();
    },

    pass: function() {
        this.generator.assertionsCount += 1;

        return this;
    },

    fail: function (message) {
        var args = Array.prototype.slice.call(arguments, 1);

        this.generator.assertionsCount += 1;

        underscore.map(
            args,
            function (arg) {
                return util.inspect(arg);
            }
        );

        throw new Exception(util.format.apply(util, [ message ].concat(args)), this);
    },

    check: function() {
        return this;
    }
};
