var R = require('ramda');

var lens = R.curry(function(setter, getter, path) {
  var focus = R.lensPath(path);
  return {
    set: R.pipe(R.set(focus), setter),
    modify: R.pipe(R.over(focus), setter),
    read: () => R.clone(getter(R.view(focus))),
    narrow: (p2) => lens(setter)(getter)(R.concat(path, p2))
  };
});

module.exports = lens;
