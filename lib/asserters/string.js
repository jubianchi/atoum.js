"use strict";

var util = require('util'),
    underscore = require('underscore'),
    extend = require('node.extend'),
    variable = require('./variable'),
    exception = require('../asserter/string/exception'),
    string = module.exports = function string(generator) {
        variable.call(this, generator);
    };

string.prototype = new variable();
string.prototype.constructor = string;
string.prototype = extend(
    string.prototype,
    {
        check: function () {
            if(typeof this.value !== 'string') {
                variable.prototype.fail.apply(this, [ '%s is not a string', this.value ]);
            }

            return this;
        },

        hasLength: function (expected) {
            this.generator.assertionsCount += 1;

            if(this.value.length !== expected) {
                variable.prototype.fail.apply(this, [ '%s has not length %d', this.value, expected ]);
            }

            return this;
        },

        contains: function(expected) {
            this.generator.assertionsCount += 1;

            if(this.value.indexOf(expected) < 0) {
                variable.prototype.fail.apply(this, [ 'String %s does not contain %s', this.value, expected ]);
            }

            return this;
        },

        isEqualTo: function (expected) {
            this.generator.assertionsCount += 1;

            if(this.value != expected) {
                this.fail(
                    util.format('String %s is not equal to %s', this.value, expected),
                    expected,
                    this.value
                );
            }

            return this;
        },

        fail: function (message, reference, data) {
            var args = Array.prototype.slice.call(arguments, 3);

            underscore.map(
                args,
                function (arg) {
                    return util.inspect(arg);
                }
            );

            throw new exception(
                util.format.apply(util, [ message ].concat(args)),
                this,
                reference,
                data
            );
        }
    }
);
