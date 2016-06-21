var gulp = require('gulp'),
	clean = require('gulp-clean'),
	inject = require("gulp-inject"),
	rename = require('gulp-rename'),
	jshint = require('gulp-jshint'),
	minifyCSS = require('gulp-minify-css'),
	html2js = require('gulp-html2js'),
	concat = require('gulp-concat'),
	ngAnnotate = require('gulp-ng-annotate'),
	uglify = require('gulp-uglify'),
	htmlmin = require('gulp-htmlmin'),
	cache = require('gulp-cache'),
	livereload = require('gulp-livereload'),
	wrap = require('gulp-wrap'),
	util = require('gulp-util'),
	runSequence = require('run-sequence'),
	files = require('./build.config.js').files,
	connect = require('connect'),
	replace = require('gulp-replace'),
	sh = require('shelljs'),
	stripDebug = require('gulp-strip-debug'),
	ts = require('gulp-typescript'),
	merge = require('merge2'),
	sass = require('gulp-sass'),
	CacheBust = require('gulp-cachebust');

var cachebust = new CacheBust();
var productionDir = '_public'; // production output directory (default: _public)
var wwwDir = './www';
var buildDir = wwwDir;
var doStripDebug = false;
var failOnError = false;
var port = require('./build.config.js').port;

var appFiles = files.ts.app;;
var cssFiles = files.css.main;
//var htmlFiles = files.html.tpls.all;
var imgSrcFiles = files.img.src;
var jsonSrcFiles = files.json.src;

// Concatenate vendor JS into vendor.js.
gulp.task('js:vendor', function () {
	return gulp.src(files.js.vendor)
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest(buildDir+files.js.buildDest));
});

var tsProject = ts.createProject({
    declarationFiles: false,
    noExternalResolve: true
});

gulp.task('ts:app', function() {
	var version = sh.exec('date +%y%m%d%H.', {silent: true}).output.trim() + sh.exec('git log -1 --pretty=format:%h', {silent: true}).output.trim();

	var jsCompile = gulp.src(appFiles)
		.pipe(replace(/(var __version__ =) '.+';/g, '$1 \'' + version + '\';'))
		.pipe(ts(tsProject).on('error', function(err) { if (failOnError) { console.log('TS Error: build failed'); process.exit(1); } }))
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('default'));

	if (failOnError) {
		jsCompile = jsCompile.pipe(jshint.reporter('fail'));
	}

	return jsCompile.pipe(concat('app.js'))
		.pipe(ngAnnotate({gulpWarnings: false}))
		.pipe(wrap('(function ( window, angular, undefined ) { <%= contents %> })( window, window.angular );'))
		.pipe(gulp.dest(buildDir+files.js.buildDest));

});

// Cache app/**/ templates into templates.js.
gulpJSTemplates('all');

// Process css files into main.css.
gulp.task('css', function () {

	return gulp.src(cssFiles)
		.pipe(concat('app.css'))
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(buildDir+files.css.buildDest));
});

// HTML files into build dir.
gulp.task('html', function () {
	return gulp.src(files.html.index)
		.pipe(gulp.dest(buildDir+files.html.buildDest));
});

// Process images.
gulp.task('img', function () {
	return gulp.src(imgSrcFiles)
		//.pipe(rename({dirname: ''}))
		.pipe(gulp.dest(buildDir+files.img.buildDest));
});

// Process assets.
gulp.task('assets', function() {
	return gulp.src(files.assets.src)
		.pipe(gulp.dest(buildDir+files.assets.buildDest));
});

// Process json.
gulp.task('json', function() {
	return gulp.src(jsonSrcFiles)
		.pipe(gulp.dest(buildDir+files.json.buildDest));
});

// Process fonts.
gulp.task('fonts', function () {
	return gulp.src(files.fonts.src)
		.pipe(gulp.dest(buildDir+files.fonts.buildDest));
});

// Compile assets for production
gulp.task('compile:assets', function() {
	return gulp.src('www/assets/**')
		.pipe(gulp.dest(productionDir+files.assets.buildDest));
});

