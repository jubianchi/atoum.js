"use strict";

var color = require('cli-color');

module.exports = {
    title: color.blue,
    success: color.green,
    error: color.red,
    header: color.bold,
    ribbon: {
        success: color.bgGreen.white,
        error: color.bgRed.white
    }
};
