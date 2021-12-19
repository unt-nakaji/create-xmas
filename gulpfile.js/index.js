/**
 *
 * EXPERIENCE ARCHITECTURE gulp template
 * Copyright © un-T factory! All Rights Reserved.
 *
 */

// gulp 記述のため
const { series, parallel } = require('gulp');

// コンパイル、トランスパイル周り
const { markup } = require('./ejs');
const { styles } = require('./styles');
const { script } = require('./script');

// static 周り
const { static } = require('./static');
const { svg } = require('./svg');
const { webp } = require('./webp');

// minify
const { cssMinify } = require('./minify');

// browsersync 系
const { ssi } = require('./ssi');
const { serve } = require('./serve');
const { fileWatch } = require('./file-watch');

// The default task
exports.default = series(parallel(markup, styles, script, static, svg, webp, ssi), fileWatch);

// Development Mode / Browser auto update
exports.serve = series(parallel(markup, styles, script, static, svg, webp, ssi), serve);

// Production Mode
exports.build = series(parallel(markup, styles, script, static, svg, webp, ssi), cssMinify);

// Single command
exports.markup = markup;
exports.styles = styles;
exports.script = script;
exports.static = static;
exports.svg = svg;
exports.webp = webp;
exports.cssMinify = cssMinify;
exports.ssi = ssi;
