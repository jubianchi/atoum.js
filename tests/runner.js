var atoum = require('..')(module),
    callback = require('../lib/test/callback'),
    testedClass = require('../lib/runner'),
    unit = module.exports = {
        testClass: function() {
            var report, generator, object;

            this
                .if(generator = {})
                .and(report = { register: function() { return this; } })
                .then()
                    .object(object = new testedClass(generator))
                    .array(object.reports).isEmpty()
                    .object(object.generator).isIdenticalTo(generator)
            ;
        },

        testSetLoop: function() {
            var report, generator, object, readline, interface;

            this
                .if(generator = {})
                .and(report = {})
                .and(readline = { createInterface: callback(function() { return (interface = { close: callback() }); }) })
                .then()
                    .object(object = new testedClass(report, generator))
                    .bool(object.loop).isFalse()
                    .object(object.setLoop(true, readline)).isIdenticalTo(object)
                    .bool(object.loop).isTrue()
                    .callback(readline.createInterface).wasCalled()
                    .object(object.setLoop(false)).isIdenticalTo(object)
                    .bool(object.loop).isFalse()
                    .callback(interface.close).wasCalled().withoutArgument()
            ;
        }
    };
