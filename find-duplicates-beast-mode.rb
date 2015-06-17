# Unfinished. 
# The algorithm is well-designed (I think, see below and the paper).
# But ran out of time. Whatevs. I call this one a victory, for a well desigend algo.

require 'pry'
require_relative 'tiny_test_framework'

def find_duplicate(input, n)
  input.each_with_index do |element, index| # 4, 0
    visited = []
    index_to_insert = index # 0

    until visited.include? index_to_insert # [].include? 0? false.
      visited.unshift(index_to_insert) # [0]
      index_to_insert = input[index_to_insert - 1] # input[3] is 1
    end

    # binding.pry if visited.find_index(index_to_insert) > 0
    return input[visited.first] if visited.find_index(index_to_insert) > 0
  end
end

n = 10
input = [10, 8, 5, 2, 3, 9, 1, 3, 4, 7, 6]
assert('find 3 in even array (of 10)', find_duplicate(input, n), 3)

n = 9
input = [8, 5, 2, 8, 9, 1, 3, 4, 7, 6]
assert('find 8 in an odd array (of 9)', find_duplicate(input, n), 8)

n = 2
input = [1, 2, 1]
assert('find 1 in a short array (of 2)', find_duplicate(input, n), 1)

n = 1
input = [1, 1]
assert('find 1 in the shortest array (of 1)', find_duplicate(input, n), 1)

n = 4
input = [4, 4, 3, 1, 2]
assert('find 1 in the shortest array (of 1)', find_duplicate(input, n), 4)

__END__

1 goes to 1.
1 goes to 1. 
How do I know it's the same 1? Because they're both at index 0.
So:
For one dupe, sorted, at beginning:
Start at 0: index 0 (1) -> index 0 (1). Index 0 is already on our stack, so this is a loop. No elements besides it on the call stack.
Start at 1: index 1 (1) -> index 0 (1) -> index 0 (1). Index 1 (1) is left on the call stack, it's a dupe.
Start at 2: index 2 (2) -> index 1 (1) -> index 0 (1) -> index 0 (1). Index 2 led to 1, which led us to a loop. After knocking 0 and everything after off the stack, the end is our dupe.

For one dupe, unsorted, at beginning:
Start at 0: index 0 (4) -> index 3 (1) -> index 0 (4). We've already been to 0, we have a loop. Knock everything after it off the call stack, what's left? Nothing.
Start at 1: index 1 (4) -> index 3 (1) -> index 0 (4) -> index 3 (1). Already been there. Knock it and everything after off the call stack. What's left? 4! Dupe!
Start at 2: index 2 (3) -> index 2 (3). Already been there. Knock it and everything after off the stack. Last element would be our dupe, but there's nothing there.






