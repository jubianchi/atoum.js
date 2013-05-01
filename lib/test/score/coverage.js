"use strict";

require("../../..")(module);

var coverage = module.exports = function usage(unit) {
    this.files = {};
};

coverage.prototype = {
    addFromStat: function(stat) {
        while(stat.files.length > 0) {
            this.addFile(stat.files.shift());
        }

        return this;
    },

    addFile: function(file) {
        if(typeof this.files[file.filename] === 'undefined') {
            this.files[file.filename] = file;
        } else {
            this.mergeFile(file);
        }

        return this;
    },

    mergeFile: function(file) {
        var line;

        if(typeof this.files[file.filename] !== 'undefined') {
            this.files[file.filename].hits = 0;

            for(line in file.source) {
                this.files[file.filename].source[line].coverage = (this.files[file.filename].source[line].coverage || 0) + (file.source[line].coverage || 0);

                if(this.files[file.filename].source[line].coverage > 0) {
                    this.files[file.filename].hits += 1;
                }
            }

            this.files[file.filename].misses = this.files[file.filename].sloc - this.files[file.filename].hits;
            this.files[file.filename].coverage = (this.files[file.filename].hits / this.files[file.filename].sloc) * 100;
        } else {
            this.addFile(file);
        }

        return this;
    }
};
