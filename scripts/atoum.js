"use strict";

require("..")();

var util = require("util"),
    color = require("cli-color"),
    Script = require("../lib/scripts/cli");

try {
    var script = new Script();
    script.run(process, function(runner) {
        if (runner.score.failedTests > 0) {
            process.exit(1);
        }
    });
} catch(exception) {
    process.stderr.write(util.format(
        color.red("[%s] %s\n%s\n"),
        exception.name,
        exception.message,
        exception.stack
    ));

    process.exit(1);
}
