"use strict";

var atoum = require('../..')(module),
    report = require("../report"),
    fields = require("../report/fields"),
    coverage = module.exports = function coverage(output, runner, path) {
        report.call(this, output);

        this
            .addField(new fields.runner.coverage(path))
        ;
    };

coverage.prototype = new report();
coverage.prototype.constructor = coverage;

