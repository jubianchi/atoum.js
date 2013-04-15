"use strict";

var underscore = require('underscore'),
    util = require('util'),
    color = require('cli-color'),
    atoum = require('..')(),
    Runner = require('../lib/runner'),
    Cli = require('../lib/reports/cli'),
    Xunit = require('../lib/reports/xunit'),
    Coverage = require('../lib/reports/coverage'),
    Generator = require('../lib/asserter/generator'),
    Inline = require('../lib/test/engines/inline'),
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
    .options('xunit', {
        description: 'Enable xUnit report',
        default: 'xunit.xml'
    })
    .options('coverage', {
        description: 'Enable code coverage report',
        boolean: true,
        default: false
    })
    .options('coverage-dir', {
        description: 'Path to sources to instrument',
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

        if(args.coverage) {
            if(typeof args['coverage-dir'] !== undefined && fs.existsSync(args['coverage-dir']) === false) {
                throw new Error(util.format(color.red("Directory '%s' does not exist"), args['coverage-dir']));
            }
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
        runner = new Runner(
            atoum.includer,
            argv.inline ? new Inline(new Generator()) : null
        );

    runner.addReport(new Cli(process.stdout));

    if(argv.xunit) {
        runner.addReport(new Xunit(fs.createWriteStream(argv.xunit)));
    }

    if(argv.coverage) {
        runner
            .setCoverage(true)
            .addReport(
                new Coverage(process.stdout, runner, argv['coverage-dir'])
            )
        ;
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
