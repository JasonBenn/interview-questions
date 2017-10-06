// Review: implementation took a long time. Lots of magic poking, forgot that Immutable requires using `.get()`.

import test from 'tape'
import { List } from 'immutable'

const outOfOrder = (a, b) => a > b

const findRotationPoint = (list, lowerIndex = 0, upperIndex = list.size - 1) => {
  if (list.size <= 1) return undefined

  const actualMidIndex = Math.floor((upperIndex + lowerIndex) / 2)
  const midIndex = Math.max(actualMidIndex, lowerIndex + 1)
  const lower = list.get(lowerIndex)
  const mid = list.get(midIndex)
  const upper = list.get(upperIndex)

  if (outOfOrder(lower, mid)) {
    if (upperIndex - lowerIndex <= 1) return upperIndex
    return findRotationPoint(list, lowerIndex, midIndex)
  } else {
    if (upperIndex - lowerIndex <= 1) return undefined
    return findRotationPoint(list, midIndex, upperIndex)
  }
}

if (require.main === module) {
  test('findRotationPoint', (t) => {
    let testCases = [
      [List('a'), undefined],
      [List('xc'), 1],
      [List('ab'), undefined],
      [List('zab'), 1],
      [List('xyzabc'), 3],
      [List('zabc'), 1],
      [List('xyza'), 3],
      [List('wxyzabcd'), 4],
    ]

    t.plan(testCases.length)
    testCases.forEach(([list, expectedRotationPoint]) => {
      t.equals(findRotationPoint(list), expectedRotationPoint, `List: ${list}, RP: ${expectedRotationPoint}`)
    })
  })
}
