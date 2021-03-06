/*
* All gulpfile configuration options
*/


module.exports = function() {
  var sourceDir = 'src';
  var localDir = 'dist/dev';
  var productionDir = 'dist/prod';

  var config = {
    localDir: localDir,
    productionDir: productionDir,
    sourceDir: sourceDir,
    localFiles: [
      localDir + '/css/*.css',
      localDir + '/images/**/*',
      localDir + '/*.html'
    ],
    sourcePath: {
      sass: sourceDir + '/sass/**/*.scss',
      html: sourceDir + '/templates/**/*.twig',
      layouts: sourceDir + '/layouts/*.html',
      images: sourceDir + '/images/**/*'
    },
    browsersync: {
      port: 8080,
      open: false,
      notify: true
    },
  };
  return config;
}
