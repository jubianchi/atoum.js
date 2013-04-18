"use strict";

var path = require("path"),
    fs = require('fs'),
    underscore = require("underscore"),
    extend = require("node.extend"),
    atoum = require("../../../..")(module),
    field = require("../../field"),
    covershot = require("covershot"),
    coverage = module.exports = function coverage(path) {
        field.call(this, [ "runnerStop" ]);

        this.path = path;
    };

coverage.prototype = new field();
coverage.prototype.constructor = coverage;
coverage.prototype = extend(
    coverage.prototype,
    {
        toString: function () {
            var cli = require("covershot/lib/cli");

            covershot.writeCoverage();

            cli.run({
                "_": [ path.resolve(process.cwd(), "covershot/data") ],
                f: "html",
                format: "html",
                m: "json",
                map: "json",
                w: path.resolve(process.cwd(), "covershot"),
                write: path.resolve(process.cwd(), "covershot"),
                v: true,
                verbose: true
            });
        }
    }
);
