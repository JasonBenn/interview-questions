# Done!

# Good job:
# Your first implementation was good! Simple, Rubyesque, elegant. Just not performant.
# Your second solution was more performant - it's a basic lexer.
# Testing framework is getting better, too.

# Needs improvement:
# Second solution could use a refactor, there's some duplicated and unnecessarily confusing logic.
# You didn't consider enough edge cases.
  # Bill could be a name or a word. In this case, capitalization matters. If something is consistently capitalized, it should be considered a different word.
# Should mention the limitations of this solution.
  # Bill could refer to a name ~or~ a receipt, capitalized because it's the start of a sentence. You should mention that this solution won't be 100% accurate.

require 'pry'
require_relative 'tiny_test_framework'

input_one = 'After beating the eggs, Dana read the next step:'
input_two = 'Add milk and eggs, then add flour and sugar.'
input_three = "We came, we saw, we conquered...then we ate Bill's (Mille-Feuille) cake."

def word_cloud(input)
  word_frequencies = Hash.new { |h, k| h[k] = 0 }

  input_length = input.length
  last_bookmarked_character = 0
  current_character = 0

  until (current_character == input_length)
    if input[current_character] =~ /[ \.\-]/ || current_character == input_length - 1
      word = input.slice(last_bookmarked_character...current_character)
      cleaned_word = word.downcase.gsub(/[,:.\-)(]/, '')
      last_bookmarked_character = current_character + 1
      if cleaned_word.empty?
        current_character += 1
        next 
      end
      word_frequencies[cleaned_word] += 1
    end
    current_character += 1
  end
  word_frequencies
end

assert('word cloud', word_cloud(input_one), {"after"=>1, "beating"=>1, "the"=>2, "eggs"=>1, "dana"=>1, "read"=>1, "next"=>1, "step"=>1})
assert('word cloud', word_cloud(input_two), {"add"=>2, "milk"=>1, "and"=>2, "eggs"=>1, "then"=>1, "flour"=>1, "sugar"=>1})
assert('word cloud', word_cloud(input_three), {"we"=>4, "came"=>1, "saw"=>1, "conquered"=>1, "then"=>1, "ate"=>1, "bill's"=>1, "mille"=>1, "feuille"=>1, "cake"=>1})
