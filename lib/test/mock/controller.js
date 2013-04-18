"use strict";

var underscore = require("underscore"),
    atoum = require('../../..')(module),
    controller = module.exports = function controller(mock) {
        this.args = {};
        this.methods = {}
        this.mock = mock;
    };

controller.prototype = {
    run: function (name, method, args) {
        if(typeof this.args[name] === "undefined") {
            this.args[name] = [];
        }

        this.args[name].push(args || []);

        if(typeof this.methods[name] === "function") {
            return this.methods[name].apply(this.mock, args);
        }

        return method.apply(this.mock, args);
    },

    override: function(name, method) {
        var self = this;

        this.methods[name] = method;

        this.mock[name] = function () {
            return this.controller.run(name, undefined, underscore.values(arguments));
        };

        return this;
    }
};
