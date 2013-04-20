var atoum = require('..')(module),
    Concurrent = require('../lib/test/engines/concurrent'),
    testedClass = require('../lib/runner'),
    unit = module.exports = {
        testClass: function() {
            var object;

            this
                .object(object = new testedClass())
                .array(object.reports).isEmpty()
                .array(object.directories).isEmpty()
                .array(object.files).isEmpty()
                .object(object.engine).isInstanceOf(Concurrent)
            ;
        },

        testAddDirectory: function() {
            var object, directory, otherDirectory;

            this
                .if(object = new testedClass())
                .and(directory = Math.random().toString(36).substring(7))
                .then()
                    .object(object.addDirectory(directory)).isIdenticalTo(object)
                    .array(object.directories).hasLength(1)
                    .string(object.directories[0]).isEqualTo(directory)
                .if(otherDirectory = Math.random().toString(36).substring(7))
                .and(object.addDirectory(otherDirectory))
                .then()
                    .array(object.directories).hasLength(2)
                    .string(object.directories[1]).isEqualTo(otherDirectory)
            ;
        },

        testAddFile: function() {
            var object, file, otherFile;

            this
                .if(object = new testedClass())
                .and(file = Math.random().toString(36).substring(7))
                .then()
                    .object(object.addFile(file)).isIdenticalTo(object)
                    .array(object.files).hasLength(1)
                    .string(object.files[0]).isEqualTo(file)
                .if(otherFile = Math.random().toString(36).substring(7))
                .and(object.addFile(otherFile))
                .then()
                    .array(object.files).hasLength(2)
                    .string(object.files[1]).isEqualTo(otherFile)
            ;
        }
    };
