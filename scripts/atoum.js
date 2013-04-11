"use strict";

var underscore = require('underscore'),
    util = require('util'),
    color = require('cli-color'),
    atoum = require('..')(),
    runner = require('../lib/runner'),
    cli = require('../lib/reports/cli'),
    xunit = require('../lib/reports/xunit'),
    coverage = require('../lib/reports/coverage'),
    generator = require('../lib/asserter/generator'),
    inline = require('../lib/test/engines/inline'),
    fs = require('fs'),
    optimist,
    argv;

optimist = require('optimist')
    .usage('Usage: atoum [options]')
    .options('help', {
        alias : 'h',
        description: 'Display this help message',
        boolean : true
    })
    .options('directory', {
        alias : 'd',
        description: 'Test directory',
        default : 'tests'
    })
    .options('loop', {
        alias : 'l',
        description: 'Enable loop mode',
        boolean : true
    })
    .options('xunit', {
        description: 'Enable xUnit report',
        default: 'xunit.xml'
    })
    .options('coverage', {
        description: 'Enable code coverage report',
        default: 'lib'
    })
    .options('inline', {
        description: 'Use inline engine instead of concurrent',
        boolean: true
    })
    .check(function(args) {
        if(fs.existsSync(args.directory) === false) {
            throw new Error(util.format(color.red("Directory '%s' does not exist"), args.directory));
        }

        if(typeof args.coverage !== undefined && fs.existsSync(args.coverage) === false) {
            throw new Error(util.format(color.red("Directory '%s' does not exist"), args.coverage));
        }
    })
;
argv = optimist.argv;

if(argv.help) {
    optimist.showHelp();
    process.exit();
}

try {
    var path = fs.realpathSync(argv.directory),
        run = new runner(
            atoum.includer,
            argv.inline ? new inline(new generator()) : null
        );

    run.addReport(new cli(process.stdout));

    if(argv.xunit) {
        run.addReport(new xunit(fs.createWriteStream(argv.xunit)));
    }

    if(argv.coverage) {
        run.addReport(new coverage(process.stdout, run, argv.coverage));
    }

    if(argv.loop) {
        run.setLoop(true);
    }

    run.run(path);
} catch(exception) {
    process.stderr.write(util.format(
        color.red('[%s] %s\n%s\n'),
        exception.name,
        exception.message,
        exception.stack
    ));

    process.exit(1);
}
