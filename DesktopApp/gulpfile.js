'use strict';

// get the dependencies
var gulp        = require('gulp'),
    childProcess  = require('child_process'),
    electron      = require('electron-prebuilt'),
    jetpack      = require('fs-jetpack'),
    usemin       = require('gulp-usemin'),
    uglify       = require('gulp-uglify');

var projectDir = jetpack,
    srcDir     = projectDir.cwd('./app'),
    destDir    = projectDir.cwd('./build');

// create the gulp task
gulp.task('run', function () {
    childProcess.spawn(electron, ['--debug=5858','./app'], { stdio: 'inherit' });
});

gulp.task('clean', function (callback) {
    return destDir.dirAsync('.', { empty: true });
});

gulp.task('copy', ['clean'], function () {
    return projectDir.copyAsync('app', destDir.path(), {
        overwrite: true, matching: [
            './node_modules/**/*',
            '*.html',
            '*.css',
            'index.js'
        ]
    });
});

gulp.task('build', ['copy'], function () {
    return gulp.src('./app/index.html')
        .pipe(usemin({
            js: [uglify()]
        }))
        .pipe(gulp.dest('build/'));
});