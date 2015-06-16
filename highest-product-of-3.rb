# Unfinished

# Given an array_of_ints, find the highest_product you can get from three of the integers.
# The input array_of_ints will always have at least three integers.
# What about with negative numbers?
# Bonus: what about for 4 n's?
# Bonus: what about for k n's?

require './assert'

base = [85, 75, 84]
one_negative = [10, 5, -1, 1]
two_negatives = [10, -5, -1, 1, 1]
large = [96, 89, 12, 39, 96, 50, 75, 75]
large_and_negative = [96, 12, 39, 50, -75, -75]

def highest_product(arr)
  # 
end

assert(highest_product(base), 85*75*84)
assert(highest_product(one_negative), 10*5*1)
assert(highest_product(two_negatives), 10*-5*-1)
assert(highest_product(large), 96*89*96)
assert(highest_product(large_and_negative), 96*-75*-75)
