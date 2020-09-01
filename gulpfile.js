var
	plugin = 'scrolla',

	gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	jshint = require('gulp-jshint'),
	watch = require('gulp-watch'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	stylus = require('gulp-stylus'),
	pug = require('gulp-pug'),
	coffee = require('gulp-coffee'),
	autoprefixer = require('gulp-autoprefixer'),
	csso = require('gulp-csso'),
	htmlhint = require('gulp-htmlhint'),
	htmlmin = require('gulp-htmlmin'),
	sourcemaps = require('gulp-sourcemaps'),
	browserSync = require('browser-sync').create();

gulp.task('serve', function (){
	browserSync.init({
		server: { baseDir: ['./docs', './src'] },
		notify: false,
		tunnel: false,
		host: 'localhost',
		port: 9000,
	});
});

gulp.task('html', function() {
	return gulp.src('./src/pug/*.pug')
		.pipe(plumber())
		.pipe(pug({ data: { plugin: plugin }, pretty: '\t' }))
		.pipe(htmlhint('./.htmlhintrc'))
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(htmlhint.reporter())
		.pipe(gulp.dest('./docs'))
});

gulp.task('refresh', ['html'], function () {
	browserSync.reload();
});

gulp.task('js:example', function() {
	gulp.src('./src/coffee/example.coffee')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(coffee({ bare: true }))
		.pipe(jshint())
		.pipe(uglify({ mangle: true }))
		.pipe(rename({ extname: '.min.js' }))
		.pipe(sourcemaps.write('../maps', { includeContent: false, sourceRoot: '../coffee' }))
		.pipe(gulp.dest('./docs/js/'))
		.pipe(jshint.reporter())
		.pipe(browserSync.stream({ match: '**/*.js' }));
});

gulp.task('js:plugin', function() {
	gulp.src('./src/coffee/jquery.' + plugin + '.coffee')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(coffee({ bare: true }))
		.pipe(gulp.dest('./dist/js/'))
		.pipe(jshint())
		.pipe(uglify({ mangle: true }))
		.pipe(rename({ extname: '.min.js' }))
		.pipe(gulp.dest('./dist/js/'))
		.pipe(sourcemaps.write('../maps', { includeContent: false, sourceRoot: '../coffee' }))
		.pipe(gulp.dest('./docs/js/'))
		.pipe(jshint.reporter())
		.pipe(browserSync.stream({ match: '**/*.js' }));
});

gulp.task('js', function() {
	gulp.start('js:example');
	gulp.start('js:plugin');
});

gulp.task('css:example', function() {
	gulp.src(['./src/stylus/example.styl', './src/stylus/dark.styl'])
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(stylus({'include css': true}))
		.pipe(autoprefixer({ browsers: ['last 2 versions', 'ios >= 7','firefox >=4','safari >=7','IE >=8','android >=2'] }))
		.pipe(rename({ extname: '.min.css' }))
		.pipe(csso())
		.pipe(sourcemaps.write('../maps', { includeContent: false, sourceRoot: '../stylus' }))
		.pipe(gulp.dest('./docs/css/'))
		.pipe(browserSync.stream({ match: '**/*.css' }));
});

gulp.task('css', function() {
	gulp.start('css:example');
});

gulp.task('assets', function() {
	return gulp.src('./src/assets/favicon.ico')
		.pipe(gulp.dest('./docs/'));
});

gulp.task('watch', function () {
	watch(['./src/coffee/example.coffee'], function() { gulp.start('js:example'); });
	watch(['./src/coffee/jquery.' + plugin + '.coffee'], function() { gulp.start('js:plugin'); });
	watch(['./src/stylus/example.styl'], function() { gulp.start('css:example'); });
	watch(['./src/pug/**/*.pug'], function() { gulp.start('refresh'); });
});

gulp.task('build', function() {
	gulp.start('html');
	gulp.start('js');
	gulp.start('css');
	gulp.start('assets');
});

gulp.task('default', ['build', 'watch', 'serve']);
