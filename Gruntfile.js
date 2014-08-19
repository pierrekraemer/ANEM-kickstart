
module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({

        pkg : grunt.file.readJSON('package.json'),

        vendor_files : {
            js : [
                'client/vendor/angular/angular.min.js',
                'client/vendor/angular-ui-router/release/angular-ui-router.min.js',
                'client/vendor/angular-resource/angular-resource.min.js',
                'client/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
                'client/vendor/angular-xeditable/dist/js/xeditable.min.js'
            ],
            css : [
                'client/vendor/bootstrap-css-only/css/bootstrap.min.css',
                'client/vendor/angular-xeditable/dist/css/xeditable.css'
            ],
            assets : [

            ],
            fonts : [
                'client/vendor/bootstrap-css-only/fonts/glyphicons-halflings-regular.*'
            ]
        },

        clean : {
            public : [
                'public'
            ],
            all : [
                'public',
                'client/vendor',
                'node_modules'
            ]
        },

        copy : {
            vendor_assets : {
                files : [
                    { // vendor assets
                        cwd : '.',
                        src : ['<%= vendor_files.assets %>'],
                        dest : 'public/assets',
                        expand : true,
                        flatten : true
                    }
                ]
            },
            vendor_fonts : {
                files : [
                    { // vendor fonts
                        cwd : '.',
                        src : ['<%= vendor_files.fonts %>'],
                        dest : 'public/fonts',
                        expand : true,
                        flatten : true
                    }
                ]
            },
            app_assets : {
                files : [
                    { // our app assets
                        cwd : 'client/src/assets',
                        src : ['**'],
                        dest : 'public/assets',
                        expand : true
                    }
                ]
            },
            app_index : {
                files : [
                    { // our app index
                        cwd : 'client/src',
                        src : ['index.html'],
                        dest : 'public',
                        expand : true,
                        flatten : true
                    }
                ]
            },
            app_views : {
                files : [
                    { // our app views
                        cwd : 'client/src/app',
                        src : ['**/*.view.html'],
                        dest : 'public/views',
                        expand : true
                    }
                ]
            },
            app_common_views : {
                files : [
                    { // our app common views
                        cwd : 'client/src/common',
                        src : ['**/*.view.html'],
                        dest : 'public/views/common',
                        expand : true,
                        flatten : true
                    }
                ]
            }
        },

        concat : {
            css : {
                src : [
                    '<%= vendor_files.css %>',
                    'client/src/**/*.css'
                ],
                dest : 'public/css/<%= pkg.name %>-<%= pkg.version %>.css'
            },
            js: {
                options: {
                    banner: '/* <%= pkg.name %> <%= pkg.version %> */\n'
                },
                src: [
                    '<%= vendor_files.js %>',
                    'client/src/app/**/*.js',
                    'client/src/common/**/*.js',
                    '!client/src/**/*.spec.js'
                ],
                dest: 'public/js/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },

        uglify : {
            options : {
                banner : '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            app :  {
                files : {
                    'public/<%= pkg.name %>-<%= pkg.version %>.min.js' : ['<%= concat.js.dest %>']
                }
            }
        },

        watch : {
            vendor_assets : {
                files : ['<%= vendor_files.assets %>'],
                tasks : ['copy:vendor_assets']
            },
            app_assets : {
                files : ['client/src/assets/**/*'],
                tasks : ['copy:app_assets']
            },
            app_files : {
                files : [
                    'client/src/index.html',
                    'client/src/**/*.view.html'
                ],
                tasks : ['copy:app_index', 'copy:app_views', 'copy:app_common_views']
            },
            css : {
                files : ['<%= concat.css.src %>'],
                tasks : ['concat:css']
            },
            js : {
                files : ['<%= concat.js.src %>'],
                tasks : ['concat:js']
            }
        }
    });

    grunt.registerTask('default', ['clean:public', 'copy', 'concat']);//, 'uglify']);

}
