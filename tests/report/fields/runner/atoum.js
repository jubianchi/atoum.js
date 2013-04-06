var util = require('util'),
    color = require('cli-color'),
    atoum = require('../../../../')(module),
    field = require('../../../../lib/report/field'),
    testedClass = require('../../../../lib/report/fields/runner/atoum'),
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
                .object(object = new testedClass())
                .string(object.toString()).isEqualTo(
                    util.format(color.blue('atoum.js %s\n\n'), atoum.version)
                        .concat(util.format(
                            '> ' + color.bold('node path') + ': %s\n',
                            process.execPath
                        ))
                        .concat(util.format(
                            '> ' + color.bold('node versions') + ': %s\n',
                            util.inspect(process.versions)
                        ))
                )
            ;
        }
    };
