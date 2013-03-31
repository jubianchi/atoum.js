var fs = require('fs'),
    path = require('path'),
    console = require('console'),
    microtime = require('microtime-x'),
    generator = module.exports = function generator() {
        files = fs.readdirSync('lib/asserters');

        this.assertionsCount = 0;

        this.aliases = {
            if: function() { return this; },
            and: function() { return this; },
            then: function() { return this; },
            dump: function(value) { console.dir(value); return this; }
        };

        this.asserters = {};
        for(var index in files) {
            var file = files[index],
                name = file.replace('.js', '');

            this.asserters[name] = require(fs.realpathSync(path.resolve('lib', 'asserters', file)));
        }
    };

generator.prototype = {
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
            var asserter = new generator.asserters[name](this);

            generator.assertionsCount++;

            return generator.injectInto(asserter).setWith(value);
        };
    }
};
