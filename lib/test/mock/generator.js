"use strict";

require("../../..")(module);

var underscore = require("underscore"),
    Controller = require("./controller"),
    generator = module.exports = function generator() {};

generator.prototype = {
    generate: function(cls) {
        var mock = function mock() {
            this.controller = new Controller(this);

            if(typeof cls === "function") {
                cls.apply(this, arguments);
            }
        };

        mock.prototype.constructor = mock;

        if(typeof cls !== "undefined") {
            mock.prototype = typeof cls === "function" ? new cls() : cls;

            underscore.each(
                cls.prototype || cls,
                function(method, name) {
                    if(typeof method === "function") {
                        mock.prototype[name] = function() {
                            return this.controller.run(name, method, Array.prototype.slice.call(arguments));
                        };
                    }
                }
            );
        }

        return mock;
    }
};
