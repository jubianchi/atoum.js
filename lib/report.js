"use strict";

var util = require('util'),
    underscore = require('underscore'),
    microtime = require('microtime-x'),
    atoum = require('./atoum'),
    color = require('./report/color'),
    fields = require('./report/fields'),
    report = module.exports = function report(output) {
        this.output = output;
        this.fields = [];
    };

report.prototype = {
    addField: function(field) {
        this.fields.push(field);

        return this;
    },

    register: function (dispatcher) {
        underscore.each(
            this.fields,
            function(field) {
                field.register(dispatcher, this.output);
            },
            this
        );

        return this;
    }
};
