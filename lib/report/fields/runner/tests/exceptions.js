"use strict";

var extend = require('node.extend'),
    util = require('util'),
    underscore = require('underscore'),
    color = require('../../../color'),
    field = require('../../../field'),
    exceptions = module.exports = function exceptions() {
        field.apply(this, [ [ 'runnerStop' ] ]);
    };

exceptions.prototype = new field();
exceptions.prototype.constructor = exceptions;
exceptions.prototype = extend(
    exceptions.prototype,
    {
        toString: function () {
            var runner = this.value[0],
                test,
                str = '',
                render = function (exception) {
                    return util.format(
                        '>>> ' + color.error('%s: %s') + '\n%s\n',
                        exception.name,
                        exception.message,
                        exception.stack
                    )
                };

            if(runner.score.exceptions > 0) {
                str = util.format(
                    '> ' + color.error('There were %d exceptions:') + '\n',
                    runner.score.exceptions
                );

                for(test in runner.score.tests) {
                    if(runner.score.tests.hasOwnProperty(test)) {
                        if(runner.score.tests[test].exceptions.length > 0) {
                            str = str
                                .concat('>> ' + test + '\n')
                                .concat(underscore.map(runner.score.tests[test].exceptions, render, this).join('\n'))
                            ;
                        }
                    }
                }
            }

            return str;
        }
    }
);
