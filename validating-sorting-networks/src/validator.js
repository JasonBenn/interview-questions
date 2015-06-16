// Works!
// First complex problem solved in ES6!
// Nice job.

import 'source-map-support/register'
import 'babel/polyfill'
import {_ as __} from 'lodash'
import assert from 'tiny-test'
import fs from 'fs'
import path from 'path'

assert('testing', true, true)

let readNetworkFile = (file) => {
  let readFile = (filename) => fs.readFileSync(path.join(__dirname, filename), 'utf8')
  let [[numWires, _], ...switches] = readFile('../data/4-5-valid.txt').split("\n").map((line) => line.split(' ').map((num) => __.parseInt(num)))
  return {numWires, switches}
}

let {numWires, switches} = readNetworkFile('../data/4-5-valid')
assert('numWires', 4, numWires)
assert('switches', [[0, 2], [1, 3], [0, 1], [2, 3], [1, 2]], switches)

let swap = (arr, a, b) => {
  let oldA = arr[a]
  arr[a] = arr[b]
  arr[b] = oldA
  return arr
}

let sort = ({input, switches}) => {
  switches.forEach((aSwitch) => {
    let [top, bottom] = aSwitch
    if (input[top] > input[bottom]) swap(input, top, bottom)
  })
  return input
}

assert('sort', sort({ input: [1, 0], switches: [[0, 1]] }), [0, 1])
assert('sort the actual array', sort({ input: [3, 2, 4, 1], switches: switches }), [1, 2, 3, 4])

let binaryPermutations = (num) => {
  if (num === 1) return [[0], [1]]
  return __.flatten(binaryPermutations(num - 1).map((a) => ([a.concat(0), a.concat(1)])))
}

assert('permutations', binaryPermutations(1), [[0], [1]])
assert('permutations', binaryPermutations(2), [[0, 0], [0, 1], [1, 0], [1, 1]])
assert('permutations', binaryPermutations(3), [[0, 0, 0], [0, 0, 1], [0, 1, 0], [0, 1, 1], [1, 0, 0], [1, 0, 1], [1, 1, 0], [1, 1, 1]])


let validateNetwork = (file) => {
  let {numWires, switches} = readNetworkFile(file)
  return zeroOneTestNetwork({numWires, switches})
}

let zeroOneTestNetwork = ({numWires, switches}) => {
  let inputs = binaryPermutations(numWires)
  return __.every(inputs, (input) => { 
    console.log("Input:        " + JSON.stringify(input))
    console.log("Input.sort(): " + JSON.stringify(input.sort()))
    console.log("sort(Input):  " + JSON.stringify(sort({input, switches})))
    return __.isEqual(sort({input, switches}), input.sort())
  })
}

assert('isValid', validateNetwork('../data/4-5-valid'), true)
assert('isValid', validateNetwork('../data/4-19-invalid'), false)







