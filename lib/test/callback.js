var util = require('util'),
    controller = function controller() {
        this.wasRun = false;
    },
    callback = module.exports = function callback() {
        var cn = new controller(),
            cb = function callback() {
                cn.wasRun = true;

                cn.run.call(this, arguments);
            };

        cb.controller = cn;

        return cb;
    };

controller.prototype = new controller();
controller.prototype.constructor = controller;
controller.prototype = {
    run: function() {}
};
