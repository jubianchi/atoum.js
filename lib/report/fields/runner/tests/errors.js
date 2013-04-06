"use strict";

var underscore = require('underscore'),
    extend = require('node.extend'),
    util = require('util'),
    color = require('../../../color'),
    field = require('../../../field'),
    errors = module.exports = function errors() {
        field.apply(this, [ [ 'runnerStop' ] ]);
    };

errors.prototype = new field();
errors.prototype.constructor = errors;
errors.prototype = extend(
    errors.prototype,
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

            if(runner.score.errors > 0) {
                str = util.format(
                    '> ' + color.error('There were %d errors:') + '\n',
                    runner.score.errors
                );

                for(test in runner.score.tests) {
                    if(runner.score.tests.hasOwnProperty(test)) {
                        if(runner.score.tests[test].errors.length > 0) {
                            str = str
                                .concat('>> ' + test + '\n')
                                .concat(underscore.map(runner.score.tests[test].errors, render, this).join('\n'))
                            ;
                        }
                    }
                }
            }

            return str;
        }
    }
);
