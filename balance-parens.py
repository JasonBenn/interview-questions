import unittest

left_sides = list("{[(")
matching_right_sides = {"{": "}", "[": "]", "(": ")"}


def balanced(parens):
    stack = []
    for char in list(parens):
        if char == " ":
            continue
        if char in left_sides:
            stack.append(char)
        elif len(stack) and matching_right_sides[stack[-1]] == char:
            stack.pop()
        else:
            return False
    if len(stack) == 0:
        return True


class TestCase(unittest.TestCase):
    def test_area(self):
        self.assertTrue(balanced("(()()()())"))
        self.assertTrue(balanced("(((())))"))
        self.assertTrue(balanced("(()((())()))"))
        self.assertTrue(balanced(""))
        self.assertTrue(balanced("()"))
        self.assertFalse(balanced("((((((())"))
        self.assertFalse(balanced("()))"))
        self.assertFalse(balanced("(()()(()"))
        self.assertTrue(balanced("{ { ( [ ] [ ] ) } ( ) }"))
        self.assertTrue(balanced("[ [ { { ( ( ) ) } } ] ]"))
        self.assertTrue(balanced("[ ] [ ] [ ] ( ) { }"))
        self.assertFalse(balanced("( [ ) ]"))
        self.assertFalse(balanced("[ { ( ) ]"))
        self.assertFalse(balanced("( ( ( ) ] ) )"))

if __name__ == '__main__':
    unittest.main()
