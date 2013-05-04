require('..')(module);

var testedClass = require('../lib/locale'),
    unit = module.exports = {
        test_: function() {
            var object, string, translations;

            this
                .if(translations = {})
                .and(string = Math.random().toString(36).substring(7))
                .and(translations[string] = {
                    fr: Math.random().toString(36).substring(7)
                })
                .and(object = new testedClass(translations))
                .then()
                    .string(object._(string)).isEqualTo(string)
                .if(object = new testedClass(translations, 'fr'))
                .then()
                    .string(object._(string)).isEqualTo(translations[string].fr)
                .if(object.setLocale())
                .then()
                    .string(object._(string)).isEqualTo(string)
                .if(translations[string] = {
                    fr: Math.random().toString(36).substring(7) + ' $[1] $[2]'
                })
                .then()
                    .string(object._(string)).isEqualTo(string.replace('$[1]', '').replace('$[2]', ''))
                    .string(object._(string, 'foo')).isEqualTo(string.replace('$[1]', 'foo').replace('$[2]', ''))
                    .string(object._(string, 'foo', 'bar')).isEqualTo(string.replace('$[1]', 'foo').replace('$[2]', 'bar'))
            ;
        },

        test__: function() {
            var object, singular, plural, translations;

            this
                .if(translations = {})
                .and(singular = Math.random().toString(36).substring(7))
                .and(plural = Math.random().toString(36).substring(7))
                .and(translations[singular] = {
                    fr: Math.random().toString(36).substring(7)
                })
                .and(translations[plural] = {
                    fr: Math.random().toString(36).substring(7)
                })
                .and(object = new testedClass(translations))
                .then()
                    .string(object.__(singular, plural)).isEqualTo(singular)
                    .string(object.__(singular, plural, 1)).isEqualTo(singular)
                    .string(object.__(singular, plural, 2)).isEqualTo(plural)
                .if(object = new testedClass(translations, 'fr'))
                .then()
                    .string(object.__(singular, plural)).isEqualTo(translations[singular].fr)
                    .string(object.__(singular, plural, 1)).isEqualTo(translations[singular].fr)
                    .string(object.__(singular, plural, 2)).isEqualTo(translations[plural].fr)
                .if(object.setLocale())
                .then()
                    .string(object.__(singular, plural)).isEqualTo(singular)
                    .string(object.__(singular, plural, 1)).isEqualTo(singular)
                    .string(object.__(singular, plural, 2)).isEqualTo(plural)
                .if(translations = {})
                .and(singular = Math.random().toString(36).substring(7) + ' $[1]')
                .and(plural = Math.random().toString(36).substring(7) + ' $[1]')
                .and(translations[singular] = {
                    fr: Math.random().toString(36).substring(7) + ' $[1]'
                })
                .and(translations[plural] = {
                    fr: Math.random().toString(36).substring(7) + ' $[1]'
                })
                .and(object = new testedClass(translations))
                .then()
                    .string(object.__(singular, plural)).isEqualTo(singular.replace('$[1]', 0))
                    .string(object.__(singular, plural, 1)).isEqualTo(singular.replace('$[1]', 1))
                    .string(object.__(singular, plural, 2)).isEqualTo(plural.replace('$[1]', 2))
                .if(translations = {})
                .and(singular = Math.random().toString(36).substring(7) + ' $[2] $[1]')
                .and(plural = Math.random().toString(36).substring(7) + ' $[2] $[1]')
                .and(translations[singular] = {
                    fr: Math.random().toString(36).substring(7) + ' $[2] $[1]'
                })
                .and(translations[plural] = {
                    fr: Math.random().toString(36).substring(7) + ' $[2] $[1]'
                })
                .and(object = new testedClass(translations))
                .then()
                    .string(object.__(singular, plural)).isEqualTo(singular.replace('$[1]', 0).replace('$[2]', ''))
                    .string(object.__(singular, plural, 1)).isEqualTo(singular.replace('$[1]', 1).replace('$[2]', ''))
                    .string(object.__(singular, plural, 1, 'foo')).isEqualTo(singular.replace('$[1]', 1).replace('$[2]', 'foo'))
                    .string(object.__(singular, plural, 2, 'foo')).isEqualTo(plural.replace('$[1]', 2).replace('$[2]', 'foo'))
            ;
        },

        testSetLocale: function() {
            var object;

            this
                .if(object = new testedClass({}))
                .then()
                    .object(object.setLocale(Math.random().toString(36).substring(2))).isIdenticalTo(object)
            ;
        }
    };
