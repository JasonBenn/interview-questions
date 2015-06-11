var assert = require('tiny-test')
var _ = require('underscore')

function getDateTime() {
  var date = new Date();
  var hour = date.getHours() % 12;
  var min  = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;
  var sec  = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;
  return hour + ":" + min + ":" + sec;
}
console.log(getDateTime())

function Node(elem, next) {
  this.elem = elem;
  this.next = next;
}
var nil = new Node(null);


Node.prototype.toString = function() {
  if (this === nil) return 'nil';
  return ["[" + this.elem.toString() + "]", this.next.toString()].join('->');
}
assert('Node.toString', "[0]->nil", new Node(0, nil).toString())
assert('Node.toString', "[0]->[1]->nil", new Node(0, new Node(1, nil)).toString())

function nodeArrayOf(length, nodeValue) {
  var arr = [];
  for (var i = 0; i < length; i++) { arr = arr.concat([new Node(nodeValue)]); }
  return arr;
}
assert('nodeArrayOf', nodeArrayOf(3, null), [nil, nil, nil])
assert('skip list node', new Node(1, nodeArrayOf(2, null)), new Node(1, [nil, nil]))


function SkipList(headValue, maxHeight, probability) {
  this.probability = probability
  this.maxHeight = maxHeight;
  var ten = new Node(10, nodeArrayOf(3, 10))
  this.head = ten;
  var twentyOne = new Node(21, nodeArrayOf(1, 21))
  var twentyThree = new Node(23, nodeArrayOf(2, 23))
  var twentyFive = new Node(25, nodeArrayOf(2, 25))

  ten.next[2].next = nil;
  ten.next[1].next = twentyThree
  ten.next[0].next = twentyOne

  twentyOne.next[0].next = twentyThree

  twentyThree.next[1].next = twentyFive
  twentyThree.next[0].next = twentyFive

  twentyFive.next[1].next = nil
  twentyFive.next[0].next = nil
}

SkipList.prototype.toString = function() {
  var levels = []
  for (var i = this.maxHeight - 1; i >= 0; i--) {
    levels.push(this.head.next[i]);
  }
  return this.elem + ": [" + levels.join("\n") + "]"
}

var skipList = new SkipList(1, 3, .5)


SkipList.prototype.traverseTo = function(elem) {
  var traversedNodes = [];
  var currentNode = this.head;

  // nextNode = currentNode.next[i]

  // currentNode.next[2].next !== nil /* false, it's nil */ && currentNode.next[2].elem < elem /* never reached */
  // traversedNodes.unshift(currentNode) /* for i === 2, add 10 */
  // currentNode.next[1].next !== nil /* true, Node 23 */ && currentNode.next[1].elem < elem // 23 < 24? true! 
  // currentNode = currentNode.next[1] /* Node 23 */
  // currentNode.next[1].next !== nil /* true, it's 25 */ && currentNode.next[1].elem < elem /* 25 < 24? false. */
  // traversedNodes.unshift(currentNode) /* for i === 1, add 23 */
  // // i is now 0. currentNode is 23.
  // currentNode.next[0].next !== nil /* true, it's 25 */ && currentNode.next[0].elem < elem? // 25 < 24? false!
  // traversedNodes.unshift(currentNode) // now traversedNodes[0] is also 23.

  for (var i = this.maxHeight - 1; i >= 0; i--) {
    while (currentNode.next[i] !== nil && currentNode.next[i].elem < elem) {
      currentNode = currentNode.next[1]
    }

    traversedNodes.unshift(currentNode);
  }

  return traversedNodes;
}
console.log(skipList.traverseTo(24).map(function(list) { console.log(list.toString()) }))


SkipList.prototype.insert = function(elem) {
  var traversed = this.traverseTo(elem);
  var randomHeight = 2;
  var inserting = new Node(elem, nodeArrayOf(randomHeight));

  for (var i = 0; i < randomHeight; i++) {
    inserting.next[i] = new Node(elem, traversed[i]);
    traversed[i] = inserting.next[i];
  }

  return inserting;
}
// assert('insert', skipList.insert(3), new Node(3, [new Node(3, nil), new Node(3, nil)]));

// skipList.insert(5)
// debugger
// skipList.insert(4)


// debugger


// console.log(skipList)


SkipList.prototype.remove = function(elem) {

}


// arrayOf helper was actually putting the same node in each position of the array! 
// so changing a property of head.next[n] actually changed *every* node in head.next.


// nathan.leiby@clever.com

// Implement a skip list, with insert, remove in terms of insert point.




// [h]               [7]
// [h]         [5]   [7]
// [h]   [3]   [5]   [7]
// [h][1][3][4][5][6][7]

// head could be anything

// [3]      [8]
// [3][4]   [8]
// [3][4]   [8]
// [3][4][7][8]



// insert point finds the path.

// SkipList({maxHeight})