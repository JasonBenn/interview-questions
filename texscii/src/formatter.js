import 'source-map-support/register'
import 'babel/polyfill'
import {_ as __} from 'lodash'
import assert from 'tiny-test'
import fs from 'fs'
import path from 'path'
import 'babel/polyfill'

// console.log(" 2\nx ")
// assert('x^2', format('x^{2}'), " 2\nx ")
// assert('1/3', format("\\frac{1}{3} test"), "1\n-\n3")
format('x^{2}')

// \frac{top}{bottom}: A fraction with the given top and bottom pieces
// \sqrt{content}: A square-root sign
// \root{power}{content}: A root sign with an arbitrary power (eg. cube-root, where the power 3 is at the top-left of the radical symbol)
// _{sub}: Subscript
// ^{sup}: Superscript
// _{sub}^{sup}: Subscript and superscript (one on top of the other)
// \pi

function format(input) {
  lexer(input)
}

function lexer(input) {
  var start = 0;
  for (var cursor = 0; cursor <= input.length; cursor++) {
    var token = input.slice(start, cursor)
    console.log(`considering: ${token}`)
    switch (true) {
      case token.match(/\^\{(\d+)\}/):
        console.log('found!')
        debugger
        start = cursor;
        break
      case /\\frac/.test(token):
        debugger
        start = cursor;
        break;

    }
  }
  return ''
}

