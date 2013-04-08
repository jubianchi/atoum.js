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
            var instrumented = this.includer.resolve.apply(this, [module, target, fs]).replace("/lib", "/lib-cov");

            if(fs.existsSync(instrumented + ".js")) {
                module = instrumented;
            }
console.log('ok');
            return module;
        }
    }
);
