'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

require('source-map-support/register');

require('babel/polyfill');

var _lodash = require('lodash');

var _tinyTest = require('tiny-test');

var _tinyTest2 = _interopRequireDefault(_tinyTest);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

(0, _tinyTest2['default'])('testing', true, true);

var readNetworkFile = function readNetworkFile(file) {
  var readFile = function readFile(filename) {
    return _fs2['default'].readFileSync(_path2['default'].join(__dirname, filename), 'utf8');
  };

  var _readFile$split$map = readFile('../data/4-5-valid.txt').split('\n').map(function (line) {
    return line.split(' ').map(function (num) {
      return _lodash._.parseInt(num);
    });
  });

  var _readFile$split$map2 = _toArray(_readFile$split$map);

  var _readFile$split$map2$0 = _slicedToArray(_readFile$split$map2[0], 2);

  var numWires = _readFile$split$map2$0[0];
  var _ = _readFile$split$map2$0[1];

  var switches = _readFile$split$map2.slice(1);

  return { numWires: numWires, switches: switches };
};

var _readNetworkFile = readNetworkFile('../data/4-5-valid');

var numWires = _readNetworkFile.numWires;
var switches = _readNetworkFile.switches;

(0, _tinyTest2['default'])('numWires', 4, numWires);
(0, _tinyTest2['default'])('switches', [[0, 2], [1, 3], [0, 1], [2, 3], [1, 2]], switches);

var swap = function swap(arr, a, b) {
  var oldA = arr[a];
  arr[a] = arr[b];
  arr[b] = oldA;
  return arr;
};

var sort = function sort(_ref) {
  var input = _ref.input;
  var switches = _ref.switches;

  switches.forEach(function (aSwitch) {
    var _aSwitch = _slicedToArray(aSwitch, 2);

    var top = _aSwitch[0];
    var bottom = _aSwitch[1];

    if (input[top] > input[bottom]) swap(input, top, bottom);
  });
  return input;
};

(0, _tinyTest2['default'])('sort', sort({ input: [1, 0], switches: [[0, 1]] }), [0, 1]);
(0, _tinyTest2['default'])('sort the actual array', sort({ input: [3, 2, 4, 1], switches: switches }), [1, 2, 3, 4]);

var binaryPermutations = function binaryPermutations(num) {
  if (num === 1) return [[0], [1]];
  return _lodash._.flatten(binaryPermutations(num - 1).map(function (a) {
    return [a.concat(0), a.concat(1)];
  }));
};

(0, _tinyTest2['default'])('permutations', binaryPermutations(1), [[0], [1]]);
(0, _tinyTest2['default'])('permutations', binaryPermutations(2), [[0, 0], [0, 1], [1, 0], [1, 1]]);
(0, _tinyTest2['default'])('permutations', binaryPermutations(3), [[0, 0, 0], [0, 0, 1], [0, 1, 0], [0, 1, 1], [1, 0, 0], [1, 0, 1], [1, 1, 0], [1, 1, 1]]);

var validateNetwork = function validateNetwork(file) {
  var _readNetworkFile2 = readNetworkFile(file);

  var numWires = _readNetworkFile2.numWires;
  var switches = _readNetworkFile2.switches;

  return zeroOneTestNetwork({ numWires: numWires, switches: switches });
};

var zeroOneTestNetwork = function zeroOneTestNetwork(_ref2) {
  var numWires = _ref2.numWires;
  var switches = _ref2.switches;

  var inputs = binaryPermutations(numWires);
  return _lodash._.every(inputs, function (input) {
    console.log('Input:        ' + JSON.stringify(input));
    console.log('Input.sort(): ' + JSON.stringify(input.sort()));
    console.log('sort(Input):  ' + JSON.stringify(sort({ input: input, switches: switches })));
    return _lodash._.isEqual(sort({ input: input, switches: switches }), input.sort());
  });
};

