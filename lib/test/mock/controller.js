"use strict";

require("../../..")(module);

var controller = module.exports = function controller(mock) {
        this.args = {};
        this.methods = {};
        this.mock = mock;
    };

controller.prototype = {
    run: function (name, method, args) {
        if(typeof this.args[name] === "undefined") {
            this.args[name] = [];
        }

        this.args[name].push(args || []);

        if(typeof this.methods[name] !== "undefined") {
            method = this.methods[name][this.args[name].length] || this.methods[name][0];
        }

        if(typeof method === "undefined") {
            throw new Error("Method ".concat(name).concat(" does not exist."));
        }

        return method.apply(this.mock, args);
    },

    override: function(name, method, index) {
        if(typeof this.methods[name] === "undefined") {
            this.methods[name] = [];
        }

        if(typeof method !== "function") {
            this.methods[name][index || 0] = function () {
                return method;
            }
        } else {
            this.methods[name][index || 0] = method;
        }

        return this;
    }
};