// Compile CSS for production.
gulp.task('compile:css', function () {
	return gulp.src('www/**/*.css')
		.pipe(minifyCSS({keepSpecialComments: 0}))
		.pipe(cachebust.resources())
		.pipe(gulp.dest(productionDir));
});

// Compile JS for production.
gulp.task('compile:js', function () {
	var js = gulp.src('www/**/*.js');

	if (doStripDebug) {
		js = js.pipe(stripDebug());
	}

	return js.pipe(uglify())
		.pipe(cachebust.resources())
		.pipe(gulp.dest(productionDir));
});

// Compile HTML for production.
gulp.task('compile:html', ['compile:js', 'compile:css'], function () {
	return gulp.src('www/**/*.htm*')
		//.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(cachebust.references())
		.pipe(gulp.dest(productionDir+files.html.buildDest));
});

// Prepare images for production.
gulp.task('compile:img', function () {
	return gulp.src('www/img/**')
		.pipe(gulp.dest(productionDir+files.img.buildDest));
});

// Prepare fonts for production.
gulp.task('compile:fonts', function () {
	return gulp.src('www/fonts/*')
		.pipe(gulp.dest(productionDir+files.fonts.buildDest));
});

// Prepare json for production.
gulp.task('compile:json', function () {
	return gulp.src('www/json/*')
		.pipe(gulp.dest(productionDir+files.json.buildDest));
});

// Clean build directory.
gulpClean('build');

// Clean production directory.
gulpClean(productionDir);

// Clean build and production directories.
gulp.task('clean', function (callback) {
	runSequence(['clean:build', 'clean:'+productionDir], callback);
});

// Build files for local development.
gulp.task('build', function (callback) {
	runSequence(
	'clean:build',
	[	'js:vendor',
		'ts:app',
		'js:templates-all',
		'css',
		'html',
		'assets',
		'img',
		'fonts',
		'json'
	],
	callback);
});

// Process files and put into directory ready for production.
gulp.task('compile', function (callback) {
	failOnError = true;
	runSequence(
	['build', 'clean:'+productionDir],
	[
		'compile:js',
		'compile:css',
		'compile:assets',
		'compile:html',
		'compile:img',
		'compile:fonts',
		'compile:json'
	],
	callback);
});

gulp.task('dist', function(callback) {
	doStripDebug = true;
	runSequence(['build', 'clean:'+productionDir, 'compile'], callback);
})

// Run server.
gulp.task('server', ['build'], function (next) {
	var server = connect();
	server.use(connect.static(buildDir)).listen(port, next);
});

// Watch task
gulp.task('watch:files', ['server'], function () {
	gulp.watch('build.config.js', ['js:vendor']);

	gulp.watch(appFiles, ['ts:app']);

	gulp.watch(files.html.tpls.all, ['js:templates-all']);

	gulp.watch(cssFiles, ['css']);

	gulp.watch(files.html.index, ['html']);

	gulp.watch(imgSrcFiles, ['img']);

	gulp.watch(files.assets.src, ['assets']);

	gulp.watch(jsonSrcFiles, ['json']);

	// Livereload
	var server = livereload();

	gulp.watch(buildDir+'/**/*', function (event) {
		server.changed(event.path);
	});
});

// Same as watch:files.
gulp.task('default', ['watch:files']);



/**
 * Generate tasks for Angular JS template caching
 *
 * @param {string} folder
 * @return stream
 */
function gulpJSTemplates (folder) {
	gulp.task('js:templates-'+folder, function () {
	return gulp.src(files.html.tpls[folder])
		.pipe(html2js({
			outputModuleName: 'templates',
			useStrict: true,
			base: 'src/'
		}))
		.pipe(concat('templates.js'))
		.pipe(gulp.dest(buildDir+files.js.buildDest));
	});
}

/**
 * Generate cleaning tasks.
 *
 * @param {string} folder
 * @return stream
 */
function gulpClean (folder) {
	gulp.task('clean:'+folder, function () {
	return gulp.src(folder, {read: false, force: true})
		.pipe(clean());
	});
}