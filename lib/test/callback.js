"use strict";

var controller = require("./callback/controller");

module.exports = function callback(code) {
    var cn = new controller(code),
        cb = function () {
            return cn.run.apply(cn, arguments);
        };

    cb.controller = cn;

    return cb;
};
