var atoum = require('./lib/atoum'),
    runner = require('./lib/runner'),
    generator = require('./lib/asserter/generator'),
    fs = require('fs');

fs.realpath(process.argv[2], function(err, path) {
    new
        atoum(new runner(process.stdout, new generator()))
            .run(path)
    ;
});
