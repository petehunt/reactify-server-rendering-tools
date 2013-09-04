#!/usr/bin/env node

var browserify = require('browserify');
var fs = require('fs');
var optimist = require('optimist');
var watchify = require('watchify');

var argv = optimist
  .usage('Usage: $0 -o [output filename] -t [transform module] [-d] [-w] [module ID...]')
  .demand(['o'])
  .alias('o', 'output')
  .describe('o', 'Output bundle filename')
  .boolean('d')
  .alias('d', 'debug')
  .describe('d', 'Debug mode: include sourcemaps and do not minify')
  .boolean('w')
  .alias('w', 'watch')
  .describe('w', 'Rebuild automatically when the source is changed')
  .argv;

var transforms = [
  'reactify',
  'staticify'
].concat(argv.t || []);

if (!argv.d) {
  transforms.push('uglifyify');
}

var roots = ['reactify-server-rendering'].concat(argv._);

var b = browserify();

transforms.forEach(b.transform.bind(b));
roots.forEach(b.require.bind(b));
// This should be the same as the one used by reactify-server-rendering
// so it's not double bundled.
b.require('react-tools/build/modules/React', {expose: 'React'});

function updateBundle() {
  b.bundle({debug: argv.d}, function(err, result) {
    fs.writeFileSync(argv.o, result);
  });
}

if (argv.w) {
  watchify(b).on('update', updateBundle);
}

updateBundle();
