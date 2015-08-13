GREEN = "\e[0;32m"
RED = "\e[0;31m"
RESET = "\e[1;0m"

def assert(actual, expected, blurb = nil)
  summary = "#{blurb}\nActual:\t\t#{actual.inspect}\nExpected:\t#{expected.inspect}"
  puts (actual == expected ? "#{GREEN}✓ #{blurb}" : "#{RED}✗ #{summary}") + "#{RESET}"
end

def assert_true(test, blurb = nil)
  assert(test, true, blurb)
end

def assert_raise(expected_error, blurb = nil, &block)
  begin
    block.call
  rescue => e
    raise e unless e.class == expected_error
    return assert_true(true, blurb)
  end
  assert_true(false, blurb)
end

