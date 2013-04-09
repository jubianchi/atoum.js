"use strict";

var underscore = require("underscore"),
    controller = require("./mock/controller");

module.exports = function mock(cls) {
    var object = function mock() {
        this.controller = new controller(this);
    };

    object.prototype = new cls();
    object.prototype.constructor = object;

    underscore.each(
        cls.prototype,
        function(method, name) {
            if(typeof method === 'function') {
                object.prototype[name] = function() {
                    return this.controller.run(method, underscore.values(arguments));
                };
            }
        }
    );

    return object;
};
