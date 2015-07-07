/*

cake_tuples = [(7, 160), (3, 90), (2, 15)]
capacity    = 20


low capacity, large cakes: no solution
f([(2, 20)], 1) => 0

high capacity, one type of cake: fill the bag with what i can fit
f([(5, 20)], 20): 80

high capacity, one type of cake, remainder: fill the bag
f([(5, 20)], 23): 80

high capacity, two types of cake, remainder filled by second type: fill the bag
f([(5, 20), (3, 5)], 23): 85

cake_tuples = [(7, 160), (3, 90), (2, 15)]
22.8, 30, 7.5

if capacity is a multiple of the most valuable type of cake, use that cake


first subproblem:
* find cake values
* are certain cakes ever worth it?
* is it a multiple of the most valuable type of cake? if so, fill the bag with that.
* can we fill the remainder with smaller cake?

capacity = 20

KNOWNS:
* cakeValue
* cakeWeight
* duffelCapacity
* cakeValueByWeight

UNKNOWNS:
* optimalHaul
* haulValue

*/

var __ = require('lodash');

function assert(expected, actual) {
  if (expected !== actual) {
    console.log(expected.toString() + ' !== ' + actual.toString())
  } else {
    console.log('✓')
  }
}

function selectCake(cakes, duffelCapacity) {
  var cakesByValue = cakes.map(computeCakeValue)

  var cakesByValueSorted = __.sortBy(cakesByValue, function(cake) {
    return -cake.valueByWeight;
  })

  var mostValuableCake = cakesByValueSorted[0]

  var remainingDuffelCapacity = duffelCapacity;

  return __.reduce(cakesByValueSorted, function(duffelValue, cake) {
    if (cake.weight === 0) return duffelValue;
    var numCakes = Math.floor(remainingDuffelCapacity / cake.weight)
    remainingDuffelCapacity -= numCakes * cake.weight;
    return duffelValue + numCakes * cake.totalValue;

  }, 0)
}

function computeCakeValue(cake) {
  var cakeValue = cake[1] / cake[0]
  return { valueByWeight: cakeValue, weight: cake[0], totalValue: cake[1] };
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

