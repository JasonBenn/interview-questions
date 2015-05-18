# UNFINISHEd.

require 'pry'

def assert(description, actual, expected)
  raise "Expected #{expected} but got #{actual}: #{description}" unless expected == actual
  print '.'
end

class Meeting
  attr_reader :starts, :ends
  def initialize(starts, ends)
    @starts = starts
    @ends = ends
  end

  def to_a
    [@starts, @ends]
  end

  def overlaps?(later_meeting)
    later_meeting.starts <= ends
  end
end

def collapse(schedule, collapsed_schedule = [])
  return schedule if schedule.length == 1
  return collapsed_schedule.map(&:to_a) if schedule.length == 0

  meetings = schedule.map { |meeting_array| Meeting.new(*meeting_array) }

  sorted_meetings = meetings.sort_by { |meeting| meeting.starts }

  earlier = sorted_meetings[0]
  later = sorted_meetings[1]

  if earlier.overlaps? later
    collapsed_meeting = [earlier.starts, [earlier.ends, later.ends].max]
    collapsed_schedule.push(collapsed_meeting)
    collapse(schedule.slice(2..-1), collapsed_schedule)
  else
    collapsed_schedule.push(earlier, later)
    collapse(schedule.slice(2..-1), collapsed_schedule)
  end
end

assert('Empty schedule', 
  collapse([]), 
  []
)
assert('Schedule with one meeting', 
  collapse([[2, 3]]), 
  [[2, 3]]
)
assert('Overlap between two', 
  collapse([[0, 3], [2, 4]]), 
  [[0, 4]]
)
assert('Overlap between two, sorted reverse', 
  collapse([[2, 4], [0, 3]]), 
  [[0, 4]]
)
assert('Overlap between two, one envelops the other', 
  collapse([[2, 5], [3, 4]]), 
  [[2, 5]]
)
assert('Overlap between meetings that touch', 
  collapse([[2, 3], [3, 4]]), 
  [[2, 4]]
)
assert('Non overlapping meetings', 
  collapse([[1, 2], [3, 4]]), 
  [[1, 2], [3, 4]]
)
assert('Overlap between three', 
  collapse([[2, 4], [3, 5], [6, 7]]), 
  [[2, 5], [6, 7]]
)



__END__
# What times of day is everyome available?

[0, 3], [2, 4] => [0, 4]
Take the one the starts earlier, test the second number.
2 < 3 < 4. TRUE, overlap.
[2, 4], [5, 6]
[2, 4] starts earliest.
is 5 < 4 < 6. NOPE, no overlap.
