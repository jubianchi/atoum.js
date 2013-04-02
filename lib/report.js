var util = require('util'),
    microtime = require('microtime-x'),
    atoum = require('./atoum'),
    report = module.exports = function report(stdout) {
        this.stdout = stdout;
    };

report.prototype = {
    register: function(dispatcher) {
        var out = this.stdout;

        dispatcher.on('runnerStart', function(runner) {
            out.write(util.format('\033[34matoum.js %s\033[0m\n\n', atoum.version));
            out.write(util.format('> \033[1mnode path:\033[0m %s\n', process.execPath));
            out.write(util.format('> \033[1mnode versions:\033[0m %s\n', util.inspect(process.versions)));
            out.write('\n');
        });

        dispatcher.on('runnerStop', function(runner) {
            out.write(util.format('> \033[1mTotal test duration:\033[0m %d second(s).\n', runner.score.duration));
            out.write(util.format('> \033[1mTotal test memory usage:\033[0m %s\n', util.inspect(runner.score.usage)));

            var tests = 0;
            for(var i in runner.score.tests) {
                if(runner.score.tests.hasOwnProperty(i)) tests++;
            }

            if(runner.score.passed === true) {
                out.write(util.format(
                    '\033[42;37mSuccess (%d test(s), %d method(s), %d assertion(s)) !\033[0m\n',
                    tests,
                    runner.score.methods,
                    runner.generator.assertionsCount
                ));
            } else {
                out.write(util.format(
                    '\033[41;37mFailure (%d/%d test(s), %d/%d method(s), %d assertion(s)) !\033[0m\n',
                    (tests - runner.score.failedTests),
                    tests,
                    (runner.score.methods - runner.score.failedMethods),
                    runner.score.methods,
                    runner.generator.assertionsCount
                ));

                if(runner.score.failures > 0) {
                    out.write(util.format('> \033[31mThere were %d failures:\033[0m\n', runner.score.failures));
                    for(var t in runner.score.tests) {
                        if(runner.score.tests.hasOwnProperty(t) && runner.score.tests[t].failures.length > 0) {
                            out.write('>> ' + t + '\n');

                            for(var f in runner.score.tests[t].failures) {
                                out.write('>>> ' + runner.score.tests[t].failures[f] + '\n');
                            }
                        }
                    }
                }

                if(runner.score.exceptions > 0) {
                    out.write(util.format('> \033[31mThere were %d exceptions:\033[0m\n', runner.score.exceptions));
                    for(var t in runner.score.tests) {
                        if(runner.score.tests.hasOwnProperty(t) && runner.score.tests[t].exceptions.length > 0) {
                            out.write('>> ' + t + '\n');

                            for(var ex in runner.score.tests[t].exceptions) {
                                out.write('>>> ' + runner.score.tests[t].exceptions[ex] + '\n');
                            }
                        }
                    }
                }

                if(runner.score.errors > 0) {
                    out.write(util.format('> \033[31mThere were %d errors:\033[0m\n', runner.score.errors));
                    for(var t in runner.score.tests) {
                        if(runner.score.tests.hasOwnProperty(t) && runner.score.tests[t].errors.length > 0) {
                            out.write('>> ' + t + '\n');

                            for(var e in runner.score.tests[t].errors) {
                                out.write('>>> ' + runner.score.tests[t].errors[e] + '\n');
                            }
                        }
                    }
                }
            }
        });

        dispatcher.on('testStart', function(test) {
            out.write(util.format('> \033[1m%s\033[0m\n', test.class));
            out.write('[');
        });

        dispatcher.on('testStop', function(test) {
            out.write(']\n');
            out.write(util.format('=> Test duration: %d second(s).\n', test.score.duration));
            out.write(util.format('=> Memore usage: %s\n', util.inspect(test.score.usage)));
        });

        dispatcher.on('testMethodSuccess', function() { out.write('\033[32mS\033[0m'); });
        dispatcher.on('testMethodFailure', function() { out.write('\033[31mF\033[0m'); });
        dispatcher.on('testMethodException', function() { out.write('\033[31mX\033[0m'); });
        dispatcher.on('testMethodError', function() { out.write('\033[31mE\033[0m'); });

        return this;
    }
};
