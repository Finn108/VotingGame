module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				seperator: ';',
			},
			test: {
				// The details scripts must be first singe game.js needs them
				src: ['src/**/*details.js', 'src/**/*.js', '!src/play.js'],
				dest: 'js/pre_vote.js',
			},
			dist: {
				// Make sure the play script will be the last one
				src: ['src/**/*details.js', 'src/**/*.js', '!src/play.js', 'src/play.js'],
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
		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint'],
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
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-wiredep');


	grunt.registerTask('default', ['jshint', 'concat', 'wiredep', 'qunit']);
};
