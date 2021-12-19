const gulp = require('gulp');
const ejs = require('gulp-ejs');
const data = require('gulp-data');
const lec = require('gulp-line-ending-corrector');
const fs = require('fs');
const htmlmin = require('gulp-htmlmin');
const prettify = require('gulp-prettify');
const { END_OF_LINE, ENCODING, destDir } = require('./config');

// Compile template engine
const markup = callback => {
  var pathJson = 'src/ejs/_json/';

  fs.access(pathJson + '_config.json', fs.R_OK | fs.W_OK, function (err) {
    var json_conf = (err) ? {} : JSON.parse(fs.readFileSync(pathJson + '_config.json'));
    var onError = function (err) {
      console.log(err.message);
      this.emit('end');
    };

    return gulp.src([
      'src/ejs/**/*.ejs',
      '!' + 'src/ejs/**/_*.ejs'
    ])
      .pipe(data(function(file) {
        var filename = file.path;
        var absolutePath = filename.split('ejs/')[filename.split('ejs/').length -1].replace('.ejs','.html');
        var relativePath = '../'.repeat([absolutePath.split('/').length -1]);

        json_conf.relativePath = relativePath;
        return json_conf;
      }))
      .pipe(ejs({
        'conf': json_conf,
        'relativePath': json_conf.relativePath
      }, {}, {
        ext: '.html'
      }).on('error', onError))
      .pipe(htmlmin({
        collapseWhitespace: true,
        caseSensitive: false // 大文字と小文字を区別して属性を扱う（カスタムHTMLタグ用）
      }))
      .pipe(prettify({
        indent_size: 2,
        indent_inner_html: false,
        extra_liners: ['body', '!--'],
        js: {brace_style: 'preserve-inline'}
      }))
      .pipe(lec({ eolc: END_OF_LINE, ENCODING}))
      .pipe(gulp.dest(destDir));
  });
  callback();
};

exports.markup = markup;
