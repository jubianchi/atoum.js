# atoum.js - CHANGELOG

## v0.0.7:
* Define call history in mock controller

```js
var mockInstance = { "method": function () { /*...*/ } };

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
var mockInstance = { "method": function () { /*...*/ } };

mockInstance.controller.override("method", "foo");
mockInstance.controller.override("method", true, 2);

mockInstance.method(); // => foo
mockInstance.method(); // => true
mockInstance.method(); // => foo
```
