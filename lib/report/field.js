"use strict";

var underscore = require('underscore'),
    field = module.exports = function field(events) {
        this.events = events || [];
        this.value = '';
    };

field.prototype = {
    register: function(dispatcher, output) {
        underscore.each(
            this.events,
            function(value) {
                dispatcher.on(value, this.render(output));
            },
            this
        );

        return this;
    },

    render: function(output) {
        var self = this;

        if(typeof this.renderer !== 'function') {
            this.renderer = function() {
                self.value = arguments;

                output.write(self.toString());
            };
        }

        return this.renderer;
    },

    toString: function () {
        return this.value;
    }
};
