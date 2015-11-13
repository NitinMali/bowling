/**
 * Created by Nitin on 08-11-2015.
 */
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        karma: {
            unit: {
                options: {
                    frameworks: ['jasmine'],
                    singleRun: true,
                    browsers: ['PhantomJS'],
                    files: [
                        "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.7/angular.js",
                        "https://code.angularjs.org/1.3.5/angular-mocks.js",
                        "http://angular-ui.github.io/ui-router/release/angular-ui-router.js",
                        "lib/underscore-min.js",
                        "app.js",
                        "js/service/play-service.js",
                        'test/spec/**/*Spec.js'
                    ]
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-karma');

    // Default task(s).
    grunt.registerTask('test', ['karma']);

};