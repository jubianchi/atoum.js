var atoum = require('..')(module),
    callback = require('../lib/test/callback'),
    testedClass = require('../lib/report'),
    unit = module.exports = {
    testClass: function() {
        var object, output;

        this
            .if(output = {})
            .then()
                .object(object = new testedClass(output))
                .object(object.output).isIdenticalTo(output)
                .array(object.fields).isEmpty()
        ;
    },

    testAddField: function() {
        var object, output, field, otherField;

        this
            .if(output = {})
            .and(object = new testedClass(output))
            .and(field = {})
            .then()
                .object(object.addField(field)).isIdenticalTo(object)
                .array(object.fields).isNotEmpty()
                .object(object.fields[0]).isIdenticalTo(field)
            .if(object.addField(field))
            .then()
                .object(object.fields[0]).isIdenticalTo(field)
                .object(object.fields[1]).isIdenticalTo(field)
            .if(object.fields = [])
            .and(otherField = {})
            .then()
                .object(object.addField(field)).isIdenticalTo(object)
                .object(object.addField(otherField)).isIdenticalTo(object)
                .object(object.fields[0]).isIdenticalTo(field)
                .object(object.fields[1]).isIdenticalTo(otherField)
        ;
    }
};
