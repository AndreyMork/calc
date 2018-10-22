import gulp from 'gulp';
import repl from 'repl';
import debug from 'debug';
import container from './src/container';


gulp.task('debugConsole', (done) => {
  debug.enable('*,-calc:utils*');
  const replServer = repl.start({
    prompt: '> ',
  });

  Object.keys(container).forEach((key) => {
    replServer.context[key] = container[key];
  });

  done();
});
