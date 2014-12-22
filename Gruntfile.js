module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				seperator: ';',
			},
			test: {
				// The details scripts must be first singe game.js needs them
				//src: ['src/**/*details.js', 'src/**/*.js', '!src/play.js'],
				src: ['src/**/*.js', '!src/play.js'],
				dest: 'js/pre_vote.js',
			},
			dist: {
				// Make sure the play script will be the last one
				src: ['src/**/*.js', '!src/play.js', 'src/play.js'],
				dest: 'js/vote.js'
			}
		},
		jshint: {
			files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
			options: {
				globals: {
					jQuery: true,
				}
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %>.<%= pkg.version %> <%= grunt.template.today("dd-mm-yyy") %> */\n',
			},
			dist: {
				files: {
					'js/pre_vote.min.js': 'js/pre_vote.js',
					'js/vote.min.js': 'js/vote.js'
				}
			}
		},
		qunit: {
			files: ['test/**/*.html'],
		},
		wiredep: {
			task: {
				src: ['test/**/*.html'],
				options: {
					devDependencies: true,
				},
			},
		},
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-wiredep');


	grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'wiredep', 'qunit']);
};
