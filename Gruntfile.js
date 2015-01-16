module.exports = function(grunt) {
  var testJade = 'src/jade/test_layout.jade';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

    // Make sure the JS is normal

		jshint: {
			files: [
        'Gruntfile.js',
        'bower.json',
        'package.json',
        'src/js/**/*.js',
        'test/**/*.js',
      ],
			options: {
				globals: {
					jQuery: true,
				}
			}
		},

    // Compile the HTML

    jade: {
      // Build main index.html
      debug: {
        options: {
          pretty: true,
          data: {
            version: '<%= pkg.version %>',
            authors: '<%= pkg.contributors %>',
          }
        },
        files: {
          '_build/main/index.html': 'src/jade/index.jade'
        }
      },
      // Build test folders
      tests: {
        options: {
          pretty: true
        },
        files: {
          '_build/test/full_game/index.html': testJade,
          '_build/test/full_game/index_minified.html':
            'src/jade/test_minified.jade',
          '_build/test/counter/index.html': testJade,
          '_build/test/opening_sequence/index.html': testJade,
          '_build/test/upgrade/index.html': testJade,
          '_build/test/generator/index.html': testJade,
        }
      }
    },

    // Compile the JS

		concat: {
			options: {
				seperator: ';',
			},
			test: {
				// The details scripts must be first singe game.js needs them
				src: ['src/js/**/*.js', '!src/js/play.js'],
				dest: '_build/main/js/pre_vote.js',
			},
			dist: {
				// Make sure the play script will be the last one
				src: ['src/js/**/*.js', '!src/js/play.js', 'src/js/play.js'],
				dest: '_build/main/js/vote.js'
			},
      //TODO Combind CSS here as well
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %>.<%= pkg.version %> ' +
                '<%= grunt.template.today("dd-mm-yyy") %> */\n',
			},
			dist: {
				files: {
					'_build/main/js/pre_vote.min.js': 'js/pre_vote.js',
					'_build/main/js/vote.min.js': 'js/vote.js'
				}
			}
		},

    // Copy assets, css and bower_components

    copy: {
      build: {
        files: [
          { expand: true, src: ['assets/**'], dest: '_build/main/' },
          { 
            expand: true,
            cwd: 'src',
            src: ['css/*.css'],
            dest: '_build/main/'
          },
          {
            expand: true,
            src: ['bower_components/**'],
            dest: '_build/main/'
          },
          {
            expand: true,
            src: ['test/*/tests.js'],
            dest: '_build/',
          }
        ]
      }
    },

		qunit: {
			files: ['_build/test/*/*.html'],
		},

		watch: {
			scripts: {
				files: [
          'assets/*',
          '<%= jshint.files %>',
          'src/css/*.css',
          'src/jade/*',
          'test/*/index.jade',
        ],
				tasks: ['default']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-copy');


	grunt.registerTask('test', [
    'jshint',
    'jshint',
    'jade',
    'concat',
    'uglify',
    'copy',
    'qunit',
  ]);
	grunt.registerTask('default', [
    'jshint',
    'jade',
    'concat',
    'uglify',
    'copy'
  ]);
};
