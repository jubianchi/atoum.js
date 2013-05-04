"use strict";

require("../../..")(module);

var microtime = require("microtime-x"),
    concurrent = module.exports = function concurrent(dispatcher, child) {
        this.dispatcher = dispatcher;
        this.child = child || require("child_process");
    };

concurrent.prototype = {
    run: function (test, methods) {
        var self = this,
            remain = 0,
            method,
            testCode,
            proc;

        if(this.dispatcher) {
            this.dispatcher.emit("testStart", test);
        }

        methods = test.getMethods(methods || []);
        remain = methods.length;

        if(remain === 0) {
            if(self.dispatcher) {
                self.dispatcher.emit("testStop", test);
            }
        }

        while(methods.length > 0) {
            method = methods.shift();

            testCode = this.getTestMethodCode(method);

            try {
                if(this.dispatcher) {
                    this.dispatcher.emit("testMethodStart", method);
                }

                proc = this.child.exec(
                    process.execPath,
                    {},
                    function(error, stdout, stderr) {
                        if(error) {
                            error.stack = error.stack.split("\n").slice(1).join("\n");
                            test.score.addError(error);

                            if(self.dispatcher) {
                                self.dispatcher.emit("testError", test);
                                self.dispatcher.emit("testStop", test);
                            }
                        } else {
                            var result = JSON.parse(stdout.toString());
                            test.score.addMethod(result);

                            if(self.dispatcher) {
                                switch(true) {
                                    case (typeof result.score.exception !== "undefined"):
                                        self.dispatcher.emit("testMethodException", method);
                                        break;
                                    case (typeof result.score.skipped !== "undefined"):
                                        self.dispatcher.emit("testMethodSkipped", method);
                                        break;
                                    case (result.score.passed === false):
                                        self.dispatcher.emit("testMethodFailure", method);
                                        break;
                                    default:
                                        self.dispatcher.emit("testMethodSuccess", method);
                                        break;
                                }

                                self.dispatcher.emit("testMethodStop", method);
                            }
                        }

                        remain -= 1;

                        if(remain === 0) {
                            if(self.dispatcher) {
                                self.dispatcher.emit("testStop", test);
                            }
                        }
                    }
                );
                proc.stdin.write(testCode);
                proc.stdin.end();
            } catch(error) {
                error.stack = error.stack.split("\n").slice(1).join("\n");
                test.score.addError(error);

                if(this.dispatcher) {
                    this.dispatcher.emit("testError", test);
                    this.dispatcher.emit("testStop", test);
                }
            }
        }
    },

    getTestMethodCode: function(method, r) {
        var resolve = r ? (r.resolve || require.resolve) : require.resolve,
            testCode = "var atoum = require(\"" + resolve("../../..") + "\")(module),\n"
                .concat("    Script = require(\"" + resolve("../../scripts/concurrent") + "\"),\n");

        if(method.test.coverage) {
            testCode = testCode.concat("    Instrument = require(\"" + resolve("../../includer/instrument") + "\")\n");
        }

        testCode = testCode
            .concat("    script = new Script(\"" + method.test.class + "\", [ \"" + method.name + "\" ]);\n")
            .concat("\n");

        if(method.test.coverage) {
            testCode = testCode.concat("atoum.includer = new Instrument();\n");
        }

        return testCode
            .concat("script.run(process);\n")
            .concat("\n")
            .concat("process.exit();\n");
    }
};
