# Done! Review:
# You got the solution once you saw the flipping method, which is fine and all, but you gave yourself lots of hints.
# O(N) complexity discussion was also a bit above your head.
# Be more diligent in considering time cost in the future, and discuss tradeoffs where possible.

puts '...'

require_relative 'tiny_test_framework'
require 'pry'

class Stack
  attr_reader :arr

  def initialize(*args)
    @arr = args
  end

  def ==(other_stack)
    @arr = other_stack.arr
  end

  def push(elem)
    @arr.push(elem)
    self
  end

  def empty?
    @arr.empty?
  end

  def pop
    @arr.pop
  end
end

class StackQueue
  def initialize
    @enqueue_stack = Stack.new
    @dequeue_stack = Stack.new
    @height = 0
  end

  def enqueue(elem)
    if @enqueue_stack.empty?
      @height.times do
        @enqueue_stack.push(@dequeue_stack.pop)
      end
    end

    @enqueue_stack.push(elem)
    @height += 1
    self
  end

  def dequeue
    if @dequeue_stack.empty?
      @height.times do
        @dequeue_stack.push(@enqueue_stack.pop)
      end
    end

    @height -= 1 if @height > 0
    @dequeue_stack.pop
  end
end

assert('Stack push works', Stack.new(1, 2).push(3), Stack.new(1, 2, 3))
assert('Stack pop return top element', Stack.new(1, 2).pop, 2)
assert('Stack pop mutates arr', (s = Stack.new(1, 2); s.pop; s), Stack.new(1))
assert('Enqueuing increase queue length', true, true)

__END__

O(N) answer:
enqueue(a) # [a]
enqueue(b) # [a, b]
enqueue(c) # [a, b, c]
dequeue    # [b, c]


D
C   A
B   B
A   C


enqueue D, then dequeue 4 times.
Expecting: nil, A, B, C, D.

1.push, 2.pop, 2.pop, 2.pop, 2.empty? is true! crap. partially flip the other?


enqueue D, dequeue 2 times, enqueue E, dequeue 3 times.
nil, A, B, nil, C, D, E.
1.push, 2.pop, 2.pop, 1.push, 2.pop, 2.empty! crap - now what's our state?. 1.pop.
We could keep track of dequeues since our the last shuffle of the enqueue stack: 3. 
We can compare this to total height of enqueue stack (3) and realize that our queue is now empty.

D
C
B
A   _


enqueue: pushes to first stack, regenerates second stack.
dequeue: pops second stack, regenerates first stack.


