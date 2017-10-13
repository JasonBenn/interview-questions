# go through a tree, put all elements at leaves of tree into a list, return the list.

class Node:
    def __init__(self, value, children=[]):
        self.value = value
        self.children = children

def dfs(node, collected=[]):
    for child in node.children:
        dfs(child, collected)

    # print('reached the end of', node.value, collected)
    collected += [node.value]
    return collected


a = Node('a')
b = Node('b')
c = Node('c', [a, b])
d = Node('d')
e = Node('e')
f = Node('f', [d, e])
g = Node('g', [c, f])

co = dfs(g)
print(co)
