class Node
  attr_reader :val, :left, :right

  def initialize(val, left = nil, right = nil)
    @val = val
    @left = left
    @right = right
  end
end

def is_bst?(node, valid_range = (-Float::INFINITY...Float::INFINITY))
  return false unless valid_range.cover? node.val

  if node.left
    lower_bound = valid_range.first
    upper_bound = node.val
    return false unless is_bst?(node.left, (lower_bound...upper_bound))
  end

  if node.right
    lower_bound = node.val + 1
    upper_bound = valid_range.last
    return false unless is_bst?(node.right, (lower_bound...upper_bound))
  end

  true
end

if __FILE__ == $0
  require_relative 'tiny_test_framework'

  balanced = Node.new(3,
    Node.new(2,
      Node.new(1)
    ),
    Node.new(4,
      nil,
      Node.new(6)
    )
  )

  unbalanced = Node.new(1,
    Node.new(2,
      Node.new(1)
    ),
    Node.new(4,
      nil,
      Node.new(6)
    )
  )

  sneaky_unbalanced = Node.new(50,
    Node.new(30,
      Node.new(20),
      Node.new(60)
    ),
    Node.new(80,
      Node.new(70),
      Node.new(90)
    )
  )

  assert(is_bst?(balanced), true)
  assert(is_bst?(unbalanced), false)
  assert(is_bst?(sneaky_unbalanced), false)
end
