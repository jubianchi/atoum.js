"use strict";

require("..")(module);

var Score = require("./test/score"),
    Method = require("./test/method"),
    Dispatcher = require("events").EventEmitter,
    test = module.exports = function test(testClass, dispatcher, req) {
        this.class = testClass;
        this.dispatcher = dispatcher || new Dispatcher();
        this.coverage = false;
        this.score = new Score();
        this.engines = {};
        this.setDefaultEngine("concurrent");

        this.unit = (req || require)(this.class);

        this.testCase = null;

        this.reset();
    };

test.prototype = {
    reset: function() {
        this.score.reset();

        return this;
    },

    setDefaultEngine: function(engine) {
        this.defaultEngine = engine;

        if(typeof this.defaultEngine === "string") {
            this.defaultEngine = new (require("./test/engines/" + this.defaultEngine))(this.dispatcher);
        }

        this.defaultEngine.dispatcher = this.dispatcher;

        return this;
    },

    run: function(filter) {
        var testMethodStopListener;

        this.dispatcher.emit("testStart", this);

        (this.unit.setUp || function() {}).call(this);

        var methods = this.getMethods(filter || []),
            remain = methods.length,
            self = this;

        this.reset();

        this.dispatcher.on("testMethodStop", testMethodStopListener = function() {
            remain -= 1;

            if(remain === 0) {
                (self.unit.tearDown || function() {}).call(self);

                self.dispatcher.emit("testStop", self);
                self.dispatcher.removeListener('testMethodStop', testMethodStopListener);
            }
        });

        try {
            while(methods.length > 0) {
                var method = methods.shift(),
                    engine;

                if(typeof method.engine === "string") {
                    engine = new (require("./test/engines/" + method.engine))(this.dispatcher);
                } else {
                    if(method.engine) {
                        method.engine.dispatcher = this.dispatcher;
                        engine = method.engine;
                    } else {
                        if(typeof this.defaultEngine === "string") {
                            engine = new (require("./test/engines/" + this.defaultEngine))(this.dispatcher);
                        } else {
                            this.defaultEngine.dispatcher = this.dispatcher;
                            engine = this.defaultEngine;
                        }
                    }
                }

                engine.run(this, method);
            }
        } catch(exception) {
            exception.stack = exception.stack.split("\n").slice(1).join("\n");
            this.score.addError(exception);

            this.dispatcher.emit("testError", this);

            (this.unit.tearDown || function() {}).call(this);

            this.dispatcher.emit("testStop", this);
        }

        return this;
    },

    getEngine: function(method) {
        var engine;

        if(method.engine) {
            engine = method.engine;
        } else {
            engine = this.getDefaultEngine();
        }
    },

    getMethods: function (filter) {
        var methods = [],
            engines = [];

        if(this.unit.hasOwnProperty("getEngines")) {
            engines = this.unit.getEngines() || {};
        }

        for(var name in this.unit) {
            if(this.unit.hasOwnProperty(name) && /^test[A-Z_\-]/.exec(name) && typeof this.unit[name] === "function" && (filter.length === 0 || filter.indexOf(name) > -1)) {
                methods.push(new Method(name, this, this.unit[name], engines[name] || this.defaultEngine));
            }
        }

        return methods;
    },

    setCoverage: function(enable, directory) {
        this.coverage = enable;
        this.coveredDirectory = directory;

        return this;
    },

    getCurrentTestCase: function() {
        return this.currentTestCase;
    },

    setCurrentTestCase: function(testCase) {
        this.currentTestCase = testCase;

        return this;
    }
};
