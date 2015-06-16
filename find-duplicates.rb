# Done. Review:
  # I did a good job of generating possibilities and dismissing them for Big O reasons.
  # I also did a good job of considering the drawbacks of mutating input.
  # The solution took some hints, but when the lightbulb clicked, I settled on the right solution.
  # I also did a great job debugging! I never really got stuck.
# Cons:
  # This was great! Good job man!
  # There is a bonus question, though:
    # This function always returns one duplicate, but there may be several duplicates. Write a function that returns all duplicates.


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
