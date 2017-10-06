// console.log([for (n of [1, 2, 3]) n])
// let {type, loc, ...remainder} = {type: 1, e: 5, z: 10, loc: 2, c: 3, d: 4}

'use strict';

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

require('source-map-support/register');

require('babel/polyfill');

var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var assert = require('tiny-test');

var data = fs.readFileSync(path.join(__dirname, '../easy.txt'));
var lines = data.toString().split('\n');
var splitLines = _.map(lines, function (line) {
  return line.split(' ').map(function (num) {
    return +num;
  });
});

var _splitLines = _toArray(splitLines);

var _splitLines$0 = _slicedToArray(_splitLines[0], 1);

var dimension = _splitLines$0[0];

var _splitLines$1 = _slicedToArray(_splitLines[1], 1);

var logsToPlace = _splitLines$1[0];

var existingPiles = _splitLines.slice(2);

assert('existingPiles', existingPiles, [[1, 1, 1], [2, 1, 3], [1, 4, 1]]);

var findMin = function findMin(grid) {
  return _.min(_.flatten(grid));
};

assert('findMin', 1, findMin([[1, 1, 1], [2, 1, 3], [1, 4, 1]]));

function handleLogPile(_ref) {
  var logPile = _ref.logPile;
  var min = _ref.min;
  var logsToPlace = _ref.logsToPlace;
}

function upTo(length) {
  return Array.from(new Array(length), function (x, i) {
    return i;
  });
}

function handleLogPile(logPile) {
  if (logPile === min) {
    console.log(min);
    min--;
    return logPile + 1;
  } else {
    return logPile;
  }
}

