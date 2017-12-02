import unittest
from numpy.testing import assert_array_equal

class Solution:
    # @param a : list of list of integers
    # @return a list of list of integers
    def diagonal(self, inp):
        dim, _, *arr = [int(el) for el in inp.split(" ")]
        ndiagonals = dim * 2 - 1

        answer = []
        for x in range(dim):  # traverse top row
            row = []
            coords = all_pairs_that_add_to(x)
            for x, y in coords:
                row.append(lookup2d(arr, dim, x, y))
            answer.append(row)
        for offset, x in enumerate(reverse_range(dim - 1)):  # traverse right column (except for top right corner)
            row = []
            coords = all_pairs_that_add_to(x - 1)
            for x, y in coords:
                row.append(lookup2d(arr, dim, x + offset + 1, y + offset + 1))
            answer.append(row)
        return answer

def lookup2d(arr, dim, x, y):
    # Given a flattened square array, return the element at position x,
    return arr[dim * x + y]

def reverse_range(n):
    return range(n, 0, -1)

def all_pairs_that_add_to(n):
    x_coords = range(0, n + 1)
    y_coords = [x - 1 for x in reverse_range(n + 1)]
    return [list(coord) for coord in zip(x_coords, y_coords)]


assert_array_equal(all_pairs_that_add_to(0), [[0, 0]])
assert_array_equal(all_pairs_that_add_to(1), [[0, 1], [1, 0]])
assert_array_equal(all_pairs_that_add_to(2), [[0, 2], [1, 1], [2, 0]])

assert_array_equal(Solution().diagonal("1 1 1"), [[1]])
assert_array_equal(Solution().diagonal("2 2 1 2 3 3"), [[1], [2, 3], [3]])
assert_array_equal(Solution().diagonal("3 3 1 2 3 4 5 6 7 8 9"), [[1], [2, 4], [3, 5, 7], [6, 8], [9]])

print("✅")

# wach --only anti_diagonals.py "clear; date; python anti_diagonals.py"

# n is 1, output is:
# [0, 1], [1, 0] # add up to 1
# 0...1
# 1...0


# for a 1x1, return tehse:
[0, 0] # add up to 0
# 1 row


# for a 2x2, return these elements:
[0, 0] # add up to 0
[0, 1], [1, 0] # add up to 1
[1, 1] # add up to 2
# 3 rows

# for a 3x3, return these:
[0, 0] # add up to 0
[0, 1], [1, 0] # add up to 1
[0, 2], [1, 1], [2, 0] # add up to 2
[1, 2], [2, 1] # add up to 3
[2, 2] # add up to 4
# 5 rows

# for a 4x4, return these:
[0, 0]
[0, 1], [1, 0]
[0, 2], [1, 1], [2, 0]
[0, 3], [1, 2], [2, 1], [3, 0] # adds up to 3
[1, 3], [2, 2], [3, 1] # adds up to 4. is just 1 added to row 3.
[2, 3], [3, 2] # adds up to 5. is just 2 added to row 2.
[3, 3] # adds up to 6. is just 3 added to row 1.
# 7 rows

# the lists also increase in length by 1

# first element is 1 as you move up the list
# first element increments thereafter.

# 1: 1
# 2: 3
# 3: 5
# 4: 7
# 5: 9
# 6: 11
