// I missed the elegant solution: write a function that finds the largest
// element in a tree. The second largest will find the parent of the largest
// element... except when that largest element has a left subtree, in which
// case we'll find the largest element in the subtree.

// Otherwise this is fine, though. Got out some test cases first, then
// wrote a function that worked in the first pass. Nice.

import test from 'tape'

class Node {
  constructor(val = undefined, left = undefined, right = undefined) {
    this.val = val
    this.left = left
    this.right = right
  }
}

const secondLargestInBST = (node, parent = new Node(), wentLeft = false) => {
  if (node.right) return secondLargestInBST(node.right, node, wentLeft)
  if (!node.right) {
    if (node.left && !wentLeft) return secondLargestInBST(node.left, node, true)
    if (wentLeft) return node.val
    if (!node.left) return parent.val
  }
}

if (require.main === module) {
  test('secondLargestInBST', (t) => {
    const n = (val, left, right) => new Node(val, left, right)

    let testCases = [
      [n(5), undefined, 'n(5)'],
      [n(5, n(4)), 4, 'n(5, n(4))'],
      [n(5, n(4), n(6)), 5, 'n(5, n(4), n(6))'],
      [n(5, null, n(6)), 5, 'n(5, null, n(6))'],
      [n(5, n(4), n(6, null, n(7))), 6, 'n(5, n(4), n(6, null, n(7)))'],
      [n(5, n(4), n(7, n(6))), 6, 'n(5, n(4), n(7, n(6)))'],
      [n(5, n(3, n(2), n(4))), 4, 'n(5, null, n(3, n(2), n(4)))'],
      [n(5, n(2, n(1), n(3, null, n(4)))), 4, 'n(5, n(2, n(1), n(3, null, n(4))))'],
      [n(5, n(1, null, n(2, null, n(3, null, n(4))))), 4, 'n(5, n(1, null, n(2, null, n(3, null, n(4)))))'],
    ]

    t.plan(testCases.length)
    testCases.forEach(([bst, expectedResult, description]) => {
      t.equal(secondLargestInBST(bst), expectedResult, description)
    })
  })
}
