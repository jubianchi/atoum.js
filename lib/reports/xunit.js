"use strict";

require("../..")(module);

var Report = require("../report"),
    fields = require("../report/fields"),
    xunit = module.exports = function xunit(output) {
        Report.call(this, output);

        this
            .addField(new fields.runner.xunit())
        ;
    };

xunit.prototype = new Report();
xunit.prototype.constructor = xunit;

