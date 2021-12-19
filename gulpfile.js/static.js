const gulp = require('gulp');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const mode = require('gulp-mode')();
const { destDir } = require('./config');

const static = () => {
  return gulp.src([
    'static/**',
    '!static/_svg/**',
    '!static/_webp/**'
  ])
    .pipe(changed(`${destDir}/**`))
    .pipe(mode.production(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imageminPngquant({
        quality: [0.6, 0.8],
        speed: 1
      }),
      imagemin.svgo({
        plugins: [
          {removeViewBox: false}
        ]
      })
    ])))
    .pipe(gulp.dest(destDir));
};

exports.static = static;