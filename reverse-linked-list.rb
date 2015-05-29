# key insight: represent the end of a list as Node(nil), not nil.
require 'pry'

def assert(description, actual, expected)
  raise "Expected #{expected} but got #{actual}: #{description}" unless expected == actual
  print '.'
end

class Node
  attr_accessor :value, :nxt

  def initialize(value, nxt = nil)
    @value = value
    @nxt = nxt
  end

  def ==(other_node)
    value == other_node.value && nxt == other_node.nxt
  end

  def to_s
    value ? value.to_s + ' -> ' + nxt.to_s : 'nil'
  end

end

def reverse(head)
  current = head
  previous = Node.new(nil)
  nxt = Node.new(nil)
  
  while current.value
    nxt = current.nxt

    current.nxt = previous

    previous = current
    current = nxt
  end

  previous
end

nil_node = Node.new(nil)
three_items = Node.new('a', Node.new('b', Node.new('c', nil_node)))
two_items = Node.new('d', Node.new('e', nil_node))
one_item = Node.new('f', nil_node)
no_items = nil_node



puts three_items.to_s
puts two_items.to_s
puts one_item.to_s
puts no_items.to_s

assert('Reversing an empty list', reverse(no_items), nil_node)
assert('Reversing a one-item list', reverse(one_item), Node.new('f', nil_node))
assert('Reversing a two-item list', reverse(two_items), Node.new('e', Node.new('d', nil_node)))
assert('Reversing a three-item list returns the item', reverse(three_items), Node.new('c', Node.new('b', Node.new('a', nil_node))))
