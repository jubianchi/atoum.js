"use strict";

require("..")(module);

var underscore = require("underscore"),
    Score = require("./test/score"),
    Method = require("./test/method"),
    test = module.exports = function test(testClass) {
        this.class = testClass;
        this.coverage = false;

        this.reset();
    };

test.prototype = {
    reset: function() {
        this.score = new Score();

        return this;
    },

    getMethods: function () {
        var unit = require(this.class),
            methods = [],
            name;

        for(name in unit) {
            if(unit.hasOwnProperty(name) && /^test[A-Z_\-]/.exec(name) && typeof unit[name] === "function") {
                methods.push(new Method(name, this, unit[name]));
            }
        }

        return methods;
    },

    setCoverage: function(enable) {
        this.coverage = enable;

        return this;
    },
};
