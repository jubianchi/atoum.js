var atoum = require('../..')(module),
    callback = require('../../lib/test/callback'),
    Score = require("../../lib/test/method/score"),
    Coverage = require("../../lib/test/score/coverage"),
    Failure = require("../../lib/asserter/exception"),
    Skipped = require("../../lib/test/method/exception"),
    testedClass = require('../../lib/test/method'),
    unit = module.exports = {
        testClass: function() {
            var object, name, test, method;

            this
                .if(name = Math.random().toString(36).substring(7))
                .and(test = {})
                .and(method = function() {})
                .then()
                    .object(object = new testedClass(name, test, method))
                    .string(object.name).isEqualTo(name)
                    .object(object.test).isIdenticalTo(test)
                    .function(object.method)
                    .object(object.score).isInstanceOf(Score)
            ;
        },

        testRun: function() {
            var object, name, test, method, failure, skip, exception, glob;

            this
                .if(name = Math.random().toString(36).substring(7))
                .and(test = {})
                .and(method = callback())
                .and(object = new testedClass(name, test, method))
                .then()
                    .object(object.run()).isIdenticalTo(object)
                    .callback(method).wasCalled().withoutArgument()
                .if(failure = new Failure())
                .and(method = callback(function () { throw failure; }))
                .and(object = new testedClass(name, test, method))
                .then()
                    .object(object.run()).isIdenticalTo(object)
                    .object(object.score.failure).isIdenticalTo(failure)
                .if(skip = new Skipped())
                .and(method = callback(function () { throw skip; }))
                .and(object = new testedClass(name, test, method))
                .then()
                    .object(object.run()).isIdenticalTo(object)
                    .object(object.score.skipped).isIdenticalTo(skip)
                .if(exception = new Error())
                .and(method = callback(function () { throw exception; }))
                .and(object = new testedClass(name, test, method))
                .then()
                    .object(object.run()).isIdenticalTo(object)
                    .object(object.score.exception).isIdenticalTo(exception)
                .if(method = callback())
                .and(object = new testedClass(name, test, method))
                .then()
                    .object(object.run()).isIdenticalTo(object)
                    .object(object.score.coverage).isEqualTo(new Coverage())
                .if(glob= {
                    "_$jscoverage": {
                        "lib/foo.js": {
                            1: 1,
                            2: 1,
                            3: 1,
                            4: 1,
                            source: [
                                Math.random().toString(36).substring(7),
                                Math.random().toString(36).substring(7),
                                Math.random().toString(36).substring(7),
                                Math.random().toString(36).substring(7)
                            ]
                        }
                    }
                })
                .then()
                    .object(object.run(glob)).isIdenticalTo(object)
                    .object(object.score.coverage.files).isEqualTo({
                        "lib/foo.js": {
                            "filename": "lib/foo.js",
                            "coverage": 100,
                            "hits": 4,
                            "misses": 0,
                            "sloc": 4,
                            "source": {
                                "1": {
                                    "line": glob["_$jscoverage"]["lib/foo.js"].source[0],
                                    "coverage": 1
                                },
                                "2": {
                                    "line": glob["_$jscoverage"]["lib/foo.js"].source[1],
                                    "coverage": 1
                                },
                                "3": {
                                    "line": glob["_$jscoverage"]["lib/foo.js"].source[2],
                                    "coverage": 1
                                },
                                "4": {
                                    "line": glob["_$jscoverage"]["lib/foo.js"].source[3],
                                    "coverage": 1
                                }
                            }
                        }
                    })
        }
    };
