"use strict";

require("../..")(module);

var color = require("cli-color");

module.exports = {
    title: color.blue,
    success: color.green,
    skipped: color.yellow,
    error: color.red,
    header: color.xterm(87),
    ribbon: {
        success: color.bgGreen.white,
        error: color.bgRed.white
    },
    clean: function(value) {
        return "\x1b[0m".concat(value);
    }
};
