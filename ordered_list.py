import unittest


class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

    def __repr__(self):
        return "<{}>".format(self.value)


class UnorderedList:
    def __init__(self, values=None):
        self.head = None
        for value in values or []:
            self.add(value)

    def add(self, value):
        node = Node(value)
        node.next = self.head
        self.head = node

    def size(self):
        count = 0
        current = self.head
        while current is not None:
            count += 1
            current = current.next
        return count

    def __iter__(self):
        current = self.head
        while current:
            yield current.value
            current = current.next

class OrderedList(UnorderedList):
    def __init__(self, values=None):
        super().__init__(values)

    def add(self, value):
        node = Node(value)
        previous = None
        current = self.head

        if not current:
            self.head = node
            return

        while current:
            if current.value > value:
                if not previous:
                    node.next = self.head
                    self.head = node
                else:
                    previous.next = node
                    node.next = current
                return

            previous, current = current, current.next
        previous.next = node


class TestCase(unittest.TestCase):
    def test_list_len(self):
        l = UnorderedList()
        self.assertEqual(l.size(), 0)
        l = UnorderedList([3, 1, 2])
        self.assertEqual(l.size(), 3)
        l = UnorderedList([])
        self.assertEqual(l.size(), 0)

    def test_list_add(self):
        l = OrderedList([3, 1, 2])
        self.assertEqual(list(l), [1, 2, 3])
        l = OrderedList([])
        self.assertEqual(list(l), [])
        l = OrderedList()
        self.assertEqual(list(l), [])
        l = OrderedList([1, 2, 3])
        self.assertEqual(list(l), [1, 2, 3])
        l = OrderedList([1, 2, 2, 3])
        self.assertEqual(list(l), [1, 2, 2, 3])
        l = OrderedList([1, 2, 3, 2])
        self.assertEqual(list(l), [1, 2, 2, 3])

if __name__ == '__main__':
    unittest.main()
