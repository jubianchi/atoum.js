var util = require('util'),
    _ = require('underscore'),
    exception = require('./asserter/exception'),
    asserter = module.exports = function asserter(generator) {
        this.generator = generator;
    };

asserter.prototype = {
    fail: function() {
        var message = arguments[0],
            args = Array.prototype.slice.call(arguments, 1);

        _.map(
            args,
            function(arg) {
                return util.inspect(arg);
            }
        );

        throw new exception(util.format.apply(util, [ message ].concat(args)), this);
    }
};
