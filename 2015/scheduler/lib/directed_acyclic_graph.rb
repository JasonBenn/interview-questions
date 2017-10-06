class DirectedAcyclicGraph
  class CycleFoundError < ArgumentError; end

  attr_reader :graph
  attr_accessor :visited, :sorted

  def initialize(graph)
    @graph = graph
    @visited = {}
    @sorted = []
  end

  def topological_sort
    graph.keys.each do |node|
      depth_first_search(node) unless visited[node]
    end
    sorted
  end

  def depth_first_search(node)
    visited[node] = true
    graph[node].each do |connected_node|
      visited_but_not_added = visited[connected_node] && !sorted.include?(connected_node)  
      raise CycleFoundError, "Error: cycle found. Look near '#{connected_node}'." if visited_but_not_added
      depth_first_search(connected_node) unless visited[connected_node]
    end
    sorted << node
  end
end
