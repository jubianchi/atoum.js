"use strict";

var path = require("path"),
    fs = require('fs'),
    vm = require('vm'),
    underscore = require("underscore"),
    includer = module.exports = function includer() {
        this.replacements = {};
    };

includer.prototype = {
    register: function(target) {
        var self = this;

        target.require = function(module) {
            return self.require.apply(self, [ module, target ]);
        };

        target.include = function(module) {
            var code;

            module = self.resolve(module, target);
            if(null === module.match(/\.js$/)) {
                module = module + '.js';
            }

            code = fs.readFileSync(module);

            vm.runInThisContext(code, module);
        }

        return this;
    },

    require: function(module, target) {
        module = this.resolve(module, target);

        return require.call(require, module);
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

        if(fs.existsSync(replaced.replace(/\.js$/, "") + ".js")) {
            module = replaced;
        }

        return module;
    }
};
