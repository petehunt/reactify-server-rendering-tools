#!/usr/bin/env node

var browserify = require('browserify');
var fs = require('fs');
var optimist = require('optimist');
var watchify = require('watchify');

var argv = optimist
  .usage('Usage: $0 -o [output filename] -t [transform module] -b [base module root] [-d] [-w] [module ID...]')
  .demand(['o', 'b'])
  .alias('o', 'output')
  .describe('o', 'Output bundle filename')
  .alias('b', 'base')
  .describe('b', 'Base directory to compute module IDs from')
  .boolean('d')
  .alias('d', 'debug')
  .describe('d', 'Debug mode: include sourcemaps and do not minify')
  .boolean('w')
  .alias('w', 'watch')
  .describe('w', 'Rebuild automatically when the source is changed')
  .alias('t', 'transform')
  .describe('t', 'Extra Browserify transform module to use')
  .argv;

var transforms = [
  'reactify',
  'staticify'
].concat(argv.t || []);

if (!argv.d) {
  transforms.push('uglifyify');
}

var roots = argv._;
var baseDir = argv.b;

var b = browserify();

transforms.forEach(b.transform.bind(b));

var requireOpts = {};
if (argv.b) {
  requireOpts.basedir = argv.b;
}

b.require(
  require.resolve('reactify-server-rendering'),
  {expose: 'reactify-server-rendering'}
);

roots.forEach(function(root) {
  b.require(root, {expose: root, basedir: baseDir});
});

// This should be the same as the one used by reactify-server-rendering
// so it's not double bundled.
b.require(
  require.resolve('react-tools/build/modules/React'),
  {expose: 'React'}
);

function updateBundle() {
  b.bundle({debug: argv.d}, function(err, result) {
    if (err) {
      console.error(err);
    } else {
      fs.writeFileSync(argv.o, result);
    }
  });
}

if (argv.w) {
  watchify(b).on('update', updateBundle);
}

updateBundle();
