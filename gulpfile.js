var gulp = require('gulp');
var jshint = require('gulp-jshint');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('sync', function (){
	browserSync({
		server: {
			baseDir: "./"
		},
		tunnel: false,
		host: 'localhost',
		port: 9000
	});
});

gulp.task('js', function(){
	gulp.src('src/*.js')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(gulp.dest('dist/'))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/'))
		.pipe(reload({stream: true}));
});

gulp.task('jshint', function () {
	gulp.src('src/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter());
});

gulp.task('css', function(){
	gulp.src('src/*.styl')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(stylus())
		.pipe(autoprefixer({browsers: [
			'> 1%',
			'last 2 versions',
			'firefox >=4',
			'safari 7',
			'safari 8',
			'IE 8',
			'IE 9',
			'IE 10',
			'IE 11',
			'android >=2'],
			cascade: false
		}))
		.pipe(gulp.dest('dist/'))
		.pipe(cssnano({
			reduceIdents: false,
			zindex: false
		}))
		.pipe(rename({suffix: '.min'}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/'))
		.pipe(reload({stream: true}));
});

gulp.task('watch', function(){
	watch(['src/*.js'], function(event, cb) {
		gulp.start('js');
	});
	watch(['src/*.styl'], function(event, cb) {
		gulp.start('css');
	});
});

gulp.task('default', ['js', 'css', 'sync', 'watch']);
