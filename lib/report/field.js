"use strict";

require("../..")(module);

var underscore = require("underscore"),
    Locale = require("../locale"),
    field = module.exports = function field(events) {
        this.events = events || [];
        this.renderer = [];
        this.value = "";
        this.event = "";

        this.locale = new Locale({});
    };

field.prototype = {
    register: function(dispatcher, output) {
        underscore.each(
            this.events,
            function(value) {
                dispatcher.on(value, this.render(value, output));
            },
            this
        );

        return this;
    },

    render: function(event, output) {
        var self = this;

        if(typeof this.renderer[event] !== "function") {
            this.renderer[event] = function() {
                self.event = event;
                self.value = arguments;

                output.write((self.toString() || ""));
            };
        }

        return this.renderer[event];
    },

    toString: function () {
        return this.value;
    }
};
