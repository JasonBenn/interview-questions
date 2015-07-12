// Review:
// Strategy that could have worked: start with a tiny piece, build up.
// Other room for improvement: discuss tradeoffs for an efficient but non-optimal solution.
// Maybe I could have just filled the knapsack with the most expensive cakes, then the remainder with less efficient cakes - my so called "naive solution" from last time.
// Where this had a cost of O(n * k) (where n is number of cakes, k is size of knapsack) and a space cost of O(k) (for allCapacities)...
// The non-optimal solution had a sort cost of O(nlog(n)) and a space cost of O(n) (for the sorted cakes)

import { Range } from 'immutable'

// Test framework
function assert(actual, expected) {
  console.log(expected === actual ? '✓' : `✘ expected: ${expected} !== actual: ${actual}`)
}

function selectCake(cakes, capacity) {
  var allCapacities = Range(1, capacity + 1).reduce(maxValueForCapacity(cakes), {0: 0})
  return allCapacities[capacity];
}

function maxValueForCapacity(cakes) {
  return function(allCapacities, capacity) {
    var maxValueForCapacity = 0;

    cakes.forEach(function(cake) {
      var weight = cake[0]
      var value = cake[1]

      if (weight > capacity) return;

      var remainder = capacity - weight
      var possibleMaxValue = allCapacities[remainder] + value;
      if (possibleMaxValue > maxValueForCapacity) {
        maxValueForCapacity = possibleMaxValue;
      }
    })

    allCapacities[capacity] = maxValueForCapacity;
    return allCapacities;
  }
}


var cakes = [[7, 160], [3, 90], [2, 15]]

var tests = [
  [0, 0],
  [1, 0],
  [2, 15],
  [3, 90],
  [3, 90],
  [5, 105],
  [7, 180],
  [9, 270],
  [10, 270],
  [11, 285],
  [12, 360], 
  [20, 555]
]
tests.forEach(([capacity, prize]) => assert(selectCake(cakes, capacity), prize))

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
