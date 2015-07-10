var { Range } = require('immutable');

function assert(actual, expected) {
  if (expected !== actual) {
    console.log(`✘ expected: #{expected} !== actual: #{actual}`)
  } else {
    console.log('✓')
  }
}

function isOdd(n) {
  return n % 2 === 1;
}

function isSpring(cycle) {
  return isOdd(cycle);
}

function heightAfterCycle(height, cycle) {
  return isSpring(cycle) ? height * 2 : height + 1;
}

function heightAfterCycles(cycles) {
  return Range(1, cycles + 1).reduce(heightAfterCycle, 1)
}

[
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 6],
  [4, 7],
  [5, 14],
  [6, 15],
  [7, 30],
  [8, 31],
].forEach(function(pair) {
  var cycles = pair[0]
  var height = pair[1]
  assert(heightAfterCycles(cycles), height)
});