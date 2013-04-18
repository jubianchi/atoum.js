"use strict";

require("..")(module);

var underscore = require("underscore"),
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
