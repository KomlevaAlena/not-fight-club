const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const htmlclean = require('gulp-htmlclean');
const typograf = require('gulp-typograf');
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const changed = require('gulp-changed');
const sourceMaps = require('gulp-sourcemaps');
const groupMedia = require('gulp-group-css-media-queries');
const imagemin = require('gulp-imagemin');
const svgsprite = require('gulp-svg-sprite');
const clean = require('gulp-clean');
const replace = require('gulp-replace');
const fs = require('fs');
const webpack = require('webpack-stream');

gulp.task('clean:docs', function (done) {
  if (fs.existsSync('./docs/')) {
    return gulp.src('./docs/', { read: false }).pipe(clean({ force: true }));
  }
  done();
});

const plumberNotify = (title) => ({
  errorHandler: notify.onError({
    title: title,
    message: 'Error <%= error.message %>',
    sound: false,
  }),
});

const fileIncludeSetting = {
  prefix: '@@',
  basepath: '@file',
};

// HTML для корня
gulp.task('htmlRoot:docs', function () {
  return gulp
    .src(['./src/html/index.html'])
    .pipe(plumber(plumberNotify('HTML')))
    .pipe(fileInclude(fileIncludeSetting))
    .pipe(htmlclean())
    .pipe(gulp.dest('./docs/'));
});

// HTML для внутренних страниц
gulp.task('htmlPages:docs', function () {
  return gulp
    .src(['./src/html/pages/**/*.html'])
    .pipe(plumber(plumberNotify('HTML Pages')))
    .pipe(fileInclude(fileIncludeSetting))
    // Переписываем абсолютные пути на относительные
    .pipe(
      replace(/(href|src|srcset)=["']\/(css|js|img|fonts|files)\/([^"']+)["']/g, (match, attr, folder, file) => {
        return `${attr}="../${folder}/${file}"`;
      })
    )
    .pipe(htmlclean())
    .pipe(gulp.dest('./docs/pages/'));
});

gulp.task('html:docs', gulp.parallel('htmlRoot:docs', 'htmlPages:docs'));

// SASS
gulp.task('sass:docs', function () {
  return gulp
    .src('./src/scss/*.scss')
    .pipe(changed('./docs/css/'))
    .pipe(plumber(plumberNotify('SCSS')))
    .pipe(sourceMaps.init())
    .pipe(autoprefixer())
    .pipe(sassGlob())
    .pipe(groupMedia())
    .pipe(sass())
    .pipe(csso())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./docs/css/'));
});

// JS
gulp.task('js:docs', function () {
  return gulp
    .src('./src/js/*.js')
    .pipe(changed('./docs/js/'))
    .pipe(plumber(plumberNotify('JS')))
    .pipe(webpack(require('./../webpack.config.js')))
    .pipe(gulp.dest('./docs/js/'));
});

// Images
gulp.task('images:docs', function () {
  return gulp
    .src(['./src/img/**/*', '!./src/img/svgicons/**/*'])
    .pipe(changed('./docs/img/'))
    .pipe(imagemin())
    .pipe(gulp.dest('./docs/img/'));
});

// SVG
const svgSymbol = {
  mode: { symbol: { sprite: '../sprite.symbol.svg' } },
  shape: {
    transform: [{ svgo: { plugins: [{ name: 'removeAttrs', params: { attrs: '(fill|stroke)' } }] } }],
  },
};
gulp.task('svgSymbol:docs', function () {
  return gulp
    .src('./src/img/svgicons/**/*.svg')
    .pipe(plumber(plumberNotify('SVG')))
    .pipe(svgsprite(svgSymbol))
    .pipe(gulp.dest('./docs/img/svgsprite/'));
});

// Files
gulp.task('files:docs', function () {
  return gulp.src('./src/files/**/*').pipe(changed('./docs/files/')).pipe(gulp.dest('./docs/files/'));
});

// Server
gulp.task('server:docs', function () {
  return gulp.src('./docs/').pipe(
    require('gulp-server-livereload')({
      port: process.env.PORT || 8001,
      livereload: true,
      open: true,
    })
  );
});

// Основная задача
gulp.task(
  'docs',
  gulp.series(
    'clean:docs',
    gulp.parallel('html:docs', 'sass:docs', 'js:docs', 'images:docs', 'svgSymbol:docs', 'files:docs'),
    'server:docs'
  )
);
