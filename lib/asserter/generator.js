var fs = require('fs'),
    path = require('path'),
    console = require('console'),
    microtime = require('microtime-x'),
    generator = module.exports = function generator() {
        files = fs.readdirSync('lib/asserters');

        this.assertionsCount = 0;
        this.asserters = {};
        this.aliases = {};
        this
            .addAlias('if', function() { return this; })
            .addAlias('and', function() { return this; })
            .addAlias('then', function() { return this; })
            .addAlias('dump', function(value) { console.dir(value); return this; })
        ;

        for(var index in files) {
            var file = files[index];

            this.addAsserter(
                file.replace('.js', ''),
                require(fs.realpathSync(path.resolve('lib', 'asserters', file)))
            );
        }
    };

generator.prototype = {
    addAsserter: function(name, constructor) {
        this.asserters[name] = constructor;

        return this;
    },

    addAlias: function(name, callable) {
        this.aliases[name] = callable;

        return this;
    },

    injectInto: function(target) {
        for(var asserter in this.asserters) {
            if(this.asserters.hasOwnProperty(asserter)) {
                target[asserter] = this.getAsserter(asserter);
            }
        }

        for(var alias in this.aliases) {
            if(this.aliases.hasOwnProperty(alias)) {
                target[alias] = this.aliases[alias];
            }
        }

        return target;
    },

    getAsserter: function(name) {
        var generator = this;

        return function(value) {
            var asserter = new generator.asserters[name](generator);

            generator.assertionsCount++;

            return generator.injectInto(asserter).setWith(value);
        };
    }
};
