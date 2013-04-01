var _ = require('underscore'),
    util = require('util'),
    atoum = require('./lib/atoum'),
    runner = require('./lib/runner'),
    generator = require('./lib/asserter/generator'),
    fs = require('fs');

try {
    var path = fs.realpathSync(process.argv[2]);
    new
        atoum(new runner(process.stdout, new generator()))
            .run(path, _.contains(process.argv, '--loop'))
    ;
} catch(exception) {
    process.stderr.write(util.format(
        '\033[31m[%s] %s\n%s\033[0m\n',
        exception.name,
        exception.message,
        exception.stack
    ));

    process.exit(1);
}
