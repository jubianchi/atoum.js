var _ = require('underscore'),
    fs = require('fs'),
    dispatcher = require('events').EventEmitter,
    readline = require('readline'),
    dialog = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    }),
    atoum = require('./atoum'),
    test = require('./test'),
    score = require('./score'),
    runner = module.exports = function runner(report, generator) {
        this.generator = generator;
        this.loop = false;
        this.score = new score();
        this.dispatcher = new dispatcher();
        this.report = report.register(this.dispatcher);

        return this;
    };

runner.prototype = {
    setLoop: function(enable) {
        this.loop = enable;

        return this;
    },

    run: function(path) {
        var usage = {};

        this.dispatcher.emit('runnerStart', this);

        var files = loadTests(path);
        for(var index in files) {
            var file = files[index],
                unit = new test(file, this.dispatcher);

            this.generator.injectInto(unit).run(this.stdout);
            this.score.addTest(unit);

            for(var key in unit.usage) {
                if(!usage[key]) {
                    usage[key] = 0;
                }

                usage[key] += unit.usage[key];
            }
        }

        this.dispatcher.emit('runnerStop', this);

        if(true === this.loop) {
            var self = this;
            dialog.question('Press <enter> to reexecute or any other key and <enter> to quit...\n', function(answer) {
                if(!answer) {
                    self.generator.reset();
                    self.score.reset();

                    self.run(path);
                } else {
                    self.exit();
                }
            });
        } else {
            this.exit();
        }
    },

    exit: function() {
        dialog.close();
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