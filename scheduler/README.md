#### Scheduler

Scheduler is a class ordering program. Given a list of classes in JSON, Scheduler will print out a valid order.

#### Usage

`./scheduler JSON_FILE_NAME`

Example valid JSON:

```
[
    {
        "name": "Algebra 2",
        "prerequisites": []
    },
    {
        "name": "Pre Calculus",
        "prerequisites": ["Algebra 2"]
    }
]
```

If a cyclic dependency is detected, the program will throw an error. Otherwise, it will print classes to STDOUT in a valid order, one class per line.


#### Implementation

Scheduler works by converting the JSON input into a directed graph and then topologically sorting that graph.

Because topological sorts are impossible in a graph with cycles, Scheduler also watch for cycles as it sorts.


#### Algorithmic time complexity

Linear relative to the number of edges and nodes in the graph, i.e. O(|V|+|E|).


#### Thought process

Right away I recognized that this was a problem best suited for a graph data structure. A little bit of research revealed that topological sorting would be a suitable algorithm. Topo sort is a form of depth-first search: look at each node and add it to the result array unless you've seen this one before, but FIRST look at each of the nodes it depends on and add it to the result array unless you've seen this one before, but FIRST look at each of the nodes that guy depends on, etc... and eventually you'll run into the nodes that have no dependencies, they'll go into the results array first, and then you can recurse back up the stack. Elegant!

The initial implementation couldn't handle cyclic dependencies, though. After a bit more research, I learned about Tarjan's algorithm, which can identify cycles by breaking the graph into "strongly connected components". However, I didn't want to continue execution until I'd identified each group of strongly connected components -- I'd rather short circuit execution as soon as a cycle is detected. The solution was to add these lines to the DFS algorithm:

```
visited_but_not_added = visited[connected_node] && !sorted.include?(connected_node)  
raise CycleFoundError, "Error: cycle found. Look near '#{connected_node}'." if visited_but_not_added
```

Which I discovered by typing out the algorithm a few times and commenting on each line, like this:

```

{a: [b], b: [c], c: [a]}.keys.each do |node| # a, b, c
  depth_first_search(a) unless visited[a] # nope, not visited yet
    visited[a] = true
    graph[a].each do |connected_node| # b
      depth_first_search(b) unless visited[b]
        visited[b] = true
        graph[b].each do |connected_node| # c
          depth_first_search(c) unless visited[c]
            visited[c] = true
            graph[c].each do |connected_node| # a
              # OK. here's the spot where we should detect that something's up.
              # what condition is uniquely true right here?
              # first guess... `a` is visited but it's not in the results array.
              # not very intuitive, but does it work?
              # yes? magic!!
```

Not the most intuitive, but it's fast and my test suite tells me it's correct, so. /shrug


#### File structure

`app`: files specific to this app, probably not useful for other projects

`lib`: files that could be used for other projects (the DAG)

`test`: test using fixtured data. Run with `./scheduler test`

`test/tiny_test_framework`: a simple testing harness. I'm not sure if the visual flourishes (UTF-8 characters, ANSI escape sequences) will work in all environments, though. They work on my Macbook in both iTerm 2 and Terminal - I'm hoping whoever reviews this has a similar setup.


#### Contributing

JK


#### License

MIT
