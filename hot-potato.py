from collections import deque

def hot_potato(names, num):
    players = deque(names)
    while len(players):
        players.rotate(num)
        yield players.popleft()
        print(players)

print(list(hot_potato(["brendan", "oz", "jason", "myles", "ben"], 3)))
