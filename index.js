"use strict";

var atoum = module.exports = function(target) {
    if(typeof target !== 'undefined') {
        target.require = function(modulepath) {
            if(require.cache[target.filename]) {
                delete require.cache[target.filename];
            }

            if(modulepath.indexOf('./') === 0 || modulepath.indexOf('../') === 0) {
                modulepath = require('path').resolve(require('path').dirname(target.filename), modulepath);
            }

            if(require.cache[modulepath + '.js']) {
                delete require.cache[modulepath + '.js'];
            }

            return require.call(require, modulepath);
        };
    }

    return require('./lib/atoum.js');
};
