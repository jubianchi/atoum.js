"use strict";

var path = require("path"),
    underscore = require("underscore"),
    extend = require("node.extend"),
    field = require("../../field"),
    jscoverage = require('jscoverage'),
    covershot = require('covershot'),
    coverage = module.exports = function coverage(path) {
        field.call(this, [ "runnerStart", "runnerStop" ]);

        this.path = path;
    };

coverage.prototype = new field();
coverage.prototype.constructor = coverage;
coverage.prototype = extend(
    coverage.prototype,
    {
        toString: function () {
            switch(this.event) {
                case 'runnerStart':
                    jscoverage.processFile(this.path, this.path + '-cov', [], {});
                    break;
                case 'runnerStop':
                    var cli = require('covershot/lib/cli');

                    cli.run({
                        '_': [ covershot.writeCoverage() ],
                        f: 'html',
                        format: 'html',
                        m: 'json',
                        map: 'json',
                        w: path.resolve('covershot'),
                        write: path.resolve('covershot'),
                        v: true,
                        verbose: true
                    });
                    break;
            }

            return '';
        }
    }
);
