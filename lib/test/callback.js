var util = require('util'),
    controller = require('./callback/controller'),
    callback = module.exports = function callback(code) {
        var cn = new controller(code),
            cb = function() {
                cn.wasRun = true;

                return cn.run.call(cn, arguments[0]);
            };

        cb.controller = cn;

        return cb;
    };
