"use strict";

require("../")(module);

var serializer = module.exports = function serializer() {

    };

serializer.prototype = {
    json: function (object) {
        var cache = [];

        return JSON.stringify(object, this.replacer(cache));
    },

    replacer: function(cache) {
        return function(key, value) {
            if (typeof value === "object") {
                if (cache.indexOf(value) !== -1) {
                    return;
                }

                if(value instanceof Error) {
                    value = {
                        name: value.name,
                        message: value.message,
                        stack: value.stack
                    };
                }

                cache.push(value);
            }

            return value;
        }
    }
};
