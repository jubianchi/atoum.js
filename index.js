var atoum = require('./lib/atoum'),
    runner = require('./lib/runner'),
    fs = require('fs');

fs.realpath(process.argv[2], function(err, path) {
    new
        atoum(new runner(process.stdout, require('./lib/test')))
            .run(path)
    ;
});
