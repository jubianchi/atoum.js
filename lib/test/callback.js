"use strict";

var underscore = require("underscore"),
    controller = require("./callback/controller");

module.exports = function callback(code) {
    var cn = new controller(code),
        cb = function () {
            return cn.run.apply(cn, underscore.values(arguments));
        };

    cb.controller = cn;

    return cb;
};
