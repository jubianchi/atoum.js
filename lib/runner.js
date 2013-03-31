var fs = require('fs'),
    util = require('util'),
    microtime = require('microtime-x'),
    runner = module.exports = function runner(stdout, test) {
        this.stdout = stdout;
        this.test = test;

        return this;
    };

runner.prototype = {
    run: function(path) {
        var start = microtime(),
            testNumber = 0,
            methodNumber = 0,
            failMethodNumber = 0,
            buffer = '';

        this.stdout.write('\033[34matoum.js alpha\033[0m\n\n');

        var files = loadTests(path);
        for(var index in files) {
            var file = files[index],
                testClass = file.substr(file.lastIndexOf('/')),
                unit = new this.test(file),
                methods = unit.getMethods(),
                failMethods = 0;

            for(var name in methods) {
                try {
                    methods[name].call(unit);
                } catch(exception) {
                    failMethods++;
                    buffer += '\n>> ' + testClass + '::' + name + '\n>>> \033[0;31m' + exception.message + '\033[0m\n';
                    buffer += exception.stack;
                }

                methodNumber++;
            }

            if(failMethods > 0) {
                this.stdout.write('\033[31mF\033[0m');
            } else {
                this.stdout.write('\033[32mS\033[0m');
            }

            failMethodNumber += failMethods;
            testNumber++;
        }

        this.stdout.write('\n\n');

        var duration = (microtime() - start) / Math.pow(10, 6);
        if(failMethodNumber == 0) {
            this.stdout.write(util.format('Running duration: %ds\n', duration));
            this.stdout.write('\033[42;37mSuccess (' + testNumber + ' test(s), ' + methodNumber + ' method(s)) !\033[0m\n');
        } else {
            this.stdout.write('\033[41;37mFailure (' + testNumber + ' test(s), ' + (methodNumber - failMethodNumber) + '/' + methodNumber + ' method(s)) !\033[0m\n');
            this.stdout.write(buffer + '\n');
        }
    }
};

function loadTests(directory, files) {
    files = files || [];

    var entries = fs.readdirSync(directory);
    for(var index in entries) {
        var path = directory + '/' + entries[index];

        if(fs.statSync(path).isDirectory()) {
            loadTests(path, files);

            continue;
        }

        files.push(path);
    }

    return files;
}