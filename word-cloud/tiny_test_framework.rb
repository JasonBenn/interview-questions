GREEN = "\e[0;32m"
RED = "\e[0;31m"
RESET = "\e[1;0m"

def assert(blurb, actual, expected)
  summary = "#{blurb}\nActual:\t\t#{actual.inspect}\nExpected:\t#{expected.inspect}"
  puts (actual == expected ? "#{GREEN}✓ #{blurb}" : "#{RED}✗ #{summary}") + "#{RESET}"
end

def assert_true(blurb, test)
  assert(blurb, test, true)
end

def assert_raise(blurb, expected_error, &block)
  begin
    block.call
  rescue => e
    raise e unless e.class == expected_error
    return assert_true(blurb, true)
  end
  assert_true(blurb, false)
end
