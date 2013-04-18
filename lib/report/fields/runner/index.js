"use strict";

var atoum = require('../../../..')(module);

module.exports = {
    atoum: require("./atoum"),
    node: require("./node"),
    stat: require("./stat"),
    result: require("./result"),
    xunit: require("./xunit"),
    coverage: require("./coverage"),
    tests: require("./tests")
};
