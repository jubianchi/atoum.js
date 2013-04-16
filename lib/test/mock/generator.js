"use strict";

var underscore = require("underscore"),
    Controller = require("./controller"),
    generator = module.exports = function generator() {
    };

generator.prototype = {
    generate: function(cls) {
        var mock = function mock() {
            this.controller = new Controller(this);
        };

        mock.prototype = new cls();
        mock.prototype.constructor = mock;

        underscore.each(
            cls.prototype,
            function(method, name) {
                if(typeof method === 'function') {
                    mock.prototype[name] = function() {
                        return this.controller.run(name, method, underscore.values(arguments));
                    };
                }
            }
        );

        return mock;
    }
};
