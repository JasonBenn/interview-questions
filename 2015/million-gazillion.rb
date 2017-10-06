# v1 - split by char
# v2 - split by token

def tokenize(url)
  url.split('')
end

class Node
  attr_accessor :value, :children

  def initialize(value = nil, children = {})
    @value = value
    @children = children
  end

  def inspect
    "\nNode.new(#{value || 'nil'}, #{children})"
  end

  def ==(other)
    (value == other.value) && (children == other.children)
  end
end

def getOrInsertURL(visitedNode, url) # : node
  return visitedNode if url.empty?

  head = url[0]
  rest = url.slice(1..-1)
  children = visitedNode.children

  children[head] = Node.new if children[head].nil?
  getOrInsertURL(children[head], rest)
end

def storeURLKeywords(trie, url, keywords)
  urlNode = getOrInsertURL(trie, url)
  urlNode.value = keywords if urlNode.value.nil?
end

if __FILE__ == $0
  require_relative 'tiny_test_framework'

  # visited_map = {
  #   "en.wikipedia.orgen.wikipedia.org/wiki/Orange_(fruit)" => "Orange (fruit) - Wikipedia, the free encyclopedia",
  #   "en.wikipedia.orgen.wikipedia.org/wiki/Orange_(colour)" => "Orange (colour) - Wikipedia, the free encyclopedia",
  #   "ee.co.ukee.co.uk/orange" => "Orange | Email, shop, upgrade | EE",
  #   "www.orange.frorange.fr" => "Orange : téléphones, forfaits, Internet, actualité, sport, video",
  #   "www.orange.comorange.com/en/home" => "orange.com: Corporate Website of Orange",
  #   "www.cityoforange.orgcityoforange.org" => "City of Orange, CA - Homepage",
  #   "ocgov.comocgov.com" => "Orange County, California - Homepage",
  #   "www.ci.orange.nj.usci.orange.nj.us" => "Welcome To Orange Township",
  #   "www.thefreedictionary.comthefreedictionary.com/orange" => "Orange - definition of Orange by The Free Dictionary",
  #   "www.co.orange.nc.usco.orange.nc.us" => "Welcome to Orange County, NC",
  #   "orangecountyfl.netorangecountyfl.net" => "Orange County, Florida",
  #   "dictionary.reference.comdictionary.reference.com/browse/orange" => "Orange | Define Orange at Dictionary.com",
  #   "www.orangetexas.netorangetexas.net" => "City of Orange | Small Town Charm, World Class Culture",
  #   "www.merriam-webster.commerriam-webster.com/dictionary/orange" => "Orange | Definition of orange by Merriam-Webster",
  #   "www.nj.comnj.com/orange/" => "Orange, NJ | News, photos, videos, real estate and more - NJ.com",
  #   "www.orange-ct.govorange-ct.gov" => "Town of Orange",
  #   "www.co.orange.ny.usco.orange.ny.us" => "Home - Orange County, New York",
  #   "www.townoforange.orgtownoforange.org/Pages/index" => "Welcome to Orange",
  #   "www.townoforangeva.orgtownoforangeva.org" => "Orange, VA - Official Website | Official Website",
  #   "www.colormatters.comcolormatters.com/orange" => "Orange - Color Matters",
  #   "orangecountyva.govorangecountyva.gov" => "Orange County, VA - Official Website",
  #   "www.orangecounty.netorangecounty.net/cities/orange.html" => "City of Orange, California - Community Guide",
  #   "orange.biolab.siorange.biolab.si" => "Orange Data Mining",
  #   "desktoppub.about.comdesktoppub.about.com/cs/colorselection/p/orange.htm" => "Orange Color Meanings - How to Use Shades of Orange",
  #   "www.mapquest.commapquest.com/maps?city=Orange&state=CA" => "Map of Orange CA | Orange California Hotels, Restaurants ...",
  #   "orangeamps.comorangeamps.com" => "Orange Amplification | British Guitar Amps, Bass Amps, Valve ...",
  #   "thinkorange.comthinkorange.com" => "Orange - Curriculum",
  #   "www.orangetexas.orgorangetexas.org" => "Orange, Texas Convention & Visitors Bureau | Small Town Charm ...",
  #   "www.theorangeconference.comtheorangeconference.com" => "The reThink Group - Orange Conference 2015 - Home",
  #   "www.youtube.comyoutube.com/user/realannoyingorange" => "Annoying Orange - YouTube"
  # }

  # trie = Node.new
  # visited_map.each { |url, keywords| storeURLKeywords(trie, url, keywords) }
  # p trie

  simple_map = {
    'abc' => 'test: abc',
    'ab' => 'test: ab',
    'a' => 'test: a'
  }

  simple_map_as_trie = Node.new(nil, 'a' => Node.new('test: a', 'b' => Node.new('test: ab', 'c' => Node.new('test: abc'))))

  test_cases = [
    [simple_map, simple_map_as_trie]
  ]

  test_cases.each do |url_map, expected_trie|
    trie = Node.new
    url_map.each { |url, keywords| storeURLKeywords(trie, url, keywords) }
    # p trie
    assert(trie, expected_trie)
  end
end
