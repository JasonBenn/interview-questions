// Review:
// Strategy that could have worked: start with a tiny piece, build up.
// Other room for improvement: discuss tradeoffs for an efficient but non-optimal solution.
// Maybe I could have just filled the knapsack with the most expensive cakes, then the remainder with less efficient cakes - my so called "naive solution" from last time.
// Where this had a cost of O(n * k) (where n is number of cakes, k is size of knapsack) and a space cost of O(k) (for maxValuesAtCapacities)...
// The non-optimal solution had a sort cost of O(nlog(n)) and a space cost of O(n) (for the sorted cakes)

var __ = require('lodash');

// Test framework
function assert(expected, actual) {
  if (expected !== actual) {
    console.log('✘ ' + expected.toString() + ' !== ' + actual.toString())
  } else {
    console.log('✓')
  }
}

function selectCake(cakes, duffelCapacity) {
  var allCapacities = __.range(1, duffelCapacity + 1);
  var maxValuesAtCapacities = __.reduce(allCapacities, maxValueForCapacity(cakes), {0: 0})
  return maxValuesAtCapacities[duffelCapacity];
}

function maxValueForCapacity(cakes) {
  return function(maxValuesAtCapacities, capacity) {
    var maxValueForCapacity = 0;

    cakes.forEach(function(cake) {
      var weight = cake[0]
      var value = cake[1]

      if (weight > capacity) return;

      var remainder = capacity - weight
      var possibleMaxValue = maxValuesAtCapacities[remainder] + value;
      if (possibleMaxValue > maxValueForCapacity) {
        maxValueForCapacity = possibleMaxValue;
      }
    })

    maxValuesAtCapacities[capacity] = maxValueForCapacity;
    return maxValuesAtCapacities;
  }
}


var cakes = [[7, 160], [3, 90], [2, 15]]

assert(selectCake(cakes, 0), 0)
assert(selectCake(cakes, 1), 0)
assert(selectCake(cakes, 2), 15)
assert(selectCake(cakes, 3), 90)
assert(selectCake(cakes, 3), 90)
assert(selectCake(cakes, 5), 105)
assert(selectCake(cakes, 7), 180)
assert(selectCake(cakes, 9), 270)
assert(selectCake(cakes, 10), 270)
assert(selectCake(cakes, 11), 285)
assert(selectCake(cakes, 12), 360)
assert(selectCake(cakes, 20), 555)

// goal: two medium value cakes > 1 large value cake, given capacity.
var closeInValueCakes = [[10, 20], [15, 35]]
assert(selectCake(closeInValueCakes, 20), 40)

// goal: optimal solution steps through three kinds of cakes.
var optimalUsesThreeCakes = [[10, 30], [5, 10], [1, 1]]
assert(selectCake(optimalUsesThreeCakes, 16), 41)

// goal: optimal solution steps through three kinds of cakes.
var withZeroCake = [[0, 0], [5, 10], [1, 1]]
assert(selectCake(withZeroCake, 6), 11)

// goal: optimal solution steps through three kinds of cakes.
var onlyZeroCake = [[0, 0]]
assert(selectCake(onlyZeroCake, 10), 0)
