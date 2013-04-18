"use strict";

var atoum = require('../..')(module),
    color = require("cli-color");

module.exports = {
    title: color.blue,
    success: color.green,
    skipped: color.yellow,
    error: color.red,
    header: color.bold,
    ribbon: {
        success: color.bgGreen.white,
        error: color.bgRed.white
    }
};
