"use strict";

require("../../..")(module);

var Dispatcher = require("events").EventEmitter,
    concurrent = module.exports = function concurrent(dispatcher, child) {
        this.dispatcher = dispatcher || new Dispatcher();
        this.child = child || require("child_process");
    };

concurrent.prototype = {
    run: function (test, method) {
        var self = this,
            testCode,
            proc;

        testCode = this.getTestMethodCode(method);

        try {
            this.dispatcher.emit("testMethodStart", method);

            proc = this.child.exec(
                process.execPath,
                {
                    maxBuffer: 2000 * 1024
                },
                function(error, stdout) {
                    if(error) {
                        error.stack = error.stack.split("\n").slice(1).join("\n");
                        test.score.addError(error);

                        self.dispatcher.emit("testError", test);
                        self.dispatcher.emit("testStop", test);
                    } else {
                        try {
                            var result = JSON.parse(stdout);

                            if(test.score.errors.length > 0) {
                                method.score.passed = false;
                                test.score.addMethod(method);
                            }

                            test.score.merge(result.score);

                            switch(true) {
                                case (test.score.errors.length > 0):
                                    self.dispatcher.emit("testError", test);
                                    break;
                                case (typeof test.score.methods[result.method].exception !== "undefined"):
                                    self.dispatcher.emit("testMethodException", method);
                                    break;
                                case (typeof test.score.methods[result.method].skipped !== "undefined"):
                                    self.dispatcher.emit("testMethodSkipped", method);
                                    break;
                                case (test.score.methods[result.method].passed === false):
                                    self.dispatcher.emit("testMethodFailure", method);
                                    break;
                                default:
                                    self.dispatcher.emit("testMethodSuccess", method);
                                    break;
                            }

                            self.dispatcher.emit("testMethodStop", method);
                        } catch(exception) {
                            console.log(exception + "\n" + stdout);
                        }
                    }
                }
            );
            proc.stdin.write(testCode);
            proc.stdin.end();
        } catch(error) {
            error.stack = error.stack.split("\n").slice(1).join("\n");
            test.score.addError(error);

            this.dispatcher.emit("testError", test);
            this.dispatcher.emit("testStop", test);
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
            testCode = testCode.concat("atoum.includer = new Instrument(\"" + method.test.coveredDirectory + "\");\n");
        }

        return testCode
            .concat("script.run(process);\n")
            .concat("\n")
            .concat("process.exit();\n");
    }
};
