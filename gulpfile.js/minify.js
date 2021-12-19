const gulp = require('gulp');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');

// Minify CSS
const cssMinify = () => {
  const plugins = [
    cssnano()
  ];

  return gulp.src('build/css/**/*.css')
    .pipe(postcss(plugins))
    .pipe(gulp.dest('build/css/'));
};

exports.cssMinify = cssMinify;