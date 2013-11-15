"use strict";

require("../..")(module);

var util = require('util'),
    extend = require("node.extend"),
    Obj = require("./object"),
    array = module.exports = function array(generator) {
        Obj.call(this, generator);

        this.locale.translations.loadTranslations(require("../../resources/locale/asserters/array.json"));
    };

array.prototype = new Obj();
array.prototype.constructor = array;
array.prototype = extend(
    array.prototype,
    {
        check: function () {
            if(Object.prototype.toString.call(this.value) !== "[object Array]") {
                this.fail(this.locale._("$[1] is not an array", this.value));
            }

            return this.pass();
        },

        hasLength: function (expected) {
            if(this.value.length !== expected) {
                this.fail(this.locale._("Array($[1]) has not length $[2]", this.value.length, expected));
            }

            return this.pass();
        },

        contains: function(expected) {
            if(this.value.indexOf(expected) < 0) {
                this.fail(this.locale._("$[1] does not contain $[2]", util.inspect(this.value), util.inspect(expected)));
            }

            return this;
        },

        doesNotContain: function(expected) {
            if(this.value.indexOf(expected) >= 0) {
                this.fail(this.locale._("$[1] contains $[2]", util.inspect(this.value), util.inspect(expected)));
            }

            return this;
        }
    }
);
