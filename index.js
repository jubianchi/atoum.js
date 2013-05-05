"use strict";

var Includer = require("./lib/includer"),
    atoum = module.exports = function (target) {
        if(typeof target !== "undefined") {
            atoum.includer.register(target);
        }

        return atoum;
    };

atoum.version = "dev-alpha";
atoum.includer = new Includer();
