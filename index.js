"use strict";

var includer = new (require('./lib/includer'))(),
    atoum = module.exports = function (target) {
        if(typeof target !== 'undefined') {
            includer.applyTo(target);
        }

        atoum.includer = includer;

        return atoum;
    };

atoum.version = "dev-alpha";