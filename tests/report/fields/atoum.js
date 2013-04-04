var util = require('util'),
    color = require('cli-color'),
    atoum = require('../../..')(module),
    callback = require('../../../lib/test/callback'),
    testedClass = require('../../../lib/report/fields/atoum'),
    unit = module.exports = {
        testClass: function() {
            var object;

            this
                .object(object = new testedClass())
                .string(object.toString()).isEqualTo(
                    util.format(color.blue('atoum.js %s\n\n'), require('../../..')().version)
                        .concat(util.format(
                            '> ' + color.bold('node path') + ': %s\n',
                            process.execPath
                        ))
                        .concat(util.format(
                            '> ' + color.bold('node versions') + ': %s\n',
                            util.inspect(process.versions)
                        ))
                        .concat('\n')
                )
            ;
        },

        testRegister: function() {
            var object, dispatcher, on;

            this
                .if(dispatcher = { 'on': on = callback() })
                .and(object = new testedClass())
                .then()
                    .object(object.register(dispatcher)).isIdenticalTo(object)
                .callback(on).wasCalled().withArguments('runnerStart', object.render())
            ;
        }
    };
