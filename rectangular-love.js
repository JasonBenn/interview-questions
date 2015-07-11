// IF lowA < lowB < highA OR lowB < lowA < highB
  // overlap!

// IF overlap in X AND overlap in Y
  // intersection!
  // x is MAX lowXA, lowXB
  // y is MAX lowYA, lowYB
  // highXI is MIN highXA, highXB
  // highYI is MIN highYA, highYB
  // width is highXI - x
  // height is highYI - y

import { Map, is } from 'immutable';

function assert(actual, expected) {
  if (is(expected, actual)) {
    console.log('✓')
  } else {
    console.log(`✘ expected: ${JSON.stringify(expected)} !== actual: ${JSON.stringify(actual)}`)
  }
}

let highX = (rectangle) => {
  return rectangle.x + rectangle.width;
}

let highY = (rectangle) => {
  return rectangle.y + rectangle.height;
}

let overlapping = (a, b, side) => {
  let high = side === 'x' ? highX : highY

  return [[a, b], [b, a]].some(([first, second]) => {
    return (first[side] < second[side]) && (second[side] < high(first))
  })
}

let intersection = (a, b) => {
  if (overlapping(a, b, 'x') && overlapping(a, b, 'y')) {
    let highXIntersection = Math.min(highX(a), highX(b))
    let highYIntersection = Math.min(highY(a), highY(b))

    let x = Math.max(a.x, b.x);
    let y = Math.max(a.y, b.y);

    return Map({
      x: x,
      y: y,
      width: highXIntersection - x,
      height: highYIntersection - y
    })
  } else return false;
}

let a = {
  x: 1,
  y: 2,
  width: 3,
  height: 3,
}

let b = {
  x: 2,
  y: 3,
  width: 3,
  height: 3,
}

assert(intersection(a, b), Map({x: 2, y: 3, width: 2, height: 2}));