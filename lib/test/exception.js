"use strict";

var exception = module.exports = function exception(message, asserter) {
        var error = new Error(),
            stack = error.stack.split("\n");


        this.message = message;
        this.name = "Failure";
        this.stack =  stack.slice(3).unshift(stack[0]).join("\n");
        this.asserter = asserter;
    };

exception.prototype.constructor = exception;
