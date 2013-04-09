"use strict";

var path = require("path"),
    underscore = require('underscore'),
    includer = module.exports = function includer() {
        this.replacements = {};
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

    replace: function(search, replace) {
        this.replacements[search] = replace;

        return this;
    },

    resolve: function(module, target, fs) {
        var replaced;

        fs = fs || require("fs");

        if(module.indexOf("./") === 0 || module.indexOf("../") === 0) {
            module = path.resolve(path.dirname(target.filename), module);
        }

        replaced = module;
        underscore.each(
            this.replacements,
            function(replace, search) {
                replaced = replaced.replace(search, replace);
            }
        );

        if(fs.existsSync(replaced + ".js")) {
            module = replaced;
        }

        return module;
    }
};
