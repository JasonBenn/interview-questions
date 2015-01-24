require 'pry'
require 'set'
require './assert'

# Your company built an in-house calendar tool called HiCal. You want to add a feature to see the times in a day when everyone is available.
# To do this, you’ll need to know when any team is having a meeting. In HiCal, a meeting is stored as a tuple of integers (start_time, end_time) . These integers represent the number of 30-minute blocks past 9:00am.

# For example:

#   (2, 3) # meeting from 10:00 – 10:30 am
# (6, 9) # meeting from 12:00 – 1:30 pm
# Write a function condense_meeting_times() that takes an array of meeting time ranges and returns an array of condensed ranges.

# For example, given:

#   [(0, 1), (3, 5), (4, 8), (10, 12), (9, 10)]
# your function would return:

#   [(0, 1), (3, 8), (9, 12)]
# Do not assume the meetings are in order. The meeting times are coming from multiple teams.

# In this case the possibilities for start_time and end_time are bounded by the number of 30-minute slots in a day. But soon you plan to refactor HiCal to store times as Unix timestamps (which are big numbers). Write something that's efficient even when we can't put a nice upper bound on the numbers representing our time ranges.


def overlapping?(meeting_a, meeting_b)
  meetings = [meeting_a, meeting_b]
  meetings = meetings.sort_by(&:first)
  meetings[0][1] >= meetings[1][0]
end

assert(overlapping?([0, 3], [2, 4]), true)
assert(overlapping?([2, 4], [0, 3]), true)
assert(overlapping?([2, 5], [3, 4]), true)
assert(overlapping?([1, 2], [3, 4]), false)
assert(overlapping?([3, 4], [1, 2]), false)
assert(overlapping?([1, 2], [2, 3]), true)
assert(overlapping?([2, 3], [1, 2]), true)

def collapse(*meetings)
  meetings.flatten.minmax
end

assert(collapse([1, 2], [2, 4]), [1, 4])
assert(collapse([2, 4], [1, 2]), [1, 4])
assert(collapse([2, 4], [1, 5]), [1, 5])
assert(collapse([1, 5], [2, 4]), [1, 5])
assert(collapse([1, 4], [2, 5]), [1, 5])
assert(collapse([1, 4], [2, 5], [1, 2], [1, 3]), [1, 5])

# assert(busy_times(simple_calendar) [[1, 4]])

simple_calendar = [[1, 3], [2, 4]]
medium_calendar = [[1, 3], [2, 4], [5, 6], [7, 8], [6, 7]]
medium_calendar_two = [[0, 1], [2, 4], [5, 6], [7, 8], [6, 7]]

def busy_times(calendar)
  calendar_length = calendar.length
  busy_calendar = Set.new

  calendar.each_with_index do |meeting, i|
    other_indexes = Array.new(calendar_length) { |n| n } - [i]
    overlapping_meeting_indices = other_indexes.select do |other_index| 
      overlapping?(meeting, calendar[other_index])
    end
    overlapping_meetings = overlapping_meeting_indices.map { |i| calendar[i] } + [meeting]
    binding.pry
    busy_calendar << collapse(*overlapping_meetings)
  end

  busy_calendar.to_a
end

# assert(busy_times(simple_calendar), [[1, 4]])
assert(busy_times(medium_calendar), [[1, 4], [5, 8]])
# assert(busy_times(medium_calendar_two), [[0, 1], [2, 4], [5, 8]])

__END__

iterate over meetings one at a time.
EACH meeting
  find overlaps
  IF overlap:
    collapse those two meetings into a new meeting
    delete the old two meetings
    insert new meeting into results array
  ELSE no overlap:
    put meeting into results array

find overlap:
  if the begin time < end time, join those two meetings.
  true/false

combine meetings:
  take earliest time, latest time.
  return meeting.
