var R = require('ramda');
var jsc = require('jsverify');
var lens = require('../index');

var initState = function() { return {a: {b: 10}}; }
var setter = function(fn) { return fn(initState()); }
var testLens = lens(setter, initState, ['a']);

var set =
  jsc.forall("json", function(o) {
    return testLens.set(o).a == o &&
      testLens.narrow(['b']).set(o).a.b == o;
  });

var modify =
  jsc.forall("integer", function(i) {
    return testLens.narrow(['b']).modify(R.add(i)).a.b == (i + 10);
  });

var read =
  jsc.forall("json", function(o) {
    testLens.read().b = o;
    return testLens.read().b == initState().a.b;
  });

console.log("sets values");
jsc.assert(set);
console.log("modifies values");
jsc.assert(modify);
console.log("reads values");
jsc.assert(read);
