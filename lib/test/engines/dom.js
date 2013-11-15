"use strict";

require("../../..")(module);

var extend = require("node.extend"),
    Concurrent = require("./concurrent"),
    dom = module.exports = function dom(dispatcher, child) {
        Concurrent.apply(this, [dispatcher, child]);

        this.scripts = [];
        this.content = "";
    };

dom.prototype = new Concurrent();
dom.prototype.constructor = dom;
dom.prototype = extend(
    dom.prototype,
    {
        load: function(content) {
            this.content = content;

            return this;
        },

        addScript: function(script) {
            this.scripts.push(script);

            return this;
        },

        getTestMethodCode: function(method, r) {
            var resolve = r ? (r.resolve || require.resolve) : require.resolve,
                testCode = "var atoum = require(\"" + resolve("../../..") + "\")(module),\n"
                    .concat("    Generator = require(\"" + resolve("../../asserter/generator") + "\"),\n")
                    .concat("    Test = require(\"" + resolve("../../test") + "\"),\n")
                    .concat("    Dom = require(\"" + resolve("../../mock/dom") + "\"),\n")
                    .concat("    Serializer = require(\"" + resolve("../../serializer") + "\");\n");

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
                .concat("generator.injectInto(test);\n")
                .concat("new Dom(\"" + this.content + "\", [\"" + this.scripts.join("\", \"") + "\"]).run(method.run, global);\n")
                .concat("method.score.assertions = generator.assertionsCount;\n")
                .concat("process.stdout.write(new Serializer().json({\n")
                .concat("    test: \"" + method.test.class + "\",\n")
                .concat("    method: \"" +  method.name + "\",\n")
                .concat("    score: test.score.addMethod(method)\n")
                .concat("}));")
                .concat("\n")
                .concat("process.exit();\n");
        }
    }
);
