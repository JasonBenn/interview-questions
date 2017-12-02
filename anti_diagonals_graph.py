import unittest
from numpy.testing import assert_array_equal

class Solution:
    # @param a : list of list of integers
    # @return a list of list of integers
    def diagonal(self, arr):
        dim = len(arr[0])
        return [[arr[x][y] for (x, y) in down_left_neighbors(dim, coord)] for coord in top_right_edge_coords(dim - 1) ]

def top_right_edge_coords(dim):
    top_row = [[0, col] for col in range(dim + 1)]
    right_col = [[row, dim] for row in range(dim + 1)[1:]]  # exclude top right corner, we already have it
    return top_row + right_col

def down_left_neighbors(dim, coord):
    row, col = coord
    return [[row + n, col - n] for n in range(dim + 1) if row + n < dim and col - n >= 0]

assert_array_equal(top_right_edge_coords(0), [[0, 0]])
assert_array_equal(top_right_edge_coords(1), [[0, 0], [0, 1], [1, 1]])
assert_array_equal(top_right_edge_coords(2), [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2]])
print("✅")

assert_array_equal(down_left_neighbors(3, [0, 0]), [[0, 0]])
assert_array_equal(down_left_neighbors(3, [0, 1]), [[0, 1], [1, 0]])
assert_array_equal(down_left_neighbors(3, [0, 2]), [[0, 2], [1, 1], [2, 0]])
print("✅")

assert_array_equal(Solution().diagonal([[1]]), [[1]])
assert_array_equal(Solution().diagonal([[1, 2], [3, 3]]), [[1], [2, 3], [3]])
assert_array_equal(Solution().diagonal([[1, 2, 3],
                                        [4, 5, 6],
                                        [7, 8, 9]]),
                                        [[1], [2, 4], [3, 5, 7], [6, 8], [9]])
print("✅")

# wach --only anti_diagonals_graph.py "clear; date; python anti_diagonals_graph.py"

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
