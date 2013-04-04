"use strict";

var extend = require('node.extend'),
    util = require('util'),
    field = require('../field'),
    atoum = module.exports = function atoum() {
        field.call(this);
    };

atoum.prototype = new field();
atoum.prototype.constructor = atoum;
atoum.prototype = extend(
    atoum.prototype,
    {
        register: function(dispatcher, output) {
            dispatcher.on('runnerStart', this.render(output));

            return this;
        },

        toString: function (tests, loop) {
            return util.format(
                    this.color.title('atoum.js %s\n\n'),
                    require('../../..')().version
                )
                .concat(util.format(
                    '> ' + this.color.header('node path') + ': %s\n',
                    process.execPath
                ))
                .concat(util.format(
                    '> ' + this.color.header('node versions') + ': %s\n',
                    util.inspect(process.versions)
                ))
                .concat('\n')
            ;
        }
    }
);
