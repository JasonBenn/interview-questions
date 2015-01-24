function select(arr, func) {
	var selected = [];
	for (var i = 0; i < arr.length; i++) {
		if (func(arr[i])) {
			selected.push(arr[i]);
		}
	}
	return selected;
}

console.log(select([1, 2, 3, 4], function(el) {
	return ((el % 2) === 0)
}))

function map(arr, func) {
	var mapped = [];
	for (var i = 0; i < arr.length; i++) {
		mapped.push(func(arr[i]));
	}
	return mapped;
}

console.log(map([1, 2, 3, 4], function(el) {
	return el * 2;
}))
