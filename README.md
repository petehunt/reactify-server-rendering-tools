# reactify-server-rendering-tools

React apps in, a single server-or-browser JS file out.

## Example

```sh
node bin/reactify.js -b example/src -d -o example/bundle.js ./MyComponent
```

## More help

```
Usage: node ./bin/reactify.js -o [output filename] -t [transform module] -b [base module root] [-d] [-w] [module ID...]

Options:
  -o, --output     Output bundle filename                            [required]
  -b, --base       Base directory to compute module IDs from         [required]
  -d, --debug      Debug mode: include sourcemaps and do not minify
  -w, --watch      Rebuild automatically when the source is changed
  -t, --transform  Extra Browserify transform module to use

Missing required arguments: o, b
```
