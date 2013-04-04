"use strict";

var atoum = module.exports = require('./lib/atoum.js');

atoum.require = function(module, from) {
    var modulepath;

    if(typeof from !== 'undefined') {
        if(require.cache[from.filename]) {
            delete require.cache[from.filename];
        }
    }

    modulepath = require('path').resolve(module);

    if(require.cache[modulepath + '.js']) {
        delete require.cache[modulepath + '.js'];
    }

    return require.call(require, modulepath);
};
