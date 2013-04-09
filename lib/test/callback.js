"use strict";

var underscore = require("underscore"),
    controller = require("./callback/controller"),
    callback = module.exports = function callback(code) {
        var cn = new controller(code),
            cb = function () {
                var args = underscore.values(arguments);

                cn.scope = this;
                return cn.run.apply(cn, args);
            };

        cb.controller = cn;

        return cb;
    };
