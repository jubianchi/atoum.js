var underscore = require('underscore'),
    util = require('util'),
    color = require('cli-color'),
    atoum = require('..')(),
    runner = require('../lib/runner'),
    cli = require('../lib/reports/cli'),
    xunit = require('../lib/reports/xunit'),
    coverage = require('../lib/reports/coverage'),
    generator = require('../lib/asserter/generator'),
    fs = require('fs'),
    argv = require('optimist').argv;

try {
    var path = fs.realpathSync(argv['_'][0]),
        run = new runner(new generator(), atoum.includer);

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
