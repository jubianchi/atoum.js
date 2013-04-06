var util = require('util'),
    color = require('cli-color'),
    atoum = require('../..')(module),
    callback = require('../../lib/test/callback'),
    testedClass = require('../../lib/report/field'),
    unit = module.exports = {
        testClass: function() {
            var object, events;

            this
                .if(events = undefined)
                .then()
                    .object(object = new testedClass(events))
                    .array(object.events).isEmpty()
                    .string(object.value).isEmpty()
                    .string(object.event).isEmpty()
                .if(events = [])
                .then()
                    .object(object = new testedClass(events))
                    .array(object.events).isEqualTo(events)
            ;
        },

        testRegister: function() {
            var object, events, dispatcher, on, output;

            this
                .if(dispatcher = { 'on': on = callback() })
                .and(events = ['runnerStart', 'runnerStop'])
                .and(object = new testedClass(events))
                .and(object.render = callback())
                .and(output = {})
                .then()
                    .object(object.register(dispatcher, output)).isIdenticalTo(object)
                    .callback(on)
                        .wasCalled()
                        .withArguments('runnerStart', object.render())
                        .withArguments('runnerStop', object.render())
                    .callback(object.render)
                        .wasCalled()
                        .withArguments('runnerStart', output)
                        .withArguments('runnerStop', output)
            ;
        },

        testToString: function() {
            var object;

            this
                .object(object = new testedClass())
                .string(object.toString()).isEmpty()
            ;
        }
    };
