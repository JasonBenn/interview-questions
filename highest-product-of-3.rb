# Unfinished
# Done, needs review. Compare to Interview Cake.
# I think I did a decent job coming up with edge cases as I went.
# There's still a bit of duplication that should be factored out.
# Took about 45 minutes, which seems long.

# Given an array_of_ints, find the highest_product you can get from three of the integers.
# The input array_of_ints will always have at least three integers.
# What about with negative numbers?
# Bonus: what about for 4 n's?
# Bonus: what about for k n's?

require './assert'
require 'pry'

base = [85, 75, 84].shuffle
one_negative = [10, 5, -1, 1].shuffle
two_negatives = [10, -5, -1, 1, 1].shuffle
large = [96, 89, 12, 39, 96, 50, 75, 75].shuffle
large_and_negative = [96, 12, 39, 50, -75, -75].shuffle
two_positives_one_negative = [96, 12, -10].shuffle
one_positive = [90, -10, -75].shuffle

class Array
  def sort_absolute
    sort_by { |n| -n.abs }
  end
end

def highest_product(arr, n = 3)
  num_positives_to_remember = n
  num_negatives_to_remember = n.odd? ? n - 1 : n

  top_nums = arr.reduce(top_positives: [], top_negatives: []) do |accum, elem|
    if elem > 0
      accum[:top_positives] = accum[:top_positives].push(elem).sort_absolute.take(num_positives_to_remember)
    else
      accum[:top_negatives] = accum[:top_negatives].push(elem).sort_absolute.take(num_negatives_to_remember)
    end
    accum
  end

  positives = top_nums[:top_positives]
  negatives = top_nums[:top_negatives]

  if positives.length + negatives.length == 3
    return (positives.reduce(:*) || 1) * (negatives.reduce(:*) || 1)
  elsif negatives.length == 0 || negatives.length == 1
    return positives.reduce(:*)
  elsif negatives.length.even?
    if positives[1] * positives[2] < negatives[0] * negatives[1]
      return positives[0] * negatives.reduce(:*)
    else
      return positives.reduce(:*)
    end
  end

end

assert(highest_product(base), 85*75*84)
assert(highest_product(one_negative), 10*5*1)
assert(highest_product(two_negatives), 10*-5*-1)
assert(highest_product(large), 96*89*96)
assert(highest_product(large_and_negative), 96*-75*-75)
assert(highest_product(two_positives_one_negative), 96*12*-10)
assert(highest_product(one_positive), 90*-10*-75)