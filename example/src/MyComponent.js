/** @jsx React.DOM */

var React = require('react-tools/build/modules/React');
var myimg = require('./myimg.jpg');

var MyComponent = React.createClass({
  render: function() {
    return <html><body><img src={myimg} /></body></html>;
  }
});

module.exports = MyComponent;