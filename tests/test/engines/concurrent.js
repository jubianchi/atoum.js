require('../../..')(module);

var callback = require('../../../lib/test/callback'),
    Test = require('../../../lib/test'),
    Method = require('../../../lib/test/method'),
    testedClass = require('../../../lib/test/engines/concurrent'),
    unit = module.exports = {
        testClass: function() {
            var object, dispatcher;

            this
                .if(dispatcher = {})
                .then()
                    .object(object = new testedClass(dispatcher))
                    .object(object.dispatcher).isIdenticalTo(dispatcher)
            ;
        },

        testRun: function() {
            var object, dispatcher, test, method, child;

            this
                .if(dispatcher = { emit: callback() })
                .and(test = new Test('test'))
                .and(test.getMethods = function() { return []; })
                .and(method = new Method('method', test, callback()))
                .and(child = {
                    exec: function(cmd, opts, cb) {
                        cb && cb(
                            false,
                            JSON.stringify({ test: test.class, method: method.name, score: test.score.addMethod(method) }),
                            ''
                        );

                        return { stdin: { write: function() {}, end: function() {} } };
                    }
                })
                .and(object = new testedClass(dispatcher, child))
                .and(test.getMethods = function() { return [ method ]; })
                .then()
                    .void(object.run(test, method))
                    .callback(dispatcher.emit).wasCalled()
                        .withArguments('testMethodStart', method)
                        .withArguments('testMethodSuccess', method)
                        .withArguments('testMethodStop', method)
                .if(dispatcher = { emit: callback() })
                .and(method = new Method('method', test, callback()))
                .and(test.getMethods = function() { return [ method ]; })
                .and(child = {
                    exec: function(cmd, opts, cb) {
                        method.score.addFailure(new Error());

                        cb(
                            false,
                            JSON.stringify({ test: test.class, method: method.name, score: test.score.addMethod(method) }),
                            ''
                        );

                        return { stdin: { write: function() {}, end: function() {} } };
                    }
                })
                .and(object = new testedClass(dispatcher, child))
                .then()
                    .void(object.run(test, method))
                    .callback(dispatcher.emit).wasCalled()
                        .withArguments('testMethodStart', method)
                        .withArguments('testMethodFailure', method)
                        .withArguments('testMethodStop', method)
                .if(dispatcher = { emit: callback() })
                .and(method = new Method('method', test, callback()))
                .and(test.getMethods = function() { return [ method ]; })
                .and(child = {
                    exec: function(cmd, opts, cb) {
                        method.score.addException(new Error());

                        cb && cb(
                            false,
                            JSON.stringify({ test: test.class, method: method.name, score: test.score.addMethod(method) }),
                            ''
                        );

                        return { stdin: { write: function() {}, end: function() {} } };
                    }
                })
                .and(object = new testedClass(dispatcher, child))
                .then()
                    .void(object.run(test, method))
                    .callback(dispatcher.emit).wasCalled()
                        .withArguments('testMethodStart', method)
                        .withArguments('testMethodException', method)
                        .withArguments('testMethodStop', method)
                .if(dispatcher = { emit: callback() })
                .and(method = new Method('method', test, callback()))
                .and(test.getMethods = function() { return [ method ]; })
                .and(child = {
                    exec: function(cmd, opts, cb) {
                        method.score.addSkipped(new Error())

                        cb && cb(
                            false,
                            JSON.stringify({ test: test.class, method: method.name, score: test.score.addMethod(method) }),
                            ''
                        );

                        return { stdin: { write: function() {}, end: function() {} } };
                    }
                })
                .and(object = new testedClass(dispatcher, child))
                .then()
                    .void(object.run(test, method))
                    .callback(dispatcher.emit).wasCalled()
                        .withArguments('testMethodStart', method)
                        .withArguments('testMethodSkipped', method)
                        .withArguments('testMethodStop', method)
                .if(dispatcher = { emit: callback() })
                .and(method = new Method('method', test, callback()))
                .and(test.getMethods = function() { return [ method ]; })
                .and(child = {
                    exec: function(cmd, opts, cb) {
                        throw new Error()
                    }
                })
                .and(object = new testedClass(dispatcher, child))
                .then()
                    .void(object.run(test, method))
                    .callback(dispatcher.emit).wasCalled()
                    .withArguments('testMethodStart', method)
                    .withArguments('testMethodException', method)
                .if(dispatcher = { emit: callback() })
                .and(method = new Method('method', test, callback()))
                .and(test.getMethods = function() { return [ method ]; })
                .and(child = {
                    exec: function(cmd, opts, cb) {
                        cb && cb(new Error(), '', '');

                        return { stdin: { write: function() {}, end: function() {} } };
                    }
                })
                .and(object = new testedClass(dispatcher, child))
                .then()
                    .void(object.run(test, method))
                    .callback(dispatcher.emit).wasCalled()
                    .withArguments('testMethodStart', method)
                    .withArguments('testError', test)
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
                            .concat("    serializer = require(\"../../serializer\");\n")
                            .concat("var generator = new Generator(),\n")
                            .concat("    test = new Test(\"" + method.test.class + "\"),\n")
                            .concat("    method = test.getMethods(\"" +  method.name + "\").pop();\n")
                            .concat("\n")
                            .concat("generator.injectInto(test);\n")
                            .concat("method.run(global);\n")
                            .concat("method.score.assertions = generator.assertionsCount;\n")
                            .concat("process.stdout.write(new serializer().json({\n")
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
                            .concat("    serializer = require(\"../../serializer\");\n")
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
                            .concat("method.run(global);\n")
                            .concat("method.score.assertions = generator.assertionsCount;\n")
                            .concat("process.stdout.write(new serializer().json({\n")
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
