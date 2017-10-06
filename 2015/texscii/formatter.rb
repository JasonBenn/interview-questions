# Unfinished (in either ES6 or Ruby.)

require 'pry'

class Exponent
  def initialize(exponent)
    @exponent = exponent
  end
end

SYMBOLS = {
  /\^\{(\d+)\}/ => Exponent
}

def format(input)
  chars = input.chars
  current_token = []
  while chars.any?
    current_token << chars.shift
    if SYMBOLS.keys.any? { |regex| regex.match current_token.join }
      binding.pry
    end
  end
end

format('x^{2}')