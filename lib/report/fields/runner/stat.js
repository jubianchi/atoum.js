"use strict";

var extend = require('node.extend'),
    util = require('util'),
    color = require('../../color'),
    field = require('../../field'),
    stat = module.exports = function stat() {
        field.apply(this, [ [ 'runnerStop' ] ]);
    };

stat.prototype = new field();
stat.prototype.constructor = stat;
stat.prototype = extend(
    stat.prototype,
    {
        toString: function () {
            var runner = this.value[0];

            return util.format(
                    '\n> ' + color.header('Total test duration') + ': %d second(s).\n',
                    Math.round(runner.score.duration * 10000) / 10000
                )
                .concat(util.format(
                    '> ' + color.header('Total test memory usage') + ': %s\n',
                    util.inspect(runner.score.usage.format('KB', 4).stat)
                ))
            ;
        }
    }
);
