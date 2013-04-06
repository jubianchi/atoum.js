var util = require('util'),
    color = require('cli-color'),
    atoum = require('../../../../')(module),
    score = require('../../../../lib/test/score'),
    field = require('../../../../lib/report/field'),
    testedClass = require('../../../../lib/report/fields/test/footer'),
    unit = module.exports = {
        testClass: function() {
            var object;

            this
                .object(object = new testedClass()).isInstanceOf(field)
                .array(object.events).isEqualTo([ 'testStop' ])
            ;
        },

        testToString: function() {
            var object, classname, run;

            this
                .if(run = new score())
                .and(object = new testedClass())
                .and(classname = Math.random().toString(36).substring(7))
                .and(run = new score())
                .and(object.value = [ { 'score': run, 'class': classname } ])
                .then()
                    .string(object.toString()).isEqualTo(
                        util.format(
                            ']\n=> Test duration: %d second(s).\n',
                            Math.round(run.duration * 10000) / 10000
                        )
                            .concat(util.format(
                                '=> Memore usage: %s\n',
                                util.inspect(run.usage.format('KB', 4).stat)
                            ))
                    )
            ;
        }
    };
