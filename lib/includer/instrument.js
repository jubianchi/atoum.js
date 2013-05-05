"use strict";

var Includer = require("../includer"),
    instrument = module.exports = function instrument() {
        Includer.call(this);

        Includer.prototype.replace.apply(this, ["/lib/", "/lib-cov/"]);
    };

instrument.prototype = new Includer();
instrument.constructor = instrument;
