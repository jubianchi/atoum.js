"use strict";

var underscore = require("underscore"),
    score = require("./test/score"),
    method = require("./test/method"),
    test = module.exports = function test(testClass) {
        this.class = testClass;
        this.coverage = false;

        this.reset();
    };

test.prototype = {
    reset: function() {
        this.score = new score();

        return this;
    },

    getMethods: function () {
        var unit = require(this.class),
            methods = [],
            name;

        for(name in unit) {
            if(unit.hasOwnProperty(name) && /^test[A-Z_\-]/.exec(name) && typeof unit[name] === "function") {
                methods.push(new method(name, this, unit[name]));
            }
        }

        return methods;
    },

    setCoverage: function(enable) {
        this.coverage = enable;

        return this;
    },
};
