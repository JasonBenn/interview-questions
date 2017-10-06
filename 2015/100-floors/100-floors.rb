# Done. Review:
  # The solution works, it's just not perfect.
  # The actual solution required one more intuitive leap - that you should decrement the skipping distance the closer you get to the top floor.
  # However, this is pretty decent.

require 'pry'

levels = 100

# find the step that, on average, produces the lowest number of drops.
p (1..levels).map do |step|
  drops = (1..levels).map { |max_level| max_level / step + max_level % step + 2 }
  drops.reduce(:+) / Float(drops.length)
end.each_with_index.min_by { |average_drops, index| average_drops }.to_a

__END__

let's say breaking_floor = 35

Naive solution:
(1..100).each do |n|
  drop egg
  if egg broke? return n
end

Num drops: 35.

Slightly less naive solution:
increase num_drops by N until it breaks.
then drop from last known drop.
If n is 10:
10 # OK
20 # OK
30 # OK
40 # broke
31 # OK
32 # OK
... 
36 # BROKE 
total num: 10!

Compute the average case for each N
Choose the N with the best average case.
