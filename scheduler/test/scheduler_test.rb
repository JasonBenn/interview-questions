# encoding: UTF-8

require 'json'
require_relative 'tiny_test_framework.rb'

FIXTURE_DIRECTORY = 'test/fixtures/'

def all_classes_present?(courses, schedule)
  course_names = courses.map { |course| course['name'] }.compact
  (course_names - schedule).empty?
end

def no_duplicates?(schedule)
  schedule.uniq.length == schedule.length
end

def all_prereqs_satisfied?(courses, schedule)
  schedule.all? do |course_name|
    course = courses.find { |course| course['name'] == course_name }

    if course['prerequisites'].none?
      true
    else
      course_index = schedule.find_index(course['name'])
      prereq_indices = course['prerequisites'].map { |prereq| schedule.find_index prereq }
      course_index > prereq_indices.max
    end
  end
end

def test_schedule_is_correct(filename)
  courses_json = JSON.parse(File.read(FIXTURE_DIRECTORY + filename))
  schedule = file_to_dag(FIXTURE_DIRECTORY + filename).topological_sort
  assert_true("Schedule for #{filename} puts prereqs first", all_prereqs_satisfied?(courses_json, schedule))
  assert_true("Schedule for #{filename} includes all classes", all_classes_present?(courses_json, schedule))
  assert_true("Schedule for #{filename} has no duplicate classes", no_duplicates?(schedule))
end

def test_schedule_is_cyclic(filename)
  assert_raise("Schedule for #{filename} finds a cycle and raises an error", DirectedAcyclicGraph::CycleFoundError) do 
    file_to_dag(FIXTURE_DIRECTORY + filename).topological_sort
  end
end

def test_suite
  test_schedule_is_correct 'physics.json'
  test_schedule_is_correct 'math.json'
  test_schedule_is_correct 'not_strongly_connected.json'
  test_schedule_is_correct 'empty.json'
  test_schedule_is_cyclic 'cyclic_prereqs.json'
  test_schedule_is_cyclic 'complex_cyclic_prereqs.json'

  assert_raise("Schedule for missing_prereq.json finds a missing prereq and raises an error", MissingPrereqError) do 
    file_to_dag(FIXTURE_DIRECTORY + 'missing_prereq.json').topological_sort
  end
end
