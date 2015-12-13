# reactify-server-rendering-tools

![unmaintained](http://img.shields.io/badge/status-unmaintained-red.png)

Since React can run on the server, it can replace your whole templating system! And it's super nice. Here are two tools to make this easier.

## Requirements

You need to install `react-tools` **globally**. This will not be done automatically for you.

## reactify CLI

React apps in, a single server-or-browser JS file out. Also works with `staticify`.

### Example

```sh
node bin/reactify.js -b example/src -d -o example/bundle.js ./MyComponent
```

### More help

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

## reactify-render

Takes the bundle that `reactify` generated, a component name and some JSON-encoded props and renders a static web page for you. This page
will boot React when it loads on the client and attach.

Note: you probably don't want to shell out to this in production. Instead, take what this tool does and port it to whatever JS environment you want.
Maybe we make this a standalone server you can hit, or you run it in something like `execjs`.

### Example

```sh
node bin/reactify-render.js -b example/bundle.js -u http://mycdn.com/bundle.js ./MyComponent > ~/tmp/test.html
open ~/tmp/test.html
```

### More help

```
Usage: node ./bin/reactify-render.js -b [bundle filename] -u [public bundle URL] -p [props as json] [module ID]

Options:
  -b, --bundle  Bundle filename as produced by reactify                 [required]
  -u, --url     Bundle URL that will be embedded in the generated HTML  [required]
  -p, --props   React props, encoded as JSON

Missing required arguments: b, u
```
