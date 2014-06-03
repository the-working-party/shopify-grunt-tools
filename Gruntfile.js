'use strict';
module.exports = function (grunt) {[
		'grunt-contrib-concat',
		'grunt-contrib-imagemin',
		'grunt-contrib-copy',
		'grunt-newer',
		'grunt-contrib-watch',
		'grunt-contrib-uglify',
		'grunt-contrib-clean'
	].forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		concat: { //CONCATENATING SCSS FILES
			options: {},
			dev: {
				src: ['lib/scss/setup/*.scss', 'lib/scss/display/*.scss', 'lib/scss/custom/*.scss'],
				dest: 'theme/assets/styles.scss.liquid'
			},
		},

		uglify: { //UGLIFY JS
			shop: {
				options: {
					report: 'min',
				},
				files: {
					'theme/assets/shop.js.liquid': ['lib/js/libraries/*.js', 'lib/js/*.js'],
				},
			},
		},

		imagemin: { //MINIFY IMAGES
			dynamic: {
				options: {
					optimizationLevel: 3,
					cache: false
				},
				files: [{
					expand: true,
					cwd: 'source-assets/images/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'compiled-assets/'
				}],
			},
		},

		copy: { //MOVE IMAGES AND SOURCE ASSETS TO ASSET FOLDER
			images: {
				files: [{
					expand: true,
					flatten: true,
					src: ['compiled-assets/**'],
					dest: 'theme/assets/',
					filter: 'isFile'
				}],
			},
			assets: {
				files: [{
					expand: true,
					flatten: true,
					src: ['source-assets/**', '!source-assets/images/**/*'],
					dest: 'theme/assets/',
					filter: 'isFile'
				}],
			},
		},

		clean: {
			js: ["compiled-assets/**"],
		},

		watch: { //WATCH FOR CHANGES
			scss: {
				files: ['lib/scss/setup/*.scss', 'lib/scss/display/*.scss', 'lib/scss/custom/*.scss'],
				tasks: ['concat']
			},
			js: {
				files: ['lib/js/libraries/*.js', 'lib/js/*.js'],
				tasks: ['uglify']
			},
			images: {
				files: ['source-assets/images/**/*.{png,jpg,gif}'],
				tasks: ['newer:imagemin', 'newer:copy:images', 'clean']
			},
			assets: {
				files: ['source-assets/**/*.*', '!source-assets/images/**/*.*'],
				tasks: ['newer:copy:assets']
			},
		},
	});


//TASKS
	grunt.registerTask('default', 'Concatenate stuff into the Shopify theme directory',
		['concat', 'uglify', 'newer:imagemin', 'newer:copy', 'clean', 'watch']
	);
};