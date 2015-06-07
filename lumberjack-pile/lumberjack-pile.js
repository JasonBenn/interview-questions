import 'source-map-support/register'
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var assert = require('./tiny-test')

var data = fs.readFileSync(path.join(__dirname, 'easy.txt'))
var lines = data.toString().split("\n")
var splitLines = _.map(lines, function(line) { return line.split(" ").map(function(num) { return +num }) })

var [[dimensions], [logsToPlace], ...existingPiles] = splitLines

assert('existingPiles', existingPiles, [[1, 1, 1], [2, 1, 3], [1, 4, 1]])

var findMin = function(grid) {
  return _.min(_.flatten(grid))
}

assert('findMin', 1, findMin([[1, 1, 1], [2, 1, 3], [1, 4, 1]]))

function distribute(logPiles, numLogsToPlace) {
  var min = findMin(logPiles)
  _.times(dimensions, (row) => {
    _.times(dimensions, (column) => {
      if (numLogsToPlace > 0) {
        if (logPiles[row][column] === min) {
          --numLogsToPlace;
          ++logPiles[row][column];
        }
      }
    })
  })
  if (numLogsToPlace > 0) distribute(logPiles, numLogsToPlace)
  return logPiles
}

assert('distribute', distribute(existingPiles, logsToPlace), [[3, 2, 2], [2, 2, 3], [2, 4, 2]])