"use strict";

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        atoum: {
            inline: {
                inline: true
            },
            test: {
                directory: "tests/test"
            }
        }
    });

    grunt.loadTasks('./tasks');
    grunt.registerTask('default', ['atoum']);
};