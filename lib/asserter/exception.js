(function () {
    "use strict";

    var util = require('util'),
        exception = module.exports = function exception(message, asserter) {
            var error = new Error(),
                stack = error.stack.split('\n');

            this.message = message;
            this.name = 'Failure';
            this.stack = stack.slice(3).join('\n');
            this.asserter = asserter;
        };

    exception.prototype.constructor = exception;
}());
