var fs = require('fs');
var path = require('path');
var test = require('tape');
var postcss = require('postcss');

var styleGuide = require('../');

test('exist index.html', function (t) {
    var opts = {
        name: 'Default theme',
        src: 'test/fixture.css',
        dest: 'styleguide/index.html',
    };
    var cwd = process.cwd();
    var src = path.resolve(cwd, 'test/fixture.css');
    var css = fs.readFileSync(src, 'utf-8');
    postcss([styleGuide(opts)])
      .process(css)
      .then(function () {
        var dest = path.resolve(cwd, 'styleguide/index.html');
        var actual = fs.existsSync(dest);
        var expected = true;
        t.same(actual, expected);
        t.end();
      })
      .catch(function (err) {
        t.error(err)
        t.end();
      });
});

