// Room for improvement:
  // Implementation was slowed by debugging those last two issues - both caused by state.
  // Solution is slightly suboptimal - we can compare min and max without doing it all again each time.
  // Constant time should be fine, though.

import test from 'tape'
import { List, Repeat } from 'immutable'

class TempTracker {
  temps = Repeat(0, 110).toArray()

  tracking = {
    mode: null,
    max: -Infinity,
    min: Infinity,
    mean: null
  }

  insert(newTemp) {
    this.temps[newTemp - 1] += 1

    let meanNumerator = 0
    let meanDenominator = 0
    let modeOccurences = -Infinity

    this.tracking = this.temps.reduce((t, occurences, index) => {
      let temp = index + 1

      if (occurences) {
        if (temp > t.max) t.max = temp
        if (temp < t.min) t.min = temp
        if (occurences > modeOccurences) t.mode = temp
        meanNumerator += occurences * temp
        meanDenominator += occurences
      }

      return t
    }, this.tracking)

    this.tracking.mean = meanNumerator / meanDenominator
  }

  getMax() { return this.tracking.max }
  getMin() { return this.tracking.min }
  getMean() { return this.tracking.mean }
  getMode() { return this.tracking.mode }
}

test('TempTracker', (t) => {
  const tracker = new TempTracker()

  List([50, 60, 40, 60]).forEach(temp => tracker.insert(temp))

  let testCases = [
    [tracker.getMax, 60, 'getMax'],
    [tracker.getMin, 40, 'getMin'],
    [tracker.getMean, 52.5, 'getMean'],
    [tracker.getMode, 60, 'getMode'],
  ]

  t.plan(testCases.length)

  testCases.forEach(([method, result, description]) => {
    t.equal(method.call(tracker), result, description)
  })
})
