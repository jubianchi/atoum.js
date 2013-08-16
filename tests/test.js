var atoum = require('..')(module),
    testedClass = require('../lib/test'),
    Engine = require('../lib/test/engines/inline'),
    Dispatcher = require("events").EventEmitter,
    callback = require('../lib/test/callback'),
    unit = module.exports = {
        testClass: function() {
            var object, testClass;

            this
                .if(testClass = Math.random().toString(36).substring(7))
                .then()
                    .object(object = new testedClass(testClass, null, function() {}))
                    .string(object.class).isEqualTo(testClass)
                    .bool(object.coverage).isFalse()
            ;
        },

        testSetCoverage: function() {
            var object, testClass;

            this
                .if(testClass = Math.random().toString(36).substring(7))
                .and(object = new testedClass(testClass, null, function() {}))
                .then()
                    .bool(object.coverage).isFalse()
                    .object(object.setCoverage(true)).isIdenticalTo(object)
                    .bool(object.coverage).isTrue()
                    .object(object.setCoverage(false)).isIdenticalTo(object)
                    .bool(object.coverage).isFalse()
            ;
        },

        testRun: function() {
            var object, testClass, mockEngine, engine, dispatcher, testClassCode;

            this
                .if(dispatcher = { emit: callback() })
                .and(testClass = Math.random().toString(36).substring(7))
                .and(object = new testedClass(testClass, dispatcher, function() { return {}; }))
                .and(this.generateStub(object, 'getMethods', []))
                .and(mockEngine = this.generateMock(Engine))
                .and(engine = new mockEngine())
                .and(engine.controller.override('run'))
                .then()
                    .object(object.run(engine)).isIdenticalTo(object)
                    .callback(dispatcher.emit).wasCalled()
                        .withArguments('testStart', object)
                        .withArguments('testStop', object)
                .if(testClassCode = {
                    setUp: callback(),
                    tearDown: callback()
                })
                .and(object = new testedClass(testClass, null, function() { return testClassCode; }))
                .then()
                    .object(object.run(engine)).isIdenticalTo(object)
                    .callback(testClassCode.setUp).wasCalled()
                    .callback(testClassCode.tearDown).wasCalled()
            ;
        }
    };
