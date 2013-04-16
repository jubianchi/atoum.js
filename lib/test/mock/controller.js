"use strict";

var controller = module.exports = function controller(mock) {
        this.args = {};
        this.mock = mock;
    };

controller.prototype = {
    run: function (method, args) {
        if(typeof this.args[method.name] === "undefined") {
            this.args[method.name] = [];
        }

        this.args[method.name].push(args || []);
        console.log(this.args.length);

        return method.apply(this.mock, args);
    }
};
