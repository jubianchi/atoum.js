"use strict";

require("../../..")(module);

var underscore = require("underscore"),
    Dispatcher = require("events").EventEmitter,
    Generator = require("../../asserter/generator"),
    concurrent = module.exports = function concurrent(dispatcher, generator) {
        this.dispatcher = dispatcher || new Dispatcher();
        this.generator = (generator || new Generator());
    };

concurrent.prototype = {
    run: function (test, method, callback) {
        try {
            this.generator.injectInto(test);

            this.dispatcher.emit("testMethodStart", method);

            method.reset().run(global);
            method.score.assertions = this.generator.assertionsCount;
            test.score.addMethod(method);

            switch(true) {
                case (typeof method.score.exception !== "undefined"):
                    this.dispatcher.emit("testMethodException", method);
                    break;
                case (typeof method.score.skipped !== "undefined"):
                    this.dispatcher.emit("testMethodSkipped", method);
                    break;
                case (method.score.passed === false):
                    this.dispatcher.emit("testMethodFailure", method);
                    break;
                default:
                    this.dispatcher.emit("testMethodSuccess", method);
                    break;
            }

            this.dispatcher.emit("testMethodStop", method);

            if(callback) {
                callback();
            }
        } catch(error) {
            error.stack = (error.stack || "").split("\n").slice(1).join("\n");
            test.score.addError(error);

            if(this.dispatcher) {
                this.dispatcher.emit("testError", test);
            }
        }

        this.generator.reset();
    }
};
