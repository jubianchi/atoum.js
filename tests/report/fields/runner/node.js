var util = require('util'),
    color = require('cli-color'),
    atoum = require('../../../../')(module),
    field = require('../../../../lib/report/field'),
    testedClass = require('../../../../lib/report/fields/runner/node'),
    unit = module.exports = {
        testClass: function() {
            var object;

            this
                .object(object = new testedClass()).isInstanceOf(field)
                .array(object.events).isEqualTo([ 'runnerStart' ])
            ;
        },

        testToString: function() {
            var object;

            this
                .if(object = new testedClass())
                .then()
                    .string(object.toString()).isEqualTo(
                        util.format('> ' + color.bold('node path') + ': %s\n', process.execPath)
                            .concat(util.format(
                                '> ' + color.bold('node versions') + ': %s\n',
                                util.inspect(process.versions)
                            ))
                    )
            ;
        }
    };
