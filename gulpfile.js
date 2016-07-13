const gulp = require('gulp');
// const electron = require('gulp-electron');
const sass = require('gulp-sass');
const electron = require('gulp-atom-electron');
const runElectron = require('gulp-run-electron');
const symdest = require('gulp-symdest');
const del = require('del');

const packageJson = require('./package.json');

const config = {
  sourceDir  : 'app',
  buildDir   : 'build',
  npmDir     : 'node_modules',
  packagesDir: 'packages'
};

gulp.task('clean', [
  'clean:build',
  'clean:package'
]);

gulp.task('clean:build', function () {
  return del(config.buildDir + '/**/*', { force: true });
});

gulp.task('clean:package', function () {
  return del(config.packagesDir + '/**/*', { force: true });
});

gulp.task('package:osx', function () {
  return gulp.src(config.buildDir + '/**/*')
             .pipe(electron({
               version : '1.2.6',
               platform: 'darwin'
             }))
             .pipe(symdest(config.packagesDir + '/osx'));
});

gulp.task('package:linux', function () {
  return gulp.src(config.buildDir + '/**/*')
             .pipe(electron({
               version : '1.2.6',
               platform: 'linux'
             }))
             .pipe(symdest(config.packagesDir + '/linux'));
});

gulp.task('package:windows', function () {
  return gulp.src(config.buildDir + '/**/*')
             .pipe(electron({
               version : '1.2.6',
               platform: 'win32'
             }))
             .pipe(symdest(config.packagesDir + '/windows'));
});

gulp.task('package', [
  'package:osx',
  'package:linux',
  'package:windows'
]);

gulp.task('sass', function () {
  return gulp.src(config.sourceDir + '/styles/scss/**/*.scss')
             .pipe(sass({ style: 'compressed' })
               .on('error', sass.logError))
             .pipe(gulp.dest(config.sourceDir + '/styles/css'));
});

gulp.task('watch', ['sass'], function () {
  gulp.watch(config.sourceDir + '/**/*', ['sass', runElectron.rerun]);
});

gulp.task('default', ['watch'], function () {
  return gulp.src('.')
             .pipe(runElectron());
});

// gulp.task('build', function () {
//   gulp.src("")
//       .pipe(electron({
//         src              : './app',
//         packageJson      : packageJson,
//         release          : './release',
//         cache            : './cache',
//         version          : 'v1.2.6',
//         rebuild          : false,
//         packaging        : true,
//         asar             : true,
//         platforms        : ['darwin-x64'],
//         platformResources: {
//           darwin: {
//             CFBundleDisplayName: packageJson.name,
//             CFBundleIdentifier : packageJson.name,
//             CFBundleName       : packageJson.name,
//             CFBundleVersion    : packageJson.version
//           }
//         }
//       }))
//       .pipe(gulp.dest(""));
// });
