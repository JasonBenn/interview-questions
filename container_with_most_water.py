import unittest


def area(a, b, heights):
    return (b - a) * min(heights[a], heights[b])


class Solution(object):
    def maxArea(self, heights):
        p1 = 0
        p2 = len(heights) - 1

        best_area = area(p1, p2, heights)

        while p1 != p2:
            if heights[p1] <= heights[p2]:
                p1 += 1
            else:
                p2 -= 1
            candidate_area = area(p1, p2, heights)
            if candidate_area > best_area:
                best_area = candidate_area

        return best_area


class TestCase(unittest.TestCase):
    def test_solution(self):
        self.assertEqual(Solution().maxArea([1, 0, 1]), 2)
        self.assertEqual(Solution().maxArea([3, 0, 3, 1]), 6)
        self.assertEqual(Solution().maxArea([3, 0, 3, 1, 4, 5]), 15)
        self.assertEqual(Solution().maxArea([1, 2, 3, 2, 1]), 4)
        self.assertEqual(Solution().maxArea([1, 2, 3, 2, 1, 4, 5]), 12)
        self.assertEqual(Solution().maxArea([8, 7, 1, 2, 1, 1]), 7)


if __name__ == '__main__':
    unittest.main()
