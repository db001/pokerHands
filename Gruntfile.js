module.exports = function(grunt) {
    grunt.initConfig({

        watch: {
            scripts: {
                files: ['src/*.js'],
                options: {
                    spawn: false,
                },
            },
        },

        browserSync: {
            default_options: {
                bsFiles: {
                    src: [
                        "index.html",
                        "src/*.js"
                    ]
                },
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: './'
                },
            },
        },

        bsReload: {
            all: {
                reload: true
            }
        },

    });

    // Loading and registering tasks goes here
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['browserSync', 'watch']);

};