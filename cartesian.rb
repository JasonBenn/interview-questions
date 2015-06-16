# Done!

require 'pry'

# Determine if a list of Cartesian points are collinear

one_point = [[0, 0]] # true
two_points = [[0, 0], [1, 1]] # any two points should return true
three_points = [[0, 0], [1, 1], [2, 2]] # should return true, all are on same line
three_points_not_in_a_line = [[0, 0], [1, 1], [0, 1]] # false
three_points_in_a_flat_line = [[0,0], [1,0], [2,0]]
three_points_in_a_vertical_line = [[0,0], [0,1], [0,2]]
points_with_same_slope = [[0,0], [1,1], [2,2], [1,0], [2,1], [3,2]].shuffle

def assert(blurb, expected, actual)
  raise "Expected #{expected}, got #{actual}. #{blurb}" unless expected == actual
  print '.'
end

def is_line?(points)
  return true if points.length <= 2

  slopes = points.each_cons(2).map do |first, second|
    if (first[0] == second[0])
      'infinity'
    else
      slope = (first[1] - second[1]) / (first[0] - second[0])
    end
  end

  return slopes.uniq.length == 1
end

assert('One point counts as a line', is_line?(one_point), true)
assert('Two points count as a line', is_line?(two_points), true)
assert('Three points in a line count as a line', is_line?(three_points), true)
assert("Three points not a line don't count as a line", is_line?(three_points_not_in_a_line), false)
assert("Three points in a flat line counts as a line", is_line?(three_points_in_a_flat_line), true)
assert("Three points in a vertical line counts as a line", is_line?(three_points_in_a_vertical_line), true)
assert("Multiple parallel lines doesn't count as one line", is_line?(points_with_same_slope), false)
