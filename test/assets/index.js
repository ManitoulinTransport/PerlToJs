var perl = PerlToJs();

var Dummy_Simple = perl.pkg('Dummy::Simple');

var square = Dummy_Simple.sub('square');

if ((square([2]) != 4) || (square([3]) != 9) || (square([4]) != 16)){
	throw new Error;
}

console.log('passed all tests!');
