(function () {
    "use strict";

    var util = require('util'),
        controller = require('./callback/controller'),
        callback = module.exports = function callback(code) {
            var cn = new controller(code),
                cb = function () {
                    return cn.run.apply(cn, arguments);
                };

            cb.controller = cn;

            return cb;
        };
}());
