var atoum = require('..')(module),
    underscore = require('underscore'),
    callback = require('../lib/test/callback'),
    testedClass = require('../lib/includer'),
    unit = module.exports = {
        testResolve: function() {
            var object, module, target, fs;

            this
                .if(object = new testedClass())
                .and(target = { filename: '/path/to/target.js' })
                .and(module = 'module')
                .then()
                    .string(object.resolve(module, target)).isEqualTo(module)
                .if(module = './module')
                .then()
                    .string(object.resolve(module, target)).isEqualTo('/path/to/module')
                .if(module = '../module')
                .then()
                    .string(object.resolve(module, target)).isEqualTo('/path/module')
                .if(module = './lib/module')
                .and(fs = { existsSync: callback(function() { return false; }) })
                .then()
                    .string(object.resolve(module, target, fs)).isEqualTo('/path/to/lib/module')
                    .callback(fs.existsSync).wasCalled().withArguments('/path/to/lib-cov/module.js')
                .if(fs = { existsSync: callback(function() { return true; }) })
                    .string(object.resolve(module, target, fs)).isEqualTo('/path/to/lib-cov/module')
                    .callback(fs.existsSync).wasCalled().withArguments('/path/to/lib-cov/module.js')
            ;
        }
    };
