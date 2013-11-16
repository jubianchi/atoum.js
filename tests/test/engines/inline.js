require('../../..')(module);

var Test = require('../../../lib/test'),
    Failure = require('../../../lib/asserter/exception'),
    Skip = require('../../../lib/test/method/exception'),
    Method = require('../../../lib/test/method'),
    testedClass = require('../../../lib/test/engines/inline'),
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
            var object, dispatcher, test, method;

            this
                .if(dispatcher = { emit: this.generateCallback() })
                .and(test = new Test('test', dispatcher, function() {}))
                .and(test.getMethods = function() { return []; })
                .and(method = new Method('method', test, this.generateCallback()))
                .and(object = new testedClass(dispatcher))
                .and(test.getMethods = function() { return [ method ]; })
                .then()
                    .void(object.run(test, method))
                    .callback(dispatcher.emit).wasCalled()
                        .withArguments('testMethodStart', method)
                        .withArguments('testMethodSuccess', method)
                        .withArguments('testMethodStop', method)
                    .callback(method.method).wasCalled()
                .if(dispatcher = { emit: this.generateCallback() })
                .and(method = new Method('method', test, this.generateCallback(function() {
                    throw new Failure();
                })))
                .and(test.getMethods = function() { return [ method ]; })
                .and(object = new testedClass(dispatcher))
                .then()
                    .void(object.run(test, method))
                    .callback(dispatcher.emit).wasCalled()
                        .withArguments('testMethodStart', method)
                        .withArguments('testMethodFailure', method)
                        .withArguments('testMethodStop', method)
                    .callback(method.method).wasCalled()
                .if(dispatcher = { emit: this.generateCallback() })
                .and(method = new Method('method', test, this.generateCallback(function() {
                    throw new Error();
                })))
                .and(test.getMethods = function() { return [ method ]; })
                .and(object = new testedClass(dispatcher))
                .then()
                    .void(object.run(test, method))
                    .callback(dispatcher.emit).wasCalled()
                        .withArguments('testMethodStart', method)
                        .withArguments('testMethodException', method)
                        .withArguments('testMethodStop', method)
                    .callback(method.method).wasCalled()
                .if(dispatcher = { emit: this.generateCallback() })
                .and(method = new Method('method', test, this.generateCallback(function() {
                    throw new Skip();
                })))
                .and(test.getMethods = function() { return [ method ]; })
                .and(object = new testedClass(dispatcher))
                .then()
                    .void(object.run(test, method))
                    .callback(dispatcher.emit).wasCalled()
                        .withArguments('testMethodStart', method)
                        .withArguments('testMethodSkipped', method)
                        .withArguments('testMethodStop', method)
                    .callback(method.method).wasCalled()
            ;
        }
    };
