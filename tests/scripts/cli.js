require("../..")(module);

var Script = require("../../lib/script"),
    callback = require("../../lib/test/callback"),
    testedClass = require("../../lib/scripts/cli"),
    unit = module.exports = {
        testClass: function() {
            var object;

            this
                .if(object = new testedClass())
                .then()
                    .object(object).isInstanceOf(Script)
                    .function(object.console).isIdenticalTo(require('optimist'))
                    .object(object.definition).isEmpty()
            ;
        },

        testAddOption: function() {
            var object, option;

            this
                .if(object = new testedClass())
                .and(option = {})
                .then()
                    .object(object.addOption("foo", option)).isIdenticalTo(object)
                    .object(object.getOption("foo")).isIdenticalTo(option)
            ;
        },

        testShowHelp: function() {
            var object, console;

            this
                .if(console = {})
                .and(console.check = function() { return console; })
                .and(console.showHelp = this.generateCallback())
                .and(object = new testedClass(console))
                .and(object.argv = function() {})
                .then()
                    .object(object.showHelp()).isIdenticalTo(object)
                    .callback(console.showHelp).wasCalled().withoutArgument()
            ;
        },

        testRun: function() {
            var object, console;

            this
                .if(console = {})
                .and(console.check = function() { return console; })
                .and(console.argv = { help: true, directory: [], file: [] })
                .and(object = new testedClass(console))
                .and(object.argv = function() { return console.argv; })
                .and(object.showHelp = callback())
                .then()
                    .number(object.run()).isEqualTo(0)
                    .callback(object.showHelp).wasCalled().withoutArgument()
                .if(object = new testedClass(console))
                .and(console.argv = { directory: [], file: [] })
                .and(object.argv = function() { return console.argv; })
                .and(object.useConcurrentEngine = callback())
                .then()
                    .undefined(object.run({}))
                    .callback(object.useConcurrentEngine).wasCalled().withoutArgument()
                .if(object = new testedClass(console))
                .and(console.argv = { inline: true, directory: [], file: [] })
                .and(object.useConcurrentEngine = callback())
                .and(object.useInlineEngine = callback())
                .and(object.argv = function() { return console.argv; })
                .then()
                    .undefined(object.run({}))
                    .callback(object.useInlineEngine).wasCalled().withoutArgument()
                    .callback(object.useConcurrentEngine).wasNotCalled()
                .if(object = new testedClass(console))
                .and(console.argv = { inline: true, directory: [], file: [] })
                .and(object.addDirectory = callback())
                .and(object.addFile = callback())
                .and(object.argv = function() { return console.argv; })
                .then()
                    .undefined(object.run({}))
                    .callback(object.addDirectory).wasNotCalled()
                    .callback(object.addFile).wasNotCalled()
                .if(object = new testedClass(console))
                .and(console.argv = { inline: true, directory: [ 'foo', 'bar' ], file: [ 'foo', 'bar' ] })
                .and(object.addDirectory = callback())
                .and(object.addFile = callback())
                .and(object.argv = function() { return console.argv; })
                .then()
                    .undefined(object.run({}))
                    .callback(object.addDirectory).wasCalled()
                        .withArguments('foo')
                        .withArguments('bar')
                    .callback(object.addFile).wasCalled()
                        .withArguments('foo')
                        .withArguments('bar')
            ;
        }
    };
