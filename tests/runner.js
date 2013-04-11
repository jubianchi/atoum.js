var atoum = require('..')(module),
    callback = require('../lib/test/callback'),
    concurrent = require('../lib/test/engines/concurrent'),
    includer = require('../lib/includer'),
    testedClass = require('../lib/runner'),
    unit = module.exports = {
        testClass: function() {
            var object;

            this
                .object(object = new testedClass())
                .array(object.reports).isEmpty()
                .object(object.includer).isInstanceOf(includer)
                .object(object.engine).isInstanceOf(concurrent)
            ;
        },

        testSetLoop: function() {
            var object, readline, interface;

            this
                .if(readline = { createInterface: callback(function() { return (interface = { close: callback() }); }) })
                .then()
                    .object(object = new testedClass())
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
