"use strict";

var path = require("path"),
    Includer = require("../includer"),
    instrument = module.exports = function instrument(directory) {
        Includer.call(this);

        Includer.prototype.replace.apply(this, ["/" + directory + "/", "/" + directory.concat("-cov") + "/"]);
    };

instrument.prototype = new Includer();
instrument.constructor = instrument;
