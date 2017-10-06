require 'json'

class MissingPrereqError < ArgumentError; end

def schedule_to_graph(schedule)
  prereqs = schedule.flat_map { |course| course['prerequisites'] }
  courses = schedule.map { |course| course['name'] }
  if (missing_courses = prereqs - courses).any?
    raise MissingPrereqError, "Error: missing prerequisites #{missing_courses.join(', ')}"
  end
  schedule.map { |course| [course['name'], course['prerequisites']] }.to_h
end

def file_to_dag(filename)
  DirectedAcyclicGraph.new(schedule_to_graph(JSON.parse(File.read(filename))))
end
