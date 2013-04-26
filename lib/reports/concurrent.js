"use strict";

require("../..")(module);

var Report = require("../report"),
    fields = require("../report/fields"),
    concurrent = module.exports = function concurrent(output) {
        Report.call(this, output);

        this
            .addField(new fields.engine.concurrent())
        ;
    };

concurrent.prototype = new Report();
concurrent.prototype.constructor = concurrent;
