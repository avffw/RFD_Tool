/*jslint indent: 2 */
'use strict';

var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'),
	filter = require('gulp-filter'),
	twig = require('gulp-twig'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	prettify = require('gulp-html-prettify'),
	path = require('path'),
	data = require('gulp-data'),
	reload = browserSync.reload,
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	src = {
		scss: '../scss/**/*.scss',
		css: '../css',
		twig: ['../templates/**/*.twig', "../templates/blocks/*.twig"],
		html_pages: '../templates/pages/*.twig',
		dataJson: '../data/*.json',
		javascript: ['../js/base.js', '../js/base/*.js', '../js/components/*.js', '../js/init.js']
	};


function requireUncached( $module ) {

	try {
		delete require.cache[require.resolve( $module )];
		return require( $module );
	}	
	catch(error) {
		console.error(error.message);
	}
	
}

// Task for local, static development.
gulp.task('prototype-development', ['sass', 'templates', 'scripts'], function () {

	browserSync({
		browser: "google chrome",
		server: "../",
		files: ["../css/styles.css", src.html_pages]
	});

	gulp.watch(src.scss, ['sass']);
	gulp.watch(src.twig, ['templates']);
	gulp.watch(src.javascript, ['scripts', reload]);

	//gulp.watch(src.dataJson, ['templates']);
	gulp.watch(src.dataJson, function(event) {
		var fileName = path.basename(event.path, '.json');
		return gulp.src('../templates/pages/' + fileName + '.twig')
		.pipe(data(function () {
			return requireUncached('../data/' + fileName + '.json');			
		}))
		.pipe(twig())
		.pipe(prettify({indent_char: ' ', indent_size: 2}))
		.pipe(gulp.dest('../'))
		.on("end", reload);
	});
	
});


// Task for compiling sass in development mode with all features enabled.
gulp.task('sass', function () {
	gulp.src('../scss/{,*/}*.{scss,sass}')
		.pipe(sourcemaps.init())
		.pipe(sass({
			errLogToConsole: true
		}))
		.on('error', function (err) {
			console.error('Error!', err.message);
		})
		.pipe(autoprefixer({browsers: ['last 2 versions']}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(src.css))
		.pipe(filter("**/*.css"))
		.pipe(reload({
			stream: true
		}));
});


// Generate templates
gulp.task('templates', function () {
	return gulp.src(src.html_pages)
		.pipe(data(function (file) {
			//return requireUncached('../data/global.json');
			return requireUncached('../data/' + path.basename(file.path, '.twig') + '.json');
		}))
		.pipe(twig({
			base: '../templates/'
        }))
		.pipe(prettify({indent_char: ' ', indent_size: 2}))
		.pipe(gulp.dest('../'))
		.on("end", reload);
});

// Javascript minification
gulp.task('scripts', function () {
	return gulp.src(src.javascript)
		.pipe(concat('script.min.js'))
		// Use uglyfy on production code
		//.pipe(uglify())
		.pipe(gulp.dest('../js/'));
});


gulp.task('default', ['prototype-development']);
