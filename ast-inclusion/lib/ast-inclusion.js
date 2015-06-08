// given two asts
// how do you verify that the first contains the second?

// TEST: node A is superset of node B

// treat B like a stack

// A.isSuperset?(B)
// EACH NODE in bigAST
// IF TEST is NODE superset of B.top?
// IF B has no children
// return true
// ELSE
// ALL? CHILD in B.children
// NODE.isSuperset(CHILD)?
// ELSE
// EACH NODE in NODE.children
// TEST is NODE superset of B.top?

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('source-map-support/register');

var _lodash = require('lodash');

var _tinyTest = require('tiny-test');

var _tinyTest2 = _interopRequireDefault(_tinyTest);

var _esprima = require('esprima');

var _esprima2 = _interopRequireDefault(_esprima);

var _prettyjson = require('prettyjson');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var printAST = function printAST(ast) {
  return console.log((0, _prettyjson.render)(ast));
};

var readFile = function readFile(filename) {
  return _fs2['default'].readFileSync(_path2['default'].join(__dirname, filename));
};

// let programAST = parser.parse(readFile('../tests/program.js'))
// let objectAST = parser.parse(readFile('../tests/object-with-property.js'))
// let anotherEntryInBody = parser.parse(readFile('../tests/another-entry-in-body.js'))
var parseFile = function parseFile(filename) {
  return _esprima2['default'].parse(readFile('../tests/' + filename + '.js'));
};

var isntArray = function isntArray(obj) {
  return !_lodash._.isArray(obj);
};
// assert('isntArray', true, isntArray({}))
// assert('isntArray', false, isntArray([]))

// let compareTopLevel()

// IF (own properties except children match between program and pattern)
// SUCCESS if pattern has no children!
// EACH child of program
// EACH child of pattern
//

function includes(tree, subtree) {

  // let test = [for (treeChild of tree) for (subtreeChild of subtree) if (!__.isArray(subtreeChild) && !__.isArray(treeChild)) __.isEqual(subtreeChild, treeChild)]
  // compare any non-array children.

  // let test = tree.filter(isntArray) for (subtreeChild of subtree) if (!__.isArray(subtreeChild) && !__.isArray(treeChild)) __.isEqual(subtreeChild, treeChild)]
  // debugger
  // console.log(tree.constructor === Node)
  // if (__.isEqual(tree, subtree)) { return true }
  // compare
  // if ARRAY
  // check each
  return false;
}

// assert('simple comparison', true, includes(objectAST, objectAST))
// assert('a statement later in the body?', true, includes(programAST, anotherEntryInBody))
// assert('object inside program?', true, includes(programAST, objectAST))

var fn = parseFile('function-invoked');
var fnWithArg = parseFile('function-invoked-with-arg');
printAST(fn);
printAST(fnWithArg);
// assert('objectsMatch', true, objectsMatch(fn.body, fnWithArg.body))

// A includes? B

// IF A, B shallowEqual ?
// awesome! we need to find B's children somewhere in A's children.
// B has no children? VICTORY
// A has no children? FAILURE

// EACH complex child of A
// child includes? B

var a = { type: 'ExpressionStatement', expression: { type: 'CallExpression', callee: ['Object'], arguments: ['Object'] } };
var b = { type: 'ExpressionStatement', expression: { type: 'CallExpression', callee: ['Object'], arguments: [] } };

var isComplex = function isComplex(obj) {
  return _lodash._.isArray(obj) || _lodash._.isObject(obj);
};
var rejectComplex = function rejectComplex(arr) {
  return _lodash._.reject(arr, isComplex);
};
var shallowEqualArrays = function shallowEqualArrays(a, b) {
  return _lodash._.isEqual(rejectComplex(a), rejectComplex(b));
};
var shallowEqualObjects = function shallowEqualObjects(a, b) {
  return shallowEqualArrays(_lodash._.keys(a), _lodash._.keys(b)) && shallowEqualArrays(_lodash._.values(a), _lodash._.values(b));
};

