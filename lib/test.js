"use strict";

require("..")(module);

var Score = require("./test/score"),
    Method = require("./test/method"),
    test = module.exports = function test(testClass, dispatcher) {
        this.class = testClass;
        this.dispatcher = dispatcher;
        this.coverage = false;

        this.reset();
    };

test.prototype = {
    reset: function() {
        this.score = new Score();

        return this;
    },

    getMethods: function (filter) {
        var methods = [];

        try {
            var unit = require(this.class),
                name;

            for(name in unit) {
                if(unit.hasOwnProperty(name) && /^test[A-Z_\-]/.exec(name) && typeof unit[name] === "function" && (filter.length === 0 || filter.indexOf(name) > -1)) {
                    methods.push(new Method(name, this, unit[name]));
                }
            }
        } catch(exception) {
            exception.stack = exception.stack.split("\n").slice(1).join("\n");
            this.score.addError(exception);

            this.dispatcher.emit("testError", test);
        }

        return methods;
    },

    setCoverage: function(enable, directory) {
        this.coverage = enable;
        this.coveredDirectory = directory;

        return this;
    }
};
