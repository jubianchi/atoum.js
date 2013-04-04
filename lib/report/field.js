"use strict";

var color = require('cli-color'),
    field = module.exports = function atoum() {
        this.color = {
            title: color.blue,
            success: color.green,
            error: color.red,
            header: color.bold,
            ribbon: {
                success: color.bgGreen.white,
                error: color.bgRed.white
            }
        };
    };

field.prototype = {
    register: function(dispatcher) {
        return this;
    },

    render: function(output) {
        var self = this;

        if(typeof this.renderer === 'undefined') {
            this.renderer = function() {
                output.write(self.toString());
            };
        }

        return this.renderer;
    },

    toString: function (tests, loop) {
        return '';
    }
};
