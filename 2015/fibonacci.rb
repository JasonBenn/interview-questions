# Feedback:

# 1. don't guess. "my intuition is... but let me verify" is ok
# 2. discuss several solutons and their tradeoffs before beginning an implementation. find several possible solutions, examine complexity, elegance, etc.
# 3. be an expert in the language, not a near expert.

# Check out trampolines.
  # trampoline is a function that continually invokes the result of a function until it's not a function.
  # The example in the book didn't have arguments.
  # The example in the book had to change to return a (partial) function instead of a result.
  # Somehow the partial prevented growth of the stack.

require 'pry'
require_relative 'tiny_test_framework'

@cache = {}

def memoize(method)
  operation = Object.method(method)
  Proc.new do |*args|
    return @cache[args] if @cache[args]
    @cache[args] = operation.call(*args)
    @cache[args]
  end
end

def fibonacci(index)
  case index
  when 0 then 0
  when 1 then 1
  else fibonacci(index - 1) + fibonacci(index - 2)
  end
end

# def fibonacci(n)
#   a = 0
#   b = 1
#   until a >= n
#     a += b
#     a, b = b, a
#   end
#   [a, b]
# end

memoized_fibonacci = memoize(:fibonacci)

assert('0', memoized_fibonacci.call(0), 0)
assert('1', memoized_fibonacci.call(1), 1)
assert('2', memoized_fibonacci.call(2), 1)
assert('3', memoized_fibonacci.call(3), 2)
assert('4', memoized_fibonacci.call(4), 3)
assert('5', memoized_fibonacci.call(5), 5)
assert('6', memoized_fibonacci.call(6), 8)


__END__

i computations
0 1
1 1
2 3

