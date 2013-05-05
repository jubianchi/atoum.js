"use strict";

require("../../../..")(module);

var extend = require("node.extend"),
    util = require("util"),
    color = require("../../color"),
    Field = require("../../field"),
    stat = module.exports = function stat() {
        Field.call(this, [ "runnerStop" ]);

        this.locale.translations.loadTranslations(require("../../../../resources/locale/report/fields/runner/stat.json"));
    };

stat.prototype = new Field();
stat.prototype.constructor = stat;
stat.prototype = extend(
    stat.prototype,
    {
        toString: function () {
            var runner = this.value[0];

            return "\n"
                .concat("> ")
                .concat(color.header(this.locale._("Total test duration:"))).concat(" ")
                .concat(this.locale.__("$[1] second", "$[1] seconds", Math.round(runner.score.duration * 10000) / 10000))
                .concat("\n")
                .concat("> ")
                .concat(color.header(this.locale._("Total test memory usage:"))).concat(" ")
                .concat(util.inspect(runner.score.usage.format("KB", 4).stat))
                .concat("\n")
                .concat("> ")
                .concat(color.header(this.locale._("Total running duration:"))).concat(" ")
                .concat(this.locale.__("$[1] second", "$[1] seconds", Math.round(runner.score.runningDuration * 10000) / 10000))
                .concat("\n")
            ;
        }
    }
);
