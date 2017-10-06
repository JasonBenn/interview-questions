# Review:
# Did it! Decently elegant recursive solution.
# Never got memoizing working or the DP solution.

require 'pry'

def initial(arr)
  arr[0..-2]
end

# Recursive. Memoizable.
def num_combos(amount, denoms)
  smaller_coins, largest_coin = initial(denoms), denoms.last

  if smaller_coins.none?
    return amount % largest_coin == 0 ? 1 : 0
  end

  lg_coins_that_fit = amount / largest_coin

  (0..lg_coins_that_fit).reduce(0) do |total, n_large_coins|
    remainder = amount - n_large_coins * largest_coin
    case remainder
    when 0 then total + 1
    else total + num_combos(remainder, smaller_coins)
    end
  end
end


# DP attempt. Demoralizing, unsuccessful.
# def num_combos(amount, denoms)
#   # The first group is the smallest denomination, other groups include progressively more coins.
#   denom_groups = denoms.length.times.map { |n| denoms.slice(0..n) }

#   all_combos = denom_groups.reduce({}) do |args_to_combos, denom_group|
#     smaller_coins, largest_coin = initial(denom_group), denom_group.last

#     (1..amount).each do |subamount|
#       args = [subamount, denom_group]

#       if smaller_coins.none?
#         puts "Computing #{args}."
#         args_to_combos[args] = subamount % largest_coin == 0 ? 1 : 0
#         next
#       end

#       lg_coins_that_fit = subamount / largest_coin

#       args_to_combos[args] = (1..lg_coins_that_fit).reduce(0) do |total, n_large_coins|
#         remainder = subamount - n_large_coins * largest_coin
#         puts "Computing #{args}."
#         # puts "Subamount: #{subamount}. Denom group: #{denom_group}. With #{n_large_coins} of #{largest_coin}c, remainder is #{remainder}."
#         # binding.pry
#         case remainder
#         when 0
#           # puts "No remainder. Total so far: #{total}"
#           total + 1
#         else
#           # puts "Remainder: #{remainder}. cache[#{remainder}, #{smaller_coins}]: #{args_to_combos[[remainder, smaller_coins]]}. Total is now #{total + args_to_combos[[remainder, smaller_coins]]}"
#           total + args_to_combos[[remainder, smaller_coins]]
#         end
#       end
#     end

#     args_to_combos
#   end

#   pp all_combos

#   all_combos[[amount, denoms]]
# end

require_relative './tiny_test_framework'
[
  [[1, [1]], 1],
  [[2, [1]], 1],
  [[3, [1]], 1],
  [[4, [1]], 1],
  [[4, [1, 2, 3]], 4],
  [[8, [1, 2, 3, 4]], 15],
].each do |(amount, denoms), expected_num_combos|
  assert("#{amount}c with #{denoms.join('c, ') + 'c'} has #{expected_num_combos} combos", num_combos(amount, denoms), expected_num_combos)
end
