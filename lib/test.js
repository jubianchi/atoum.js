"use strict";

require("..")(module);

var Score = require("./test/score"),
    Method = require("./test/method"),
    Dispatcher = require("events").EventEmitter,
    test = module.exports = function test(testClass, dispatcher) {
        this.class = testClass;
        this.dispatcher = dispatcher || new Dispatcher();
        this.coverage = false;
        this.score = new Score();
        this.engines = {};
        this.defaultEngine = "concurrent";

        this.reset();
    };

test.prototype = {
    reset: function() {
        this.score.reset();

        return this;
    },

    setDefaultEngine: function(engine) {
        this.defaultEngine = engine;

        return this;
    },

    run: function(filter) {
        this.dispatcher.emit("testStart", this);

        try {
            var methods = this.getMethods(filter || []),
                remain = methods.length,
                self = this;

            this.reset();

            if(remain === 0) {
                this.dispatcher.emit("testStop", this);
            }

            while(methods.length > 0) {
                var method = methods.shift(),
                    engine = new (require("./test/engines/" + (method.engine || this.defaultEngine)))(this.dispatcher);

                engine.run(this, method, function() {
                    remain -= 1;

                    if(remain === 0) {
                        self.dispatcher.emit("testStop", self);
                    }
                });
            }
        } catch(exception) {
            exception.stack = exception.stack.split("\n").slice(1).join("\n");
            this.score.addError(exception);

            this.dispatcher.emit("testError", this);
            this.dispatcher.emit("testStop", this);
        }

        return this;
    },

    getMethods: function (filter) {
        var methods = [],
            engines = [];

        var unit = require(this.class);

        if(unit.hasOwnProperty("getEngines")) {
            engines = unit.getEngines() || {};
        }

        for(var name in unit) {
            if(unit.hasOwnProperty(name) && /^test[A-Z_\-]/.exec(name) && typeof unit[name] === "function" && (filter.length === 0 || filter.indexOf(name) > -1)) {
                methods.push(new Method(name, this, unit[name], engines[name] || this.defaultEngine));
            }
        }

        return methods;
    },

    setCoverage: function(enable, directory) {
        this.coverage = enable;
        this.coveredDirectory = directory;

        return this;
    }
};
