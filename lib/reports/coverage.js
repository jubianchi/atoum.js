"use strict";

var report = require("../report"),
    fields = require("../report/fields"),
    includer = require('../includer/instrument'),
    coverage = module.exports = function coverage(output, runner, path) {
        report.call(this, output);

        this
            .addField(new fields.runner.coverage(path))
        ;

        runner.includer.replace(path, path + '-cov');
    };

coverage.prototype = new report();
coverage.prototype.constructor = coverage;

