var atoum = module.exports = function atoum(runner) {
        this.runner = runner;

        return this;
    };

atoum.version = 'dev-alpha';

atoum.prototype = {
    version: atoum.version,

    run: function(tests, loop) {
        this.runner
            .setLoop(loop)
            .run(tests)
        ;

        return this;
    }
};