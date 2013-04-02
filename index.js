var atoum = module.exports = require('./lib/atoum.js');

atoum.require = function(module, from) {
    var modulepath;

    if(typeof from !== 'undefined') {
        var basedir = require('path').dirname(module.filename);
        modulepath = arguments[0] = require('path').resolve(basedir, arguments[0]);
    } else {
        modulepath = require.resolve(arguments[0]);
    }

    if(require.cache[modulepath]) {
        delete require.cache[modulepath];
    }

    return require.apply(require, arguments);
};
