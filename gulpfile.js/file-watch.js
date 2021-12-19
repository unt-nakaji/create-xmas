const { watch } = require('gulp');
const { markup } = require('./ejs');
const { styles } = require('./styles');
const { script } = require('./script');
const { static } = require('./static');

// Watch files
const fileWatch = () => {
  watch('src/ejs/**/*.ejs', markup);
  watch('src/scss/**/*.scss', styles);
  watch('src/es6/**/*.es6', script);
  watch('static/**/*.{jpg,jpeg,png,gif,svg}', static);
};

exports.fileWatch = fileWatch;