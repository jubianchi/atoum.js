"use strict";

require("../../..")(module);

var underscore = require("underscore"),
    Stub = require("../stub"),
    generator = module.exports = function generator() {
        this.stubs = []
    };

generator.prototype = {
    generate: function(object, method, code) {
        var stub = new Stub(object, method, code);

        this.stubs.push(stub);

        return stub;
    },

    reset: function() {
        var stub;

        while(stub = this.stubs.shift()) {
            stub.restore();
        }

        return this;
    }
};
