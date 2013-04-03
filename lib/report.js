(function () {
    "use strict";

    var util = require('util'),
        underscore = require('underscore'),
        microtime = require('microtime-x'),
        color = require('cli-color'),
        atoum = require('./atoum'),
        report = module.exports = function report(stdout) {
            this.stdout = stdout;
            this.color = {
                title: color.blue,
                success: color.green,
                error: color.red,
                header: color.bold,
                ribbon: {
                    success: color.bgGreen.white,
                    error: color.bgRed.white
                }
            };
        },
        priv = {
            failure: function (exception, out, color) {
                out.write(
                    util.format(
                        '>>> ' + color.error('%s: %s') + '\n%s\n',
                        exception.name,
                        exception.message,
                        exception.stack
                    )
                );
            }
        };

    report.prototype = {
        register: function (dispatcher) {
            var color = this.color,
                out = this.stdout;

            dispatcher.on('runnerStart', function () {
                out.write(util.format(color.title('atoum.js %s\n\n'), atoum.version));
                out.write(util.format('> ' + color.header('node path') + ': %s\n', process.execPath));
                out.write(util.format('> ' + color.header('node versions') + ': %s\n', util.inspect(process.versions)));
                out.write('\n');
            });

            dispatcher.on('runnerStop', function (runner) {
                var i,
                    test,
                    tests = 0;

                out.write(util.format('> ' + color.header('Total test duration') + ': %d second(s).\n', Math.round(runner.score.duration * 10000) / 10000));
                out.write(util.format('> ' + color.header('Total test memory usage') + ': %s\n', util.inspect(runner.score.usage.format('KB', 4).stat)));

                for(i in runner.score.tests) {
                    if(runner.score.tests.hasOwnProperty(i)) {
                        tests += 1;
                    }
                }

                if(runner.score.passed === true) {
                    out.write(util.format(
                        color.ribbon.success('Success (%d test(s), %d method(s), %d assertion(s)) !\n'),
                        tests,
                        runner.score.methods,
                        runner.generator.assertionsCount
                    ));
                } else {
                    out.write(util.format(
                        color.ribbon.success('Failure (%d/%d test(s), %d/%d method(s), %d assertion(s)) !\n'),
                        (tests - runner.score.failedTests),
                        tests,
                        (runner.score.methods - runner.score.failedMethods),
                        runner.score.methods,
                        runner.generator.assertionsCount
                    ));

                    if(runner.score.failures > 0) {
                        out.write(
                            util.format(
                                '> ' + color.error('There were %d failures:') + '\n',
                                runner.score.failures
                            )
                        );

                        for(test in runner.score.tests) {
                            if(runner.score.tests.hasOwnProperty(test)) {
                                if(runner.score.tests[test].failures.length > 0) {
                                    out.write('>> ' + test + '\n');

                                    underscore.each(
                                        runner.score.tests[test].failures,
                                        function (value, key) {
                                            priv.failure(value, out, color);
                                        }
                                    );
                                }
                            }
                        }
                    }

                    if(runner.score.exceptions > 0) {
                        out.write(
                            util.format(
                                '> ' + color.error('There were %d exceptions') + ':\n',
                                runner.score.exceptions
                            )
                        );

                        for(test in runner.score.tests) {
                            if(runner.score.tests.hasOwnProperty(test)) {
                                if(runner.score.tests[test].exceptions.length > 0) {
                                    out.write('>> ' + test + '\n');

                                    underscore.each(
                                        runner.score.tests[test].exceptions,
                                        function (value, key) {
                                            priv.failure(value, out, color);
                                        }
                                    );
                                }
                            }
                        }
                    }

                    if(runner.score.errors > 0) {
                        out.write(
                            util.format(
                                '> ' + color.error('There were %d errors') + ':\n',
                                runner.score.errors
                            )
                        );

                        underscore.each(
                            runner.score.tests,
                            function (value, key) {
                                if(value.errors.length > 0) {
                                    out.write('>> ' + key + '\n');

                                    underscore.each(
                                        value.errors,
                                        function (value, key) {
                                            priv.failure(value, out, color);
                                        }
                                    );
                                }
                            }
                        );
                    }
                }
            });

            dispatcher.on('testStart', function (test) {
                out.write(util.format('> ' + color.header('%s') + '\n', test.class));
                out.write('[');
            });

            dispatcher.on('testStop', function (test) {
                out.write(']\n');
                out.write(util.format('=> Test duration: %d second(s).\n', Math.round(test.score.duration * 10000) / 10000));
                out.write(util.format('=> Memore usage: %s\n', util.inspect(test.score.usage.format('KB', 4).stat)));
            });

            dispatcher.on('testMethodSuccess', function () { out.write(color.success('S')); });
            dispatcher.on('testMethodFailure', function () { out.write(color.error('F')); });
            dispatcher.on('testMethodException', function () { out.write(color.error('X')); });
            dispatcher.on('testMethodError', function () { out.write(color.error('E')); });

            return this;
        }
    };
}());
