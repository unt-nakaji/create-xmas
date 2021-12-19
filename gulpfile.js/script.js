const gulpbabel = require('gulp-babel');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const lec = require('gulp-line-ending-corrector');
const plumber = require('gulp-plumber');
const strip = require('gulp-strip-comments');
const { END_OF_LINE, ENCODING, destDir } = require('./config');
const mode = require('gulp-mode')();
const uglify = require('gulp-uglify');

// JSのコメントアウト（「//」のみ）をコンパイル時に削除するかどうか。
const COMMENT_DELETION = true; // or false

const script = () => {
  return gulp.src('src/es6/**/*.es6')
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulpbabel({
      presets: ['@babel/preset-env']
    }))
    .pipe(lec({ eolc: END_OF_LINE, ENCODING }))
    .pipe(gulpif(COMMENT_DELETION, strip({ ignore: /\/\*\*\s*\n([^\*]*(\*[^\/])?)*\*\//g })))
    .pipe(mode.production(uglify()))
    .pipe(gulp.dest(destDir));
};

exports.script = script;