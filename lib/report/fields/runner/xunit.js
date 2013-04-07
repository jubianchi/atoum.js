"use strict";

var path = require('path'),
    underscore = require('underscore'),
    extend = require('node.extend'),
    field = require('../../field'),
    xunit = module.exports = function xunit() {
        field.call(this, [ 'runnerStop' ]);
    };

xunit.prototype = new field();
xunit.prototype.constructor = xunit;
xunit.prototype = extend(
    xunit.prototype,
    {
        toString: function () {
            var runner = this.value[0],
                xml = '<testsuites>\n',
                test,
                method,
                score,
                methods;

            for(test in runner.score.tests) {
                methods = [];
                score = runner.score.tests[test];

                xml = xml.concat('\t<testsuite ')
                    .concat('name="' + path.basename(test, '.js') + '" ')
                    .concat('package="' + path.dirname(test) + '" ')
                    .concat('time="' + score.duration + '" ')
                    .concat('tests="' + score.methods + '" ')
                    .concat('failures="' + underscore.size(score.failures) + '" ')
                    .concat('errors="' + (underscore.size(score.errors) + underscore.size(score.exceptions)) + '" ')
                    .concat('skipped="0" ')
                    .concat('>\n');

                for(method in score.failures) {
                    if(typeof methods[method] === 'undefined') {
                        methods[method] = {};
                    }

                    methods[method].failures = score.failures[method];
                }

                for(method in score.exceptions) {
                    if(typeof methods[method] === 'undefined') {
                        methods[method] = {};
                    }

                    methods[method].exceptions = score.exceptions[method];
                }

                for(method in score.errors) {
                    if(typeof methods[method] === 'undefined') {
                        methods[method] = {};
                    }

                    methods[method].errors = score.errors[method];
                }

                for(method in methods) {
                    xml = xml.concat('\t\t<testcase ')
                        .concat('name="' + method + '" ')
                        .concat('classname="' + path.basename(test, '.js') + '" ')
                        .concat('file="' + test + '" ')
                        .concat('time="' + score.duration + '" '
                        .concat('>\n');

                    if(typeof methods[method].failures !== 'undefined') {
                        xml = xml.concat('\t\t\t<failure type="' + methods[method].failures.asserter.constructor.name + '" message="' + methods[method].failures.message + '"></failure>\n');
                    }

                    if(typeof methods[method].exceptions !== 'undefined') {
                        xml = xml.concat('\t\t\t<error type="exception" message="' + methods[method].exceptions.message + '"></error>\n');
                    }

                    if(typeof methods[method].errors !== 'undefined') {
                        xml = xml.concat('\t\t\t<error type="error" message="' + methods[method].errors.message + '"></error>\n');
                    }

                    xml = xml.concat('\t\t</testcase>\n');
                }

                xml = xml.concat('\t</testsuite>\n');
            }

            xml = xml.concat('</testsuites>\n');

            return xml;
        }
    }
);
