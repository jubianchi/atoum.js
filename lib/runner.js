var fs = require('fs'),
    util = require('util'),
    microtime = require('microtime-x'),
    test = require('./test'),
    runner = module.exports = function runner(stdout, generator) {
        this.stdout = stdout;
        this.generator = generator;

        return this;
    };

runner.prototype = {
    run: function(path) {
        var start = microtime(),
            testNumber = 0,
            failTestNumber = 0,
            methodNumber = 0,
            failMethodNumber = 0,
            buffer = '';

        this.stdout.write('\033[34matoum.js alpha\033[0m\n\n');

        var files = loadTests(path);
        for(var index in files) {
            var file = files[index],
                testClass = file.substr(file.lastIndexOf('/')),
                unit = new test(file),
                methods = unit.getMethods(),
                failMethods = 0,
                testFailed = false;

            this.generator.injectInto(unit);

            for(var name in methods) {
                try {
                    methods[name].call(unit);
                } catch(exception) {
                    failMethods++;
                    testFailed = true;

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
            if(testFailed) {
                failTestNumber++;
            }
        }

        this.stdout.write('\n\n');

        var duration = (microtime() - start) / Math.pow(10, 6);
        this.stdout.write(util.format('Running duration: %ds\n', duration));
        if(failMethodNumber == 0) {
            this.stdout.write(util.format(
                '\033[42;37mSuccess (%s test(s), %d method(s), %d assertion(s)) !\033[0m\n',
                testNumber,
                methodNumber,
                this.generator.assertionsCount
            ));
        } else {
            this.stdout.write(util.format(
                '\033[41;37mFailure (%d/%d test(s), %d/%d method(s), %d assertion(s)) !\033[0m\n',
                (testNumber - failTestNumber),
                testNumber,
                (methodNumber - failMethodNumber),
                methodNumber,
                this.generator.assertionsCount
            ));
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