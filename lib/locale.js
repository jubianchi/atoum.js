"use strict";

require("..")(module);

var Localize = require("localize"),
    locale = module.exports = function locale(translations, locale) {
        this.translations = new Localize(translations);
        this.setLocale(locale);
    };

locale.prototype = {
    setLocale: function(locale) {
        this.translations.setLocale(locale || "en");

        return this;
    },

    "_": function(string) {
        var args = Array.prototype.slice.call(arguments, 1),
            matches = string.match(/\$\[[0-9]+\]/g),
            count = matches ? matches.length : 0;

        if(args.length < count) {
            for(var i = args.length; i < count; i += 1) {
                args[i] = "";
            }
        }

        return this.translations.translate.apply(
            this.translations,
            [ string ].concat(args)
        );
    },

    "__": function(singular, plural, num) {
        var args = [ num || 0 ].concat(Array.prototype.slice.call(arguments, 3));

        return this._.apply(
            this,
            [ num > 1 ? plural : singular].concat(args)
        );
    }
};
