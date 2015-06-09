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
  ten.next[1].next = twentyThree.next[1]
  ten.next[0].next = twentyOne.next[0]

  twentyOne.next[0].next = twentyThree.next[0]

  twentyThree.next[1].next = twentyFive.next[1]
  twentyThree.next[0].next = twentyFive.next[0]

  twentyFive.next[1].next = nil
  twentyFive.next[0].next = nil
}

SkipList.prototype.print = function() {
  for (var i = this.maxHeight - 1; i >= 0; i--) {
    console.log(this.head.next[i].toString());
  }
}

var skipList = new SkipList(1, 3, .5)


SkipList.prototype.traverseTo = function(elem) {
  var traversedNodes = [];
  var currentNode = this.head.next;

  for (var i = this.maxHeight - 1; i >= 0; i--) {
    var currentNodeAtLevel = currentNode[i];
    var nextNode = currentNodeAtLevel.next
    console.log('currentNodeAtLevel is ' + currentNodeAtLevel + ' and nextNode is ' + nextNode);
    console.log('is nextNode not nil? ' + (nextNode !== nil) + ' and is it\'s elem less than ' + elem + '? ' + (nextNode.elem < elem))
    while (nextNode !== nil && nextNode.elem < elem) {
      console.log(nextNode.elem + ' is less than ' + elem + '!')
      currentNode = nextNode;
      nextNode = nextNode.next;
      console.log('currentNode is now ' + currentNode + ' and nextNode is now ' + nextNode)
    }
    console.log('adding ' + currentNode + ' to traversedNodes.')
    traversedNodes.unshift(currentNode);
  }

  console.log('Returning traversedNodes.')
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