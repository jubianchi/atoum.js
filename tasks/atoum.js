"use strict";

require("..")();

var util = require("util"),
    color = require("cli-color"),
    extend = require("node.extend"),
    Script = require("../lib/scripts/grunt");

module.exports = function (grunt) {
    var defaultOptions = extend(
            {
                directory: "tests",
                file: [],
                inline: false,
                xunit: false,
                coverage: false
            },
            grunt.config.get("atoum")["default"] || {}
        ),
        handler = function (arg) {
            var args = Array.prototype.slice.call(arguments),
                options = this.options(extend(
                    defaultOptions,
                    (function() {
                        var opts = {};

                        args.forEach(function(target) {
                            opts = extend(opts, grunt.config.get("atoum")[target])
                        });

                        return opts;
                    })()
                )),
                done = this.async(),
                script = new Script(options);

            script.run(
                process,
                function(runner) {
                    done(runner.score.failedTests === 0);
                }
            );
        };

    grunt.registerTask('atoum', 'Execute atoum.js tests', handler);
};
