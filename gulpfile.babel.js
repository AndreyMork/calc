import gulp from 'gulp';
import repl from 'repl';
import debug from 'debug';
import container from './container';


gulp.task('debugConsole', (done) => {
  const replServer = repl.start({
    prompt: '> ',
  });

  const testStr = '1 + 2 * 3';
  const testTokens = container.tokenize(testStr);
  replServer.context.testStr = testStr;
  replServer.context.testTokens = testTokens;
  Object.keys(container).forEach((key) => {
    replServer.context[key] = container[key];
  });

  debug.enable('*,-calc:utils*');
  // debug.enable('*');

  done();
});
