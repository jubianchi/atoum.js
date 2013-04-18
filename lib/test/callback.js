"use strict";

require("../..")(module);

var underscore = require("underscore"),
    Controller = require("./callback/controller"),
    callback = module.exports = function callback(code) {
        var controller = new Controller(code),
            cb = function () {
                var args = underscore.values(arguments);

                controller.scope = this;
                return controller.run.apply(controller, args);
            };

        cb.controller = controller;

        return cb;
    };
