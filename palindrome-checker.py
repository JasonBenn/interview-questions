from collections import deque


def is_palindrome(word):
    chars = deque(word)
    while len(chars) > 1:
        if not chars.popleft() == chars.pop():
            return False
    return True


print(is_palindrome("radar"))
print(is_palindrome("toot"))
print(is_palindrome("madam"))
print(not is_palindrome("sup"))
