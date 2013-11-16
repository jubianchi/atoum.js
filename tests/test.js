var atoum = require('..')(module),
    testedClass = require('../lib/test'),
    Engine = require('../lib/test/engines/inline'),
    Dispatcher = require("events").EventEmitter,
    unit = module.exports = {
        testClass: function() {
            var object, testClass;

            this
                .if(testClass = Math.random().toString(36).substring(7))
                .then()
                    .object(object = new testedClass(testClass, null, function() {}))
                    .string(object.class).isEqualTo(testClass)
                    .bool(object.coverage).isFalse()
                    .undefined(object.getCurrentTestCase())
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
            var object, testClass, engineMockClass, engine, dispatcher, dispatcherMockClass, testClassCode;

            this
                .if(dispatcherMockClass = this.generateMock(Dispatcher))
                .and(engineMockClass = this.generateMock(Engine))
                .and(dispatcher = new dispatcherMockClass())
                .and(testClass = Math.random().toString(36).substring(7))
                .if(testClassCode = {
                    setUp: this.generateCallback(),
                    tearDown: this.generateCallback(),

                    testFoo: function() {},
                    testBar: function() {}
                })
                .and(object = new testedClass(testClass, dispatcher, function() { return testClassCode; }))
                .and(engine = new engineMockClass())
                .and(engine.controller.override('run', function() { dispatcher.emit('testMethodStop'); }))
                .and(object.setDefaultEngine(engine))
                .then()
                    .object(object.run()).isIdenticalTo(object)
                    .mock(dispatcher)
                        .call('emit')//.withArguments('testStart', object)
                        .call('emit')//.withArguments('testStop', object)
                    .callback(testClassCode.setUp).wasCalled()
                    .callback(testClassCode.tearDown).wasCalled()
            ;
        },

        testGetSetCurrentTestCase: function()
        {
            var dispatcher, testClass, object, testCase;

            this
                .if(dispatcher = { emit: this.generateCallback() })
                .and(testClass = Math.random().toString(36).substring(7))
                .and(object = new testedClass(testClass, dispatcher, function() { return {}; }))
                .then()
                    .undefined(object.getCurrentTestCase())
                    .object(object.setCurrentTestCase(testCase = Math.random().toString(36).substring(7))).isIdenticalTo(object)
                    .string(object.getCurrentTestCase()).isEqualTo(testCase)
            ;
        }
    };
