var gulp = require('gulp');
var electron = require('gulp-electron');
var packageJson = require('./app/package.json');

process.NODE_ENV = 'test';

gulp.task('default', function () {
  gulp.src("")
      .pipe(electron({
        src              : './app',
        packageJson      : packageJson,
        release          : './build/release',
        cache            : './build/cache',
        version          : 'v1.2.6',
        rebuild          : false,
        packaging        : true,
        asar             : true,
        platforms        : ['darwin-x64'],
        platformResources: {
          darwin: {
            CFBundleDisplayName: packageJson.name,
            CFBundleIdentifier : packageJson.name,
            CFBundleName       : packageJson.name,
            CFBundleVersion    : packageJson.version
          }
        }
      }))
      .pipe(gulp.dest(""));
});
