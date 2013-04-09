"use strict";

var underscore = require("underscore"),
    controller = module.exports = function controller(mock) {
        this.args = [];
        this.mock = mock;
    };

controller.prototype = {
    run: function (method, args) {
        if(typeof this.args[method.name] === "undefined") {
            this.args[method.name] = [];
        }

        this.args[method.name].push(args);

        return method.apply(this.mock, args);
    }
};
