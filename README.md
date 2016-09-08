#StateLens

StateLens is a tiny (11 LOC) lib that uses the [Ramda](http://ramdajs.com/)
library, particularly the lens functions, to provide a lens structure
that is useful for state manipulations.

It was initially written to support large React applications without
the need for a complex state container.

##Installation

Install via npm

```bash
npm install statelens
```

###Usage

StateLens provides a single constructor function which takes three
parameters, a setter, getter and initial focus.

####Example

  var statelens = require('statelens');

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

####Setter

(State -> State) -> void

A function which accepts a state transformation function as it's sole parameter, and it should execute the passed transformation by
passing in the current state.


####Getter

() -> State

A zero parameter function that returns the current state.

####Focus

[string|number]

An array of strings and numbers indicating the path in the state structure on which the initial focus is set. For example with a state of
`{a: [{foo: 'bar'}]}`, a focus of `['a', 0, 'foo']` will be set on the
location of the value `'bar'`.

###Methods

The provided constructor returns an object with four functions on it.

####set

(A) -> void

Replaces the focus of the current lens with the provided value, and passes
the resulting state to the lenses Setter.

####modify

(Focus -> A) -> void

Takes a function from focused portion of the current state to a new value.

Passes the focused portion of the current state to the provided function,
replaces the focus of the current state with the result, and passes the
resulting state to the lenses Setter.

####read

() -> Focus

Returns a deep copy of the focused portion of the current state.

####narrow

([number|string]) -> StateLens

Takes a new focus parameter, and returns a new lens focused on the
concatentation of the original lenses path with the newly provided
path.
