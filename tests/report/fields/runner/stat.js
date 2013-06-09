var util = require('util'),
    color = require('cli-color'),
    atoum = require('../../../../')(module),
    score = require('../../../../lib/score'),
    field = require('../../../../lib/report/field'),
    testedClass = require('../../../../lib/report/fields/runner/stat'),
    unit = module.exports = {
        testClass: function() {
            var object;

            this
                .object(object = new testedClass()).isInstanceOf(field)
                .array(object.events).isEqualTo([ 'runnerStop' ])
            ;
        },

        testToString: function() {
            var object, run;

            this
                .if(run = new score())
                .and(object = new testedClass())
                .and(object.value = [ { 'score': run } ])
                .then()
                    .string(object.toString()).isEqualTo(
                        util.format(
                            '> ' + color.xterm(87)('Total test duration:' + '\x1b[0m %d second') + '\n',
                            Math.round(run.duration * 10000) / 10000
                        )
                            .concat(util.format(
                                '> ' + color.xterm(87)('Total test memory usage:' + '\x1b[0m %s') + '\n',
                                util.inspect(run.usage.format('KB', 4).stat)
                            ))
                            .concat(util.format(
                                '> ' + color.xterm(87)('Total running duration:' + '\x1b[0m %d second') + '\n',
                                Math.round(run.runningDuration * 10000) / 10000
                            ))
                    )
            ;
        }
    };
