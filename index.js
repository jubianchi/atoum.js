"use strict";

var atoum = module.exports = function(target) {
    if(typeof target !== 'undefined') {
        target.require = function(path) {
            var modulepath;

            if(require.cache[target.filename]) {
                delete require.cache[target.filename];
            }

            modulepath = require('path').resolve(require('path').dirname(target.filename), path);

            if(require.cache[modulepath + '.js']) {
                delete require.cache[modulepath + '.js'];
            }

            return require.call(require, modulepath);
        };
    }

    return require('./lib/atoum.js');
};
