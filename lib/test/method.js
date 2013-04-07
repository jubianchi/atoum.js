"use strict";

var util = require('util'),
    microtime = require('microtime-x'),
    underscore = require('underscore'),
    score = require('./method/score'),
    failure = require('../asserter/exception'),
    method = module.exports = function method(name, test, method, dispatcher) {
        this.name = name;
        this.test = test;
        this.method = method;
        this.score = new score();
        this.dispatcher = dispatcher;
    };

method.prototype = {
    run: function () {
        var usage = process.memoryUsage(),
            start = microtime();

        if(this.dispatcher) {
            this.dispatcher.emit('testMethodStart', this);
        }

        try {
            this.method.call(this.test);

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

        if(this.dispatcher) {
            this.dispatcher.emit('testMethodStop', this);
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

        return this;
    }
};
