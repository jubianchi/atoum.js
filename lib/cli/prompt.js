"use strict";

require("../..")(module);

var prompt = module.exports = function prompt(prefix, color, prefixColor) {
        var colorize = function(value) { return value; };

        this.str = "";
        this.prefix = prefix;
        this.color = color || colorize;

        if(prefixColor === null) {
            this.prefixColor = colorize;
        } else {
            this.prefixColor = prefixColor;
        }

        if(prefixColor === undefined) {
            this.prefixColor = this.color;
        }
    };

prompt.prototype = {
    write: function (value) {
        this.str = this.str
            .concat(this.prefixColor(this.prefix.concat(" ")))
            .concat(this.color(value))
            .concat("\n");

        return this;
    },

    toString: function () {
        var str = this.str;

        this.str = "";

        return str;
    }
};
