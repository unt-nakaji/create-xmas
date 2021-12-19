const gulp = require('gulp');
const webp = require('gulp-webp');
const { destDir } = require('./config');

const exportOriginalImage = () => {
  return gulp.src([
    'static/_webp/**',
  ])
    .pipe(gulp.dest(`${destDir}/img`));
};

const exportWebp = () => {
  return gulp.src([
    'static/_webp/**'
  ])
    .pipe(webp())
    .pipe(gulp.dest(`${destDir}/img`));
};

exports.webp = gulp.parallel(exportOriginalImage, exportWebp);