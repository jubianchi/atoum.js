"use strict";

require("../..")(module);

var extend = require("node.extend"),
    Asserter = require("../asserter"),
    Locale = require("../locale"),
    Controller = require("../test/mock/controller"),
    mock = module.exports = function mock(generator) {
        Asserter.call(this, generator);

        this.locale = new Locale(require("../../resources/locale/asserters/mock.json"));
    };

mock.prototype = new Asserter();
mock.prototype.constructor = mock;
mock.prototype = extend(
    mock.prototype,
    {
        check: function () {
            if((this.value.controller instanceof Controller) === false) {
                this.fail(this.locale._("Value is not a mock"));
            }

            return this;
        }
    }
);
