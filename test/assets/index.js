var perl = PerlToJs();

throws(function(){
	perl.pkg('Does::Not::Exist');
});

var Dummy_Simple = perl.pkg('Dummy::Simple');

throws(function(){
	Dummy_Simple.sub('doesntexist');
});

// simple math function
var square = Dummy_Simple.sub('square');
for (var i = 0; i < 10; i++){
	is(square([i]), i*i);
}

// simple function treating an array
var doubleEach = Dummy_Simple.sub('doubleEach', {want: 'array'});
isDeeply(doubleEach(['a', '2', 3, 99]), ['aa', '22', '33', '9999']);

// overriding wanted return type
is(doubleEach(['a', '2', 3, 99], {want: 'scalar'}), 4);

// simple function returning a hash
// ...

console.log('passed all tests!');
