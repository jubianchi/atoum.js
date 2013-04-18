"use strict";

var atoum = require('../../../..')(module);

module.exports = {
    header: require("./header"),
    footer: require("./footer"),
    success: require("./success"),
    failure: require("./failure"),
    skipped: require("./skipped"),
    exception: require("./exception"),
    error: require("./error")
};
