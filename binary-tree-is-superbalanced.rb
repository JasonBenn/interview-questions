# Done. Review:
  # pros: simple, easy to read. Works!
  # cons: doesn't short circuit

require 'pry'
require_relative 'tiny_test_framework'

class Node
  attr_accessor :value, :left, :right

  def initialize(value, left = nil, right = nil)
    @value = value
    @left = left
    @right = right
  end

  def superbalanced?
    depths = leaf_depths
    depths.max - depths.min <= 1
  end

  protected

  def leaf_depths(current_depth = 0, results = [])
    return results.push(current_depth) unless left || right
    left.leaf_depths(current_depth + 1, results) if left
    right.leaf_depths(current_depth + 1, results) if right
    results
  end
end

one_node = Node.new(5)
assert('one node is superbalanced', one_node.superbalanced?, true)

three_nodes_balanced = Node.new(5, Node.new(3), Node.new(6))
assert('three nodes balanced is superbalanced', three_nodes_balanced.superbalanced?, true)

five_nodes_left_heavy = Node.new(5, 
  Node.new(3, 
    Node.new(4), 
    Node.new(3)), 
  Node.new(6))
assert('five left-heavy nodes is superbalanced', five_nodes_left_heavy.superbalanced?, true)

five_unbalanced = Node.new(5, 
  Node.new(3, 
    Node.new(4), 
    Node.new(3, 
      Node.new(6)
    )),
  Node.new(1))
assert('five unbalanced is not superbalanced', five_unbalanced.superbalanced?, false)
