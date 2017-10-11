from minitest import *


def valid_tail(tail, ip_tuples_length):
    tail_tuple_size = 4 - ip_tuples_length
    tail_tuple_min_length = 1 * tail_tuple_size
    tail_tuple_max_length = 4 * tail_tuple_size
    return tail_tuple_min_length <= len(tail) <= tail_tuple_max_length


def could_add_tuple_with_tail(tail):
    return tail.startswith('0') or tail.startswith('1') or tail.startswith('2')


def head_tail(seq):
    # print('seq', seq)
    try:
        return seq[0], seq[1:]
    except IndexError:
        return "", []


def first_seq_last(seq):
    try:
        return seq[:-1], seq[-1]
    except IndexError:
        return [], ""

# Rewrite as tree with three leaves per node. Cool.


def ip_address_combinations(digits, ip_tuples=[], solutions=[]):
    if not len(digits):
        new_solution = ".".join(ip_tuples)
        print("if no tail, return solutions + ip_tuples", solutions + [new_solution])
        return solutions + [new_solution]

    if not valid_tail(digits, len(ip_tuples)):
        print("RETURN: digits not valid for %s\n" % len(ip_tuples))
        return None

    head, tail = head_tail(digits)
    first_seq, last = first_seq_last(ip_tuples)

    ip_tuples_new_tuple = ip_tuples + [digits[0]]
    ip_tuples_expanded_tuple = first_seq + [last + digits[0]]

    print("head", head, "tail", tail)

    if could_add_tuple_with_tail(tail):
        print("tail", tail, "ip_tuples_new_tuple", ip_tuples_new_tuple, "\n")
        return ip_address_combinations(tail, ip_tuples_new_tuple, solutions)

    print("tail", tail, "ip_tuples_expanded_tuple", ip_tuples_expanded_tuple, "\n")
    return ip_address_combinations(tail, ip_tuples_expanded_tuple, solutions)


test_equals(valid_tail("0000", 3), True)
test_equals(valid_tail("0000", 1), True)
test_equals(valid_tail("00000", 4), False)
test_equals(valid_tail("00", 1), False)
test_equals(valid_tail("000", 1), True)
test_equals(valid_tail("500", 1), False)
test_equals(valid_tail("300", 1), False)

test_equals(ip_address_combinations("0000"), ["0.0.0.0"])
test_equals(ip_address_combinations("25525511135"), ["255.255.11.135", "255.255.111.35"])



# IF NO TAIL
    # RETURN solutions + ip_tuples

# IF TAIL IS INVALID
    # RETURN None

# RETURN new head tuple
# RETURN expanded head tuple







    # Is this our head pass?
    # if not len(ip_tuples):
    #     ip_tuples.append(tail_head)
    #     print("this is our head pass. ip_tuples", ip_tuples, "tail_tail", tail_tail)

    # # return IF no digits remain in tail
    # if not len(tail_tail):
    #     final = ip_tuples + [tail_head]
    #     print("joining and returning:", final)
    #     solutions = solutions + [".".join(final)]
    #     return solutions

    # print("ip_tuples len: %s. tail_tail %s is valid: %s" % (len(ip_tuples), tail_tail, valid_tail(tail_tail, len(ip_tuples))))
    # if valid_tail(tail_tail, len(ip_tuples)):
    #     ip_tuples = ip_tuples[0:-1] + [ip_tuples[-1] + tail_head]
    #     print("RECURSE with expanded ip_tuples:", ip_tuples, "tail_tail", tail_tail, "\n")
    #     return ip_address_combinations(tail_tail, ip_tuples, solutions)
    # else:
    #     new_ip_tuples = ip_tuples + [tail_head]
    #     print("RECURSE with new ip_tuples", new_ip_tuples, tail_tail, "\n")
    #     return ip_address_combinations(tail_tail, new_ip_tuples, solutions)


# wach --only restore_ip_addresses.py "python restore_ip_addresses.py"
