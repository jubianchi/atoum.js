"use strict";

var util = require('util'),
    microtime = require('microtime-x'),
    underscore = require('underscore'),
    atoum = require('..')(),
    score = require('./test/score'),
    exception = require('./test/exception'),
    failure = require('./asserter/exception'),
    test = module.exports = function test(testClass, dispatcher) {
        this.class = testClass;
        this.score = new score();
        this.usage = {};
        this.dispatcher = dispatcher;
    };

test.prototype = {
    run: function (stdout) {
        var usage = process.memoryUsage(),
            start = microtime(),
            key,
            methods = [];

        if(this.dispatcher) {
            this.dispatcher.emit('testStart', this);
        }

        methods = this.getMethods();
        for(key in methods) {
            if(methods.hasOwnProperty(key) && typeof methods[key] === 'function') {
                try {
                    this.score.addMethod();

                    try {
                        methods[key].call(this);

                        if(this.dispatcher) {
                            this.dispatcher.emit('testMethodSuccess', this);
                        }
                    } catch(exception) {
                        if(exception instanceof failure) {
                            this.score.addFailure(exception);

                            if(this.dispatcher) {
                                this.dispatcher.emit('testMethodFailure', this);
                            }
                        } else {
                            exception.stack = (exception.stack || '').split('\n').slice(1).join('\n');
                            this.score.addException(exception);

                            if(this.dispatcher) {
                                this.dispatcher.emit('testMethodException', this);
                            }
                        }
                    }
                } catch(error) {
                    error.stack = error.stack.split('\n').slice(1).join('\n');
                    this.score.addError(error);

                    if(this.dispatcher) {
                        this.dispatcher.emit('testMethodError', this);
                    }
                }
            }
        }

        this.score
            .setDuration((microtime() - start) / Math.pow(10, 6))
            .setUsage((function (before) {
                var after = process.memoryUsage(),
                    key;

                for(key in after) {
                    if(after.hasOwnProperty(key)) {
                        before[key] = ((after[key] - (before[key] || 0)) / 1024);
                    }

                    before[key] = ((before[key] || 0) > 0 ? (before[key] || 0) : 0);
                }

                return before;
            }(usage)))
        ;

        if(this.dispatcher) {
            this.dispatcher.emit('testStop', this);
        }
    },

    getMethods: function () {
        var unit = require(this.class),
            methods = [],
            method;

        for(method in unit) {
            if(unit.hasOwnProperty(method)) {
                methods[method] = unit[method];
            }
        }

        return methods;
    }
};
