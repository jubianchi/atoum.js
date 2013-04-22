var atoum = require("..")(module),
    testedClass = require("../lib/script"),
    unit = module.exports = {
        testClass: function() {
            var object;

            this
                .if(object = new testedClass())
                .then()
                    .bool(object.coverageEnabled).isFalse()
                    .string(object.coveredDirectory).isEmpty()
                    .bool(object.xunitEnabled).isFalse()
                    .string(object.xunitOutput).isEmpty()
                    .bool(object.usingInlineEngine).isFalse()
                    .bool(object.usingConcurrentEngine).isTrue()
                    .array(object.directories).isEmpty()
                    .array(object.files).isEmpty()
            ;
        },

        testEnableCoverage: function() {
            var object, directory;

            this
                .if(object = new testedClass())
                .then()
                    .object(object.enableCoverage()).isIdenticalTo(object)
                    .bool(object.coverageEnabled).isTrue()
                    .string(object.coveredDirectory).isEqualTo('lib')
                .if(object = new testedClass())
                .and(directory = Math.random().toString(36).substring(7))
                .then()
                    .object(object.enableCoverage(directory)).isIdenticalTo(object)
                    .bool(object.coverageEnabled).isTrue()
                    .string(object.coveredDirectory).isIdenticalTo(directory)
            ;
        },

        testDisableCoverage: function() {
            var object, directories;

            this
                .if(object = new testedClass())
                .then()
                    .object(object.disableCoverage()).isIdenticalTo(object)
                    .bool(object.coverageEnabled).isFalse()
                    .string(object.coveredDirectory).isEmpty()
                .if(object = new testedClass())
                .and(directories = Math.random().toString(36).substring(7))
                .and(object.enableCoverage(directories))
                .then()
                    .object(object.disableCoverage()).isIdenticalTo(object)
                    .bool(object.coverageEnabled).isFalse()
                    .string(object.coveredDirectory).isEmpty()
            ;
        },

        testEnableXunit: function() {
            var object, output;

            this
                .if(object = new testedClass())
                .then()
                    .object(object.enableXunit()).isIdenticalTo(object)
                    .bool(object.xunitEnabled).isTrue()
                    .string(object.xunitOutput).isEqualTo('xunit.xml')
                .if(object = new testedClass())
                .and(output = Math.random().toString(36).substring(7))
                .then()
                    .object(object.enableXunit(output)).isIdenticalTo(object)
                    .bool(object.xunitEnabled).isTrue()
                    .string(object.xunitOutput).isIdenticalTo(output)
            ;
        },

        testDisableXunit: function() {
            var object, output;

            this
                .if(object = new testedClass())
                .then()
                    .object(object.disableXunit()).isIdenticalTo(object)
                    .bool(object.xunitEnabled).isFalse()
                    .string(object.xunitOutput).isEmpty()
                .if(object = new testedClass())
                .and(output = Math.random().toString(36).substring(7))
                .and(object.enableXunit(output))
                .then()
                    .object(object.disableXunit()).isIdenticalTo(object)
                    .bool(object.xunitEnabled).isFalse()
                    .string(object.xunitOutput).isEmpty()
            ;
        },

        testUseConcurrentEngine: function() {
            var object;

            this
                .if(object = new testedClass())
                .then()
                    .object(object.useConcurrentEngine()).isIdenticalTo(object)
                    .bool(object.usingInlineEngine).isFalse()
                    .bool(object.usingConcurrentEngine).isTrue()
            ;
        },

        testUseInlineEngine: function() {
            var object;

            this
                .if(object = new testedClass())
                .then()
                    .object(object.useInlineEngine()).isIdenticalTo(object)
                    .bool(object.usingInlineEngine).isTrue()
                    .bool(object.usingConcurrentEngine).isFalse()
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
                .then()
                    .object(object.addDirectory(otherDirectory)).isIdenticalTo(object)
                    .array(object.directories).hasLength(2)
                    .string(object.directories[0]).isEqualTo(directory)
                    .string(object.directories[1]).isEqualTo(otherDirectory)
            ;
        },

        testAddFiles: function() {
            var object, file, otherFile;

            this
                .if(object = new testedClass())
                .and(file = Math.random().toString(36).substring(7))
                .then()
                    .object(object.addFile(file)).isIdenticalTo(object)
                    .array(object.files).hasLength(1)
                    .string(object.files[0]).isEqualTo(file)
                .if(otherFile = Math.random().toString(36).substring(7))
                .then()
                    .object(object.addFile(otherFile)).isIdenticalTo(object)
                    .array(object.files).hasLength(2)
                    .string(object.files[0]).isEqualTo(file)
                    .string(object.files[1]).isEqualTo(otherFile)
            ;
        }
    };
