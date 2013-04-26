"use strict";

require("../../..")(module);

var underscore = require("underscore"),
    Generator = require("../../asserter/generator"),
    concurrent = module.exports = function concurrent(dispatcher, generator) {
        this.dispatcher = dispatcher;
        this.generator = (generator || new Generator());
    };

concurrent.prototype = {
    run: function (test, methods) {
        if(this.dispatcher) {
            this.dispatcher.emit("testStart", test);
        }

        try {
            this.generator.injectInto(test);
            methods = test.getMethods(methods || []);

            underscore.each(
                methods,
                function(method) {
                    this.generator.reset();

                    if(this.dispatcher) {
                        this.dispatcher.emit("testMethodStart", method);
                    }

                    method.reset().run();

                    method.score.assertions = this.generator.assertionsCount;
                    test.score.addMethod(method);

                    if(this.dispatcher) {
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
                    }

                    if(this.dispatcher) {
                        this.dispatcher.emit("testMethodStop", method);
                    }
                },
                this
            );
        } catch(error) {
            error.stack = (error.stack || "").split("\n").slice(1).join("\n");
            test.score.addError(error);

            if(this.dispatcher) {
                this.dispatcher.emit("testError", test);
            }
        }

        if(this.dispatcher) {
            this.dispatcher.emit("testStop", test);
        }
    }
};
