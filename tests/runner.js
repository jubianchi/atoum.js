var atoum = require('..'),
    testedClass = atoum.require('lib/runner', module),
    unit = module.exports = {
    testClass: function() {
        var report, generator, object;

        this
            .if(generator = {})
            .and(report = { register: function() { return this; } })
            .then()
                .object(object = new testedClass(report, generator))
                .object(object.report).isIdenticalTo(report)
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
