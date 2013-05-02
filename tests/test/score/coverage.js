require('../../..')(module);

var testedClass = require('../../../lib/test/score/coverage'),
    unit = module.exports = {
        testClass: function() {
            this
                .object(new testedClass())
            ;
        },

        testAddFromStat: function() {
            var object, stat;

            this
                .if(object = new testedClass())
                .and(stat = {
                    "lib/foo.js": {
                        1: 1,
                        2: 0,
                        3: 0,
                        4: 0,
                        5: undefined,
                        source: [
                            Math.random().toString(36).substring(7),
                            Math.random().toString(36).substring(7),
                            Math.random().toString(36).substring(7),
                            Math.random().toString(36).substring(7)
                        ]
                    }
                })
                .then()
                    .object(object.addFromStat(stat)).isIdenticalTo(object)
                    .object(object.files).isEqualTo({
                        "lib/foo.js": {
                            "filename": "lib/foo.js",
                            "coverage": 25,
                            "hits": 1,
                            "misses": 3,
                            "sloc": 4,
                            "source": {
                                "1": {
                                    "line": stat["lib/foo.js"].source[0],
                                    "coverage": 1
                                },
                                "2": {
                                    "line": stat["lib/foo.js"].source[1],
                                    "coverage": 0
                                },
                                "3": {
                                    "line": stat["lib/foo.js"].source[2],
                                    "coverage": 0
                                },
                                "4": {
                                    "line": stat["lib/foo.js"].source[3],
                                    "coverage": 0
                                }
                            }
                        }
                    })
                .if(stat = {
                    "lib/foo.js": {
                        1: 0,
                        2: 0,
                        3: 0,
                        4: 1,
                        5: undefined,
                        source: [
                            stat["lib/foo.js"].source[0],
                            stat["lib/foo.js"].source[1],
                            stat["lib/foo.js"].source[2],
                            stat["lib/foo.js"].source[3]
                        ]
                    }
                })
                .then()
                    .object(object.addFromStat(stat)).isIdenticalTo(object)
                    .object(object.files).isEqualTo({
                        "lib/foo.js": {
                            "filename": "lib/foo.js",
                            "coverage": 50,
                            "hits": 2,
                            "misses": 2,
                            "sloc": 4,
                            "source": {
                                "1": {
                                    "line": stat["lib/foo.js"].source[0],
                                    "coverage": 1
                                },
                                "2": {
                                    "line": stat["lib/foo.js"].source[1],
                                    "coverage": ""
                                },
                                "3": {
                                    "line": stat["lib/foo.js"].source[2],
                                    "coverage": ""
                                },
                                "4": {
                                    "line": stat["lib/foo.js"].source[3],
                                    "coverage": 1
                                }
                            }
                        }
                    })
                .if(stat = {
                    "lib/foo.js": {
                        1: 1,
                        2: 1,
                        3: 1,
                        4: 1,
                        5: undefined,
                        source: [
                            stat["lib/foo.js"].source[0],
                            stat["lib/foo.js"].source[1],
                            stat["lib/foo.js"].source[2],
                            stat["lib/foo.js"].source[3]
                        ]
                    }
                })
                .then()
                    .object(object.addFromStat(stat)).isIdenticalTo(object)
                    .object(object.files).isEqualTo({
                        "lib/foo.js": {
                            "filename": "lib/foo.js",
                            "coverage": 100,
                            "hits": 4,
                            "misses": 0,
                            "sloc": 4,
                            "source": {
                                "1": {
                                    "line": stat["lib/foo.js"].source[0],
                                    "coverage": 2
                                },
                                "2": {
                                    "line": stat["lib/foo.js"].source[1],
                                    "coverage": 1
                                },
                                "3": {
                                    "line": stat["lib/foo.js"].source[2],
                                    "coverage": 1
                                },
                                "4": {
                                    "line": stat["lib/foo.js"].source[3],
                                    "coverage": 2
                                }
                            }
                        }
                    })
                .if(stat["lib/bar.js"] = {
                    1: 1,
                    2: 1,
                    3: 1,
                    4: 1,
                    5: 1,
                    source: [
                        Math.random().toString(36).substring(7),
                        Math.random().toString(36).substring(7),
                        Math.random().toString(36).substring(7),
                        Math.random().toString(36).substring(7),
                        Math.random().toString(36).substring(7)
                    ]
                })
                .then()
                    .object(object.addFromStat(stat)).isIdenticalTo(object)
                    .object(object.files).isEqualTo({
                        "lib/foo.js": {
                            "filename": "lib/foo.js",
                            "coverage": 100,
                            "hits": 4,
                            "misses": 0,
                            "sloc": 4,
                            "source": {
                                "1": {
                                    "line": stat["lib/foo.js"].source[0],
                                    "coverage": 3
                                },
                                "2": {
                                    "line": stat["lib/foo.js"].source[1],
                                    "coverage": 2
                                },
                                "3": {
                                    "line": stat["lib/foo.js"].source[2],
                                    "coverage": 2
                                },
                                "4": {
                                    "line": stat["lib/foo.js"].source[3],
                                    "coverage": 3
                                }
                            }
                        },
                        "lib/bar.js": {
                            "filename": "lib/bar.js",
                            "coverage": 100,
                            "hits": 5,
                            "misses": 0,
                            "sloc": 5,
                            "source": {
                                "1": {
                                    "line": stat["lib/bar.js"].source[0],
                                    "coverage": 1
                                },
                                "2": {
                                    "line": stat["lib/bar.js"].source[1],
                                    "coverage": 1
                                },
                                "3": {
                                    "line": stat["lib/bar.js"].source[2],
                                    "coverage": 1
                                },
                                "4": {
                                    "line": stat["lib/bar.js"].source[3],
                                    "coverage": 1
                                },
                                "5": {
                                    "line": stat["lib/bar.js"].source[4],
                                    "coverage": 1
                                }
                            }
                        }
                    })
            ;
        },

        testMerge: function() {
            var object, stat, otherScore, otherStat;

            this
                .if(object = new testedClass())
                .and(otherScore = new testedClass())
                .and(stat = {
                    "lib/foo.js": {
                        1: 1,
                        2: null,
                        3: null,
                        4: null,
                        source: [
                            Math.random().toString(36).substring(7),
                            Math.random().toString(36).substring(7),
                            Math.random().toString(36).substring(7),
                            Math.random().toString(36).substring(7)
                        ]
                    }
                })
                .and(otherStat = {
                    "lib/foo.js": {
                        1: 0,
                        2: 0,
                        3: 0,
                        4: 1,
                        source: [
                            stat["lib/foo.js"].source[0],
                            stat["lib/foo.js"].source[1],
                            stat["lib/foo.js"].source[2],
                            stat["lib/foo.js"].source[3]
                        ]
                    }
                })
                .and(object.addFromStat(stat))
                .and(otherScore.addFromStat(otherStat))
                .then()
                    .object(object.merge(otherScore)).isIdenticalTo(object)
                    .object(object.files).isEqualTo({
                        "lib/foo.js": {
                            "filename": "lib/foo.js",
                            "coverage": 50,
                            "hits": 2,
                            "misses": 2,
                            "sloc": 4,
                            "source": {
                                "1": {
                                    "line": stat["lib/foo.js"].source[0],
                                    "coverage": 1
                                },
                                "2": {
                                    "line": stat["lib/foo.js"].source[1],
                                    "coverage": 0
                                },
                                "3": {
                                    "line": stat["lib/foo.js"].source[2],
                                    "coverage": 0
                                },
                                "4": {
                                    "line": stat["lib/foo.js"].source[3],
                                    "coverage": 1
                                }
                            }
                        }
                    })
        }
    };
