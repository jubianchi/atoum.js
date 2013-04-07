"use strict";

var util = require('util'),
    microtime = require('microtime-x'),
    underscore = require('underscore'),
    atoum = require('..')(),
    score = require('./test/score'),
    exception = require('./test/exception'),
    failure = require('./asserter/exception'),
    method = require('./test/method'),
    test = module.exports = function test(testClass, dispatcher) {
        this.class = testClass;
        this.score = new score();
        this.usage = {};
        this.dispatcher = dispatcher;
    };

test.prototype = {
    run: function () {
        if(this.dispatcher) {
            this.dispatcher.emit('testStart', this);
        }

        try {
            underscore.each(
                this.getMethods(),
                function(method) {
                    this.score.addMethod(method.run());
                },
                this
            );
        } catch(error) {
            error.stack = error.stack.split('\n').slice(1).join('\n');
            this.score.addError(error);

            if(this.dispatcher) {
                this.dispatcher.emit('testError', this);
            }
        }

        if(this.dispatcher) {
            this.dispatcher.emit('testStop', this);
        }
    },

    getMethods: function () {
        var unit = require(this.class),
            methods = [],
            name;

        for(name in unit) {
            if(unit.hasOwnProperty(name) && /^test[A-Z_\-]/.exec(name) && typeof unit[name] === 'function') {
                methods.push(new method(name, this, unit[name], this.dispatcher));
            }
        }

        return methods;
    }
};
