# Review: crushed it. Wrote good tests, went straight through the implementation, very few issues.
# Didn't address alternative solutions. Could have just walked through the stack and found the max with every call to get_max.
# This solution is more time-efficient - O(1) time for get_max, but incurs a O(n) space cost in the worst case.
# The walk the stack solution reverses those - O(n) time cost for get_max, but no space cost.

class Stack
  attr_reader :elems

  def initialize
    @elems = []
  end

  def ==(other_stack)
    @elems = other_stack.elems
  end

  def peek
    @elems.last
  end

  def push(elem)
    @elems.push(elem)
    self
  end

  def empty?
    @elems.empty?
  end

  def pop
    @elems.pop
  end
end

class MaxStack < Stack
  def initialize
    @max_stack = Stack.new
    super
  end

  def push(elem)
    @max_stack.push(elem) if @max_stack.empty? || (elem >= @max_stack.peek)
    super(elem)
  end

  def pop
    @max_stack.pop if peek == @max_stack.peek
    super
  end

  def get_max
    @max_stack.peek
  end
end

if __FILE__ == $0
  require_relative 'tiny_test_framework'

  [
    [[1, 2, 3], 0, 3],
    [[1, 3, 1], 0, 3],
    [[1, 3, 3], 1, 3],
    [[1, 3, 3], 2, 1],
    [[5, 3, 3], 2, 5]
  ].each do |pushes, num_pops, expected_largest|
    s = MaxStack.new
    pushes.each { |n| s.push(n) }
    num_pops.times { s.pop }
    assert(s.get_max, expected_largest, "Max: #{expected_largest}")
  end
end
