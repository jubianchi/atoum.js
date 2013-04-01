var console = require('console'),
    test = module.exports = function test(testClass) {
        this.class = testClass;
        this.buffer = '';
        this.testMethods = 0;
        this.failedMethods = 0;
        this.usage = {};
    };

test.prototype = {
    run: function(stdout) {
        var usageBefore = process.memoryUsage(),
            methods = this.getMethods();

        stdout.write('[');

        for(var name in methods) {
            this.testMethods++;

            try {
                methods[name].call(this);
                stdout.write('\033[32mS\033[0m');
            } catch(exception) {
                this.failedMethods++;

                stdout.write('\033[31mF\033[0m');

                this.buffer += '\033[0;31m' + exception.message + '\033[0m\n';
                this.buffer += exception.stack;
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
        if(require.cache[this.class]) {
            delete require.cache[this.class];
        }

        var unit = require(this.class),
            methods = [];

        for(method in unit) {
            if(unit.hasOwnProperty(method)) {
                methods[method] = unit[method];
            }
        }

        return methods;
    }
};
