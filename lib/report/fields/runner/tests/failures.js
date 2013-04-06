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
                method,
                str = '',
                render = function (exception, method) {
                    return util.format(
                        '>>> ' + color.error('%s: %s') + '\n%s\n',
                        method,
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
                        if(underscore.size(runner.score.tests[test].failures) > 0) {
                            for(method in runner.score.tests[test].failures) {
                                str = str
                                    .concat('>> ' + test + '::' + method + '\n')
                                    .concat(underscore.map(runner.score.tests[test].failures, render, this).join('\n'))
                                ;
                            }
                        }
                    }
                }
            }

            return str;
        }
    }
);
