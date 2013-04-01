var _ = require('underscore'),
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
    process.exit(1);
}
