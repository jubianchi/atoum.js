"use strict";

var extend = require('node.extend'),
    report = require('../report'),
    fields = require('../report/fields'),
    cli = module.exports = function cli(output) {
        report.call(this, output);

        this
            .addField(new fields.runner.atoum())
            .addField(new fields.runner.stat())
            .addField(new fields.runner.result())
            .addField(new fields.test.header())
            .addField(new fields.test.success())
            .addField(new fields.test.failure())
            .addField(new fields.test.exception())
            .addField(new fields.test.error())
            .addField(new fields.test.footer())
            .addField(new fields.runner.tests.failures())
            .addField(new fields.runner.tests.exceptions())
            .addField(new fields.runner.tests.errors())
        ;
    };

cli.prototype = new report();
cli.prototype.constructor = cli;
