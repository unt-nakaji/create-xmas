const mode = require('gulp-mode')();
const isProduction = mode.production();
const destDir = isProduction ? 'build' : 'dest';

module.exports = {
  END_OF_LINE: 'LF',
  ENCODING: 'UTF8',
  destDir,
};