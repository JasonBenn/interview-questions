class Node {
  constructor(val, next) {
    this.val = val
    this.next = next
  }
}

const a = new Node("Angel Food")
const b = new Node("Bundt")
const c = new Node("Cheese")
const d = new Node("Devil's Food")
const e = new Node("Eccles")

a.next = b
b.next = c
c.next = d
d.next = e

const kthToLastNode = (k, head) => {
  let laggingByK
  let lookingForEnd = head
  let steps = 0
  while (lookingForEnd) {
    steps += 1
    lookingForEnd = lookingForEnd.next
    if (laggingByK) laggingByK = laggingByK.next
    if (steps === k) laggingByK = head
  }

  if (laggingByK) return laggingByK.val
}


import test from 'tape'

test('kthToLastNode', t => {
  let testCases = [
    [[2, a], "Devil's Food"],
    [[3, a], "Cheese"],
    [[7, a], undefined],
    [[1, a], 'Eccles'],
    [[0, a], undefined],
  ]

  t.plan(testCases.length)
  testCases.forEach(([args, expected]) => {
    t.equals(kthToLastNode(...args), expected)
  })
})
