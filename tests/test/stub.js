require("../..")(module);

var callback = require('../../lib/test/callback'),
    testedClass = require('../../lib/test/stub'),
    unit = module.exports = {
        testStub: function() {
            var global, method, original, stub;

            this
                .if(global = {})
                .and(method = Math.random().toString(36).substring(7))
                .error(function() {
                    testedClass(global, method)
                })
                    .hasName("Error")
                    .hasMessage("Method ".concat(method).concat(" does not exist"))
                .if(global[method] = original = callback())
                .and(stub = callback(function() { return this; }))
                .then()
                    .callback(testedClass(global, method, stub)).isIdenticalTo(global[method])
                    .object(global[method]()).isIdenticalTo(global)
                    .callback(stub).wasCalled()
                    .callback(original).wasNotCalled()
                .if(global[method].restore())
                .then()
                    .undefined(global[method]())
                    .callback(original).wasCalled()
            ;
        }
    };
