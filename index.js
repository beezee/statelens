var R = require('ramda');

var lens = R.curry(function(setter, getter, path) {
  var focus = R.lensPath(path);
  return {
    set: R.pipe(R.set(focus), setter),
    modify: R.pipe(R.over(focus), setter),
    read: function() { return R.clone(R.view(focus, getter())); },
    narrow: function(p2) {
      return lens(setter)(getter)(R.concat(path, p2));
    }
  };
});

module.exports = lens;
