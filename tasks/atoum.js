"use strict";

require("..")();

var util = require("util"),
    color = require("cli-color"),
    Script = require("../lib/scripts/grunt");

module.exports = function (grunt) {
    grunt.registerTask('atoum', 'Execute atoum.js tests', function () {
        var options = this.options({
                suites: {
                    default: {
                        directory: "tests",
                        file: [],
                        inline: false,
                        xunit: false,
                        coverage: false
                    }
                }
            }),
            done = this.async(),
            script = new Script(options);

        script.run(
            process,
            function(runner) {
                done(runner.score.failedTests === 0);
            }
        );
    });
};
