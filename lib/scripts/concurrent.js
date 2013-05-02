"use strict";

require("../..")(module);

var extend = require('node.extend'),
    Script = require('../script'),
    concurrent = module.exports = function concurrent(file, methods) {
        Script.call(this);

        this.file = file;
        this.methods = methods || [];
    };

concurrent.prototype = new Script();
concurrent.prototype.constructor = concurrent;
concurrent.prototype = extend(
    concurrent.prototype,
    {
        setReports: function (runner, process) {
            var Concurrent = require("../reports/concurrent");

            runner
                .addReport(new Concurrent(process.stdout))
                .addFile(this.file)
            ;

            this.useInlineEngine();

            return Script.prototype.setReports.apply(this, [ runner, process ]);
        }
    }
);
