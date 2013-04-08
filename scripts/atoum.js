var underscore = require('underscore'),
    util = require('util'),
    color = require('cli-color'),
    runner = require('../lib/runner'),
    cli = require('../lib/reports/cli'),
    xunit = require('../lib/reports/xunit'),
    generator = require('../lib/asserter/generator'),
    fs = require('fs'),
    argv = require('optimist').argv;

try {
    var path = fs.realpathSync(argv['_'][0]),
        run = new runner(new generator());

    run.addReport(new cli(process.stdout));

    if(argv.xunit) {
        run.addReport(new xunit(fs.createWriteStream(argv.xunit)));
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
