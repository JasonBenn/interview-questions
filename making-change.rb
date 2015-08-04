# Review:
# Did it! Decently elegant recursive solution.
# Never got memoizing working or the DP solution.

def initial(arr)
  arr[0..-2]
end

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
