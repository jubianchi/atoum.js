"use strict";

var path = require("path"),
    includer = module.exports = function includer() {
    };

includer.prototype = {
    applyTo: function(target) {
        var self = this;

        target.require = function(module) {
            return self.require.apply(self, [ module, target ]);
        };

        return this;
    },

    require: function(module, target) {
        module = this.resolve(module, target);

        if(require.cache[target.filename]) {
            delete require.cache[target.filename];
        }

        if(require.cache[module + ".js"]) {
            delete require.cache[module + ".js"];
        }

        for(var replacement in this.replacements) {
            if(new RegExp(replacement + "$").exec(module)) {
                return this.replacements[replacement];
            }
        }

        module = require.call(require, module);
        this.applyTo(module);

        return module;
    },

    resolve: function(module, target, fs) {
        var instrumented;

        fs = fs || require("path");

        if(module.indexOf("./") === 0 || module.indexOf("../") === 0) {
            module = path.resolve(path.dirname(target.filename), module);
        }

        instrumented = module.replace('/lib', '/lib-cov');
        if(fs.existsSync(instrumented + '.js')) {
            module = instrumented;
        }

        return module;
    }
};
