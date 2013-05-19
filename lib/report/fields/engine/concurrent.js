"use strict";

require("../../../../")(module);

var extend = require("node.extend"),
    Field = require("../../field"),
    concurrent = module.exports = function concurrent() {
        Field.call(this, [ "runnerStop" ]);
    };

concurrent.prototype = new Field();
concurrent.prototype.constructor = concurrent;
concurrent.prototype = extend(
    concurrent.prototype,
    {
        toString: function () {
            var runner = this.value[0],
                cache = [];

            return JSON.stringify(
                {
                    test: runner.getCurrentTestMethod().test.class,
                    method: runner.getCurrentTestMethod().name,
                    score: runner.getCurrentTestMethod().test.score
                },
                function(key, value) {
                    if (typeof value === "object") {
                        if (cache.indexOf(value) !== -1) {
                            return;
                        }

                        if(value instanceof Error) {
                            value = {
                                name: value.name,
                                message: value.message,
                                stack: value.stack
                            };
                        }

                        cache.push(value);
                    }

                    return value;
                }
            );
        }
    }
);
