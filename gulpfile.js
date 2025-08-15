const gulp = require('gulp');

// Tasks
require('./gulp/dev.js');
require('./gulp/docs.js');
require('./gulp/fontsDev.js');
require('./gulp/fontsDocs.js');

// Настройки портов
const PORTS = {
  DEV: 8000,
  DOCS: 8001
};

// Основная задача для разработки
gulp.task(
  'default',
  gulp.series(
    'clean:dev',
    'fontsDev',
    gulp.parallel(
      'html:dev',
      'sass:dev',
      'images:dev',
      gulp.series('svgStack:dev', 'svgSymbol:dev'),
      'files:dev',
      'js:dev'
    ),
    gulp.parallel(
      function startDevServer() {
        process.env.PORT = PORTS.DEV;
        return gulp.series('server:dev')();
      },
      'watch:dev'
    )
  )
);

// Задача для документации
gulp.task(
  'docs',
  gulp.series(
    'clean:docs',
    'fontsDocs',
    gulp.parallel(
      'html:docs',
      'sass:docs',
      'images:docs',
      gulp.series('svgStack:docs', 'svgSymbol:docs'),
      'files:docs',
      'js:docs'
    ),
    function startDocsServer() {
      process.env.PORT = PORTS.DOCS;
      return gulp.series('server:docs')();
    }
  )
);
