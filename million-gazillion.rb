# Tough. Not finished.

require 'pry'

def assert(description, actual, expected)
  raise "Expected #{expected} but got #{actual}: #{description}" unless expected == actual
  print '.'
end

visited_map = {
  "en.wikipedia.orgen.wikipedia.org/wiki/Orange_(fruit)" => "Orange (fruit) - Wikipedia, the free encyclopedia",
  "en.wikipedia.orgen.wikipedia.org/wiki/Orange_(colour)" => "Orange (colour) - Wikipedia, the free encyclopedia",
  "ee.co.ukee.co.uk/orange" => "Orange | Email, shop, upgrade | EE",
  "www.orange.frorange.fr" => "Orange : téléphones, forfaits, Internet, actualité, sport, video",
  "www.orange.comorange.com/en/home" => "orange.com: Corporate Website of Orange",
  "www.cityoforange.orgcityoforange.org" => "City of Orange, CA - Homepage",
  "ocgov.comocgov.com" => "Orange County, California - Homepage",
  "www.ci.orange.nj.usci.orange.nj.us" => "Welcome To Orange Township",
  "www.thefreedictionary.comthefreedictionary.com/orange" => "Orange - definition of Orange by The Free Dictionary",
  "www.co.orange.nc.usco.orange.nc.us" => "Welcome to Orange County, NC",
  "orangecountyfl.netorangecountyfl.net" => "Orange County, Florida",
  "dictionary.reference.comdictionary.reference.com/browse/orange" => "Orange | Define Orange at Dictionary.com",
  "www.orangetexas.netorangetexas.net" => "City of Orange | Small Town Charm, World Class Culture",
  "www.merriam-webster.commerriam-webster.com/dictionary/orange" => "Orange | Definition of orange by Merriam-Webster",
  "www.nj.comnj.com/orange/" => "Orange, NJ | News, photos, videos, real estate and more - NJ.com",
  "www.orange-ct.govorange-ct.gov" => "Town of Orange",
  "www.co.orange.ny.usco.orange.ny.us" => "Home - Orange County, New York",
  "www.townoforange.orgtownoforange.org/Pages/index" => "Welcome to Orange",
  "www.townoforangeva.orgtownoforangeva.org" => "Orange, VA - Official Website | Official Website",
  "www.colormatters.comcolormatters.com/orange" => "Orange - Color Matters",
  "orangecountyva.govorangecountyva.gov" => "Orange County, VA - Official Website",
  "www.orangecounty.netorangecounty.net/cities/orange.html" => "City of Orange, California - Community Guide",
  "orange.biolab.siorange.biolab.si" => "Orange Data Mining",
  "desktoppub.about.comdesktoppub.about.com/cs/colorselection/p/orange.htm" => "Orange Color Meanings - How to Use Shades of Orange",
  "www.mapquest.commapquest.com/maps?city=Orange&state=CA" => "Map of Orange CA | Orange California Hotels, Restaurants ...",
  "orangeamps.comorangeamps.com" => "Orange Amplification | British Guitar Amps, Bass Amps, Valve ...",
  "thinkorange.comthinkorange.com" => "Orange - Curriculum",
  "www.orangetexas.orgorangetexas.org" => "Orange, Texas Convention & Visitors Bureau | Small Town Charm ...",
  "www.theorangeconference.comtheorangeconference.com" => "The reThink Group - Orange Conference 2015 - Home",
  "www.youtube.comyoutube.com/user/realannoyingorange" => "Annoying Orange - YouTube"
}

class String
  def shift
    first_char = self[0]
    self.replace(self.slice(1..-1))
    return first_char
  end
end

class Trie
  include Enumerable

  def initialize(map)
    @map = map
    triefy(@map)
  end

  def triefy(map)
    binding.pry
    if map.length == 1

    # IF one element in map?
      # key -> value
    # ELSE 
      # N is 0
      # GROUP BY first 0..N chars
      # IF 1 key results from the group by
        # add that letter to the parent node
        # INCREMENT N
        # retry
      # ELSE
        # the results are now the new nodes under parent node
        # triefy children
  end

  def each(&block)
    @map.each do |value|
      yield value
    end
  end
end


map_num_chars = visited_map.map { |key, value| key.length + value.length }.inject(:+)
puts "Number of characters in the mapping: #{map_num_chars}"

visited_trie = Trie.new(visited_map)

trie_num_chars = visited_trie.map { |key, value| key.length + value.length }.inject(:+)
puts "Number of characters in the trie: #{trie_num_chars}"