function distribute(logPiles, logsToPlace) {
  var min = findMin(logPiles);

  var indices = upTo(dimension);
  debugger;
  var logLocations = (function () {
    var _logLocations = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = indices[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var row = _step.value;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = indices[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var column = _step2.value;

            _logLocations.push([row, column]);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2['return']) {
              _iterator2['return']();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return _logLocations;
  })();
  console.log(logLocations);
}

assert('distribute', distribute(existingPiles, logsToPlace), [[3, 2, 2], [2, 2, 3], [2, 4, 2]]);
// smallestPiles = [for (row of logPiles) [for (logPile of row) ]]

// if (logsToPlace > 0) distribute(logPiles, logsToPlace)
// return logPiles
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sdW1iZXJqYWNrLXBpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O1FBR08sNkJBQTZCOztRQUM3QixnQkFBZ0I7O0FBQ3ZCLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMxQixJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdkIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQTs7QUFFakMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFBO0FBQy9ELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDdkMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsVUFBUyxJQUFJLEVBQUU7QUFBRSxTQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVMsR0FBRyxFQUFFO0FBQUUsV0FBTyxDQUFDLEdBQUcsQ0FBQTtHQUFFLENBQUMsQ0FBQTtDQUFFLENBQUMsQ0FBQTs7MkJBRXRELFVBQVU7Ozs7SUFBekQsU0FBUzs7OztJQUFJLFdBQVc7O0lBQU0sYUFBYTs7QUFFakQsTUFBTSxDQUFDLGVBQWUsRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7O0FBRXpFLElBQUksT0FBTyxHQUFHLFNBQVYsT0FBTyxDQUFZLElBQUksRUFBRTtBQUMzQixTQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0NBQzlCLENBQUE7O0FBRUQsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7O0FBRWhFLFNBQVMsYUFBYSxDQUFDLElBQTJCLEVBQUU7TUFBNUIsT0FBTyxHQUFSLElBQTJCLENBQTFCLE9BQU87TUFBRSxHQUFHLEdBQWIsSUFBMkIsQ0FBakIsR0FBRztNQUFFLFdBQVcsR0FBMUIsSUFBMkIsQ0FBWixXQUFXO0NBQ2hEOztBQUVELFNBQVMsSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUNwQixTQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsVUFBQyxDQUFDLEVBQUUsQ0FBQztXQUFLLENBQUM7R0FBQSxDQUFDLENBQUE7Q0FDbEQ7O0FBRUQsU0FBUyxhQUFhLENBQUMsT0FBTyxFQUFFO0FBQzlCLE1BQUksT0FBTyxLQUFLLEdBQUcsRUFBRTtBQUNuQixXQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ2hCLE9BQUcsRUFBRSxDQUFBO0FBQ0wsV0FBTyxPQUFPLEdBQUcsQ0FBQyxDQUFBO0dBQ25CLE1BQU07QUFDTCxXQUFPLE9BQU8sQ0FBQTtHQUNmO0NBQ0Y7O0FBRUQsU0FBUyxVQUFVLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRTtBQUN6QyxNQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7O0FBRTNCLE1BQUksT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUM3QixXQUFRO0FBQ1IsTUFBSSxZQUFZOzs7Ozs7OzJCQUFnQixPQUFPO1lBQWQsR0FBRzs7Ozs7O2dDQUE0QixPQUFPO2dCQUFqQixNQUFNOzsrQkFBYSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQUFDLENBQUE7QUFDL0UsU0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtDQU0xQjs7QUFFRCxNQUFNLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEiLCJmaWxlIjoibHVtYmVyamFjay1waWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gY29uc29sZS5sb2coW2ZvciAobiBvZiBbMSwgMiwgM10pIG5dKVxuLy8gbGV0IHt0eXBlLCBsb2MsIC4uLnJlbWFpbmRlcn0gPSB7dHlwZTogMSwgZTogNSwgejogMTAsIGxvYzogMiwgYzogMywgZDogNH1cblxuaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInXG5pbXBvcnQgJ2JhYmVsL3BvbHlmaWxsJ1xudmFyIF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcbnZhciBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG52YXIgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbnZhciBhc3NlcnQgPSByZXF1aXJlKCd0aW55LXRlc3QnKVxuXG52YXIgZGF0YSA9IGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vZWFzeS50eHQnKSlcbnZhciBsaW5lcyA9IGRhdGEudG9TdHJpbmcoKS5zcGxpdChcIlxcblwiKVxudmFyIHNwbGl0TGluZXMgPSBfLm1hcChsaW5lcywgZnVuY3Rpb24obGluZSkgeyByZXR1cm4gbGluZS5zcGxpdChcIiBcIikubWFwKGZ1bmN0aW9uKG51bSkgeyByZXR1cm4gK251bSB9KSB9KVxuXG52YXIgW1tkaW1lbnNpb25dLCBbbG9nc1RvUGxhY2VdLCAuLi5leGlzdGluZ1BpbGVzXSA9IHNwbGl0TGluZXNcblxuYXNzZXJ0KCdleGlzdGluZ1BpbGVzJywgZXhpc3RpbmdQaWxlcywgW1sxLCAxLCAxXSwgWzIsIDEsIDNdLCBbMSwgNCwgMV1dKVxuXG52YXIgZmluZE1pbiA9IGZ1bmN0aW9uKGdyaWQpIHtcbiAgcmV0dXJuIF8ubWluKF8uZmxhdHRlbihncmlkKSlcbn1cblxuYXNzZXJ0KCdmaW5kTWluJywgMSwgZmluZE1pbihbWzEsIDEsIDFdLCBbMiwgMSwgM10sIFsxLCA0LCAxXV0pKVxuXG5mdW5jdGlvbiBoYW5kbGVMb2dQaWxlKHtsb2dQaWxlLCBtaW4sIGxvZ3NUb1BsYWNlfSkge1xufVxuXG5mdW5jdGlvbiB1cFRvKGxlbmd0aCkge1xuICByZXR1cm4gQXJyYXkuZnJvbShuZXcgQXJyYXkobGVuZ3RoKSwgKHgsIGkpID0+IGkpXG59XG5cbmZ1bmN0aW9uIGhhbmRsZUxvZ1BpbGUobG9nUGlsZSkge1xuICBpZiAobG9nUGlsZSA9PT0gbWluKSB7XG4gICAgY29uc29sZS5sb2cobWluKVxuICAgIG1pbi0tXG4gICAgcmV0dXJuIGxvZ1BpbGUgKyAxXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxvZ1BpbGVcbiAgfVxufVxuXG5mdW5jdGlvbiBkaXN0cmlidXRlKGxvZ1BpbGVzLCBsb2dzVG9QbGFjZSkge1xuICBsZXQgbWluID0gZmluZE1pbihsb2dQaWxlcylcblxuICB2YXIgaW5kaWNlcyA9IHVwVG8oZGltZW5zaW9uKVxuICBkZWJ1Z2dlclxuICBsZXQgbG9nTG9jYXRpb25zID0gW2ZvciAocm93IG9mIGluZGljZXMpIGZvciAoY29sdW1uIG9mIGluZGljZXMpIFtyb3csIGNvbHVtbl1dXG4gIGNvbnNvbGUubG9nKGxvZ0xvY2F0aW9ucylcblxuICAvLyBzbWFsbGVzdFBpbGVzID0gW2ZvciAocm93IG9mIGxvZ1BpbGVzKSBbZm9yIChsb2dQaWxlIG9mIHJvdykgXV1cblxuICAvLyBpZiAobG9nc1RvUGxhY2UgPiAwKSBkaXN0cmlidXRlKGxvZ1BpbGVzLCBsb2dzVG9QbGFjZSlcbiAgLy8gcmV0dXJuIGxvZ1BpbGVzXG59XG5cbmFzc2VydCgnZGlzdHJpYnV0ZScsIGRpc3RyaWJ1dGUoZXhpc3RpbmdQaWxlcywgbG9nc1RvUGxhY2UpLCBbWzMsIDIsIDJdLCBbMiwgMiwgM10sIFsyLCA0LCAyXV0pXG5cbiJdfQ==