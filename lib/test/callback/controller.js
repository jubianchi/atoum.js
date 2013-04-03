(function () {
    "use strict";

    var underscore = require('underscore'),
        controller = module.exports = function controller(code) {
            this.wasRun = false;
            this.code = code;
            this.args = [];
        };

    controller.prototype = {
        run: function () {
            this.args = underscore.values(arguments);
            this.wasRun = true;

            if(typeof this.code === 'function') {
                return this.code.apply(this.code, this.args);
            }

            return undefined;
        }
    };
}());
