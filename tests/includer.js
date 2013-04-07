var atoum = require('..')(module),
    testedClass = require('../lib/includer'),
    unit = module.exports = {
    testClass: function() {
        var object;

        this
            .object(object = new testedClass())
            .array(object.replacements).isEmpty()
        ;
    },

    testProvide: function() {
        var object, target, path, provided;

        this
            .if(object = new testedClass())
            .and(target = { filename: Math.random().toString(36).substring(7) })
            .and(path = Math.random().toString(36).substring(7))
            .then()
                .object(provided = object.provide(path)).isEqualTo({})
                .object(object.require(path, target)).isIdenticalTo(provided)
                .object(object.require(Math.random().toString(36).substring(7) + '/' + path, target)).isIdenticalTo(provided)
            .if(provided = {})
            .then()
                .object(object.provide(path, provided)).isIdenticalTo(provided)
        ;
    }
};
