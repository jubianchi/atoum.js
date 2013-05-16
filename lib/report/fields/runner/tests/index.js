"use strict";

require("../../../../..")(module);

module.exports = {
    failures: require("./failures"),
    exceptions: require("./exceptions"),
    errors: require("./errors"),
    skipped: require("./skipped"),
    outputs: require("./outputs")
};
