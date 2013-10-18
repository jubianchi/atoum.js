# atoum.js - CHANGELOG

## v0.0.10:
* jsdom integration as a new engine

```js
var Dom = require("atoum.js/lib/test/engines/dom"),
    unit = module.exports = {
        setUp: function() {
            this.setDefaultEngine(
                new Dom()
                    .load("/path/to/html/fixture.html")
                    .addScript("/path/to/jquery.js")
            );
        },

        testAMethod: function(global, window) {
            var $elem;

            this
                .if(global.$ = window.$)
                .and($elem = window.$("#elem"))
                .then()
                    //...
                    .bool($elem.hasClass(".a-class"))).isTrue()
        }
    };
```

* add an `include` method to test non-node-compliant modules (thanks @marmotz)

## v0.0.9:
* Test engine selection at a test method level

```js
var unit = module.exports = {
    getEngines: function() {
        return {
            testAMethod: "inline",
            testAnotherMethod: "inline"
        }
    },

    testAMethod: function() {
        //...
    },

    testAnotherMethod: function() {
        //...
    }
};
```

* Grunt task now correctly handles targets
* Grunt task can merge targets an run them

```js
grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    atoum: {
        inline: {
            inline: true
        },
        asserters: {
            directory: "tests/asserters"
        }
    }
});
```

```sh
$ grunt atoum                  # Will run the atoum task with default settings
$ grunt atoum:asserters        # Will only run the tests/asserters subset with the concurrent engine (which is the default one)
$ grunt atoum:inline:asserters # Will only run the tests/asserters subset with the inline engine
```

* Override default targets settings by defining a ```default``` target

## v0.0.8:
* Add stubs to mock global objects methods

```js
var $ = require('jquery'),
    stubbed = this.generateStub($, "ajax"),
    object = {
        method: function() {
            $.ajax("http://foo.bar");
        }
    };

this
    .if(object.method())
    .then()
        .stub(stubbed).wasCalled().withArguments("http://foo.bar")
;

$.load.restore();
```

* Stubbed methods are restored after each test
* Add Grunt Task
* Fix exit status code

## v0.0.7:
* Define call history in mock controller

```js
var mockInstance = this.generateMock({ "method": function () { /*...*/ } });

mockInstance.controller.override("method", function () { return "foo"; });
mockInstance.controller.override("method", function () { return "bar"; }, 2);
mockInstance.controller.override("method", function () { return this; }, 4);

mockInstance.method(); // => foo
mockInstance.method(); // => bar
mockInstance.method(); // => foo
mockInstance.method(); // => mockInstance
```

* Shortcut to return static values in mock controller

```js
var mockInstance = this.generateMock({ "method": function () { /*...*/ } });

mockInstance.controller.override("method", "foo");
mockInstance.controller.override("method", true, 2);

mockInstance.method(); // => foo
mockInstance.method(); // => true
mockInstance.method(); // => foo
```
