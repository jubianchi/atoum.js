(function () {
    "use strict";

    var util = require('util'),
        underscore = require('underscore'),
        exception = require('./asserter/exception'),
        asserter = module.exports = function asserter(generator) {
            this.generator = generator;
        };

    asserter.prototype = {
        fail: function (message) {
            var args = Array.prototype.slice.call(arguments, 1);

            underscore.map(
                args,
                function (arg) {
                    return util.inspect(arg);
                }
            );

            throw new exception(util.format.apply(util, [ message ].concat(args)), this);
        }
    };
}());
