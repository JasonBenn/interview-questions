# Done!
# Review:
  # You arrived at the correct solution right away!
  # Cons: didn't consider that some files might be the same and that it's OK.
  # Would be nice to mention that empty files would be the same everywhere.
  # You could have thought of a way to mitigate this - if file access time doesn't match the time that you knew your friend was on the comp, you can safely ignore those dupes.
  # MD5 is sweet.
  # Your solution is better because of the use of a hashing algorithm. Nice job!
  # Symbolic links could mess us up if they cause a loop!
  # Would be nice to write file traversal code directly.
  # Would've maybe been cool to write your own fingerprint algorithm...?
  # Would've been cool to mention doing this in parallel!
    # Should I try this in parallel??

require 'pry'

pwd = `pwd`
directories = `tree -dfi`.split[0..-3]

def files_in_folder(folder)
  `ls -p #{folder} | grep -v /`.split.map { |filename| folder + '/' + filename }
end

files = directories.flat_map { |folder| files_in_folder(folder) }

files_seen = files.reduce(Hash.new { |h, k| h[k] =[] }) do |files_seen, file|
  checksum = `md5 -q #{file}`.chomp
  files_seen[checksum] << file
  files_seen
end

duplicate_files = files_seen.select { |k, v| v.length > 1 }

def changed(filepath)
  `echo $(( $(date +%s) - $(stat -f%c #{filepath}) ))`
end

duplicate_tuples = duplicate_files.flat_map do |k, v| 
  sorted = v.sort_by { |file| -Integer(changed(file)) }
  original = sorted.shift
  sorted.map { |duplicate_file| [duplicate_file, original] }
end

p duplicate_tuples