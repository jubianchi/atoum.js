"use strict";

var atoum = require('../../../../..')(module);

module.exports = {
    failures: require("./failures"),
    exceptions: require("./exceptions"),
    errors: require("./errors"),
    skipped: require("./skipped")
};
