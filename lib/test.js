"use strict";

var underscore = require("underscore"),
    score = require("./test/score"),
    child = require("child_process"),
    method = require("./test/method"),
    test = module.exports = function test(testClass, dispatcher) {
        this.class = testClass;
        this.dispatcher = dispatcher;

        this.reset();
    };

test.prototype = {
    reset: function() {
        this.score = new score();

        return this;
    },

    run: function () {
        if(this.dispatcher) {
            this.dispatcher.emit("testStart", this);
        }

        try {
            var methods = this.getMethods(),
                remain = methods.length,
                self = this,
                method,
                testCode;

            while(methods.length > 0) {
                method = methods.shift();
                testCode = ''
                        .concat("var generator = new (require(\"").concat(require.resolve('./asserter/generator')).concat("\"))(),\n")
                        .concat("    runner = require(\"").concat(require.resolve('./runner')).concat("\"),\n")
                        .concat("    test = require(\"").concat(require.resolve('./test')).concat("\"),\n")
                        .concat("    method = require(\"").concat(require.resolve('./test/method')).concat("\"),\n")
                        .concat("    unit = generator.injectInto(new test(\"").concat(this.class).concat("\")),\n")
                        .concat("    methods = require(\"").concat(this.class).concat("\"),\n")
                        .concat("    testcase = new method(\"").concat(method.name).concat("\", unit, methods[\"").concat(method.name).concat("\"], this.dispatcher);\n")
                        .concat("    score = testcase.run().score;")
                        .concat("\n")
                        .concat("score.assertions = generator.assertionsCount;\n")
                        .concat("process.stdout.write(JSON.stringify({ name: \"").concat(method.name).concat("\", score: score }));\n")
                        .concat("process.exit();\n")
                ;

                var proc = child.exec(
                    process.execPath,
                    function(error, stdout, stderr) {
                        var result = JSON.parse(stdout.toString());
                        self.score.addMethod(result);

                        if(self.dispatcher) {
                            switch(true) {
                                case result.failed:
                                    self.dispatcher.emit("testMethodFailure", method);
                                    break;
                                case result.skipped:
                                    self.dispatcher.emit("testMethodSkipped", method);
                                    break;
                                default:
                                    self.dispatcher.emit("testMethodSuccess", method);
                                    break;
                            }
                        }

                        remain -= 1;

                        if(remain === 0) {
                            if(self.dispatcher) {
                                self.dispatcher.emit("testStop", self);
                            }
                        }
                    }
                );
                proc.stdin.write(testCode);
                proc.stdin.end();
            }
        } catch(error) {
            error.stack = error.stack.split("\n").slice(1).join("\n");
            this.score.addError(error);

            if(this.dispatcher) {
                this.dispatcher.emit("testError", this);
            }
        }

        return this;
    },

    getMethods: function () {
        var unit = require(this.class),
            methods = [],
            name;

        for(name in unit) {
            if(unit.hasOwnProperty(name) && /^test[A-Z_\-]/.exec(name) && typeof unit[name] === "function") {
                methods.push(new method(name, this, unit[name], this.dispatcher));
            }
        }

        return methods;
    }
};