// should be shallow CONTAINS.
var shallowEqual = function shallowEqual(a, b) {
  if (_lodash._.isArray(a) && _lodash._.isArray(b)) {
    // console.log(`comparing arrays ${JSON.stringify(a)} and ${JSON.stringify(b)}`)
    return shallowEqualArrays(a, b);
  } else if (_lodash._.isObject(a) && _lodash._.isObject(b)) {
    // console.log(`comparing objects ${JSON.stringify(a)} and ${JSON.stringify(b)}`)
    return shallowEqualObjects(a, b);
  }
};

var sortArrOfComplex = function sortArrOfComplex(arr) {
  return _lodash._.sortBy(arr, JSON.stringify);
};

var complexChildren = function complexChildren(obj) {
  if (_lodash._.isArray(obj)) return sortArrOfComplex(_lodash._.filter(obj, isComplex));
  if (_lodash._.isObject(obj)) return sortArrOfComplex(_lodash._.filter(_lodash._.values(obj), isComplex));
};

(0, _tinyTest2['default'])('complexChildren of object', [['hi'], {}], complexChildren({ a: 'b', e: {}, d: ['hi'] }));
(0, _tinyTest2['default'])('complexChildren of array', [['sup']], complexChildren(['a', 1, undefined, ['sup']]));
(0, _tinyTest2['default'])('complexChildren finds empty array', [[]], complexChildren(['a', 1, undefined, []]));

var astSuperset = function astSuperset(larger, smaller) {
  if (shallowEqual(larger, smaller)) {
    var _ret = (function () {
      var childrenB = complexChildren(b); // now we're looking for smaller's children somewhere in larger's children.
      var childrenA = complexChildren(a); // now we're looking for smaller's children somewhere in larger's children.
      if (childrenB.length === 0) return {
          v: true
        }; // awesome, we're done looking!
      if (childrenA.length === 0) return {
          v: false
        }; // damn, A has no more children to look through. B has something A doesn't.
      return {
        v: _lodash._.every(childrenA.map(function (childA) {
          return astSuperset(childA, childrenB);
        }))
      };
    })();

    if (typeof _ret === 'object') return _ret.v;
  }
};

(0, _tinyTest2['default'])('shallowEqual', true, shallowEqual(a, b));
(0, _tinyTest2['default'])('shallowEqual', true, shallowEqual(a.expression, b.expression));

