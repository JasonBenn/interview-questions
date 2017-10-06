import test from 'tape'
import _ from 'lodash'

class GraphVertex {
  constructor(val, edges = []) {
    this.val = val
    this.edges = edges
  }

  inspect() {
    return `${this.val}(${this.edges.length}e)`
  }
}

const g = (val, edges) => new GraphVertex(val, edges)

const generatePatterns = word => {
  const results = []
  for (let i = 0, l = word.length; i < l; i++) {
    results.push(word.slice(0, i) + '_' + word.slice(i + 1, l))
  }
  return results
}

const putOrConcat = (key, value, mappingToLists) => {
  if (!mappingToLists[key]) mappingToLists[key] = []
  mappingToLists[key].push(value)
  return mappingToLists
}

const buildGraph = dict => {
  const patternsToMatchingWords = dict.reduce((resultMap, word) => {
    generatePatterns(word).forEach(pattern => putOrConcat(pattern, word, resultMap))
    return resultMap
  }, {})

  const adjacencyList = dict.reduce((list, word) => {
    list[word] = new GraphVertex(word)
    return list
  }, {})

  _.each(adjacencyList, (vertex, word, list) => {
    const edgeWords = generatePatterns(word).reduce((edges, pattern) => {
      return _.without(edges.concat(patternsToMatchingWords[pattern]), word)
    }, [])

    const edgeVertices = edgeWords.map(word => list[word])
    adjacencyList[word].edges = edgeVertices
  })

  return adjacencyList
}

test('word ladder', t => {
  const dict = ["hot", "dot", "dog", "lot", "log", "hit", "cog"]
  const expectedAdjacencyList = {
    hot: g('hot', ['dot', 'lot', 'hit']),
    dot: g('dot', ['hot', 'lot', 'dog']),
    dog: g('dog', ['log', 'cog', 'dot']),
    lot: g('lot', ['hot', 'dot', 'log']),
    log: g('log', ['dog', 'cog', 'lot']),
    hit: g('hit', ['hot']),
    cog: g('cog', ['dog', 'log']),
  }

  t.plan(2)
  const actualAdjacencyList = buildGraph(dict)

  const actualAdjacencyListEdges = _.values(_.map(actualAdjacencyList, vertex => vertex.edges.map(edge => edge.val)))
  const expectedAdjacencyListEdges = _.values(expectedAdjacencyList).map(v => v.edges)

  t.ok(_.isEqual(_.keys(expectedAdjacencyList), _.keys(actualAdjacencyList)))
  t.ok(_.isEqual(actualAdjacencyListEdges, expectedAdjacencyListEdges))
})


const lengthBetweenVertices = (graph, start, end) => {
  const visited = []
  const queue = [[0, graph[start]]]

  while (queue.length) {
    let [depth, vertex] = queue.shift()
    if (vertex.val === end) return depth
    visited.push(vertex)
    const nextEdges = _.without(vertex.edges, ...visited)
    queue.push(...nextEdges.map(vertex => [depth + 1, vertex]))
  }

  return undefined
}

const ladderLength = (start, end, dict) => {
  const adjacencyList = buildGraph(dict)
  return lengthBetweenVertices(adjacencyList, start, end)
}

if (require.main === module) {
  test('word ladder', t => {
    const dict = ["hot", "dot", "dog", "lot", "log", "hit", "cog"]

    let testCases = [
      [["hit", "cog"], 4],
      [["hot", "dot"], 1],
      [["hot", "hot"], 0],
    ]

    t.plan(testCases.length)
    testCases.forEach(([[start, end], result]) => {
      t.equals(ladderLength(start, end, dict), result)
    })
  })
}
