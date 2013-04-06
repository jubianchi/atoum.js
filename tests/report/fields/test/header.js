var util = require('util'),
    color = require('cli-color'),
    atoum = require('../../../../')(module),
    score = require('../../../../lib/score'),
    field = require('../../../../lib/report/field'),
    testedClass = require('../../../../lib/report/fields/test/header'),
    unit = module.exports = {
        testClass: function() {
            var object;

            this
                .object(object = new testedClass()).isInstanceOf(field)
                .array(object.events).isEqualTo([ 'testStart' ])
            ;
        },

        testToString: function() {
            var object, classname;

            this
                .if(run = new score())
                .and(object = new testedClass())
                .and(object.value = [ { 'class': classname = Math.random().toString(36).substring(7) } ])
                .then()
                    .string(object.toString()).isEqualTo('\n> ' + color.bold(classname) + '\n[')
            ;
        }
    };
