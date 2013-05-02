"use strict";

require("../../..")(module);

var microtime = require("microtime-x"),
    child = require("child_process"),
    concurrent = module.exports = function concurrent(dispatcher) {
        this.dispatcher = dispatcher;
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

        while(methods.length > 0) {
            method = methods.shift();

            testCode = "var atoum = require(\"" + require.resolve("../../..") + "\")(module),\n"
                .concat("    Script = require(\"" + require.resolve("../../scripts/concurrent") + "\"),\n")
                .concat("    Instrument = require(\"" + require.resolve("../../includer/instrument") + "\")\n")
                .concat("    script = new Script(\"" + test.class + "\", [ \"" + method.name + "\" ]);\n")
                .concat("\n");

            if(test.coverage) {
                testCode = testCode.concat("atoum.includer = new Instrument();\n");
            }

            testCode = testCode
                .concat("script.run(process);\n")
                .concat("\n")
                .concat("process.exit();\n");

            try {
                if(this.dispatcher) {
                    this.dispatcher.emit("testMethodStart", method);
                }

                proc = child.exec(
                    process.execPath,
                    {},
                    function(error, stdout, stderr) {
                        if(error) {
                            method.score.addException(error);
                            self.dispatcher.emit("testMethodException", method);

                            test.score.addMethod(method);
                        } else {
                            var result = JSON.parse(stdout.toString());
                            test.score.addMethod(result);

                            if(self.dispatcher) {
                                switch(true) {
                                    case (result.score.passed === false):
                                        self.dispatcher.emit("testMethodFailure", method);
                                        break;
                                    case (typeof result.score.skipped !== "undefined"):
                                        self.dispatcher.emit("testMethodSkipped", method);
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
    }
};
