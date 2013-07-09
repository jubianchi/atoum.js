"use strict";

require("../../../..")(module);

var path = require("path"),
    fs = require("fs"),
    extend = require("node.extend"),
    Field = require("../../field"),
    coverage = module.exports = function coverage(path) {
        Field.call(this, [ "runnerStop" ]);

        this.path = path;
    };

coverage.prototype = new Field();
coverage.prototype.constructor = coverage;
coverage.prototype = extend(
    coverage.prototype,
    {
        toString: function () {
            var runner = this.value[0],
                cli = require("covershot/lib/cli");

            fs.mkdir("covershot", function() {
                fs.mkdir("covershot/data", function() {
                    fs.writeFile(
                        "covershot/data/coverage.json",
                        runner.score.coverage.toString(),
                        function(err) {
                            if(err) {
                                console.log(err);
                            } else {
                                cli.run({
                                    "_": [ path.resolve(process.cwd(), "covershot/data") ],
                                    f: "html",
                                    format: "html",
                                    m: "json",
                                    map: "json",
                                    w: path.resolve(process.cwd(), "covershot"),
                                    write: path.resolve(process.cwd(), "covershot"),
                                    v: true,
                                    verbose: true
                                });

                                console.log("Code coverage report was generated in " + path.resolve(process.cwd(), "covershot"));
                            }
                        }
                    );
                });
            });
        }
    }
);
