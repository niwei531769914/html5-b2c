// Generated on 2014-12-02 using
// generator-webapp 0.5.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  var Mustache = require('mustache');
  var _ = require('underscore');

  // Configurable paths
  var config = {
    app: 'app',
    dist: 'dist',
    tmp: '.tmp',
    version: '1.0',
    target: 'prd',
    publish: 'publish',
    modulename: 'common',
    oss: 'h5-common-oss',
    statics: 'h5-common-static',
    timestamp: Date.now()
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= config.app %>/scripts/{,*/}*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      jstest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['test:watch']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      styles: {
        files: ['<%= config.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= config.app %>/images/{,*/}*'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      test: {
        options: {
          // mocha设置的时候裁需要关闭false
          // open: false,

          open: true,
          port: 9001,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      dist: {
        options: {
          base: '<%= config.dist %>',
          livereload: false
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      autogen: {
        files: [{
          dot: true,
          src: [
            'app/app/scripts/api/*',
          ]
        }]
      },
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp',
      publish: {
        files: [{
          dot: true,
          src: [
            '<%= config.publish %>/*'
          ]
        }]
      },
      oss: {
        files: [{
          dot: true,
          src: [
            '<%= config.oss %>/*'
          ]
        }]
      },
      statics: {
        files: [{
          dot: true,
          src: [
            '<%= config.statics %>/*'
          ]
        }]
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.app %>/scripts/{,*/}*.js',
        '!<%= config.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },

    // Mocha testing framework configuration options
    mocha: {
      all: {
        options: {
          run: false,
          reporter: 'Spec',
          urls: [
            'http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html',
            // 'http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/test.api.html'
          ]
        }
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the HTML file
    wiredep: {
      app: {
        ignorePath: /^\/|\.\.\//,
        src: ['<%= config.app %>/index.html']
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '<%= config.dist %>/images/{,*/}*.*',
            '<%= config.dist %>/styles/fonts/{,*/}*.*',
            '<%= config.dist %>/*.{ico,png}'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: '<%= config.app %>/index.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          '<%= config.dist %>',
          '<%= config.dist %>/images',
          '<%= config.dist %>/styles'
        ]
      },
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/styles/{,*/}*.css']
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/static/img',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/static/svg',
          src: '{,*/}*.svg',
          dest: '<%= config.dist %>/svg'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: '{,*/}*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care
    // of minification. These next options are pre-configured if you do not
    // wish to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= config.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/scripts/scripts.js': [
    //         '<%= config.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            'images/{,*/}*.webp',
            '{,*/}*.html',
            'styles/fonts/{,*/}*.*'
          ]
        }, {
          src: 'node_modules/apache-server-configs/dist/.htaccess',
          dest: '<%= config.dist %>/.htaccess'
        }]
      },
      image: {
        expand: true,
        dot: true,
        timestamp: true,
        cwd: '<%= config.app %>/static',
        dest: '<%= config.dist %>',
        src: [
          'img/{,*/}*.*',
          'img/*/{,*/}*.*',
          'img/*/*/{,*/}*.*',
          'img/*/*/*/{,*/}*.*',
        ]
      },
      hybridbase: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/scripts/hybridbase',
        dest: '<%= config.dist %>/scripts/',
        src: '{,*/}*.js'
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/static/css',
        dest: '<%= config.dist %>/styles/',
        src: '{,*/}*.css'
      },
      html: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>',
        dest: '<%= config.dist %>',
        src: '{,*/}*.html'
      }
    },

    compress: {
      oss: {
        options: {
          archive: '<%=config.oss%>/target/<%=config.oss%>.zip',
        },
        files: [{
          expand: true,
          cwd: '<%=config.dist%>',
          src: ['scripts/**', 'styles/**', 'img/**'],
          dest: '<%= config.oss %>/<%=config.version%>'
        }]
      },
      statics: {
        options: {
          archive: '<%=config.statics%>/target/<%=config.statics%>.zip',
          store: true
        },
        files: [{
          expand: true,
          cwd: '<%=config.dist%>',
          src: ['*.html', 'json/**', '*.ico'],
          dest: 'ROOT/<%=config.modulename%>'
        }]
      },
      testv2: {
        options: {
          archive: '<%=config.statics%>/target/<%=config.statics%>.zip',
        },
        files: [{
          expand: true,
          cwd: '<%=config.dist%>',
          src: ['json/**', 'scripts/**', 'styles/**', '*.html', 'img/**'],
          dest: 'ROOT/<%=config.modulename%>'
            // dest: 'statics.h5.<%=config.version%>'
        }]
      },
      test: {
        options: {
          archive: '<%=config.publish%>/statics.<%=config.target%>.<%=config.timestamp%>.tar'
        },
        files: [{
          expand: true,
          cwd: '<%=config.dist%>',
          src: ['img/**', 'json/**', 'scripts/**', '*.html', 'styles/**'],
          dest: '<%=config.modulename%>'
        }]
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'copy:image',
        'copy:html'
      ]
    },

    curl: {
      api: {
        'src': 'http://115.28.11.229/info.api?json',
        // 'src': 'http://115.28.145.123/info.api?raw',
        'dest': 'autogen/api/source.xml'
      }
    },

    convert: {
      options: {
        explicitArray: false,
      },
      xml2json: {
        files: [{
          expand: true,
          cwd: 'autogen/api/',
          src: ['**/*.xml'],
          dest: 'autogen/api/',
          ext: '.json'
        }]
      }
    },

    jsdox: {
      generate: {
        options: {
          contentsTitle: 'API DOCS'
        },
        src: ['app/scripts/framework/*.js'],
        dest: 'docs'
      }
    },

    requirejs: {
      h5: {
        options: {
          // optimize: "none",
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.dist %>/scripts/lehu.h5.common.js',
          mainConfigFile: './<%= config.app %>/scripts/h5.require.config.js',
          paths: {
            'can': '../bower_components/canjs/can.zepto',
         //   'zepto': '../bower_components/zeptojs/dist/zepto.min',
            'fastclick': '../bower_components/fastclick/lib/fastclick',
            'underscore': '../bower_components/underscore/underscore-min',
            'underscore.string': '../bower_components/underscore.string/dist/underscore.string.min',
            'md5': '../bower_components/blueimp-md5/js/md5.min',
            'store': '../bower_components/store/store',
            'moment': '../bower_components/moment/moment'
          },
          include: [
            'zepto',
            'can',
            'fastclick',
            'zepto.cookie',
            'underscore',
            'underscore.string',
            'md5',
            'store',
            'text',
            'moment',

            'lehu.h5.framework.comm',
            'lehu.h5.framework.global',
            'lehu.h5.api',

            "lehu.hybrid",
            "lehu.bridge",
            "lehu.helpers",
            "lehu.util",
            "lehu.env.switcher",

            'lehu.h5.widget.message'
          ],
          insertRequire: ['lehu.h5.framework.global']
        }
      },

      requirejs: {
        options: {
          // optimize: "none",
          preserveLicenseComments: false,
          baseUrl: './app/',
          out: './<%= config.dist %>/scripts/require.min.js',
          mainConfigFile: './<%= config.app %>/scripts/h5.require.config.js',
          paths: {
            'requirejs': "../bower_components/requirejs/require"
          },
          include: [
            'requirejs'
          ]
        }
      }
    }
  });

  grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function(target) {
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function(target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', function(target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'concurrent:test',
        'autoprefixer'
      ]);
    }

    if (target === 'browser') {
      grunt.task.run([
        'connect:test',
        'watch'
      ]);
    } else {
      grunt.task.run([
        'connect:test',
        'mocha'
      ]);
    }
  });

  grunt.registerTask('build', function(target) {
    config.target = target;

    if (config.target) {
      grunt.task.run([
        'clean:dist',
        'concurrent:dist',
        'autoprefixer',
        'requirejs',
        'copy:hybridbase',

        'clean:publish',
        'clean:oss',
        'compress:test'
      ]);
    } else {
      grunt.fail.fatal('缺少环境参数!');
    }
  });

  grunt.registerTask('test', function() {
    config.target = 'prd';

    grunt.task.run([
      'clean:dist',
      'concurrent:dist',
      'autoprefixer',
      'requirejs',
      'copy:hybridbase',

      'clean:publish',
      'clean:oss',
      'compress:testv2'
    ]);
  })

  grunt.registerTask('release', function(version) {
    config.version = version;

    if (config.version) {
      config.target = 'prd';

      grunt.task.run([
        'clean:dist',
        'concurrent:dist',
        'autoprefixer',
        'requirejs',
        'copy:hybridbase',

        'clean:publish',
        'clean:oss',
        'clean:statics',
        'compress:oss',
        'compress:statics'
      ]);
    } else {
      grunt.fail.fatal('缺少版本号!');
    }
  })

  grunt.registerTask('default', [
    'test',
    'web'
  ]);
};