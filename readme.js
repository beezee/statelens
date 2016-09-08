var statelens = require('./index');

var state = {a: {b: 0}};

var get = function() { return state; }
var set = function(upd) { state = upd(state); }

var lens = statelens(set, get, ['a']);

// immutable read
lens.read().b = 10;
console.log(lens.read().b) // 0

lens.narrow(['b']).set(10)
console.log(lens.read().b) // 10

lens.narrow(['b']).modify(function(n) { return n + 1; });
console.log(lens.read().b) // 11

