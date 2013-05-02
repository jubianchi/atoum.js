"use strict";

require("../../..")(module);

var coverage = module.exports = function coverage() {
    this.files = {};
};

coverage.prototype = {
    addFromStat: function(stat) {
        stat = this.normalize(stat);

        while(stat.files.length > 0) {
            this.addFile(stat.files.shift());
        }

        return this;
    },

    merge: function(score) {
        for(var file in score.files) {
            this.addFile(score.files[file]);
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
                if(typeof file.source[line].coverage !== "undefined") {
                    if(typeof this.files[file.filename].source[line].coverage !== "undefined") {
                        this.files[file.filename].source[line].coverage = this.files[file.filename].source[line].coverage + file.source[line].coverage;
                    } else {
                        this.files[file.filename].source[line].coverage = file.source[line].coverage;
                    }
                }

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
    },

    normalize: function (coverageMap) {
        var ret = {
            files: [],
            hits: 0,
            misses: 0,
            sloc: 0
        };

        for (var filename in coverageMap) {
            if (coverageMap.hasOwnProperty(filename)) {
                var data = this.coverage(filename, coverageMap[filename]);
                ret.files.push(data);
                ret.hits += data.hits;
                ret.misses += data.misses;
                ret.sloc += data.sloc;
            }
        }

        ret.coverage = (ret.hits / ret.sloc) * 100;

        return ret;
    },

    coverage: function(filename, data) {
        var ret = {
            filename: filename,
            coverage: 0,
            hits: 0,
            misses: 0,
            sloc: 0,
            source: {}
        };

        data.source.forEach(function (line, num) {
            num++;

            if (data[num] === 0) {
                ret.misses++;
                ret.sloc++;
            } else if (data[num] !== undefined) {
                ret.hits++;
                ret.sloc++;
            }

            ret.source[num] = { line: line, coverage: (data[num] === undefined ? '' : data[num]) };
        });

        ret.coverage = (ret.hits / ret.sloc) * 100;

        return ret;
    },

    jsonify: function() {
        var ret = { files: [] };

        for(var file in this.files) {
            ret.files.push(this.files[file]);
        }

        return JSON.stringify(ret);
    }
};
