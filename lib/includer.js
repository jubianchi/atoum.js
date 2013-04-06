"use strict";

var includer = module.exports = function includer() {
    this.replacements = [];
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
        if(require.cache[target.filename]) {
            delete require.cache[target.filename];
        }

        if(module.indexOf('./') === 0 || module.indexOf('../') === 0) {
            module = require('path').resolve(require('path').dirname(target.filename), module);
        }

        if(require.cache[module + '.js']) {
            delete require.cache[module + '.js'];
        }

        for(var replacement in this.replacements) {
            if(new RegExp(replacement + '$').exec(module)) {
                return this.replacements[replacement];
            }
        }

        module = require.call(require, module);
        this.applyTo(module);

        return module;
    },

    provide: function(module) {
        var replacement = {};

        this.replacements[module] = replacement;

        return replacement;
    }
};
