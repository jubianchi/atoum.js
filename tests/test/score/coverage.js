require('../../..')(module);

var testedClass = require('../../../lib/test/score/coverage'),
    unit = module.exports = {
        testClass: function() {
            this
                .object(new testedClass())
            ;
        },

        testAddFromStat: function() {
            var object, stat, file, otherFile;

            this
                .if(object = new testedClass())
                .and(stat = {
                    "files":  [
                        file = {
                            "filename": "lib/foo.js",
                            "coverage": 25,
                            "hits": 1,
                            "misses": 3,
                            "sloc": 4,
                            "source": {
                                "1": {
                                    "line": Math.random().toString(36).substring(7),
                                    "coverage": 1
                                },
                                "2": {
                                    "line": Math.random().toString(36).substring(7),
                                    "coverage": ""
                                },
                                "3": {
                                    "line": Math.random().toString(36).substring(7),
                                    "coverage": ""
                                },
                                "4": {
                                    "line": Math.random().toString(36).substring(7),
                                    "coverage": ""
                                }
                            }
                        }
                    ]
                })
                .then()
                    .object(object.addFromStat(stat)).isIdenticalTo(object)
                    .object(object.files).isEqualTo({ "lib/foo.js": file })
                .if(stat = {
                    "files": [
                         {
                            "filename": file.filename,
                            "coverage": 25,
                            "hits": 1,
                            "misses": 3,
                            "sloc": file.sloc,
                            "source": {
                                "1": {
                                    "line": file.source[1].line,
                                    "coverage": ""
                                },
                                "2": {
                                    "line": file.source[2].line,
                                    "coverage": ""
                                },
                                "3": {
                                    "line": file.source[3].line,
                                    "coverage": ""
                                },
                                "4": {
                                    "line": file.source[4].line,
                                    "coverage": 1
                                }
                            }
                        }
                    ]
                })
                .then()
                    .object(object.addFromStat(stat)).isIdenticalTo(object)
                    .object(object.files[file.filename]).isEqualTo({
                        "filename": file.filename,
                        "coverage": 50,
                        "hits": 2,
                        "misses": 2,
                        "sloc": file.sloc,
                        "source": {
                            "1": {
                                "line": file.source[1].line,
                                "coverage": 1
                            },
                            "2": {
                                "line": file.source[2].line,
                                "coverage": 0
                            },
                            "3": {
                                "line": file.source[3].line,
                                "coverage": 0
                            },
                            "4": {
                                "line": file.source[4].line,
                                "coverage": 1
                            }
                        }
                    })
                .if(stat = {
                    "files": [
                        {
                            "filename": file.filename,
                            "coverage": 100,
                            "hits": 4,
                            "misses": 0,
                            "sloc": file.sloc,
                            "source": {
                                "1": {
                                    "line": file.source[1].line,
                                    "coverage": 1
                                },
                                "2": {
                                    "line": file.source[2].line,
                                    "coverage": 1
                                },
                                "3": {
                                    "line": file.source[3].line,
                                    "coverage": 1
                                },
                                "4": {
                                    "line": file.source[4].line,
                                    "coverage": 1
                                }
                            }
                        }
                    ]
                })
                .then()
                    .object(object.addFromStat(stat)).isIdenticalTo(object)
                    .object(object.files[file.filename]).isEqualTo({
                        "filename": file.filename,
                        "coverage": 100,
                        "hits": 4,
                        "misses": 0,
                        "sloc": file.sloc,
                        "source": {
                            "1": {
                                "line": file.source[1].line,
                                "coverage": 2
                            },
                            "2": {
                                "line": file.source[2].line,
                                "coverage": 1
                            },
                            "3": {
                                "line": file.source[3].line,
                                "coverage": 1
                            },
                            "4": {
                                "line": file.source[4].line,
                                "coverage": 2
                            }
                        }
                    })
                .if(stat = {
                    "files": [
                        otherFile = {
                            "filename": "lib/bar.js",
                            "coverage": 80,
                            "hits": 4,
                            "misses": 1,
                            "sloc": 5,
                            "source": {
                                "1": {
                                    "line": Math.random().toString(36).substring(7),
                                    "coverage": 1
                                },
                                "2": {
                                    "line": Math.random().toString(36).substring(7),
                                    "coverage": 1
                                },
                                "3": {
                                    "line": Math.random().toString(36).substring(7),
                                    "coverage": 1
                                },
                                "4": {
                                    "line": Math.random().toString(36).substring(7),
                                    "coverage": 1
                                },
                                "5": {
                                    "line": Math.random().toString(36).substring(7),
                                    "coverage": 0
                                }
                            }
                        }
                    ]
                })
                .then()
                    .object(object.addFromStat(stat)).isIdenticalTo(object)
                    .object(object.files[file.filename]).isEqualTo({
                        "filename": file.filename,
                        "coverage": 100,
                        "hits": 4,
                        "misses": 0,
                        "sloc": file.sloc,
                        "source": {
                            "1": {
                                "line": file.source[1].line,
                                "coverage": 2
                            },
                            "2": {
                                "line": file.source[2].line,
                                "coverage": 1
                            },
                            "3": {
                                "line": file.source[3].line,
                                "coverage": 1
                            },
                            "4": {
                                "line": file.source[4].line,
                                "coverage": 2
                            }
                        }
                    })
                    .object(object.files[otherFile.filename]).isEqualTo(otherFile)
            ;
        }
    };
