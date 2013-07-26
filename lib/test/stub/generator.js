"use strict";

require("../../..")(module);

var Stub = require("../stub"),
    generator = module.exports = function generator() {
        this.stubs = [];
    };

generator.prototype = {
    generate: function(object, method, code) {
        var stub = new Stub(object, method, code);

        this.stubs.push(stub);

        return stub;
    },

    reset: function() {
        while(this.stubs.length > 0) {
            this.stubs.shift().restore();
        }

        return this;
    }
};
