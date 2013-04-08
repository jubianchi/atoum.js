"use strict";

var fs = require("fs"),
    path = require("path"),
    underscore = require("underscore"),
    skipped = require("../test/method/exception"),
    asserters = path.resolve(path.dirname(module.filename), "..", "asserters"),
    generator = module.exports = function generator() {
        this.reset();
    };

generator.prototype = {
    reset: function () {
        this.assertionsCount = 0;
        this.asserters = {};
        this.aliases = {};
        this
            .addAlias("if", function () { return this; })
            .addAlias("and", function () { return this; })
            .addAlias("then", function () { return this; })
            .addAlias("dump", function (value) { require("console").dir(value); return this; })
            .addAlias("skip", function (message, callback) {
                if(callback() === true) {
                    throw new skipped(message);
                }

                return this;
            })
        ;

        underscore.each(
            fs.readdirSync(asserters),
            function (value) {
                var filepath = fs.realpathSync(path.resolve(asserters, value));

                this.addAsserter(value.replace(".js", ""), require(filepath));
            },
            this
        );

        return this;
    },

    addAsserter: function (name, constructor) {
        this.asserters[name] = constructor;

        return this;
    },

    addAlias: function (name, callable) {
        this.aliases[name] = callable;

        return this;
    },

    injectInto: function (target) {
        underscore.each(
            this.asserters,
            function (value, key) {
                target[key] = this.getAsserter(key);
            },
            this
        );

        underscore.each(
            this.aliases,
            function (value, key) {
                target[key] = value;
            },
            this
        );

        return target;
    },

    getAsserter: function (name) {
        var generator = this;

        return function (value) {
            var asserter = new generator.asserters[name](generator);

            generator.assertionsCount += 1;

            return generator.injectInto(asserter).setWith(value);
        };
    }
};
