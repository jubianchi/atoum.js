"use strict";

require("../..")(module);

var Callback = require("./callback");

module.exports = function stub(object, method, code) {
    if(object.hasOwnProperty(method) === false || typeof object[method] !== "function") {
        throw new Error("Method ".concat(method).concat(" does not exist"));
    }

    var stubbed = object[method];
    object[method] = Callback(code);
    object[method].restore = function() {
        object[method] = stubbed;
    };

    return object[method];
};
