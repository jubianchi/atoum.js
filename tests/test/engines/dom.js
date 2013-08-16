require('../../..')(module);

var Concurrent = require('../../../lib/test/engines/concurrent'),
    testedClass = require('../../../lib/test/engines/dom'),
    unit = module.exports = {
        testClass: function() {
            var object, dispatcher;

            this
                .if(dispatcher = {})
                .then()
                    .object(object = new testedClass(dispatcher)).isInstanceOf(Concurrent)
                    .object(object.dispatcher).isIdenticalTo(dispatcher)
            ;
        },

        testGetTestMethodCode: function() {
            var object, method, req;

            this
                .if(method = {
                    name: Math.random().toString(36).substring(7),
                    test: {
                        class: Math.random().toString(36).substring(7)
                    }
                })
                .and(object = new testedClass({}))
                .and(req = {
                    resolve: function(m) {
                        return m;
                    }
                })
                .then()
                    .string(object.getTestMethodCode(method, req)).isEqualTo(
                        "var atoum = require(\"../../..\")(module),\n"
                            .concat("    Generator = require(\"../../asserter/generator\"),\n")
                            .concat("    Test = require(\"../../test\"),\n")
                            .concat("    Dom = require(\"../../mock/dom\"),\n")
                            .concat("    Serializer = require(\"../../serializer\");\n")
                            .concat("var generator = new Generator(),\n")
                            .concat("    test = new Test(\"" + method.test.class + "\"),\n")
                            .concat("    method = test.getMethods(\"" +  method.name + "\").pop();\n")
                            .concat("\n")
                            .concat("generator.injectInto(test);\n")
                            .concat("new Dom(\"\", [\"\"]).run(method.run, global);\n")
                            .concat("method.score.assertions = generator.assertionsCount;\n")
                            .concat("process.stdout.write(new Serializer().json({\n")
                            .concat("    test: \"" + method.test.class + "\",\n")
                            .concat("    method: \"" +  method.name + "\",\n")
                            .concat("    score: test.score.addMethod(method)\n")
                            .concat("}));")
                            .concat("\n")
                            .concat("process.exit();\n")
                    )
                .if(method = {
                    name: Math.random().toString(36).substring(7),
                    test: {
                        class: Math.random().toString(36).substring(7),
                        coverage: true,
                        coveredDirectory: Math.random().toString(36).substring(7)
                    }
                })
                .then()
                    .string(object.getTestMethodCode(method, req)).isEqualTo(
                        "var atoum = require(\"../../..\")(module),\n"
                            .concat("    Generator = require(\"../../asserter/generator\"),\n")
                            .concat("    Test = require(\"../../test\"),\n")
                            .concat("    Dom = require(\"../../mock/dom\"),\n")
                            .concat("    Serializer = require(\"../../serializer\");\n")
                            .concat("\n")
                            .concat("var Instrument = require(\"../../includer/instrument\");\n")
                            .concat("atoum.includer = new Instrument(\"" + method.test.coveredDirectory + "\");\n")
                            .concat("require(\"jscoverage\").processFile(\n")
                            .concat("    \"" + method.test.coveredDirectory + "\",\n")
                            .concat("    \"" + method.test.coveredDirectory + "\".concat(\"-cov\"),\n")
                            .concat("    [],\n")
                            .concat("    {}\n")
                            .concat(");\n")
                            .concat("var generator = new Generator(),\n")
                            .concat("    test = new Test(\"" + method.test.class + "\"),\n")
                            .concat("    method = test.getMethods(\"" +  method.name + "\").pop();\n")
                            .concat("\n")
                            .concat("test.setCoverage(true, \"" + method.test.coveredDirectory + "\");\n")
                            .concat("generator.injectInto(test);\n")
                            .concat("new Dom(\"\", [\"\"]).run(method.run, global);\n")
                            .concat("method.score.assertions = generator.assertionsCount;\n")
                            .concat("process.stdout.write(new Serializer().json({\n")
                            .concat("    test: \"" + method.test.class + "\",\n")
                            .concat("    method: \"" +  method.name + "\",\n")
                            .concat("    score: test.score.addMethod(method)\n")
                            .concat("}));")
                            .concat("\n")
                            .concat("process.exit();\n")
                    )
            ;
        }
    };
