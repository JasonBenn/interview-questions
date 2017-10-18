import unittest


def area(heights):
    print("measuring area of %s" % heights)
    if len(heights) == 0:
        return 0
    water_level = min(heights[0], heights[-1])
    return sum([ max(water_level - height, 0) for height in heights[1:-1] ])


def ascend(p, heights):
    # ascend to the next local maximum
    while p < len(heights) - 1 and heights[p] <= heights[p + 1]:
        p += 1
    return p

def descend(p, heights):
    # descend to the next local minimum
    while p < len(heights) - 1 and heights[p] >= heights[p + 1]:
        p += 1
    return p

class Solution(object):
    def trap(self, heights):
        p1 = ascend(0, heights)
        p2 = p1
        total_area = 0

        while p2 <= len(heights) - 1:
            print("p1", p1, "p2", p2)
            print("p2 descending from %s" % p2)
            p2 = descend(p2, heights)
            print("p2 descended to %s" % p2)
            p2 = ascend(p2, heights)
            print("p2 ascended to %s" % p2)
            total_area += area(heights[p1:p2])
            p1 = p2

        return total_area


class TestCase(unittest.TestCase):
    def test_area(self):
        pass
        # self.assertEqual(area([1, 0, 2]), 1)
        # self.assertEqual(area([2, 1, 0, 1, 3]), 4)
        # self.assertEqual(area([2, 1, 2]), 1)

    def test_solution(self):
        # self.assertEqual(Solution().trap([]), 0)
        # self.assertEqual(Solution().trap([0]), 0)
        # self.assertEqual(Solution().trap([5]), 0)
        # self.assertEqual(Solution().trap([5, 5]), 0)
        # self.assertEqual(Solution().trap([1, 0, 1]), 1)
        self.assertEqual(Solution().trap([2,1,0,2]), 3)
        # self.assertEqual(Solution().trap([0, 1, 0, 1]), 1)
        # self.assertEqual(Solution().trap([2, 0, 1, 1, 2]), 4)
        # self.assertEqual(Solution().trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]), 6)
        # self.assertEqual(Solution().trap([0,5,6,4,6,1,0,0,2,7]), 23)


if __name__ == '__main__':
    unittest.main()
