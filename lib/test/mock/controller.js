"use strict";

var controller = module.exports = function controller(mock) {
        this.args = {};
        this.mock = mock;
    };

controller.prototype = {
    run: function (name, method, args) {
        if(typeof this.args[name] === "undefined") {
            this.args[name] = [];
        }

        this.args[name].push(args || []);

        return method.apply(this.mock, args);
    }
};
