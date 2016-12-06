// Tasks: sass , build templates, inliner, watch, clean, image optimize,
'use strict';

//Set up task vars
var gulp = require('gulp'),
    _ = require('lodash'),
    browserSync = require('browser-sync').create(),
    clean = require('gulp-clean'),
    data = require('gulp-data'),
    fs = require('fs'),
    imagemin = require('gulp-imagemin'),
    path = require('path'),
    prettify = require('gulp-html-prettify'),
    sass = require('gulp-sass'),
    inlineCss = require('gulp-inline-css'),
    sassLint = require('gulp-sass-lint'),
    twig = require('gulp-twig');


  // Config files
  var config = require('./gulp.config')();

//Compile Sass using libsass
gulp.task('sass', function(){
  return gulp.src(['src/sass/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.localDir + '/css'));
});


// Inline all CSS styles
// Minify HTML (Optional argument: --minify)
gulp.task('inline-css', ['compile'], function() {
  return gulp.src(config.localDir + '/*.html')
    .pipe(inlineCss({
            applyStyleTags: true,
            applyLinkTags: true,
            removeStyleTags: false,
            removeLinkTags: true
    }))
    .pipe(gulp.dest(config.productionDir));
});

//Clean files
gulp.task('cleanDist', function () {
    return gulp.src('dist', {read:false})
        .pipe(clean());
});

//Copy Local Images
gulp.task('images:local', function () {
  gulp.src(config.sourcePath.images)
    .pipe(gulp.dest(config.localDir + '/images'));
});




//Browser Sync
gulp.task('connect', ['compile'], function() {
  browserSync.init({
          // Serve files from the local directory
          server: {
              baseDir: config.localDir,
              directory: true
          },
          port: config.browsersync.port,
          open: config.browsersync.open,
          notify: config.browsersync.notify
      });

    gulp.watch([config.sourcePath.sass, config.sourcePath.html], ['compile']);
    gulp.watch(config.sourcePath.images, ['images:local']);
    //
    gulp.watch(config.localFiles)
      .on('change', browserSync.reload);
});

//Compile Twig files
gulp.task('compile', ['sass'], function () {
    return gulp.src(['src/templates/**/*.twig', '!src/templates/**/_*.twig'])
        .pipe(data(function(file) {

          //Get location of template Json override
          var tempJsonFile = './src/templates/' + path.basename(file.path, '.twig') + '.json';

          // If file exist assign data to json var
          var json = fs.existsSync(tempJsonFile)? require(tempJsonFile) : '';

          //Get default data
          var srcData = require('./src/data/data.json');

          //Merge data
          var data = _.merge({}, srcData, json);

          return data;
        }))
        .pipe(twig())
        .pipe(gulp.dest(config.localDir));
});

// gulp.task('emailPretty', function() {
//   gulp.src('dist/emails/*.html')
//     .pipe(prettify({indent_char: ' ', indent_size: 2}))
//     .pipe(gulp.dest('./dist/emails'))
// });
