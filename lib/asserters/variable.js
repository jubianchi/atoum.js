var util = require('util'),
    _ = require('underscore'),
    exception = require('../asserter/exception'),
    variable = module.exports = function variable(generator) {
        this.generator = generator;

        return this;
    };

variable.prototype = {
    setWith: function(value) {
        this.value = value;

        return this.check();
    },

    check: function() {
        if(typeof this.value == 'undefined') {
            this.fail('Value is undefined');
        }

        return this;
    },

    isEqualTo: function(expected) {
        this.generator.assertionsCount++;

        if(this.value != expected) {
            this.fail('%s is not equal to %s', this.value, expected);
        }

        return this;
    },

    isNotEqualTo: function(expected) {
        this.generator.assertionsCount++;

        if(this.value == expected) {
            this.fail(util.inspect(this.value) + ' is equal to ' + util.inspect(expected));
        }

        return this;
    },

    isIdenticalTo: function(expected) {
        this.generator.assertionsCount++;

        if(this.value !== expected) {
            this.fail(this.value + ' is not identical to ' + expected);
        }

        return this;
    },

    isNotIdenticalTo: function(expected) {
        this.generator.assertionsCount++;

        if(this.value === expected) {
            this.fail(this.value + ' is identical to ' + expected);
        }

        return this;
    },

    isTruthy: function() {
        this.generator.assertionsCount++;

        if(this.value == false) {
            this.fail(this.value + ' is not truthy');
        }

        return this;
    },

    isFalsy: function() {
        this.generator.assertionsCount++;

        if(this.value == true) {
            this.fail(this.value + ' is not false');
        }

        return this;
    },

    isEmpty: function() {
        this.generator.assertionsCount++;

        if(this.length > 0) {
            this.fail(this.value + ' is not empty');
        }

        return this;
    },

    isNotEmpty: function() {
        this.generator.assertionsCount++;

        if(this.length == 0) {
            this.fail(this.value + ' is empty');
        }

        return this;
    },

    fail: function() {
        var message = arguments[0],
            args = Array.prototype.slice.call(arguments, 1);

        _.map(
            args,
            function(arg) {
                return util.inspect(arg);
            }
        );

        throw new exception(util.format.apply(util, [ message ].concat(args)), this);
    }
};