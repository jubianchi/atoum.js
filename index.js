"use strict";

var includer = require('./lib/includer'),
    atoum = module.exports = function (target) {
        if(typeof target !== 'undefined') {
            atoum.includer.applyTo(target);
        }

        return atoum;
    };

atoum.version = "dev-alpha";
atoum.includer = new includer();