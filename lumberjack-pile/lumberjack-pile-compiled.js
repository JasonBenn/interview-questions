'use strict';

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

require('source-map-support/register');

var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var assert = require('./tiny-test');

var data = fs.readFileSync(path.join(__dirname, 'easy.txt'));
var lines = data.toString().split('\n');
var splitLines = _.map(lines, function (line) {
  return line.split(' ').map(function (num) {
    return +num;
  });
});

var _splitLines = _toArray(splitLines);

var _splitLines$0 = _slicedToArray(_splitLines[0], 1);

var dimensions = _splitLines$0[0];

var _splitLines$1 = _slicedToArray(_splitLines[1], 1);

var logsToPlace = _splitLines$1[0];

var existingPiles = _splitLines.slice(2);

var findMin = function findMin(grid) {
  return _.min(_.flatten(grid));
};

assert('findMin', 1, findMin([[1, 1, 1], [2, 1, 3], [1, 4, 1]]));
assert('existingPiles', existingPiles, [[1, 1, 1], [2, 1, 3], [1, 4, 1]]);

function distribute(logPiles, numLogsToPlace) {
  var min = findMin(logPiles);
  _.times(dimensions, function (row) {
    _.times(dimensions, function (column) {
      if (numLogsToPlace > 0) {
        if (logPiles[row][column] === min) {
          --numLogsToPlace;
          debugger;
          ++logPiles[row][column];
        }
      }
    });
  });
  if (numLogsToPlace > 0) distribute(logPiles, numLogsToPlace);
  return logPiles;
}

assert('distribute', distribute(existingPiles, logsToPlace), [[3, 2, 2], [2, 2, 3], [2, 4, 2]]);

//# sourceMappingURL=data:application/json;base64,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QyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEiLCJmaWxlIjoibHVtYmVyamFjay1waWxlLWNvbXBpbGVkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInXG52YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xudmFyIGZzID0gcmVxdWlyZSgnZnMnKTtcbnZhciBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xudmFyIGFzc2VydCA9IHJlcXVpcmUoJy4vdGlueS10ZXN0JylcblxudmFyIGRhdGEgPSBmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKF9fZGlybmFtZSwgJ2Vhc3kudHh0JykpXG52YXIgbGluZXMgPSBkYXRhLnRvU3RyaW5nKCkuc3BsaXQoXCJcXG5cIilcbnZhciBzcGxpdExpbmVzID0gXy5tYXAobGluZXMsIGZ1bmN0aW9uKGxpbmUpIHsgcmV0dXJuIGxpbmUuc3BsaXQoXCIgXCIpLm1hcChmdW5jdGlvbihudW0pIHsgcmV0dXJuICtudW0gfSkgfSlcblxudmFyIFtbZGltZW5zaW9uc10sIFtsb2dzVG9QbGFjZV0sIC4uLmV4aXN0aW5nUGlsZXNdID0gc3BsaXRMaW5lc1xuXG52YXIgZmluZE1pbiA9IGZ1bmN0aW9uKGdyaWQpIHtcbiAgcmV0dXJuIF8ubWluKF8uZmxhdHRlbihncmlkKSlcbn1cblxuYXNzZXJ0KCdmaW5kTWluJywgMSwgZmluZE1pbihbWzEsIDEsIDFdLCBbMiwgMSwgM10sIFsxLCA0LCAxXV0pKVxuYXNzZXJ0KCdleGlzdGluZ1BpbGVzJywgZXhpc3RpbmdQaWxlcywgW1sxLCAxLCAxXSwgWzIsIDEsIDNdLCBbMSwgNCwgMV1dKVxuXG5mdW5jdGlvbiBkaXN0cmlidXRlKGxvZ1BpbGVzLCBudW1Mb2dzVG9QbGFjZSkge1xuICB2YXIgbWluID0gZmluZE1pbihsb2dQaWxlcylcbiAgXy50aW1lcyhkaW1lbnNpb25zLCAocm93KSA9PiB7XG4gICAgXy50aW1lcyhkaW1lbnNpb25zLCAoY29sdW1uKSA9PiB7XG4gICAgICBpZiAobnVtTG9nc1RvUGxhY2UgPiAwKSB7XG4gICAgICAgIGlmIChsb2dQaWxlc1tyb3ddW2NvbHVtbl0gPT09IG1pbikge1xuICAgICAgICAgIC0tbnVtTG9nc1RvUGxhY2U7XG4gICAgICAgICAgZGVidWdnZXJcbiAgICAgICAgICArK2xvZ1BpbGVzW3Jvd11bY29sdW1uXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG4gIGlmIChudW1Mb2dzVG9QbGFjZSA+IDApIGRpc3RyaWJ1dGUobG9nUGlsZXMsIG51bUxvZ3NUb1BsYWNlKVxuICByZXR1cm4gbG9nUGlsZXNcbn1cblxuYXNzZXJ0KCdkaXN0cmlidXRlJywgZGlzdHJpYnV0ZShleGlzdGluZ1BpbGVzLCBsb2dzVG9QbGFjZSksIFtbMywgMiwgMl0sIFsyLCAyLCAzXSwgWzIsIDQsIDJdXSkiXX0=