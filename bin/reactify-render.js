#!/usr/bin/env node

var fs = require('fs');
var optimist = require('optimist');

var argv = optimist
  .usage('Usage: $0 -b [bundle filename] -u [public bundle URL] -p [props as json] [module ID]')
  .demand(['b', 'u'])
  .alias('b', 'bundle')
  .describe('b', 'Bundle filename as produced by reactify')
  .alias('u', 'url')
  .describe('u', 'Bundle URL that will be embedded in the generated HTML')
  .alias('p', 'props')
  .describe('p', 'React props, encoded as JSON')
  .argv;

if (argv._.length !== 1) {
  throw new Error('You must provide a single module ID to render.');
}

var props = JSON.parse(argv.p || 'null');

eval(fs.readFileSync(argv._[0], 'utf8'));

// Now we have Browserify's require() which includes:
// - The app
// - reactify-server-rendering
// - React
console.log(
  require('reactify-server-rendering').serverRender(
    argv._[0],
    props,
    argv.u
  )
);
