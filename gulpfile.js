var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    clean = require('gulp-rimraf'),
    embedTemplates = require('gulp-angular-embed-templates'),
    gulpwatch = require('gulp-chokidar')(gulp), // fixes issue with gulp.watch running too early for ftp causing blank results
    nodemon = require('gulp-nodemon'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync'),
    reload = browserSync.create().reload;


var jsSources = ['client_src/scripts/**/*.js'],
    sassSources = ['client_src/styles/**/*.scss'],
    htmlSource = 'client_src/',
    outputDir = 'public';

gulp.task('clean', [], function () {
    console.log("Clean all files in folder: " + outputDir);
    return gulp.src(outputDir + "/*", { read: false }).pipe(clean());
});

gulp.task('styles', function () {
    return gulp.src(sassSources)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest(outputDir))
});

gulp.task('scripts', function () {
    return gulp.src(jsSources)
        .pipe(embedTemplates())
        //   .pipe(uglify())
        .pipe(concat('script.js'))
        .pipe(gulp.dest(outputDir))
});

gulp.task('copy', ['scripts'], function () {
    return gulp.src(htmlSource + '/index.html')
        .pipe(gulp.dest(outputDir))
});

gulp.task('nodemon', function (cb) {

    var started = false;

    return nodemon({
        // the script to run the app
        script: 'app.js',
        ext: 'js css html'
    }).on('start', function () {

        // to avoid nodemon being started multiple times
        if (!started) { cb(); started = true; }
    });

});


gulp.task('browser-sync', ['nodemon'], function () {
    browserSync.init(null, {
        files: ["public/**/*.*"],
        //       browser: "google chrome",
        port: 8080,
    });
});


gulp.task('watch', ['browser-sync'], function () {

    gulpwatch(jsSources, ['scripts']).on('change', reload);
    gulpwatch(sassSources, ['styles']).on('change', reload);
    gulpwatch([htmlSource + '/**/*.html'], ['copy']).on('change', reload);

});


gulp.task('default', ['clean', 'copy', 'styles', 'scripts']);