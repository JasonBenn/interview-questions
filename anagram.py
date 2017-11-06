import unittest
from collections import Counter


def anagram(a, b):
    # Oh dang! this is log linear, because sorting is n log n.
    return sorted(a) == sorted(b)

def anagram(a, b):
    # This strategy of O(N)
    # Works better because there just aren't that many characters.
    # Story might be different if there were millions or billions or characters in the alphabet that I were counting.
    counts = Counter(list(a))
    for char in b:
        counts.subtract(char)
    unique_counts = list(set(counts.values()))
    return unique_counts == [0] or unique_counts == []


class TestCase(unittest.TestCase):
    def test_area(self):
        self.assertTrue(anagram("heart", "earth"))
        self.assertFalse(anagram("oboe", "boo"))
        self.assertFalse(anagram("oboe", "booes"))
        self.assertTrue(anagram("california", "lacifniaro"))
        self.assertTrue(anagram("", ""))

if __name__ == '__main__':
    unittest.main()