// currently returns false no matter the order.
(0, _tinyTest2['default'])('A is a superset of B?', true, astSuperset(a, b));
(0, _tinyTest2['default'])('B not a superset of A', false, astSuperset(a, b));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hc3QtaW5jbHVzaW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBbUJPLDZCQUE2Qjs7c0JBQ2QsUUFBUTs7d0JBQ1gsV0FBVzs7Ozt1QkFDWCxTQUFTOzs7OzBCQUNMLFlBQVk7O2tCQUNwQixJQUFJOzs7O29CQUNGLE1BQU07Ozs7QUFFdkIsSUFBSSxRQUFRLEdBQUcsU0FBWCxRQUFRLENBQUksR0FBRztTQUFLLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBSjNCLE1BQU0sRUFJNEIsR0FBRyxDQUFDLENBQUM7Q0FBQSxDQUFBOztBQUVoRCxJQUFJLFFBQVEsR0FBRyxTQUFYLFFBQVEsQ0FBSSxRQUFRO1NBQUssZ0JBQUcsWUFBWSxDQUFDLGtCQUFLLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7Q0FBQSxDQUFBOzs7OztBQUs1RSxJQUFJLFNBQVMsR0FBRyxTQUFaLFNBQVMsQ0FBSSxRQUFRO1NBQUsscUJBQU8sS0FBSyxDQUFDLFFBQVEsZUFBYSxRQUFRLFNBQU0sQ0FBQztDQUFBLENBQUE7O0FBRS9FLElBQUksU0FBUyxHQUFHLFNBQVosU0FBUyxDQUFJLEdBQUc7U0FBSyxDQUFDLFFBaEJsQixDQUFDLENBZ0JvQixPQUFPLENBQUMsR0FBRyxDQUFDO0NBQUEsQ0FBQTs7Ozs7Ozs7Ozs7O0FBYXpDLFNBQVMsUUFBUSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7Ozs7Ozs7Ozs7OztBQVkvQixTQUFPLEtBQUssQ0FBQztDQUNkOzs7Ozs7QUFNRCxJQUFJLEVBQUUsR0FBRyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtBQUN0QyxJQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsMkJBQTJCLENBQUMsQ0FBQTtBQUN0RCxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUE7QUFDWixRQUFRLENBQUMsU0FBUyxDQUFDLENBQUE7Ozs7Ozs7Ozs7Ozs7QUFnQm5CLElBQUksQ0FBQyxHQUFH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QUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ2hELDJCQUFPLGNBQWMsRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUE7OztBQUd0RSwyQkFBTyx1QkFBdUIsRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3hELDJCQUFPLHVCQUF1QixFQUFFLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUEiLCJmaWxlIjoiYXN0LWluY2x1c2lvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGdpdmVuIHR3byBhc3RzXG4vLyBob3cgZG8geW91IHZlcmlmeSB0aGF0IHRoZSBmaXJzdCBjb250YWlucyB0aGUgc2Vjb25kP1xuXG4vLyBURVNUOiBub2RlIEEgaXMgc3VwZXJzZXQgb2Ygbm9kZSBCXG5cbi8vIHRyZWF0IEIgbGlrZSBhIHN0YWNrXG5cbi8vIEEuaXNTdXBlcnNldD8oQilcbi8vIEVBQ0ggTk9ERSBpbiBiaWdBU1RcbiAgLy8gSUYgVEVTVCBpcyBOT0RFIHN1cGVyc2V0IG9mIEIudG9wP1xuICAgIC8vIElGIEIgaGFzIG5vIGNoaWxkcmVuXG4gICAgICAvLyByZXR1cm4gdHJ1ZVxuICAgIC8vIEVMU0VcbiAgICAgIC8vIEFMTD8gQ0hJTEQgaW4gQi5jaGlsZHJlblxuICAgICAgICAvLyBOT0RFLmlzU3VwZXJzZXQoQ0hJTEQpP1xuICAvLyBFTFNFXG4gICAgLy8gRUFDSCBOT0RFIGluIE5PREUuY2hpbGRyZW5cbiAgICAgIC8vIFRFU1QgaXMgTk9ERSBzdXBlcnNldCBvZiBCLnRvcD9cblxuaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInXG5pbXBvcnQge18gYXMgX199IGZyb20gJ2xvZGFzaCdcbmltcG9ydCBhc3NlcnQgZnJvbSAndGlueS10ZXN0J1xuaW1wb3J0IHBhcnNlciBmcm9tICdlc3ByaW1hJ1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAncHJldHR5anNvbidcbmltcG9ydCBmcyBmcm9tICdmcydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5cbmxldCBwcmludEFTVCA9IChhc3QpID0+IGNvbnNvbGUubG9nKHJlbmRlcihhc3QpKVxuXG5sZXQgcmVhZEZpbGUgPSAoZmlsZW5hbWUpID0+IGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oX19kaXJuYW1lLCBmaWxlbmFtZSkpXG5cbi8vIGxldCBwcm9ncmFtQVNUID0gcGFyc2VyLnBhcnNlKHJlYWRGaWxlKCcuLi90ZXN0cy9wcm9ncmFtLmpzJykpXG4vLyBsZXQgb2JqZWN0QVNUID0gcGFyc2VyLnBhcnNlKHJlYWRGaWxlKCcuLi90ZXN0cy9vYmplY3Qtd2l0aC1wcm9wZXJ0eS5qcycpKVxuLy8gbGV0IGFub3RoZXJFbnRyeUluQm9keSA9IHBhcnNlci5wYXJzZShyZWFkRmlsZSgnLi4vdGVzdHMvYW5vdGhlci1lbnRyeS1pbi1ib2R5LmpzJykpXG5sZXQgcGFyc2VGaWxlID0gKGZpbGVuYW1lKSA9PiBwYXJzZXIucGFyc2UocmVhZEZpbGUoYC4uL3Rlc3RzLyR7ZmlsZW5hbWV9LmpzYCkpXG5cbmxldCBpc250QXJyYXkgPSAob2JqKSA9PiAhX18uaXNBcnJheShvYmopXG4vLyBhc3NlcnQoJ2lzbnRBcnJheScsIHRydWUsIGlzbnRBcnJheSh7fSkpXG4vLyBhc3NlcnQoJ2lzbnRBcnJheScsIGZhbHNlLCBpc250QXJyYXkoW10pKVxuXG4vLyBsZXQgY29tcGFyZVRvcExldmVsKClcblxuXG4vLyBJRiAob3duIHByb3BlcnRpZXMgZXhjZXB0IGNoaWxkcmVuIG1hdGNoIGJldHdlZW4gcHJvZ3JhbSBhbmQgcGF0dGVybilcbiAgLy8gU1VDQ0VTUyBpZiBwYXR0ZXJuIGhhcyBubyBjaGlsZHJlbiFcbiAgLy8gRUFDSCBjaGlsZCBvZiBwcm9ncmFtXG4gICAgLy8gRUFDSCBjaGlsZCBvZiBwYXR0ZXJuXG4gICAgICAvLyBcblxuZnVuY3Rpb24gaW5jbHVkZXModHJlZSwgc3VidHJlZSkge1xuXG4gIC8vIGxldCB0ZXN0ID0gW2ZvciAodHJlZUNoaWxkIG9mIHRyZWUpIGZvciAoc3VidHJlZUNoaWxkIG9mIHN1YnRyZWUpIGlmICghX18uaXNBcnJheShzdWJ0cmVlQ2hpbGQpICYmICFfXy5pc0FycmF5KHRyZWVDaGlsZCkpIF9fLmlzRXF1YWwoc3VidHJlZUNoaWxkLCB0cmVlQ2hpbGQpXVxuICAvLyBjb21wYXJlIGFueSBub24tYXJyYXkgY2hpbGRyZW4uXG5cbiAgLy8gbGV0IHRlc3QgPSB0cmVlLmZpbHRlcihpc250QXJyYXkpIGZvciAoc3VidHJlZUNoaWxkIG9mIHN1YnRyZWUpIGlmICghX18uaXNBcnJheShzdWJ0cmVlQ2hpbGQpICYmICFfXy5pc0FycmF5KHRyZWVDaGlsZCkpIF9fLmlzRXF1YWwoc3VidHJlZUNoaWxkLCB0cmVlQ2hpbGQpXVxuICAvLyBkZWJ1Z2dlclxuICAvLyBjb25zb2xlLmxvZyh0cmVlLmNvbnN0cnVjdG9yID09PSBOb2RlKVxuICAvLyBpZiAoX18uaXNFcXVhbCh0cmVlLCBzdWJ0cmVlKSkgeyByZXR1cm4gdHJ1ZSB9XG4gICAgLy8gY29tcGFyZVxuICAvLyBpZiBBUlJBWVxuICAgIC8vIGNoZWNrIGVhY2hcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBhc3NlcnQoJ3NpbXBsZSBjb21wYXJpc29uJywgdHJ1ZSwgaW5jbHVkZXMob2JqZWN0QVNULCBvYmplY3RBU1QpKVxuLy8gYXNzZXJ0KCdhIHN0YXRlbWVudCBsYXRlciBpbiB0aGUgYm9keT8nLCB0cnVlLCBpbmNsdWRlcyhwcm9ncmFtQVNULCBhbm90aGVyRW50cnlJbkJvZHkpKVxuLy8gYXNzZXJ0KCdvYmplY3QgaW5zaWRlIHByb2dyYW0/JywgdHJ1ZSwgaW5jbHVkZXMocHJvZ3JhbUFTVCwgb2JqZWN0QVNUKSlcblxubGV0IGZuID0gcGFyc2VGaWxlKCdmdW5jdGlvbi1pbnZva2VkJylcbmxldCBmbldpdGhBcmcgPSBwYXJzZUZpbGUoJ2Z1bmN0aW9uLWludm9rZWQtd2l0aC1hcmcnKVxucHJpbnRBU1QoZm4pXG5wcmludEFTVChmbldpdGhBcmcpXG4vLyBhc3NlcnQoJ29iamVjdHNNYXRjaCcsIHRydWUsIG9iamVjdHNNYXRjaChmbi5ib2R5LCBmbldpdGhBcmcuYm9keSkpXG5cblxuXG4vLyBBIGluY2x1ZGVzPyBCXG5cbi8vIElGIEEsIEIgc2hhbGxvd0VxdWFsID9cbiAgLy8gYXdlc29tZSEgd2UgbmVlZCB0byBmaW5kIEIncyBjaGlsZHJlbiBzb21ld2hlcmUgaW4gQSdzIGNoaWxkcmVuLlxuICAvLyBCIGhhcyBubyBjaGlsZHJlbj8gVklDVE9SWVxuICAvLyBBIGhhcyBubyBjaGlsZHJlbj8gRkFJTFVSRVxuXG4gIC8vIEVBQ0ggY29tcGxleCBjaGlsZCBvZiBBXG4gICAgLy8gY2hpbGQgaW5jbHVkZXM/IEJcblxuXG5sZXQgYSA9IHsgdHlwZTogJ0V4cHJlc3Npb25TdGF0ZW1lbnQnLCBleHByZXNzaW9uOiB7IHR5cGU6ICdDYWxsRXhwcmVzc2lvbicsIGNhbGxlZTogWydPYmplY3QnXSwgYXJndW1lbnRzOiBbJ09iamVjdCddIH0gfVxubGV0IGIgPSB7IHR5cGU6ICdFeHByZXNzaW9uU3RhdGVtZW50JywgZXhwcmVzc2lvbjogeyB0eXBlOiAnQ2FsbEV4cHJlc3Npb24nLCBjYWxsZWU6IFsnT2JqZWN0J10sIGFyZ3VtZW50czogW10gfSB9XG5cbmxldCBpc0NvbXBsZXggPSAob2JqKSA9PiBfXy5pc0FycmF5KG9iaikgfHwgX18uaXNPYmplY3Qob2JqKVxubGV0IHJlamVjdENvbXBsZXggPSAoYXJyKSA9PiBfXy5yZWplY3QoYXJyLCBpc0NvbXBsZXgpXG5sZXQgc2hhbGxvd0VxdWFsQXJyYXlzID0gKGEsIGIpID0+IF9fLmlzRXF1YWwocmVqZWN0Q29tcGxleChhKSwgcmVqZWN0Q29tcGxleChiKSlcbmxldCBzaGFsbG93RXF1YWxPYmplY3RzID0gKGEsIGIpID0+IHNoYWxsb3dFcXVhbEFycmF5cyhfXy5rZXlzKGEpLCBfXy5rZXlzKGIpKSAmJiBzaGFsbG93RXF1YWxBcnJheXMoX18udmFsdWVzKGEpLCBfXy52YWx1ZXMoYikpXG5cbi8vIHNob3VsZCBiZSBzaGFsbG93IENPTlRBSU5TLlxubGV0IHNoYWxsb3dFcXVhbCA9IChhLCBiKSA9PiB7XG4gIGlmIChfXy5pc0FycmF5KGEpICYmIF9fLmlzQXJyYXkoYikpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhgY29tcGFyaW5nIGFycmF5cyAke0pTT04uc3RyaW5naWZ5KGEpfSBhbmQgJHtKU09OLnN0cmluZ2lmeShiKX1gKVxuICAgIHJldHVybiBzaGFsbG93RXF1YWxBcnJheXMoYSwgYilcbiAgfSBlbHNlIGlmIChfXy5pc09iamVjdChhKSAmJiBfXy5pc09iamVjdChiKSkge1xuICAgIC8vIGNvbnNvbGUubG9nKGBjb21wYXJpbmcgb2JqZWN0cyAke0pTT04uc3RyaW5naWZ5KGEpfSBhbmQgJHtKU09OLnN0cmluZ2lmeShiKX1gKVxuICAgIHJldHVybiBzaGFsbG93RXF1YWxPYmplY3RzKGEsIGIpXG4gIH1cbn1cblxubGV0IHNvcnRBcnJPZkNvbXBsZXggPSAoYXJyKSA9PiBfXy5zb3J0QnkoYXJyLCBKU09OLnN0cmluZ2lmeSlcblxubGV0IGNvbXBsZXhDaGlsZHJlbiA9IChvYmopID0+IHtcbiAgaWYgKF9fLmlzQXJyYXkob2JqKSkgcmV0dXJuIHNvcnRBcnJPZkNvbXBsZXgoX18uZmlsdGVyKG9iaiwgaXNDb21wbGV4KSlcbiAgaWYgKF9fLmlzT2JqZWN0KG9iaikpIHJldHVybiBzb3J0QXJyT2ZDb21wbGV4KF9fLmZpbHRlcihfXy52YWx1ZXMob2JqKSwgaXNDb21wbGV4KSlcbn1cblxuYXNzZXJ0KCdjb21wbGV4Q2hpbGRyZW4gb2Ygb2JqZWN0JywgW1snaGknXSwge31dLCBjb21wbGV4Q2hpbGRyZW4oe2E6ICdiJywgZToge30sIGQ6IFsnaGknXX0pKVxuYXNzZXJ0KCdjb21wbGV4Q2hpbGRyZW4gb2YgYXJyYXknLCBbWydzdXAnXV0sIGNvbXBsZXhDaGlsZHJlbihbJ2EnLCAxLCB1bmRlZmluZWQsIFsnc3VwJ11dKSlcbmFzc2VydCgnY29tcGxleENoaWxkcmVuIGZpbmRzIGVtcHR5IGFycmF5JywgW1tdXSwgY29tcGxleENoaWxkcmVuKFsnYScsIDEsIHVuZGVmaW5lZCwgW11dKSlcblxubGV0IGFzdFN1cGVyc2V0ID0gKGxhcmdlciwgc21hbGxlcikgPT4ge1xuICBpZiAoc2hhbGxvd0VxdWFsKGxhcmdlciwgc21hbGxlcikpIHtcbiAgICBsZXQgY2hpbGRyZW5CID0gY29tcGxleENoaWxkcmVuKGIpIC8vIG5vdyB3ZSdyZSBsb29raW5nIGZvciBzbWFsbGVyJ3MgY2hpbGRyZW4gc29tZXdoZXJlIGluIGxhcmdlcidzIGNoaWxkcmVuLlxuICAgIGxldCBjaGlsZHJlbkEgPSBjb21wbGV4Q2hpbGRyZW4oYSkgLy8gbm93IHdlJ3JlIGxvb2tpbmcgZm9yIHNtYWxsZXIncyBjaGlsZHJlbiBzb21ld2hlcmUgaW4gbGFyZ2VyJ3MgY2hpbGRyZW4uXG4gICAgaWYgKGNoaWxkcmVuQi5sZW5ndGggPT09IDApIHJldHVybiB0cnVlIC8vIGF3ZXNvbWUsIHdlJ3JlIGRvbmUgbG9va2luZyFcbiAgICBpZiAoY2hpbGRyZW5BLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlIC8vIGRhbW4sIEEgaGFzIG5vIG1vcmUgY2hpbGRyZW4gdG8gbG9vayB0aHJvdWdoLiBCIGhhcyBzb21ldGhpbmcgQSBkb2Vzbid0LlxuICAgIHJldHVybiBfXy5ldmVyeShjaGlsZHJlbkEubWFwKChjaGlsZEEpID0+IGFzdFN1cGVyc2V0KGNoaWxkQSwgY2hpbGRyZW5CKSkpXG4gIH1cbn1cblxuYXNzZXJ0KCdzaGFsbG93RXF1YWwnLCB0cnVlLCBzaGFsbG93RXF1YWwoYSwgYikpXG5hc3NlcnQoJ3NoYWxsb3dFcXVhbCcsIHRydWUsIHNoYWxsb3dFcXVhbChhLmV4cHJlc3Npb24sIGIuZXhwcmVzc2lvbikpXG5cbi8vIGN1cnJlbnRseSByZXR1cm5zIGZhbHNlIG5vIG1hdHRlciB0aGUgb3JkZXIuXG5hc3NlcnQoJ0EgaXMgYSBzdXBlcnNldCBvZiBCPycsIHRydWUsIGFzdFN1cGVyc2V0KGEsIGIpKVxuYXNzZXJ0KCdCIG5vdCBhIHN1cGVyc2V0IG9mIEEnLCBmYWxzZSwgYXN0U3VwZXJzZXQoYSwgYikpXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4iXX0=