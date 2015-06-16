# Done!

def fibonacci(n)
	a = 0
	b = 1
	until a >= n
		a += b
		a, b = b, a
	end
	[a, b]
end

p fibonacci(8)
