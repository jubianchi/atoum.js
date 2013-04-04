"use strict";

var usage = module.exports = function usage(unit) {
        this.unit = unit || usage.units.B;
        this.stat = {
            rss: 0,
            heapTotal: 0,
            heapUsed: 0
        };
    };

usage.units = {
    'B': {
        'B': 1,
        'KB': 1024,
        'MB': Math.pow(1024, 2),
        'GB': Math.pow(1024, 3)
    },
    'KB': {
        'B': 1 / 1024,
        'KB': 1,
        'MB': 1024,
        'GB': Math.pow(1024, 2)
    },
    'MB': {
        'B': Math.pow(1 / 1024, 2),
        'KB': 1 / 1024,
        'MB': 1,
        'GB': Math.pow(1024, 1)
    },
    'GB': {
        'B': Math.pow(1 / 1024, 3),
        'KB': Math.pow(1 / 1024, 2),
        'MB': 1 / 1024,
        'GB': 1
    }
};

usage.prototype = {
    addFromStat: function (stat) {
        var key;

        for(key in stat) {
            if(stat.hasOwnProperty(key)) {
                this.stat[key] = stat[key] + (this.stat[key] || 0);
            }

            if(this.stat.hasOwnProperty(key)) {
                this.stat[key] = ((this.stat[key] || 0) > 0 ? (this.stat[key] || 0) : 0);
            }
        }

        return this;
    },

    format: function (unit, round) {
        var stat = {},
            key;

        if(typeof round !== 'undefined') {
            round = Math.pow(10, round);
        }

        for(key in this.stat) {
            if(this.stat.hasOwnProperty(key)) {
                stat[key] = this.stat[key] / this.unit[unit];

                if(typeof round !== 'undefined') {
                    stat[key] = Math.round(stat[key] * round) / round;
                }
            }
        }

        this.unit = usage.units[unit];
        return new usage(usage.units[unit]).addFromStat(stat);
    }
};