(0, _tinyTest2['default'])('isValid', validateNetwork('../data/4-5-valid'), true);
(0, _tinyTest2['default'])('isValid', validateNetwork('../data/4-19-invalid'), false);
//# sourceMappingURL=data:application/json;base64,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R0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBTCxLQUFLLEVBQUUsUUFBUSxFQUFSLFFBQVEsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3ZFLFdBQU8sUUF4REgsQ0FBQyxDQXdESyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFMLEtBQUssRUFBRSxRQUFRLEVBQVIsUUFBUSxFQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtHQUN6RCxDQUFDLENBQUE7Q0FDSCxDQUFBOztBQUVELDJCQUFPLFNBQVMsRUFBRSxlQUFlLENBQUMsbUJBQW1CLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUM3RCwyQkFBTyxTQUFTLEVBQUUsZUFBZSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUEiLCJmaWxlIjoidmFsaWRhdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInXG5pbXBvcnQgJ2JhYmVsL3BvbHlmaWxsJ1xuaW1wb3J0IHtfIGFzIF9ffSBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgYXNzZXJ0IGZyb20gJ3RpbnktdGVzdCdcbmltcG9ydCBmcyBmcm9tICdmcydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5cbmFzc2VydCgndGVzdGluZycsIHRydWUsIHRydWUpXG5cbmxldCByZWFkTmV0d29ya0ZpbGUgPSAoZmlsZSkgPT4ge1xuICBsZXQgcmVhZEZpbGUgPSAoZmlsZW5hbWUpID0+IGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oX19kaXJuYW1lLCBmaWxlbmFtZSksICd1dGY4JylcbiAgbGV0IFtbbnVtV2lyZXMsIF9dLCAuLi5zd2l0Y2hlc10gPSByZWFkRmlsZSgnLi4vZGF0YS80LTUtdmFsaWQudHh0Jykuc3BsaXQoXCJcXG5cIikubWFwKChsaW5lKSA9PiBsaW5lLnNwbGl0KCcgJykubWFwKChudW0pID0+IF9fLnBhcnNlSW50KG51bSkpKVxuICByZXR1cm4ge251bVdpcmVzLCBzd2l0Y2hlc31cbn1cblxubGV0IHtudW1XaXJlcywgc3dpdGNoZXN9ID0gcmVhZE5ldHdvcmtGaWxlKCcuLi9kYXRhLzQtNS12YWxpZCcpXG5hc3NlcnQoJ251bVdpcmVzJywgNCwgbnVtV2lyZXMpXG5hc3NlcnQoJ3N3aXRjaGVzJywgW1swLCAyXSwgWzEsIDNdLCBbMCwgMV0sIFsyLCAzXSwgWzEsIDJdXSwgc3dpdGNoZXMpXG5cbmxldCBzd2FwID0gKGFyciwgYSwgYikgPT4ge1xuICBsZXQgb2xkQSA9IGFyclthXVxuICBhcnJbYV0gPSBhcnJbYl1cbiAgYXJyW2JdID0gb2xkQVxuICByZXR1cm4gYXJyXG59XG5cbmxldCBzb3J0ID0gKHtpbnB1dCwgc3dpdGNoZXN9KSA9PiB7XG4gIHN3aXRjaGVzLmZvckVhY2goKGFTd2l0Y2gpID0+IHtcbiAgICBsZXQgW3RvcCwgYm90dG9tXSA9IGFTd2l0Y2hcbiAgICBpZiAoaW5wdXRbdG9wXSA+IGlucHV0W2JvdHRvbV0pIHN3YXAoaW5wdXQsIHRvcCwgYm90dG9tKVxuICB9KVxuICByZXR1cm4gaW5wdXRcbn1cblxuYXNzZXJ0KCdzb3J0Jywgc29ydCh7IGlucHV0OiBbMSwgMF0sIHN3aXRjaGVzOiBbWzAsIDFdXSB9KSwgWzAsIDFdKVxuYXNzZXJ0KCdzb3J0IHRoZSBhY3R1YWwgYXJyYXknLCBzb3J0KHsgaW5wdXQ6IFszLCAyLCA0LCAxXSwgc3dpdGNoZXM6IHN3aXRjaGVzIH0pLCBbMSwgMiwgMywgNF0pXG5cbmxldCBiaW5hcnlQZXJtdXRhdGlvbnMgPSAobnVtKSA9PiB7XG4gIGlmIChudW0gPT09IDEpIHJldHVybiBbWzBdLCBbMV1dXG4gIHJldHVybiBfXy5mbGF0dGVuKGJpbmFyeVBlcm11dGF0aW9ucyhudW0gLSAxKS5tYXAoKGEpID0+IChbYS5jb25jYXQoMCksIGEuY29uY2F0KDEpXSkpKVxufVxuXG5hc3NlcnQoJ3Blcm11dGF0aW9ucycsIGJpbmFyeVBlcm11dGF0aW9ucygxKSwgW1swXSwgWzFdXSlcbmFzc2VydCgncGVybXV0YXRpb25zJywgYmluYXJ5UGVybXV0YXRpb25zKDIpLCBbWzAsIDBdLCBbMCwgMV0sIFsxLCAwXSwgWzEsIDFdXSlcbmFzc2VydCgncGVybXV0YXRpb25zJywgYmluYXJ5UGVybXV0YXRpb25zKDMpLCBbWzAsIDAsIDBdLCBbMCwgMCwgMV0sIFswLCAxLCAwXSwgWzAsIDEsIDFdLCBbMSwgMCwgMF0sIFsxLCAwLCAxXSwgWzEsIDEsIDBdLCBbMSwgMSwgMV1dKVxuXG5cbmxldCB2YWxpZGF0ZU5ldHdvcmsgPSAoZmlsZSkgPT4ge1xuICBsZXQge251bVdpcmVzLCBzd2l0Y2hlc30gPSByZWFkTmV0d29ya0ZpbGUoZmlsZSlcbiAgcmV0dXJuIHplcm9PbmVUZXN0TmV0d29yayh7bnVtV2lyZXMsIHN3aXRjaGVzfSlcbn1cblxubGV0IHplcm9PbmVUZXN0TmV0d29yayA9ICh7bnVtV2lyZXMsIHN3aXRjaGVzfSkgPT4ge1xuICBsZXQgaW5wdXRzID0gYmluYXJ5UGVybXV0YXRpb25zKG51bVdpcmVzKVxuICByZXR1cm4gX18uZXZlcnkoaW5wdXRzLCAoaW5wdXQpID0+IHsgXG4gICAgY29uc29sZS5sb2coXCJJbnB1dDogICAgICAgIFwiICsgSlNPTi5zdHJpbmdpZnkoaW5wdXQpKVxuICAgIGNvbnNvbGUubG9nKFwiSW5wdXQuc29ydCgpOiBcIiArIEpTT04uc3RyaW5naWZ5KGlucHV0LnNvcnQoKSkpXG4gICAgY29uc29sZS5sb2coXCJzb3J0KElucHV0KTogIFwiICsgSlNPTi5zdHJpbmdpZnkoc29ydCh7aW5wdXQsIHN3aXRjaGVzfSkpKVxuICAgIHJldHVybiBfXy5pc0VxdWFsKHNvcnQoe2lucHV0LCBzd2l0Y2hlc30pLCBpbnB1dC5zb3J0KCkpXG4gIH0pXG59XG5cbmFzc2VydCgnaXNWYWxpZCcsIHZhbGlkYXRlTmV0d29yaygnLi4vZGF0YS80LTUtdmFsaWQnKSwgdHJ1ZSlcbmFzc2VydCgnaXNWYWxpZCcsIHZhbGlkYXRlTmV0d29yaygnLi4vZGF0YS80LTE5LWludmFsaWQnKSwgZmFsc2UpXG5cblxuXG5cblxuXG5cbiJdfQ==