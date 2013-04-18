"use strict";

var atoum = require('../..')(module),
    light = require("./light"),
    fields = require("../report/fields"),
    cli = module.exports = function cli(output) {
        light.call(this, output);

        this
            .addField(new fields.runner.node())
            .addField(new fields.test.header())
            .addField(new fields.test.footer())
        ;
    };

cli.prototype = new light();
cli.prototype.constructor = cli;
