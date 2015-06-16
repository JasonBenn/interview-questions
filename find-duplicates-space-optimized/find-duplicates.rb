# create a hash map of numbers you've seen, return when you try to add an num that already exists.
  # O(N) space, O(N) time.
# for each element, search the entire array for a duplicate.
  # O(1) space, O(N^2) time.
# sort the array as you go from left to right, look for neighbors that are the same.
  # O(1) space, O(N*log(N)) time. But mutates the array...

require 'pry'
require_relative 'tiny_test_framework'

def find_duplicate(input, search_bounds)
  until (search_bounds.first == search_bounds.last)
    first = search_bounds.first
    last = search_bounds.last
    middle = (first + last) / 2

    # Define the array into two halves.
    lower_half = (first..middle)
    upper_half = (middle + 1..last)

    # If a half had one of each number, it'd be:
    lower_min_count = lower_half.last - lower_half.first + 1
    upper_min_count = upper_half.last - upper_half.first + 1

    # Counter variables.
    lower_actual_count = 0
    upper_actual_count = 0

    input.each do |element|
      if lower_half.cover? element
        lower_actual_count += 1
        search_bounds = lower_half if lower_actual_count > lower_min_count
      elsif upper_half.cover? element
        upper_actual_count += 1
        search_bounds = upper_half if upper_actual_count > upper_min_count
      end
    end
  end
  search_bounds.first
end

n = 10
input = [10, 8, 5, 2, 3, 9, 1, 3, 4, 7, 6]
assert('find 3 in even array (of 10)', find_duplicate(input, (1..n)), 3)

n = 9
input = [8, 5, 2, 8, 9, 1, 3, 4, 7, 6]
assert('find 8 in an odd array (of 9)', find_duplicate(input, (1..n)), 8)

n = 2
input = [1, 2, 1]
assert('find 1 in a short array (of 2)', find_duplicate(input, (1..n)), 1)

n = 1
input = [1, 1]
assert('find 1 in the shortest array (of 1)', find_duplicate(input, (1..n)), 1)



__END__

[5, 3, 2, 4, 1, 1]
integers: (1..5)
I can selection sort in memory all ints from 1..2, checking for dupes.
Then I can selection sort in memory all ints from 2..3.
But that's (N^2) time.
Is there a faster sort than breaks things down into chunks?

Binary search only cuts things in half 


COUNTING.

Binary count: the integers in 1..N/2, N/2+1..N.
Whichever one is larger than expected, must contain a duplicate.
Narrow in on that guy.