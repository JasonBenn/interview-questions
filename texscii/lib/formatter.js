'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('source-map-support/register');

require('babel/polyfill');

var _lodash = require('lodash');

var _tinyTest = require('tiny-test');

var _tinyTest2 = _interopRequireDefault(_tinyTest);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

require('babel/polyfill');

// console.log(" 2\nx ")
// assert('x^2', format('x^{2}'), " 2\nx ")
// assert('1/3', format("\\frac{1}{3} test"), "1\n-\n3")
format('x^{2}');

// \frac{top}{bottom}: A fraction with the given top and bottom pieces
// \sqrt{content}: A square-root sign
// \root{power}{content}: A root sign with an arbitrary power (eg. cube-root, where the power 3 is at the top-left of the radical symbol)
// _{sub}: Subscript
// ^{sup}: Superscript
// _{sub}^{sup}: Subscript and superscript (one on top of the other)
// \pi

function format(input) {
  lexer(input);
}

function lexer(input) {
  var start = 0;
  for (var cursor = 0; cursor <= input.length; cursor++) {
    var token = input.slice(start, cursor);
    console.log('considering: ' + token);
    switch (true) {
      case token.match(/\^\{(\d+)\}/):
        console.log('found!');
        debugger;
        start = cursor;
        break;
      case /\\frac/.test(token):
        debugger;
        start = cursor;
        break;

    }
  }
  return '';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9mb3JtYXR0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQUFPLDZCQUE2Qjs7UUFDN0IsZ0JBQWdCOztzQkFDRCxRQUFROzt3QkFDWCxXQUFXOzs7O2tCQUNmLElBQUk7Ozs7b0JBQ0YsTUFBTTs7OztRQUNoQixnQkFBZ0I7Ozs7O0FBS3ZCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTs7Ozs7Ozs7OztBQVVmLFNBQVMsTUFBTSxDQUFDLEtBQUssRUFBRTtBQUNyQixPQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7Q0FDYjs7QUFFRCxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUU7QUFDcEIsTUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0FBQ2QsT0FBSyxJQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUU7QUFDckQsUUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUE7QUFDdEMsV0FBTyxDQUFDLEdBQUcsbUJBQWlCLEtBQUssQ0FBRyxDQUFBO0FBQ3BDLFlBQVEsSUFBSTtBQUNWLFdBQUssS0FBSyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7QUFDN0IsZUFBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUNyQixpQkFBUTtBQUNSLGFBQUssR0FBRyxNQUFNLENBQUM7QUFDZixjQUFLO0FBQUEsQUFDUCxXQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQ3ZCLGlCQUFRO0FBQ1IsYUFBSyxHQUFHLE1BQU0sQ0FBQztBQUNmLGNBQU07O0FBQUEsS0FFVDtHQUNGO0FBQ0QsU0FBTyxFQUFFLENBQUE7Q0FDViIsImZpbGUiOiJmb3JtYXR0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3RlcidcbmltcG9ydCAnYmFiZWwvcG9seWZpbGwnXG5pbXBvcnQge18gYXMgX199IGZyb20gJ2xvZGFzaCdcbmltcG9ydCBhc3NlcnQgZnJvbSAndGlueS10ZXN0J1xuaW1wb3J0IGZzIGZyb20gJ2ZzJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCAnYmFiZWwvcG9seWZpbGwnXG5cbi8vIGNvbnNvbGUubG9nKFwiIDJcXG54IFwiKVxuLy8gYXNzZXJ0KCd4XjInLCBmb3JtYXQoJ3heezJ9JyksIFwiIDJcXG54IFwiKVxuLy8gYXNzZXJ0KCcxLzMnLCBmb3JtYXQoXCJcXFxcZnJhY3sxfXszfSB0ZXN0XCIpLCBcIjFcXG4tXFxuM1wiKVxuZm9ybWF0KCd4XnsyfScpXG5cbi8vIFxcZnJhY3t0b3B9e2JvdHRvbX06IEEgZnJhY3Rpb24gd2l0aCB0aGUgZ2l2ZW4gdG9wIGFuZCBib3R0b20gcGllY2VzXG4vLyBcXHNxcnR7Y29udGVudH06IEEgc3F1YXJlLXJvb3Qgc2lnblxuLy8gXFxyb290e3Bvd2VyfXtjb250ZW50fTogQSByb290IHNpZ24gd2l0aCBhbiBhcmJpdHJhcnkgcG93ZXIgKGVnLiBjdWJlLXJvb3QsIHdoZXJlIHRoZSBwb3dlciAzIGlzIGF0IHRoZSB0b3AtbGVmdCBvZiB0aGUgcmFkaWNhbCBzeW1ib2wpXG4vLyBfe3N1Yn06IFN1YnNjcmlwdFxuLy8gXntzdXB9OiBTdXBlcnNjcmlwdFxuLy8gX3tzdWJ9XntzdXB9OiBTdWJzY3JpcHQgYW5kIHN1cGVyc2NyaXB0IChvbmUgb24gdG9wIG9mIHRoZSBvdGhlcilcbi8vIFxccGlcblxuZnVuY3Rpb24gZm9ybWF0KGlucHV0KSB7XG4gIGxleGVyKGlucHV0KVxufVxuXG5mdW5jdGlvbiBsZXhlcihpbnB1dCkge1xuICB2YXIgc3RhcnQgPSAwO1xuICBmb3IgKHZhciBjdXJzb3IgPSAwOyBjdXJzb3IgPD0gaW5wdXQubGVuZ3RoOyBjdXJzb3IrKykge1xuICAgIHZhciB0b2tlbiA9IGlucHV0LnNsaWNlKHN0YXJ0LCBjdXJzb3IpXG4gICAgY29uc29sZS5sb2coYGNvbnNpZGVyaW5nOiAke3Rva2VufWApXG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIHRva2VuLm1hdGNoKC9cXF5cXHsoXFxkKylcXH0vKTpcbiAgICAgICAgY29uc29sZS5sb2coJ2ZvdW5kIScpXG4gICAgICAgIGRlYnVnZ2VyXG4gICAgICAgIHN0YXJ0ID0gY3Vyc29yO1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAvXFxcXGZyYWMvLnRlc3QodG9rZW4pOlxuICAgICAgICBkZWJ1Z2dlclxuICAgICAgICBzdGFydCA9IGN1cnNvcjtcbiAgICAgICAgYnJlYWs7XG5cbiAgICB9XG4gIH1cbiAgcmV0dXJuICcnXG59XG5cbiJdfQ==