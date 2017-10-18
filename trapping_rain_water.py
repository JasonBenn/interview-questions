import unittest


def area(heights):
    water_level = min(heights[0], heights[-1])
    print(heights)
    return sum([ max(water_level - height, 0) for height in heights[1:-1] ])



class Solution(object):
    def trap(self, heights):
        total_area = 0
        p1 = 0
        last_p2 = len(heights) - 1

        # ascend to first peak
        while p1 < last_p2 and heights[p1] < heights[p1 + 1]:
            p1 += 1
        p2 = p1

        ascended = False

        last_p2 = len(heights) - 1

        while p2 <= last_p2:
            if p2 == last_p2:
                total_area += area(heights[p1:p2+1])
            elif heights[p2 + 1] < heights[p2] and ascended:
                # p2 is at a local maximum
                total_area += area(heights[p1:p2+1])
                p1 = p2
                ascended = False
            else:
                ascended = True

            p2 += 1

        return total_area


class TestCase(unittest.TestCase):
    def test_area(self):
        pass
        self.assertEqual(area([1, 0, 2]), 1)
        self.assertEqual(area([2, 1, 0, 1, 3]), 4)
        self.assertEqual(area([2, 1, 2]), 1)

    def test_solution(self):
        self.assertEqual(Solution().trap([]), 0)
        self.assertEqual(Solution().trap([0]), 0)
        self.assertEqual(Solution().trap([5]), 0)
        self.assertEqual(Solution().trap([5, 5]), 0)
        self.assertEqual(Solution().trap([1, 0, 1]), 1)
        # self.assertEqual(Solution().trap([2,1,0,2]), 3)
        self.assertEqual(Solution().trap([0, 1, 0, 1]), 1)
        self.assertEqual(Solution().trap([2, 0, 1, 1, 2]), 4)
        self.assertEqual(Solution().trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]), 6)
        self.assertEqual(Solution().trap([0,5,6,4,6,1,0,0,2,7]), 23)


if __name__ == '__main__':
    unittest.main()
