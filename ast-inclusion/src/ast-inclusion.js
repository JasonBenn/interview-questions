// Review:
  // A decent solution, but poorly tested.
  // Nice job figuring out a good ES6 workflow.


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

import 'source-map-support/register'
import {_ as __} from 'lodash'
import assert from 'tiny-test'
import parser from 'esprima'
import { render } from 'prettyjson'
import fs from 'fs'
import path from 'path'

let printAST = (ast) => console.log(render(ast))

let readFile = (filename) => fs.readFileSync(path.join(__dirname, filename))

// let programAST = parser.parse(readFile('../tests/program.js'))
// let objectAST = parser.parse(readFile('../tests/object-with-property.js'))
// let anotherEntryInBody = parser.parse(readFile('../tests/another-entry-in-body.js'))
let parseFile = (filename) => parser.parse(readFile(`../tests/${filename}.js`))

let isntArray = (obj) => !__.isArray(obj)
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

let fn = parseFile('function-invoked')
let fnWithArg = parseFile('function-invoked-with-arg')
printAST(fn)
printAST(fnWithArg)
// assert('objectsMatch', true, objectsMatch(fn.body, fnWithArg.body))



// A includes? B

// IF A, B shallowEqual ?
  // awesome! we need to find B's children somewhere in A's children.
  // B has no children? VICTORY
  // A has no children? FAILURE

  // EACH complex child of A
    // child includes? B


let a = { type: 'ExpressionStatement', expression: { type: 'CallExpression', callee: ['Object'], arguments: ['Object'] } }
let b = { type: 'ExpressionStatement', expression: { type: 'CallExpression', callee: ['Object'], arguments: [] } }

let isComplex = (obj) => __.isArray(obj) || __.isObject(obj)
let rejectComplex = (arr) => __.reject(arr, isComplex)
let shallowEqualArrays = (a, b) => __.isEqual(rejectComplex(a), rejectComplex(b))
let shallowEqualObjects = (a, b) => shallowEqualArrays(__.keys(a), __.keys(b)) && shallowEqualArrays(__.values(a), __.values(b))

// should be shallow CONTAINS.
let shallowEqual = (a, b) => {
  if (__.isArray(a) && __.isArray(b)) {
    // console.log(`comparing arrays ${JSON.stringify(a)} and ${JSON.stringify(b)}`)
    return shallowEqualArrays(a, b)
  } else if (__.isObject(a) && __.isObject(b)) {
    // console.log(`comparing objects ${JSON.stringify(a)} and ${JSON.stringify(b)}`)
    return shallowEqualObjects(a, b)
  }
}

let sortArrOfComplex = (arr) => __.sortBy(arr, JSON.stringify)

let complexChildren = (obj) => {
  if (__.isArray(obj)) return sortArrOfComplex(__.filter(obj, isComplex))
  if (__.isObject(obj)) return sortArrOfComplex(__.filter(__.values(obj), isComplex))
}

assert('complexChildren of object', [['hi'], {}], complexChildren({a: 'b', e: {}, d: ['hi']}))
assert('complexChildren of array', [['sup']], complexChildren(['a', 1, undefined, ['sup']]))
assert('complexChildren finds empty array', [[]], complexChildren(['a', 1, undefined, []]))

let astSuperset = (larger, smaller) => {
  if (shallowEqual(larger, smaller)) {
    let childrenB = complexChildren(b) // now we're looking for smaller's children somewhere in larger's children.
    let childrenA = complexChildren(a) // now we're looking for smaller's children somewhere in larger's children.
    if (childrenB.length === 0) return true // awesome, we're done looking!
    if (childrenA.length === 0) return false // damn, A has no more children to look through. B has something A doesn't.
    return __.every(childrenA.map((childA) => astSuperset(childA, childrenB)))
  }
}

assert('shallowEqual', true, shallowEqual(a, b))
assert('shallowEqual', true, shallowEqual(a.expression, b.expression))

// currently returns false no matter the order.
assert('A is a superset of B?', true, astSuperset(a, b))
assert('B not a superset of A', false, astSuperset(a, b))















