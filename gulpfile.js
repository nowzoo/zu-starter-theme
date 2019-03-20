const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');
sass.compiler = require('node-sass');


gulp.task('styles', () => {

  const plugins = [
    autoprefixer({browsers: ['last 1 version']}),
    cssnano()
  ];
  const sassOptions = {
    includePaths: [path.join(process.cwd(), 'node_modules')]
  };
  return gulp.src('./scss/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('copylib', () => {
  const pathsToCopy = [
    './node_modules/jquery/dist/jquery.slim.min.js',
    './node_modules/jquery/dist/jquery.slim.min.map',
    './node_modules/popper.js/dist/popper.min.js',
    './node_modules/popper.js/dist/popper.min.js.map',
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js.map'
  ];
  return gulp.src(pathsToCopy)
    .pipe(gulp.dest('./assets/js'));
})
