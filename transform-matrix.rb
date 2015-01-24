def rotate(matrix)
	rotated = Array.new(matrix[0].length) { Array.new(matrix.length) }
	matrix.each_with_index do |row, row_index|
		row.each_with_index do |el, el_index|
			rotated[matrix[0].length - 1 - el_index][row_index] = el
		end
	end
	rotated
end

require 'pp'

pp arr = [[:a, :b, :c], [:d, :e, :f], [:g, :h, :i]]
pp rotate(arr)
