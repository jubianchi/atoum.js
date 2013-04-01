var atoum = module.exports = function atoum(runner) {
        this.runner = runner;

        return this;
    };

atoum.version = 'dev-alpha';

atoum.prototype = {
    version: atoum.version,

    run: function(path, loop) {
        var self = this;

        this.runner
            .setLoop(loop)
            .run(path)
        ;

        return this;
    }
};