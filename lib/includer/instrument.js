"use strict";

var extend = require("node.extend"),
    includer = require('../includer'),
    instrument = module.exports = function instrument() {
        includer.call(this);
    };

instrument.prototype = new includer();
instrument.constructor = instrument;
instrument.prototype = extend(
    instrument.prototype,
    {
        resolve: function(module, target, fs) {
            var instrumented = includer.prototype.resolve.apply(this, [module, target, fs]).replace("/lib/", "/lib-cov/");

            fs = fs || require("fs");

            if(fs.existsSync(instrumented + ".js")) {
                module = instrumented;
            }

            return module;
        }
    }
);
