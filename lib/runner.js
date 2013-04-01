var fs = require('fs'),
    util = require('util'),
    microtime = require('microtime-x'),
    readline = require('readline'),
    interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    }),
    atoum = require('./atoum'),
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
            buffer = '',
            usage = {};

        this.stdout.write(util.format('\033[34matoum.js %s\033[0m\n\n', atoum.version));
        this.stdout.write(util.format('> \033[1mnode path:\033[0m %s\n', process.execPath));
        this.stdout.write(util.format('> \033[1mnode versions:\033[0m %s\n', util.inspect(process.versions)));
        this.stdout.write('\n');

        var files = loadTests(path);
        for(var index in files) {
            var file = files[index],
                testClass = file.substr(file.lastIndexOf('/') + 1),
                unit = new test(file),
                runStart = microtime();

            this.stdout.write(util.format('> \033[1m%s/%s\033[0m\n', path, testClass));
            this.generator.injectInto(unit).run(this.stdout);

            testNumber++;
            methodNumber += unit.testMethods;
            failMethodNumber += unit.failedMethods;
            if(unit.failedMethods > 0) {
                failTestNumber++;
                if(unit.buffer) {
                    buffer += util.format('> \033[1m%s/%s\033[0m\n', path, testClass);
                }
                buffer += unit.buffer;
            }

            for(var key in unit.usage) {
                if(!usage[key]) {
                    usage[key] = 0;
                }

                usage[key] += unit.usage[key];
            }

            this.stdout.write(util.format('=> Test duration: %d second(s).\n', (microtime() - runStart) / Math.pow(10, 6)));
            this.stdout.write(util.format('=> Memore usage: %s\n', util.inspect(unit.usage)));
        }

        var duration = (microtime() - start) / Math.pow(10, 6);
        this.stdout.write(util.format('> \033[1mTotal test duration:\033[0m %d second(s).\n', duration));
        this.stdout.write(util.format('> \033[1mTotal test memory usage:\033[0m %s\n', util.inspect(usage)));

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
            this.stdout.write(util.format('> \033[31mThere were %d failures:\n', failMethodNumber));
            this.stdout.write(buffer + '\n');
        }

        var self = this;
        interface.question('Press <enter> to reexecute or any other key and <enter> to quit...', function(answer) {
            if(!answer) {
                return self.run(path);
            }

            interface.close();
        });
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