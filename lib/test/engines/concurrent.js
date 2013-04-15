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
            testCode = "var atoum = require(\"" + require.resolve('../../..') + "\")(module),\n";

            if(test.coverage === true) {
                testCode = testCode
                    .concat("    Includer = require(\"" + require.resolve('../../includer/instrument') + "\"),\n")
                    .concat("    covershot = require(\"" + require.resolve('covershot') + "\"),\n")
                ;
            } else {
                testCode = testCode
                    .concat("    Includer = require(\"" + require.resolve('../../includer') + "\"),\n")
                ;
            }

            testCode = testCode
                .concat("    includer = atoum.includer = new Includer(),\n")
                .concat("    generator = new (require(\"").concat(require.resolve('../../asserter/generator')).concat("\"))(),\n")
                .concat("    Test = require(\"").concat(require.resolve('../../test')).concat("\"),\n")
                .concat("    method = require(\"").concat(require.resolve('../../test/method')).concat("\"),\n")
                .concat("    test = generator.injectInto(new Test(\"").concat(test.class).concat("\")),\n")
                .concat("    methods = require(test.class),\n")
                .concat("    testcase = new method(\"").concat(method.name).concat("\", test, methods[\"").concat(method.name).concat("\"]),\n")
                .concat("    score = testcase.run().score;")
                .concat("\n")
                .concat("score.assertions = generator.assertionsCount;\n")
                .concat("process.stdout.write(JSON.stringify({ name: \"").concat(method.name).concat("\", score: score }));\n")
            ;

            if(test.coverage === true) {
                testCode = testCode.concat("covershot.writeCoverage();\n");
            }

            testCode = testCode.concat("process.exit();\n");

            try {
                if(this.dispatcher) {
                    this.dispatcher.emit("testMethodStart", method);
                }

                proc = child.exec(
                    process.execPath,
                    {},
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
