var atoum = require('../../..')(module),
    util = require("util"),
    underscore = require('underscore'),
    color = require('cli-color'),
    testedClass = require('../../../lib/asserter/callback/exception'),
    unit = module.exports = {
        testTostring: function() {
            var mesage, asserter, stringArg, numberArg, otherStringArg, otherNumberArg;
            this
                .if(message = Math.random().toString(36).substring(7))
                .and(asserter = {
                    value: function func() {}
                })
                .and(reference = [
                    Math.random().toString(36).substring(7),
                    Math.random(),
                    {
                        it: 'has',
                        an: 'array',
                        with: ['a', 'few', 'elements'],
                        without: ['a', 'few', 'elements']
                    },
                    function() { return 0; }
                ])
                .and(data = [
                    [
                        stringArg = Math.random().toString(36).substring(7),
                        numberArg = Math.random(),
                        {
                            it: 'has',
                            an: 'array',
                            with: ['a', 'few', 'elements'],
                            without: ['a', 'few', 'elements']
                        },
                        function() { return 0; }
                    ],
                    [
                        otherStringArg = Math.random().toString(36).substring(7),
                        otherNumberArg = Math.random(),
                        {
                            it: 'has',
                            an: 'array',
                            with: ['a', 'few', 'elements'],
                            without: ['a', 'few', 'elements']
                        },
                        function() { return 0; }
                    ]
                ])
                .and(object = new testedClass(message, asserter, reference, data))
                .then()
                .string(object.toString()).isEqualTo(
                    message.concat("\n")
                        .concat('#0: func(' + util.inspect(stringArg) + ', ' + util.inspect(numberArg) + ', [Object <Object>], [Function <anonymous>])\n')
                        .concat('#1: func(' + util.inspect(otherStringArg) + ', ' + util.inspect(otherNumberArg) + ', [Object <Object>], [Function <anonymous>])\n')
                )
            ;

            var object, message, asserter, reference, data;
        }
    };
