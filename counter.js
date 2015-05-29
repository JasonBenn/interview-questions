var counter = {
  count: 0,
  increment: function() {
    this.count += 1;
  }
};

$('body').click(counter.increment);

// The above doesn't quite work, because `this` is `window`. Solutions:



// Bind `this` to `counter` in either of the following ways:
var counter = {
  count: 0,
  increment: function() {
    this.count += 1;
  }.bind(this)
};

$('body').click(counter.increment);

// or

var counter = {
  count: 0,
  increment: function() {
    this.count += 1;
  }
};

$('a.link').click(counter.increment.bind(counter));


// this doesn't work, because it's called immediately so the callback isn't a function

$('a.link').click(counter.increment.call(counter));


// Invoke the function, don't pass it, so its context is set to the receiver object:

var counter = {
  count: 0,
  increment: function() {
    this.count += 1;
  }
};

$('a.link').click(function() { 
  counter.increment();
});
