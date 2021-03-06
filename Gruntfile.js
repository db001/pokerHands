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
            css: {
                files: 'src/*.css',
            }
        },

        eslint: {
            options: {
                configFile: 'eslint.json'
            },
            target: ['src/*.js']
        },

        browserSync: {
            default_options: {
                bsFiles: {
                    src: [
                        "src/index.html",
                        "src/*.js",
                        "src/*.css"   
                    ]
                },
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: './src'
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