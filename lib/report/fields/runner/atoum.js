"use strict";

var extend = require('node.extend'),
    util = require('util'),
    color = require('../../color'),
    field = require('../../field'),
    atoum = module.exports = function atoum() {
        field.call(this, [ 'runnerStart' ]);
    };

atoum.prototype = new field();
atoum.prototype.constructor = atoum;
atoum.prototype = extend(
    atoum.prototype,
    {
        toString: function () {
            return util.format(
                    color.title('atoum.js %s\n\n'),
                    require('../../../../')().version
                )
                .concat(util.format(
                    '> ' + color.header('node path') + ': %s\n',
                    process.execPath
                ))
                .concat(util.format(
                    '> ' + color.header('node versions') + ': %s\n',
                    util.inspect(process.versions)
                ))
            ;
        }
    }
);
