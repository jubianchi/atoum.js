var atoum = require('../../..'),
    testedClass = atoum.require('lib/test/score/usage', module),
    unit = module.exports = {
        testClass: function() {
            var object;

            this
                .object(object = new testedClass())
                .object(object.unit).isEqualTo(testedClass.units.B)
                .number(object.stat.rss).isEqualTo(0)
                .number(object.stat.heapTotal).isEqualTo(0)
                .number(object.stat.heapUsed).isEqualTo(0)
            ;
        },

        testAddFromStat: function() {
            var object, stat;

            this
                .if(object = new testedClass())
                .then()
                    .object(object.addFromStat({})).isIdenticalTo(object)
                    .number(object.stat.rss).isEqualTo(0)
                    .number(object.stat.heapTotal).isEqualTo(0)
                    .number(object.stat.heapUsed).isEqualTo(0)
                .if(stat = process.memoryUsage())
                .and(object.addFromStat(stat))
                .then()
                    .number(object.stat.rss).isEqualTo(stat.rss)
                    .number(object.stat.heapTotal).isEqualTo(stat.heapTotal)
                    .number(object.stat.heapUsed).isEqualTo(stat.heapUsed)
                .if(object.addFromStat(stat))
                .then()
                    .number(object.stat.rss).isEqualTo(stat.rss * 2)
                    .number(object.stat.heapTotal).isEqualTo(stat.heapTotal * 2)
                    .number(object.stat.heapUsed).isEqualTo(stat.heapUsed * 2)
            ;
        },

        testFormat: function() {
            var object, stat;

            this
                .if(object = new testedClass())
                .and(stat = process.memoryUsage())
                .and(object.addFromStat(stat))
                .then()
                    .object(object = object.format('KB')).isInstanceOf(testedClass)
                    .number(object.stat.rss).isEqualTo(stat.rss / 1024)
                    .number(object.stat.heapTotal).isEqualTo(stat.heapTotal / 1024)
                    .number(object.stat.heapUsed).isEqualTo(stat.heapUsed / 1024)
                .if(object = object.format('MB'))
                .then()
                    .number(object.stat.rss).isEqualTo(stat.rss / Math.pow(1024, 2))
                    .number(object.stat.heapTotal).isEqualTo(stat.heapTotal / Math.pow(1024, 2))
                    .number(object.stat.heapUsed).isEqualTo(stat.heapUsed / Math.pow(1024, 2))
                .if(object = object.format('GB'))
                .then()
                    .number(object.stat.rss).isEqualTo(stat.rss / Math.pow(1024, 3))
                    .number(object.stat.heapTotal).isEqualTo(stat.heapTotal / Math.pow(1024, 3))
                    .number(object.stat.heapUsed).isEqualTo(stat.heapUsed / Math.pow(1024, 3))
                .if(object = object.format('B'))
                .then()
                    .number(object.stat.rss).isEqualTo(stat.rss)
                    .number(object.stat.heapTotal).isEqualTo(stat.heapTotal)
                    .number(object.stat.heapUsed).isEqualTo(stat.heapUsed)
            ;
        }
    };
