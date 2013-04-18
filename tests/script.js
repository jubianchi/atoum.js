var atoum = require("..")(module),
    testedClass = require("../lib/script"),
    unit = module.exports = {
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
                .and(console.argv = function() {})
                .and(object = new testedClass(console))
                .then()
                    .object(object.showHelp()).isIdenticalTo(object)
                    .callback(console.showHelp).wasCalled().withoutArgument()
            ;
        }
    };
