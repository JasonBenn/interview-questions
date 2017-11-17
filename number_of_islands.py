import unittest


LAND = '1'
WATER = '0'
VISITED = 'x'

def explore(grid, row, col):
    collimit = len(grid[0])
    rowlimit = len(grid)
    if 0 <= row < rowlimit and 0 <= col < collimit and grid[row][col] == LAND:
        grid[row][col] = VISITED
        [explore(grid, row+i, col+j) for i, j in ((0, 1), (1, 0), (0, -1), (-1, 0))]

def num_islands(grid):
    islands = 0
    for col in range(len(grid[0])):
        for row in range(len(grid)):
            if grid[row][col] == LAND:
                islands += 1
                explore(grid, row, col)
    return islands


class TestCase(unittest.TestCase):
    def test_num_islands(self):
        self.assertEqual(num_islands([["1"]]), 1)
        self.assertEqual(num_islands([["1", "0"], ["0","1"]]), 2)
        self.assertEqual(num_islands([["1", "0", "1"], ["0","1", "0"], ["0", "1", "0"]]), 3)
        self.assertEqual(num_islands([["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]), 1)
        self.assertEqual(num_islands([["1","1","0","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]), 2)
        self.assertEqual(num_islands([["0"]]), 0)
        self.assertEqual(num_islands([[]]), 0)

if __name__ == '__main__':
    unittest.main()
