"use strict";

require("../../../..")(module);

var extend = require("node.extend"),
    util = require("util"),
    color = require("../../color"),
    Field = require("../../field"),
    Prompt = require("../../../cli/prompt"),
    stat = module.exports = function stat() {
        Field.call(this, [ "runnerStop" ]);

        this.locale.translations.loadTranslations(require("../../../../resources/locale/report/fields/runner/stat.json"));
        this.prompt = new Prompt(">", color.header, null);
    };

stat.prototype = new Field();
stat.prototype.constructor = stat;
stat.prototype = extend(
    stat.prototype,
    {
        toString: function () {
            var runner = this.value[0];

            return this.prompt
                .write(
                    this.locale._("Total test duration:")
                        .concat(color.clean(" "))
                        .concat(
                            this.locale.__("$[1] second", "$[1] seconds",
                            Math.round(runner.score.duration * 10000) / 10000)
                        )
                )
                .write(
                    this.locale._("Total test memory usage:")
                        .concat(color.clean(" "))
                        .concat(util.inspect(runner.score.usage.format("KB", 4).stat))
                )
                .write(
                    this.locale._("Total running duration:")
                        .concat(color.clean(" "))
                        .concat(
                            this.locale.__("$[1] second", "$[1] seconds",
                            Math.round(runner.score.runningDuration * 10000) / 10000)
                        )
                )
                .toString()
            ;
        }
    }
);
