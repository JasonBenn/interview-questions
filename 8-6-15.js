import { List, Repeat } from 'immutable'

class Vertex {
  visited = false
  neighbors = List()
}

const buildBoard = () => {
  const possibleNeighbors = List([
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-2, -1],
    [-1, -2],
    [-2, 1],
    [-1, 2],
  ])
  const vertices = List([
    List([new Vertex(), new Vertex(), new Vertex(), new Vertex(), new Vertex(), new Vertex(), new Vertex(), new Vertex()]),
    List([new Vertex(), new Vertex(), new Vertex(), new Vertex(), new Vertex(), new Vertex(), new Vertex(), new Vertex()]),
    List([new Vertex(), new Vertex(), new Vertex(), new Vertex(), new Vertex(), new Vertex(), new Vertex(), new Vertex()]),
    List([new Vertex(), new Vertex(), new Vertex(), new Vertex(), new Vertex(), new Vertex(), new Vertex(), new Vertex()]),
    List([new Vertex(), new Vertex(), new Vertex(), new Vertex(), new Vertex(), new Vertex(), new Vertex(), new Vertex()]),
    List([new Vertex(), new Vertex(), new Vertex(), new Vertex(), new Vertex(), new Vertex(), new Vertex(), new Vertex()]),
    List([new Vertex(), new Vertex(), new Vertex(), new Vertex(), new Vertex(), new Vertex(), new Vertex(), new Vertex()]),
    List([new Vertex(), new Vertex(), new Vertex(), new Vertex(), new Vertex(), new Vertex(), new Vertex(), new Vertex()]),
  ])

  return vertices.map((row, rowI) => {
    return row.map((vertex, colI) => {
      vertex.neighbors = possibleNeighbors.map(([rowDelta, colDelta]) => {
        const neighborRowI = rowI + rowDelta
        const neighborColI = colI + colDelta
        if (neighborRowI < 0 || neighborRowI > 7 || neighborColI < 0 || neighborColI > 7) return
        return vertices.get(neighborRowI).get(neighborColI)
      }).filter(vertex => !!vertex)
      return vertex
    })
  })
  return vertices
}

const CLEAR_SCREEN = ''

const print = (board) => {
  return CLEAR_SCREEN + board.map(row => {
    return row.map(vertex => vertex.visited ? 'X' : 'O').join(' ')
  }).join("\n")
}

const board = buildBoard()

const countVisited = (board) => {
  const count = board.reduce((sum, row) => {
    return sum + row.reduce((sum, vertex) => {
      return sum + (vertex.visited ? 1 : 0)
    }, 0)
  }, 0)
  return count
}

const visitAllWithKnight = (board, vertex) => {
  vertex.visited = true
  process.stdout.write(print(board))
  if (countVisited(board) === 64) return true
  const toVisit = vertex.neighbors.sortBy(neighbor => {
    return neighbor.neighbors.reduce((sum, neighborNeighbor) => {
      return sum + neighborNeighbor.visited ? 1 : 0
    }, 0)
  }).filter(vertex => !vertex.visited)

  if (toVisit.size === 0) return false

  return toVisit.some(vertex => visitAllWithKnight(board, vertex))
}

console.log(visitAllWithKnight(board, board.get(0).get(0)))

// mark this vertex as visited
// (print board?)
// victory condition met?
// examine neighbor vertices
  // for each that is unvisited
    // calculate the number of unvisited neighbors it has
  // choose the neighbor with the lowest score (tiebreaker? consider later)
  // recurse





















