from minitest import *


def valid_tail(digits, len_head_tuples, len_last_head_tuple):
    max_digits = (4 - len_head_tuples) * 3 + 3 - len_last_head_tuple
    min_digits = (4 - len_head_tuples)
    return min_digits <= len(digits) <= max_digits

def valid_head(tuples):
    for tup in tuples:
        valid_num = int(tup) <= 255 and int(tup) >= 0
        valid_len = len(str(int(tup))) == len(tup)
        if not valid_num or not valid_len:
            return False
    return True

def valid(tail_digits, head_tuples):
    len_last_head_tuple = len((head_tuples or [""])[-1])
    return valid_tail(tail_digits, len(head_tuples), len_last_head_tuple) and valid_head(head_tuples)

def extend_last_head_tuple(tail_digits, head_tuples):
    return tail_digits[1:], head_tuples[:-1] + [head_tuples[-1] + tail_digits[0]]

def create_new_tuple(tail_digits, head_tuples):
    return tail_digits[1:], head_tuples + [tail_digits[0]]

def children(tail_digits, head_tuples):
    if len(tail_digits) is 0:
        return

    extension_techniques = [extend_last_head_tuple, create_new_tuple] if len(head_tuples) else [create_new_tuple]

    for extension_technique in extension_techniques:
        candidate_tail, candidate_head = extension_technique(tail_digits, head_tuples)

        if valid(candidate_tail, candidate_head):
            yield candidate_tail, candidate_head

def ip_address_combinations(tail_digits, head_tuples=[], ip_addrs=None):
    if ip_addrs is None:
        # DANGER: lists as default arguments are risky - the default arg will have been mutated for the next test!
        ip_addrs = []

    if len(tail_digits) is 0:
        ip_addrs += [".".join(head_tuples)]

    for tail_digits, head_tuples in children(tail_digits, head_tuples):
        ip_address_combinations(tail_digits, head_tuples, ip_addrs)

    return ip_addrs


test_equals(extend_last_head_tuple("000", ["0"]), ("00", ["00"]))

test_equals(create_new_tuple("00", []), ("0", ["0"]))
test_equals(create_new_tuple("000", ["0"]), ("00", ["0", "0"]))

test_equals(valid("", ["0", "0", "0", "0"]), True)  # THIS GUY
test_equals(valid("00", ["0", "0"]), True)
test_equals(valid("0000", []), True)
test_equals(valid("", ["0", "0", "0", "0", "0"]), False)
test_equals(valid("0000", []), True)
test_equals(valid("00", ["0"]), False)
test_equals(valid("", [""]), False)

test_equals(valid_head(["000"]), False)
test_equals(valid_head(["000"]), False)
test_equals(valid_head(["0"]), True)
test_equals(valid_head(["300"]), False)
test_equals(valid_head(["130"]), True)
test_equals(valid_head(["255"]), True)
test_equals(valid_head(["256"]), False)
test_equals(valid_head(["0256"]), False)
test_equals(valid_head(["1"]), True)

test_equals(list(children("000", ["0"])), [("00", ["0", "0"])])
test_equals(
    list(
        children("0000", ["1"])
    ),
    [
        ("000", ["10"]),
        ("000", ["1", "0"]),
    ]
)

test_equals(ip_address_combinations("0", ["0", "0", "0"]), ["0.0.0.0"])
test_equals(ip_address_combinations("0000"), ["0.0.0.0"])
test_equals(ip_address_combinations("23423412135"), ["234.234.121.35", "234.234.12.135"])
