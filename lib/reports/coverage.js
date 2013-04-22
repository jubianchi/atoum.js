"use strict";

require("../..")(module);

var Report = require("../report"),
    fields = require("../report/fields"),
    coverage = module.exports = function coverage(output, path) {
        Report.call(this, output);

        this
            .addField(new fields.runner.coverage(path))
        ;
    };

coverage.prototype = new Report();
coverage.prototype.constructor = coverage;

