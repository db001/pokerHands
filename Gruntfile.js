module.exports = function(grunt) {
    grunt.initConfig({

        watch: {
            scripts: {
                files: ['src/*.js'],
                tasks: ['eslint'],
                options: {
                    spawn: false,
                },
            },
        },

        eslint: {
            options: {
                configFile: 'eslint.json'
            },
            target: ['src/myCode.js']
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
    grunt.loadNpmTasks('grunt-eslint');
    grunt.registerTask('default', ['eslint', 'browserSync', 'watch']);

};