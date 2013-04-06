"use strict";

var extend = require('node.extend'),
    util = require('util'),
    color = require('../../../color'),
    underscore = require('underscore'),
    field = require('../../../field'),
    failures = module.exports = function failures() {
        field.call(this, [ 'runnerStop' ]);
    };

failures.prototype = new field();
failures.prototype.constructor = failures;
failures.prototype = extend(
    failures.prototype,
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

            if(runner.score.failures > 0) {
                str = util.format(
                    '> ' + color.error('There were %d failures:') + '\n',
                    runner.score.failures
                );

                for(test in runner.score.tests) {
                    if(runner.score.tests.hasOwnProperty(test)) {
                        if(runner.score.tests[test].failures.length > 0) {
                            str = str
                                .concat('>> ' + test + '\n')
                                .concat(underscore.map(runner.score.tests[test].failures, render, this).join('\n'))
                            ;
                        }
                    }
                }
            }

            return str;
        }
    }
);
