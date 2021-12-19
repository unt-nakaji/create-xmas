const gulp = require('gulp');
const { destDir } = require('./config');

const ssi = () => {
  return gulp.src('./static/_ssi/*.inc', { since: gulp.lastRun(ssi) })
    .pipe(gulp.dest(`${destDir}/_ssi`));
};

exports.ssi = ssi;