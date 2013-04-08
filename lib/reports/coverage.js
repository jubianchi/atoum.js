"use strict";

var report = require("../report"),
    fields = require("../report/fields"),
    includer = require('../includer/instrument'),
    coverage = module.exports = function coverage(runner) {
        require('covershot');

        runner.includer.replace('lib', 'lib-cov');
    };

coverage.prototype = new report();
coverage.prototype.constructor = coverage;

