var controller = module.exports = function controller(code) {
        this.wasRun = false;
        this.code = code;
        this.args = [];
    };

controller.prototype = new controller();
controller.prototype.constructor = controller;
controller.prototype = {
    run: function() {
        this.args = arguments[0];

        if(typeof this.code === 'function') {
            return this.code.call(this.code, this.args)
        }

        return undefined;
    }
};
