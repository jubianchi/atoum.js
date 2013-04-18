"use strict";

var atoum = require('../..')(module),
    report = require("../report"),
    fields = require("../report/fields"),
    xunit = module.exports = function xunit(output) {
        report.call(this, output);

        this
            .addField(new fields.runner.xunit())
        ;
    };

xunit.prototype = new report();
xunit.prototype.constructor = xunit;

