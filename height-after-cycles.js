// 1m sapling, planted at end of winter
// every spring it doubles
// every summer it grows a meter
// people want Xm of a tree
// given X cycles, how tall is the tree

// num cycles - height
// 0 1 winter
// 1 2 spring
// 2 3 summer
// 3 6 spring
// 4 7 summer
// 5 14 spring
// 6 15 summer
// 7 30 spring
// 8 31 summer

// odd = spring
// even = summer



var __ = require('lodash');

function assert(actual, expected) {
  if (expected !== actual) {
    console.log('✘ expected: ' + expected.toString() + ' !== actual: ' + actual.toString())
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
  return __.reduce(__.range(1, cycles + 1), heightAfterCycle, 1)
}

;[
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