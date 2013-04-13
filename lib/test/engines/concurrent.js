"use strict";

var microtime = require("microtime-x"),
    child = require("child_process"),
    concurrent = module.exports = function concurrent(dispatcher) {
        this.dispatcher = dispatcher;
    };

concurrent.prototype = {
    run: function (test) {
        var self = this,
            methods = test.getMethods(),
            remain = methods.length,
            method,
            testCode,
            proc;

        if(this.dispatcher) {
            this.dispatcher.emit("testStart", test);
        }

        while(methods.length > 0) {
            method = methods.shift();
            testCode = ''
                .concat("var atoum = require(\"" + require.resolve('../../..') + "\")(),\n")
                .concat("    includer = require(\"" + require.resolve('../../includer/instrument') + "\"),\n")
                .concat("    inc = atoum.includer = new includer(),\n")
                .concat("    microtime = require(\"" + require.resolve('microtime-x') + "\"),\n")
                .concat("    generator = new (require(\"").concat(require.resolve('../../asserter/generator')).concat("\"))(),\n")
                .concat("    test = require(\"").concat(require.resolve('../../test')).concat("\"),\n")
                .concat("    method = require(\"").concat(require.resolve('../../test/method')).concat("\"),\n")
                .concat("    unit = generator.injectInto(new test(\"").concat(test.class).concat("\")),\n")
                .concat("    methods = require(\"").concat(test.class).concat("\"),\n")
                .concat("    testcase = new method(\"").concat(method.name).concat("\", unit, methods[\"").concat(method.name).concat("\"], this.dispatcher);\n")
                .concat("    covershot = require(\"" + require.resolve('covershot') + "\"),\n")
                .concat("    score = testcase.run().score;")
                .concat("\n")
                .concat("score.assertions = generator.assertionsCount;\n")
                .concat("process.stdout.write(JSON.stringify({ name: \"").concat(method.name).concat("\", score: score }));\n")
                .concat("covershot.writeCoverage();\n")
                .concat("process.exit();\n")
            ;

            try {
                if(this.dispatcher) {
                    this.dispatcher.emit("testMethodStart", method);
                }

                proc = child.exec(
                    process.execPath,
                    function(error, stdout, stderr) {
                        var result = JSON.parse(stdout.toString());
                        test.score.addMethod(result);

                        if(self.dispatcher) {
                            switch(true) {
                                case (result.score.passed === false):
                                    self.dispatcher.emit("testMethodFailure", method);
                                    break;
                                case (typeof result.score.skipped !== 'undefined'):
                                    self.dispatcher.emit("testMethodSkipped", method);
                                    break;
                                default:
                                    self.dispatcher.emit("testMethodSuccess", method);
                                    break;
                            }

                            self.dispatcher.emit("testMethodStop", method);
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
