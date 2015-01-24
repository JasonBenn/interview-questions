def next_palindrome(n)
	p divide_number(n)
	# until "#{n}" == "#{n}".reverse
	# 	n += 1
	# end
	# n
end

def divide_number(n)
	length = .length
	if length.odd?
		left = n[0..n/2]
		middle = n[n/2+1]
		right = n[n/2+2..-1]
	else
		left = n[0..n/2]
		middle = [n/2..n/2+1]
		right = n[n/2+1..-1]
	end
	return [left, middle, right].map(&:to_i)
end

p next_palindrome(125)


__END__
if odd digits, like 123 or 150...
	then find the left half, the middle, and the right half.
	mirror the left half.
	if it's greater - that's the solution.
	it it's not - increment the middle, then mirror again.

	special case: middle is nine? increment left and middle, then mirror.

if even digits, like 1223, or 1550...
	find left half and right half
