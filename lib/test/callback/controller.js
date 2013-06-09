"use strict";

require("../../..")(module);

var underscore = require("underscore"),
    controller = module.exports = function controller(code) {
        this.code = code;
        this.args = [];
        this.scope = null;
    };

controller.prototype = {
    run: function () {
        this.args.push(underscore.values(arguments));

        if(typeof this.code !== "function") {
            return;
        }

        return this.code.apply(this.scope || this, Array.prototype.slice.call(arguments));
    }
};
