module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: ['Gruntfile.js', 'js/**/*.js', 'test/**/*.js'],
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
	grunt.loadNpmTasks('grunt-wiredep');


	grunt.registerTask('default', ['jshint', 'wiredep', 'qunit']);
};
