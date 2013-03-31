var atoum = module.exports = function atoum(runner) {
    this.runner = runner;

    return this;
};

atoum.prototype = {
    version: 'dev-alpha',

    run: function(path) {
        this.runner.run(path);

        return this;
    }
};