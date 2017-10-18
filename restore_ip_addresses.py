from minitest import *


def valid_tail(digits, len_head_bytes, len_last_head_byte):
    max_digits = (4 - len_head_bytes) * 3 + 3 - len_last_head_byte
    min_digits = (4 - len_head_bytes)
    return min_digits <= len(digits) <= max_digits

def valid_head(bytes):
    for tup in bytes:
        valid_num = int(tup) <= 255 and int(tup) >= 0
        valid_len = len(str(int(tup))) == len(tup)
        if not valid_num or not valid_len:
            return False
    return True

def valid(tail_digits, head_bytes):
    len_last_head_byte = len((head_bytes or [""])[-1])
    return valid_tail(tail_digits, len(head_bytes), len_last_head_byte) and valid_head(head_bytes)

def extend_last_head_byte(tail_digits, head_bytes):
    return tail_digits[1:], head_bytes[:-1] + [head_bytes[-1] + tail_digits[0]]

def create_new_byte(tail_digits, head_bytes):
    return tail_digits[1:], head_bytes + [tail_digits[0]]

def children(tail_digits, head_bytes):
    if len(tail_digits) is 0:
        return

    extension_techniques = [extend_last_head_byte, create_new_byte] if len(head_bytes) else [create_new_byte]

    for extension_technique in extension_techniques:
        candidate_tail, candidate_head = extension_technique(tail_digits, head_bytes)

        if valid(candidate_tail, candidate_head):
            yield candidate_tail, candidate_head

def ip_address_combinations(tail_digits, head_bytes=[], ip_addrs=None):
    if ip_addrs is None:
        # DANGER: lists as default arguments are risky - the default arg will have been mutated for the next test!
        ip_addrs = []

    if len(tail_digits) is 0:
        ip_addrs += [".".join(head_bytes)]

    for tail_digits, head_bytes in children(tail_digits, head_bytes):
        ip_address_combinations(tail_digits, head_bytes, ip_addrs)

    return ip_addrs


test_equals(extend_last_head_byte("000", ["0"]), ("00", ["00"]))

test_equals(create_new_byte("00", []), ("0", ["0"]))
test_equals(create_new_byte("000", ["0"]), ("00", ["0", "0"]))

test_equals(valid("", ["0", "0", "0", "0"]), True)
test_equals(valid("00", ["0", "100", "000", "000"]), True)

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
