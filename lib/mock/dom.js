"use strict";

require("../..")(module);

var fs = require("fs"),
    jsdom = require("jsdom"),
    dom = module.exports = function dom(content, scripts) {
        if(fs.existsSync(content)) {
            this.content = fs.readFileSync(content).toString();
        } else {
            this.content = content;
        }

        this.scripts = [];
        scripts.forEach(function(script) {
            if(fs.existsSync(script)) {
                script = fs.readFileSync(script);
            }

            this.scripts.push(script);
        }.bind(this));
    };

dom.prototype = {
    run: function(method, global) {
        jsdom.env({
            html: this.content,
            src: this.scripts,
            done: function(errors, window) {
                if(errors) {
                    throw new Error(errors);
                }

                method(global, window);
            }
        });
    }
};
