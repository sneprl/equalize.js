module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /**
         * Minify the sources!
         */
        uglify: {
            min: {
                options: {
                    compress: false,
                    preserveComments: 'some'
                },
                files: {
                    'js/equalize.min.js': 'js/equalize.js'
                }
            }
        }
    });

    grunt.registerTask('default', ['uglify:min']);
};