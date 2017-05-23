var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var cleanCSS = require('gulp-clean-css');
var rseq = require('run-sequence');

gulp.task('min-css', function() {
    return gulp.src('src/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('vet', function() {
    return gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe(jshint.reporter('fail')) ;
});

gulp.task('min-js', function() {
    return gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('copy-js', function() {
    gulp.src('src/js/*')
        .pipe(gulp.dest('./dist/js/'));
});
gulp.task('copy-css', function() {
    gulp.src('src/css/*')
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('dist', function(cb) {
    return rseq('vet', 'copy-js', 'copy-css', 'min-js', 'min-css', cb);
});