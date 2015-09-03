var perl = PerlToJs();

var square = perl.get('Dummy::Simple', 'square');

if ((square([2]) != 4) || (square([3]) != 9) || (square([4]) != 16)){
	throw new Error;
}

console.log('passed all tests!');
