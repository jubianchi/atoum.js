var atoum = require('..')(module),
    callback = require('../lib/test/callback'),
    concurrent = require('../lib/test/engines/concurrent'),
    includer = require('../lib/includer'),
    testedClass = require('../lib/runner'),
    unit = module.exports = {
        testClass: function() {
            var object;

            this
                .object(object = new testedClass())
                .array(object.reports).isEmpty()
                .object(object.engine).isInstanceOf(concurrent)
            ;
        }
    };
