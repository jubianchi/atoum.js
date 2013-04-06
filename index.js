"use strict";

var includer = new (require('./lib/includer'))(),
    atoum = module.exports = function(target) {
        if(typeof target !== 'undefined') {
            includer.applyTo(target);
        }

        var atoum =  require('./lib/atoum.js');
        atoum.includer = includer;

        return atoum;
    };
