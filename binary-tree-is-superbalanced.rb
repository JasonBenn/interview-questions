require 'pry'

def assert(blurb, expected, actual)
  raise "Expected #{expected}, got #{actual}: #{blurb}" unless expected == actual
  print '.'
end

class Node  
  attr_accessor :value, :left, :right

  def initialize(value, left = nil, right = nil)
    @value = value
    @left = left
    @right = right
  end

  def ==(another_node)
    self.value == another_node.value && self.left == another_node.left && self.right == another_node.right
  end

  def inspect
    [left, value, right].compact.map(&:inspect).join('')
  end

  def bottom_leaf?
    @left.nil? && @right.nil?
  end

  # def collect_leaf_depths(current_depth = 0, all_depths = [])
  #   # BASE CASE: you're at the bottom. 
  #   if bottom_leaf?
  #     depths.push current_depth
  #     return
  #   end
  #   # take the current depth accumulator, add it to an array accumulator. every time you pop up, decrement the current depth accumulator. ooh, this'll be tricky.
  #   # add 1 to an accumulator 
  # end

  # ALTERNATE ROUTE:
  # collect each bottom leaf
  # then calculate their depths

  def leaf_depth(leaf_value, depth = 0)
    return depth if leaf_value == value

    if leaf_value < value
      left.leaf_depth(leaf_value, depth + 1)
    else
      right.leaf_depth(leaf_value, depth + 1)
    end
  end

  def collect_bottom_leaves(leaves = [])
    if bottom_leaf?
      leaves.push(self)
      return leaves
    end

    left.collect_bottom_leaves(leaves)
    right.collect_bottom_leaves(leaves)
  end

  def superbalanced?
    depths = collect_bottom_leaves.map { |bottom_leaf| self.leaf_depth(bottom_leaf.value) }
    depths.max - depths.min <= 1
  end
end

#    4
#  2   6
# 1 3 5 7


one = Node.new(1)
one_to_three = Node.new(2, Node.new(1), Node.new(3))
five_to_seven = Node.new(6, Node.new(5), Node.new(7))
one_to_seven = Node.new(4, one_to_three, five_to_seven)

# assert('Test framework works', 1, 1)
# assert('Leaf depth of 1 in a one-node tree is 0', one.leaf_depth(1), 0)
# assert('Leaf depth of 1 in the 1..3 tree is 1', one_to_three.leaf_depth(1), 1)
# assert('Leaf depth of 1 in the 1..7 tree is 2', one_to_seven.leaf_depth(1), 2)
assert('Collect bottom leaves of 1..1 tree', one.collect_bottom_leaves, [Node.new(1)])
assert('Collect bottom leaves of 1..3 tree', one_to_three.collect_bottom_leaves, [Node.new(2, Node.new(1), Node.new(3))])
# assert('Tiny with no leaves', one.superbalanced?, true)
# assert('Tree with two leaves', one_to_three.superbalanced?, true)
# assert('Balanced tree is superbalanced', one_to_seven.superbalanced?, true)
