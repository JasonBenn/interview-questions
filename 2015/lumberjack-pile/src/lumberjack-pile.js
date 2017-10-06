// console.log([for (n of [1, 2, 3]) n])
// let {type, loc, ...remainder} = {type: 1, e: 5, z: 10, loc: 2, c: 3, d: 4}

import 'source-map-support/register'
import 'babel/polyfill'
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var assert = require('tiny-test')

var data = fs.readFileSync(path.join(__dirname, '../easy.txt'))
var lines = data.toString().split("\n")
var splitLines = _.map(lines, function(line) { return line.split(" ").map(function(num) { return +num }) })

var [[dimension], [logsToPlace], ...existingPiles] = splitLines

assert('existingPiles', existingPiles, [[1, 1, 1], [2, 1, 3], [1, 4, 1]])

var findMin = function(grid) {
  return _.min(_.flatten(grid))
}

assert('findMin', 1, findMin([[1, 1, 1], [2, 1, 3], [1, 4, 1]]))

function handleLogPile({logPile, min, logsToPlace}) {
}

function upTo(length) {
  return Array.from(new Array(length), (x, i) => i)
}

function handleLogPile(logPile) {
  if (logPile === min) {
    console.log(min)
    min--
    return logPile + 1
  } else {
    return logPile
  }
}

function distribute(logPiles, logsToPlace) {
  let min = findMin(logPiles)

  var indices = upTo(dimension)
  debugger
  let logLocations = [for (row of indices) for (column of indices) [row, column]]
  console.log(logLocations)

  // smallestPiles = [for (row of logPiles) [for (logPile of row) ]]

  // if (logsToPlace > 0) distribute(logPiles, logsToPlace)
  // return logPiles
}

assert('distribute', distribute(existingPiles, logsToPlace), [[3, 2, 2], [2, 2, 3], [2, 4, 2]])

