// npm dependencies: immutable, tape, underscore, and babel
// to run: babel-node --stage 1 docker-screen.js


// Given two strings, check if they are anagrams of each other:

import _ from 'underscore'

const sortChars = word => word.split('').sort().join('')
const isAnagram = (s1, s2) => sortChars(s1) === sortChars(s2)
const groupByAnagrams = (input) => _.chain(input).groupBy(word => sortChars(word)).values().value()


// Deeply camelize the keys of an object:

import { fromJS, is, List, Map } from 'immutable'

// utility functions
const isSnakeCase = (str) => /_/.test(str)
const camelize = (str) => str.replace(/_(\w)/g, (_, matchedChar) => matchedChar.toUpperCase())
const isList = List.isList
const isMap = Map.isMap
const exists = (x) => !(x === null || x === undefined)
const useImmutableTypes = (fun) => function() {
  const args = Array.prototype.slice.call(arguments).map(arg => fromJS(arg))
  const retVal = fun(...args)
  return exists(retVal) ? retVal.toJS() : retVal
}

// algorithm. O(N) space, O(N) time.
const camelizeKeysImmutable = (map) => {
  if (!isMap(map)) return map

  return map.reduce((camelizedMap, value, key) => {
    if (isSnakeCase(key)) {
      let { [key]: value, ...restOfMap } = map
      map = fromJS(restOfMap)
      key = camelize(key)
    }

    if (isList(value)) value = value.map(camelizeKeysImmutable)
    if (isMap(value))  value = camelizeKeysImmutable(value)

    return camelizedMap.set(key, value)
  }, Map())
}

const camelizeKeys = useImmutableTypes(camelizeKeysImmutable)

import test from 'tape'
if (require.main === module) {
  const deepEquals = (a, b) => is(fromJS(a), fromJS(b)) // JS arrays/objects don't support deep equality comparison

  test('groupByAnagrams', (t) => {
    const wordList = ["bob", "cat", "act", "tac", "fred", "tub", "but"]
    const wordListGrouped = [['bob' ], ['cat', 'act', 'tac' ], ['fred' ], ['tub', 'but' ]]

    t.plan(1)
    t.ok(deepEquals(groupByAnagrams(wordList), wordListGrouped))
  })

  const flatObj = { "a_b": 'a', b: 'c' }
  const flatObjCamelized = { "aB": 'a', b: 'c' }
  const deepObj = {
    "a_corn": "x",
    "b": "y",
    "c": {
      "aa": "xx",
      "bb": { "c_cron": "zz" },
      "cc": ["a", "b" ],
      "dd": [
        "yz", {
          "a_box": "xyz",
          "cd": "zzz",
          "ef": { "new_case": "abcd" }
        }
      ]
    }
  }
  const deepObjCamelized = {
    "aCorn": "x",
    "b": "y",
    "c": {
      "aa": "xx",
      "bb": { "cCron": "zz" },
      "cc": ["a", "b" ],
      "dd": [
        "yz", {
          "aBox": "xyz",
          "cd": "zzz",
          "ef": { "newCase": "abcd" }
        }
      ]
    }
  }

  test('camelizeKeys', (t) => {
    const testCases = [
      [flatObj, flatObjCamelized],
      [deepObj, deepObjCamelized],
      [{}, {}],
      [null, null],
      [undefined, undefined],
    ]

    t.plan(testCases.length)
    testCases.forEach(([test, expected]) => {
      t.ok(deepEquals(camelizeKeys(test), expected))
    })
  })
}
