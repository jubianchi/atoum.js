var util = require('util'),
    atoum = require('..'),
    score = require('./test/score'),
    exception = require('./test/exception'),
    failure = require('./asserter/exception'),
    test = module.exports = function test(testClass) {
        this.class = testClass;
        this.score = new score();
        this.usage = {};
    };

test.prototype = {
    run: function(stdout) {
        var usageBefore = process.memoryUsage();

        stdout.write('[');

        try {
            methods = this.getMethods();

            for(var name in methods) {
                this.score.addMethod();

                try {
                    methods[name].call(this);
                    stdout.write('\033[32mS\033[0m');
                } catch(exc) {
                    if(exc instanceof failure) {
                        this.score.addFailure(util.format('\033[0;31m%s: %s\033[0m\n%s', exc.name, exc.message, exc.stack));

                        stdout.write('\033[31mF\033[0m');
                    } else {
                        this.score.addError(util.format('\033[0;31m%s: %s\033[0m\n%s', exc.name, exc.message, exc.stack));

                        stdout.write('\033[31mE\033[0m');
                    }
                }
            }
        } catch(exc) {
            if(exc instanceof exception) {
                this.score.addException(util.format('\033[0;31m%s: %s\033[0m\n%s', exc.name, exc.message, exc.stack));

                stdout.write('\033[31mX\033[0m');
            }
        }

        stdout.write(']\n');

        var usageAfter = process.memoryUsage();
        for(var key in usageBefore) {
            var use = 0;
            if(usageBefore.hasOwnProperty(key) && usageAfter.hasOwnProperty(key)) {
                use = (usageAfter[key] - usageBefore[key]) / 1024;
            }

            this.usage[key] = (use > 0 ? use : 0);
        }
    },

    getMethods: function() {
        try {
            var unit = atoum.require(this.class),
                methods = [];

            for(method in unit) {
                if(unit.hasOwnProperty(method)) {
                    methods[method] = unit[method];
                }
            }
        } catch(exc) {
            throw new exception(exc.message);
        }

        return methods;
    }
};
