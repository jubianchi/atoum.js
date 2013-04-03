var util = require('util'),
    microtime = require('microtime-x'),
    atoum = require('..'),
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
    run: function(stdout) {
        var usage = process.memoryUsage(),
            start = microtime();

        if(this.dispatcher) this.dispatcher.emit('testStart', this);

        try {
            methods = this.getMethods();

            for(var name in methods) {
                this.score.addMethod();

                try {
                    methods[name].call(this);

                    if(this.dispatcher) this.dispatcher.emit('testMethodSuccess', this);
                } catch(exc) {
                    if(exc instanceof failure) {
                        this.score.addFailure(exc);

                        if(this.dispatcher) this.dispatcher.emit('testMethodFailure', this);
                    } else {
                        exc.stack = exc.stack.split('\n').slice(1).join('\n');
                        this.score.addException(exc);

                        if(this.dispatcher) this.dispatcher.emit('testMethodException', this);
                    }
                }
            }
        } catch(exc) {
            exc.stack = exc.stack.split('\n').slice(1).join('\n');
            this.score.addError(exc);

            if(this.dispatcher) this.dispatcher.emit('testMethodError', this);
        }

        this.score
            .setDuration((microtime() - start) / Math.pow(10, 6))
            .setUsage((function(before) {
                var after = process.memoryUsage();

                for(var key in after) {
                    if(after.hasOwnProperty(key)) {
                        before[key] = ((after[key] - (before[key] || 0)) / 1024);
                    }

                    before[key] = ((before[key] || 0) > 0 ? (before[key] || 0) : 0);
                }

                return before;
            })(usage))
        ;

        if(this.dispatcher) this.dispatcher.emit('testStop', this);
    },

    getMethods: function() {
        var unit = atoum.require(this.class),
            methods = [];

        for(method in unit) {
            if(unit.hasOwnProperty(method)) {
                methods[method] = unit[method];
            }
        }

        return methods;
    }
};
