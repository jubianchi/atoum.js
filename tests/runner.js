var atoum = require('..')(module),
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
        var report, generator, object;

        this
            .if(generator = {})
            .and(report = { register: function() { return this; } })
            .then()
                .object(object = new testedClass(report, generator))
                .bool(object.loop).isFalse()
                .object(object.setLoop(true)).isIdenticalTo(object)
                .bool(object.loop).isTrue()
                .object(object.setLoop(false)).isIdenticalTo(object)
                .bool(object.loop).isFalse()
        ;
    }
};
