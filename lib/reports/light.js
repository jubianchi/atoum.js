"use strict";

var report = require("../report"),
    fields = require("../report/fields"),
    light = module.exports = function light(output) {
        report.call(this, output);

        this
            .addField(new fields.runner.atoum())
            .addField(new fields.runner.stat())
            .addField(new fields.runner.result())
            .addField(new fields.test.success())
            .addField(new fields.test.skipped())
            .addField(new fields.test.failure())
            .addField(new fields.test.exception())
            .addField(new fields.test.error())
            .addField(new fields.runner.tests.skipped())
            .addField(new fields.runner.tests.failures())
            .addField(new fields.runner.tests.exceptions())
            .addField(new fields.runner.tests.errors())
        ;
    };

light.prototype = new report();
light.prototype.constructor = light;
