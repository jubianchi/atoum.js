"use strict";

require("../../..")(module);

var Dispatcher = require("events").EventEmitter,
    concurrent = module.exports = function concurrent(dispatcher, child) {
        this.dispatcher = dispatcher || new Dispatcher();
        this.child = child || require("child_process");
    };

concurrent.prototype = {
    run: function (test, method, callback) {
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
                            test.score.merge(result.score);

                            switch(true) {
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

                        if(callback) {
                            callback();
                        }
                    }
                }
            );
            proc.stdin.write(testCode);
            proc.stdin.end();
        } catch(error) {
            error.stack = error.stack.split("\n").slice(1).join("\n");
            method.score.addException(error);

            this.dispatcher.emit("testMethodException", method);
        }
    },

    getTestMethodCode: function(method, r) {
        var resolve = r ? (r.resolve || require.resolve) : require.resolve,
            testCode = "var atoum = require(\"" + resolve("../../..") + "\")(module),\n"
                .concat("    Generator = require(\"" + resolve("../../asserter/generator") + "\"),\n")
                .concat("    Test = require(\"" + resolve("../../test") + "\"),\n")
                .concat("    serializer = require(\"" + resolve("../../serializer") + "\");\n");

        if(method.test.coverage) {
            testCode = testCode
                .concat("\n")
                .concat("var Instrument = require(\"" + resolve("../../includer/instrument") + "\");\n")
                .concat("atoum.includer = new Instrument(\"" + method.test.coveredDirectory + "\");\n")
                .concat("require(\"jscoverage\").processFile(\n")
                .concat("    \"" + method.test.coveredDirectory + "\",\n")
                .concat("    \"" + method.test.coveredDirectory + "\".concat(\"-cov\"),\n")
                .concat("    [],\n")
                .concat("    {}\n")
                .concat(");\n");
        }

        testCode = testCode
            .concat("var generator = new Generator(),\n")
            .concat("    test = new Test(\"" + method.test.class + "\"),\n")
            .concat("    method = test.getMethods(\"" +  method.name + "\").pop();\n")
            .concat("\n");

        if(method.test.coverage) {
            testCode = testCode.concat("test.setCoverage(true, \"" + method.test.coveredDirectory + "\");\n");
        }

        return testCode
            .concat("generator.setTest(test);\n")
            .concat("method.run(global);\n")
            .concat("method.score.assertions = generator.assertionsCount;\n")
            .concat("process.stdout.write(new serializer().json({\n")
            .concat("    test: \"" + method.test.class + "\",\n")
            .concat("    method: \"" +  method.name + "\",\n")
            .concat("    score: test.score.addMethod(method)\n")
            .concat("}));")
            .concat("\n")
            .concat("process.exit();\n");
    }
};
