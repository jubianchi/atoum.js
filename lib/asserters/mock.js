"use strict";

require("../..")(module);

var extend = require("node.extend"),
    Asserter = require("../asserter"),
    Controller = require("../test/mock/controller"),
    mock = module.exports = function mock(generator) {
        Asserter.call(this, generator);
    };

mock.prototype = new Asserter();
mock.prototype.constructor = mock;
mock.prototype = extend(
    mock.prototype,
    {
        check: function () {
            if((this.value.controller instanceof Controller) === false) {
                this.fail("Value is not a mock");
            }

            return this;
        }
    }
);
