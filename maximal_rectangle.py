from minitest import *
import numpy as np


class Rect:
    def __init__(self, top_left, bottom_right):
        self.top_left = top_left
        self.bottom_right = bottom_right

    def width(self):
        return self.bottom_right[0] - self.top_left[0]

    def height(self):
        return self.bottom_right[1] - self.top_left[1]

    def size(self):
        return self.width() * self.height()

    def __repr__(self):
        return "%s x %s at %s" % (self.width(), self.height(), self.top_left)


# Use & masks, descending down rows


def maximal_rectangle(matrix):
    # Given a 2D binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.
    xlen, ylen = len(matrix), len(matrix[0])

    # something to do with backtracking: if i build up
    # something to do with graphs?
    top_left = (0, 0)
    bottom_right = (0, 0)  # exclusive
    best_rect = Rect(top_left, bottom_right)

    for x in range(xlen):
        # IF ZERO: skip to next
        # IF can't expand in X, expand in Y:

        for y in range(ylen):
            # IF ZERO: skip to next
            # Set coordinates
            print("considering:", x, y)
            potential_rect = Rect(top_left, (x, y))

            if potential_rect.size() > best_rect.size():
                best_rect = potential_rect
            print("best_rect:", best_rect, "\n")

        # IF can't expand in Y, backtrack, expand in X?


    return best_rect.size()



test_equals(
    maximal_rectangle([
        [1]
    ]), 1
)

test_equals(
    maximal_rectangle([
        [1, 1],
        [0, 0]
    ]), 2
)

# test_equals(
#     maximal_rectangle([
#         [1, 0],
#         [1, 0]
#     ]), 2
# )

# test_equals(
#     maximal_rectangle([
#         [1, 1],
#         [1, 1]
#     ]), 4
# )

# test_equals(
#     maximal_rectangle([
#         [1, 0],
#         [1, 1]
#     ]), 2
# )

# test_equals(
#     maximal_rectangle([
#         [1, 0, 1, 0, 0],
#         [1, 0, 1, 1, 1],
#         [1, 1, 1, 1, 1],
#         [1, 0, 0, 1, 0]
#     ]), 6
# )


# wach --only maximal_rectangle.py "python maximal_rectangle.py"
